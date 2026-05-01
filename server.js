const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.CLAUDE_API_KEY;
const MODEL = 'claude-3.5';

if (!API_KEY) {
  console.error('Lỗi: Bạn phải đặt biến môi trường CLAUDE_API_KEY trước khi chạy.');
  process.exit(1);
}

app.use(express.static('public'));
app.use(express.json());

app.post('/api/message', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt phải là một chuỗi.' });
  }

  try {
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens_to_sample: 300,
      temperature: 0.7
    }, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    return res.json({ answer: response.data.completion });
  } catch (error) {
    const message = error.response?.data ?? error.message;
    return res.status(500).json({ error: 'Không thể gọi Claude API', detail: message });
  }
});

app.listen(port, () => {
  console.log(`Claude web demo đang chạy tại http://localhost:${port}`);
});
