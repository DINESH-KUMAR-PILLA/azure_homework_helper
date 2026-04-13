const SYSTEM_PROMPT = `You are a senior software engineer and coding mentor conducting a homework review.
Analyze the submitted code against the problem statement and examples provided.
You MUST respond with ONLY valid JSON — no markdown fences, no prose outside JSON.

JSON shape you must return:
{
  "score": <integer 0-100>,
  "verdict": <"Correct" | "Mostly Correct" | "Partially Correct" | "Incorrect">,
  "isCorrect": <boolean>,
  "errors": [
    { "line": <integer | null>, "message": "<string>", "severity": "<error|warning|info>" }
  ],
  "feedback": "<2-4 paragraph humanized feedback addressing the candidate by first name. Be encouraging, specific, and constructive.>",
  "improvementTips": ["<tip1>", "<tip2>", "<tip3>"]
}

Scoring rubric:
- 90-100: Optimal solution, handles all edge cases, clean code
- 70-89:  Correct logic but suboptimal or missing edge cases
- 50-69:  Partially correct, core logic flawed
- 0-49:   Major errors, incorrect approach

Always be warm, encouraging, and specific. Mention the candidate by their first name in the feedback.`;

function buildReviewPrompt({ candidateName, problemStatement, inputOutputExamples, code, language }) {
  const userPrompt = `Candidate Name: ${candidateName}

Problem Statement:
${problemStatement}

Input/Output Examples:
${inputOutputExamples || 'Not provided'}

Submitted Code (${language || 'unknown language'}):
\`\`\`
${code}
\`\`\`

Review this submission. Address the candidate by their first name in the feedback.
Identify EVERY line-level error with exact line numbers where possible.
Provide exactly 3 specific, actionable improvement tips.`;

  return { systemPrompt: SYSTEM_PROMPT, userPrompt };
}

module.exports = { buildReviewPrompt };
