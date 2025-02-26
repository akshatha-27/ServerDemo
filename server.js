const http = require("http");
const port = 8081;

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h2>Hey server started</h2>");
    const toDoList = ["learn", "apply things", "succeed"];

    http
      .createServer((req, res) => {
        const { method, url } = req;
        //console.log(method, url);
        if (url === "/todos") {
          if (method === "GET") {
            res.writeHead(200);
            res.write(toDoList.toString());
          }
        }
        // res.writeHead(200, { "Content-Type": "text/html" });
        // res.write("<h2>Hey server started</h2>");
        res.end();
      })
      .listen(port, () => {
        console.log(`NodeJs Server Started Running On Port ${port}`);
      });
