export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const { name, birthdate, birthtime } = req.body;

  // 简单的 hash 方法根据输入生成稳定输出
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  const seed = hashString(`${name}-${birthdate}-${birthtime}`);
  const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  const values = elements.map((_, i) => (seed >> (i * 5)) % 100);

  const weakestIndex = values.indexOf(Math.min(...values));
  const strongestIndex = values.indexOf(Math.max(...values));
  const suggestion = `Your ${elements[strongestIndex]} element is dominant, while your ${elements[weakestIndex]} is weak. Consider balancing with lifestyle, colors, or rituals associated with ${elements[weakestIndex]}.`;

  return res.status(200).json({
    name,
    elements: values,
    suggestion
  });
}
Add stable wuxing.js API endpoint
