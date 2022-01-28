const axios = require("axios");
const http = require("http");
const pythonServiceAxios = async (callback) => {
  try {
    const res = await axios({
      url: "http://localhost:8080",
      method: "GET",
      params: {
        ping: "pong",
        bing: "bong",
      },
    });
    callback(res.data);
  } catch (error) {
    console.log(
      "AXIOS ERROR: ",
      error.response?.data ? error.response?.data : error.message
    );
  }
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
    console.error("NATIVE ERROR: ", error.message);
  });

  req.end();
};

const pythonTesterAxios = (myRes) => {
  console.log("AXIOS: ", myRes);
};

const pythonTesterNative = (myRes) => {
  console.log("NATIVE: ", myRes);
};

pythonServiceAxios((res) => pythonTesterAxios(res));

pythonServiceNative((res) => pythonTesterNative(res));
