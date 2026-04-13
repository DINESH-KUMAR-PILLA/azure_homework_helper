const OpenAI = require('openai');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function reviewCode({ systemPrompt, userPrompt }) {
  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.3,
    max_tokens: 1500,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: userPrompt },
    ],
  });

  const raw = completion.choices[0].message.content;
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('AI returned invalid JSON. Please try again.');
  }
}

module.exports = { reviewCode };
