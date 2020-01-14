const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api/auth/login", function(req, res) {
  console.log(req.body);
  // 認証処理
  const userId = req.body.userID;
  const password = req.body.password;
  let responseJson = { result: false, token: "" };
  console.log({ userId: userId, password: password });
  if (userId === "admin" && password === "password") {
    responseJson.result = true;
    responseJson.token = "XXXX";
    responseJson.name = userId;
    responseJson.expire = 300000;
  }
  console.log(responseJson);
  res.send(responseJson);
});

app.post("/api/data/get", function(req, res) {
  console.log(req.body);
  // 認証処理
  let responseJson = { result: true, data: "いろいろデータ" };
  console.log(responseJson);
  res.send(responseJson);
});
http.createServer(app).listen(8080);
