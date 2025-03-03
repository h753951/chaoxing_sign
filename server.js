const express = require('express');
const app = express();
const port = 3000;

// 用于存储 /api/receive 接收到的数据
let receivedData = null;

// 解析 JSON 请求体
app.use(express.json());

// /api/receive 接口，接收 JSON 数据
app.post('/api/send', (req, res) => {
  // 保存接收到的 JSON 数据
  receivedData = req.body;
  res.send({ message: 'Data send successfully' });
});

// /api/send 接口，展示接收到的数据
app.get('/api/receive', (req, res) => {
  if (receivedData) {
    res.json(receivedData);
  } else {
    res.status(404).send({ message: 'No data received yet' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
