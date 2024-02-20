const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res)=>{
    res.writeHead(200, "OK", {"Content-Type" : "type/html"});
    fs.readFile(path.join(__dirname, "Files", "text01.txt"), "utf8", (data, err)=>{
        if (err){
            res.writeHead(404);
            res.write("Page not found!")
        } else{
            res.write(data);
        }
        res.end();
    });
});

server.listen(5000, (err)=>{
    if (err){
        console.error(err);
    }else{
        console.log("App is successfully running on port 5000");
    }
});