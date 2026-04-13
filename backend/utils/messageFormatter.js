function formatWhatsAppMessage({ candidateName, score, verdict, feedback, improvementTips, concept, articles, videos }) {
  const lines = [];

  lines.push('*Candidate Support System* — Feedback Report');
  lines.push('——————————————————————');
  lines.push('');
  lines.push(`*Candidate:* ${candidateName}`);
  lines.push(`*Score:* ${score}/100 — ${verdict}`);
  lines.push('');
  lines.push('*AI Feedback:*');
  lines.push(feedback);
  lines.push('');

  if (improvementTips && improvementTips.length > 0) {
    lines.push('*Areas to Improve:*');
    improvementTips.forEach((tip) => lines.push(`• ${tip}`));
    lines.push('');
  }

  if ((articles && articles.length > 0) || (videos && videos.length > 0)) {
    lines.push('——————————————————————');
    lines.push(`*Learning Resources — ${concept || 'General'}*`);
    lines.push('');
  }

  if (articles && articles.length > 0) {
    lines.push('*Articles:*');
    articles.forEach((a, i) => lines.push(`${i + 1}. ${a.title}\n   ${a.url}`));
    lines.push('');
  }

  if (videos && videos.length > 0) {
    lines.push('*Videos:*');
    videos.forEach((v, i) => lines.push(`${i + 1}. ${v.title}\n   ${v.url}`));
    lines.push('');
  }

  lines.push('——————————————————————');
  lines.push('_Sent via Candidate Support System_');

  return lines.join('\n');
}

module.exports = { formatWhatsAppMessage };
