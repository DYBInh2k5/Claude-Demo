# Claude Demo

Dự án mẫu này cho phép bạn gọi Claude API bằng key của bạn.

## Cài đặt

1. Cài đặt dependency:

```bash
npm install
```

2. Tạo file `.env` từ mẫu:

```bash
copy .env.example .env
```

3. Mở file `.env` và thay thế key bằng key thật của bạn.

## Chạy dự án

```bash
npm start
```

Hoặc gửi prompt riêng:

```bash
node index.js "Xin chào Claude, hãy giúp tôi viết một đoạn văn ngắn về AI."
```

## Lưu ý

- Không commit file `.env` chứa key thật lên git.
- Nếu bạn muốn dùng model khác, chỉnh `MODEL` trong `index.js`.
