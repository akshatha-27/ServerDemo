const http = require("http");
const port = 8081;

const toDoList = ["learn", "apply things", "succeed"];

http
  .createServer((req, res) => {
    const { method, url } = req;
    //console.log(method, url);
    if (url === "/todos") {
      if (method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(toDoList.toString());
      } else if (method === "POST") {
        req
          .on("error", (err) => {
            console.log(err);
          })
          .on("data", (chunk) => {
            body += chunk;
            // console.log(chunk);
          })
          .on("end", () => {
            body = JSON.parse(body);
            let newToDo = toDoList;
            newToDo.push(body.item);
            console.log(newToDo);
            // console.log("data : ", body);
          });
      } else if (method === "DELETE") {
        let body = "";
        req
          .on("error", (err) => {
            console.error(err);
          })
          .on("data", (chunk) => {
            body += chunk;
            // console.log(chunk);
          })
          .on("end", () => {
            body = JSON.parse(body);
            let deleteItem = body.item;
            // for (let i = 0; i < toDoList.length; i++) {
            //   if (toDoList[i] === deleteItem) {
            //     toDoList.splice(i, 1);
            //     break;
            //   }
            // }

            toDoList.find((elem, index) => {
              if (elem === deleteItem) {
                toDoList.splice(index, 1);
              } else {
                console.error("Error : Match not found");
              }
            });
          });
      } else {
        res.writeHead(501);
      }
    } else {
      res.writeHead(404);
    }
    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.write("<h2>Hey server started</h2>");
    res.end();
  })
  .listen(port, () => {
    console.log(`NodeJs Server Started Running On Port ${port}`);
  });
