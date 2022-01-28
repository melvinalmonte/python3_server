const axios = require("axios");
const pythonServer = async () => {
  const res = await axios({
    url: "http://localhost:8080",
    method: "GET",
    params: {
      ping: "pong",
      bing: "bong",
    },
  });
  return res.data;
};

const pythonTester = async () => {
  const myRes = await pythonServer();
  console.log(myRes);
};
pythonTester();
