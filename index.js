const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.CLAUDE_API_KEY;
const MODEL = 'claude-3.5';

if (!API_KEY) {
  console.error('Lỗi: Bạn phải đặt biến môi trường CLAUDE_API_KEY trước khi chạy.');
  console.error('Xem README.md để biết hướng dẫn cấu hình.');
  process.exit(1);
}

async function runClaude(prompt) {
  const body = {
    model: MODEL,
    messages: [
      { role: 'user', content: prompt }
    ],
    max_tokens_to_sample: 300,
    temperature: 0.7
  };

  const response = await axios.post('https://api.anthropic.com/v1/messages', body, {
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json'
    }
  });

  return response.data.completion;
}

async function main() {
  const prompt = process.argv.slice(2).join(' ') || 'Xin chào Claude! Bạn có thể giới thiệu về bản thân không?';
  console.log('Gửi prompt:', prompt);

  try {
    const answer = await runClaude(prompt);
    console.log('\nClaude trả lời:');
    console.log(answer.trim());
  } catch (error) {
    console.error('Lỗi khi gọi Claude API:', error.message);
    if (error.response) {
      console.error('Chi tiết phản hồi:', error.response.data);
    }
    process.exit(1);
  }
}

main();
