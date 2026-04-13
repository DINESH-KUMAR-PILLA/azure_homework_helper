const db = require('../config/db');

// ─── Submissions ────────────────────────────────────────────────────────────

function insertSubmission(data) {
  const stmt = db.prepare(`
    INSERT INTO submissions
      (candidate_name, problem_statement, input_output_examples, code, language,
       score, verdict, is_correct, errors_json, feedback, improvement_tips_json, created_at)
    VALUES
      (@candidateName, @problemStatement, @inputOutputExamples, @code, @language,
       @score, @verdict, @isCorrect, @errorsJson, @feedback, @improvementTipsJson, @createdAt)
  `);
  const result = stmt.run({
    candidateName:        data.candidateName,
    problemStatement:     data.problemStatement,
    inputOutputExamples:  data.inputOutputExamples || '',
    code:                 data.code,
    language:             data.language || 'unknown',
    score:                data.score,
    verdict:              data.verdict,
    isCorrect:            data.isCorrect ? 1 : 0,
    errorsJson:           JSON.stringify(data.errors),
    feedback:             data.feedback,
    improvementTipsJson:  JSON.stringify(data.improvementTips),
    createdAt:            new Date().toISOString(),
  });
  return result.lastInsertRowid;
}

function getSubmissionById(id) {
  const row = db.prepare('SELECT * FROM submissions WHERE id = ?').get(id);
  if (!row) return null;
  return deserializeSubmission(row);
}

function listSubmissions({ page = 1, limit = 20, search = '' }) {
  const offset = (page - 1) * limit;
  const pattern = `%${search}%`;

  const rows = db.prepare(`
    SELECT id, candidate_name, score, verdict, language, created_at
    FROM submissions
    WHERE candidate_name LIKE ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `).all(pattern, limit, offset);

  const { total } = db.prepare(`
    SELECT COUNT(*) as total FROM submissions WHERE candidate_name LIKE ?
  `).get(pattern);

  return {
    submissions: rows.map((r) => ({
      id:            r.id,
      candidateName: r.candidate_name,
      score:         r.score,
      verdict:       r.verdict,
      language:      r.language,
      createdAt:     r.created_at,
    })),
    total,
    page,
    limit,
  };
}

function deleteSubmission(id) {
  const result = db.prepare('DELETE FROM submissions WHERE id = ?').run(id);
  return result.changes > 0;
}

function deserializeSubmission(row) {
  return {
    id:                   row.id,
    candidateName:        row.candidate_name,
    problemStatement:     row.problem_statement,
    inputOutputExamples:  row.input_output_examples,
    code:                 row.code,
    language:             row.language,
    score:                row.score,
    verdict:              row.verdict,
    isCorrect:            row.is_correct === 1,
    errors:               JSON.parse(row.errors_json),
    feedback:             row.feedback,
    improvementTips:      JSON.parse(row.improvement_tips_json),
    createdAt:            row.created_at,
  };
}

// ─── Cache ───────────────────────────────────────────────────────────────────

function getCached(table, concept) {
  const row = db.prepare(`SELECT data_json, expires_at FROM ${table} WHERE concept = ?`).get(concept.toLowerCase());
  if (!row) return null;
  if (new Date(row.expires_at) < new Date()) {
    db.prepare(`DELETE FROM ${table} WHERE concept = ?`).run(concept.toLowerCase());
    return null;
  }
  return JSON.parse(row.data_json);
}

function setCache(table, concept, data, ttlMs) {
  const expiresAt = new Date(Date.now() + ttlMs).toISOString();
  db.prepare(`
    INSERT INTO ${table} (concept, data_json, expires_at)
    VALUES (?, ?, ?)
    ON CONFLICT(concept) DO UPDATE SET data_json = excluded.data_json, expires_at = excluded.expires_at
  `).run(concept.toLowerCase(), JSON.stringify(data), expiresAt);
}

module.exports = { insertSubmission, getSubmissionById, listSubmissions, deleteSubmission, getCached, setCache };
