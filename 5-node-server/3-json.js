const http = require("http");
const fs = require("fs");
const courses = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JS" },
  { name: "Node" },
  { name: "Frontend" },
];

const server = http.createServer((req, res) => {
  const url = req.url; //what data does client want?
  const method = req.method; // what do you want to do with the data?
  if (url === "/courses") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(courses));
    } else if (method === "POST") {
      const body = [];
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
        console.log(body);
      });

      req.on("end", () => {
        const bodystr = Buffer.concat(body).toString();
        const course = JSON.parse(bodystr);
        courses.push(course);
        res.writeHead(201);
        res.end();
      });
    }
  }
});

server.listen(8080);
