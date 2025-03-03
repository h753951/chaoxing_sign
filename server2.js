const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 用于存储文件路径
const dataFilePath = path.join(__dirname, 'data.json');

// 解析 JSON 请求体
app.use(express.json());

// /api/send 接口，接收 JSON 数据
app.post('/api/send', (req, res) => {
  const receivedData = req.body;

  // 先读取现有的 data.json 文件中的数据
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    let currentData = [];

    if (err) {
      // 如果读取出错，说明文件可能不存在或为空，初始化为一个空数组
      console.log("File not found or error reading, initializing as empty array.");
    } else {
      try {
        currentData = JSON.parse(data); // 解析现有的 JSON 数据
        if (!Array.isArray(currentData)) {
          currentData = []; // 如果现有数据不是数组，重新初始化为空数组
        }
      } catch (parseError) {
        console.log('Error parsing existing data, initializing as empty array.');
        currentData = [];
      }
    }

    // 将新数据添加到现有的数据数组中
    currentData.push(receivedData);

    // 将更新后的数据写回到 data.json 文件
    fs.writeFile(dataFilePath, JSON.stringify(currentData, null, 2), (err) => {
      if (err) {
        return res.status(500).send({ message: 'Error saving data' });
      }
      res.send({ message: 'Data sent and saved successfully' });
    });
  });
});

// /api/receive 接口，展示接收到的数据
app.get('/api/receive', (req, res) => {
  // 读取 data.json 文件中的数据
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send({ message: 'No data received yet' });
    }
    res.json(JSON.parse(data));
  });
});

// // 启动服务器
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
