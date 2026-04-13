const { buildReviewPrompt } = require('../utils/promptBuilder');
const { reviewCode }        = require('../services/openaiService');
const { insertSubmission }  = require('../services/dbService');

async function handleReview(req, res, next) {
  try {
    const { candidateName, problemStatement, inputOutputExamples, code, language } = req.body;

    const { systemPrompt, userPrompt } = buildReviewPrompt({
      candidateName,
      problemStatement,
      inputOutputExamples,
      code,
      language,
    });

    const aiResult = await reviewCode({ systemPrompt, userPrompt });

    const submissionId = insertSubmission({
      candidateName,
      problemStatement,
      inputOutputExamples: inputOutputExamples || '',
      code,
      language: language || 'unknown',
      score:           aiResult.score,
      verdict:         aiResult.verdict,
      isCorrect:       aiResult.isCorrect,
      errors:          aiResult.errors || [],
      feedback:        aiResult.feedback,
      improvementTips: aiResult.improvementTips || [],
    });

    res.json({
      success: true,
      data: {
        submissionId,
        candidateName,
        score:           aiResult.score,
        verdict:         aiResult.verdict,
        isCorrect:       aiResult.isCorrect,
        errors:          aiResult.errors || [],
        feedback:        aiResult.feedback,
        improvementTips: aiResult.improvementTips || [],
        createdAt:       new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleReview };
