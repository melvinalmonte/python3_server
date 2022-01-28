const axios = require("axios");
const http = require("http");
const pythonServerAxios = async () => {
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

const pythonServiceNative = (callback) => {
  const options = {
    host: "localhost",
    path: "/?bing=bong&ping=pong",
    port: 8080,
  };
  const req = http.request(options, (res) => {
    res.setEncoding("utf-8");

    res.on("data", (chunk) => {
      callback(JSON.parse(chunk));
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};

const pythonTesterAxios = async () => {
  const myRes = await pythonServerAxios();
  console.log("AXIOS: ", myRes);
};

const pythonTesterNative = (myRes) => {
  console.log("NATIVE: ", myRes);
};

pythonTesterAxios();
pythonServiceNative(res => pythonTesterNative(res))
