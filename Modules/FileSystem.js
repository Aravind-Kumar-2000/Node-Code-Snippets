//Path Module
const path = require("path");

//File System Module
const fs = require("fs")

//CallBack API
//fs.readFile(path[,options], callback)
fs.readFile(path.join(__dirname, "Files","text01.txt"), "utf8", (err,data)=>{
    if (err) throw err;
    console.log(data);
})

//fs.appendFile(path, data[,options], callback)
fs.appendFile(path.join(__dirname, "Files","text02.txt"), "Hello", "utf8", (err)=>{
    if (err) throw err;
    console.log("New file created with contents!");
})

//fs.writeFile(path, data[,options], callback)
fs.writeFile(path.join(__dirname, "Files", "text03.txt"),"Hello", "utf8",(err)=>{
    if (err) throw err;
    console.log("New file created with contents!");
})

//fs.open(path, flag[,mode], callback)
fs.open(path.join(__dirname, "Files","text04.txt"), "W", (err)=>{
    if (err) throw err;
    console.log("New empty file created!");
})

//fs.unlink(path, callback)
fs.unlink(path.join(__dirname, "Files", "text02.txt"), (err)=>{
    if (err) throw err;
    console.log("File deleted");
})

//fs.rename(oldPath, newPath, callback)
fs.rename(path.join(__dirname,"Files", "text04.txt"), path.join(__dirname, "Files", "empty.txt"), (err)=>{
    if (err) throw err;
    console.log("File renamed");
})

//fs.createReadStream(path[,options])
const rs = fs.createReadStream(path.join(__dirname, "Files", "text01.txt"), "utf8");

//fs.createWriteStream(path[,options])
const ws = fs.createWriteStream(path.join(__dirname, "Files", "new.txt"), "utf8")


          //Snippet to proceed the above two syntax
               rs.on("data", (dataChunk)=>{
                  ws.write(dataChunk);
               })
                      // or
               rs.pipe(ws);


//fs.mkdir(path[,options],callback)
fs.mkdir(path.join(__dirname, "NewFiles"),(err)=>{
    if (err) throw err;
    console.log("New Directory created");
})

//fs.rmdir(path[,options], callback)
fs.rmdir(path.join(__dirname,"NewFiles"),(err)=>{
    if (err) throw err;
    console.log("Directory removed");
})


//Synchronous API
//fs.existsSynce(path)
if(!fs.existsSync(path.join(__dirname, "NewFiles"))){
    fs.mkdir(path.join(__dirname, "NewFiles"), (err)=>{
        if (err) throw err;
        console.log("Directory created");
    })
}else{
    fs.rmdir(path.join(__dirname, "NewFiles"), (err)=>{
        if (err) throw err;
        console.log("Directory removed");
    })
}


//Promises API
const fsPromises = require("fs").promises;

async function api(){
    try{
        //fsPromises.readFile(path[,options])
        const data = await fsPromises.readFile(path.join(__dirname, "Files", "text01.txt"), "utf8");
        console.log(data);

        //fsPromises.appendFile(path, data[,options])
        await fsPromises.appendFile(path.join(__dirname, "Files", "text05.txt"), "Hello", "utf8");

        //fsPromises.writeFile(path, data[,options])
        await fsPromises.writeFile(path.join(__dirname, "Files", "text06.txt"), "Hello", "utf8");

        //fsPromises.unlink(path)
        await fsPromises.unlink(path.join(__dirname, "Files", "text04.txt"));

        //fsPromises.rename(oldPath, newPath)
        await fsPromises.rename(path.join(__dirname, "Files", "text05.txt"), path.join(__dirname, "Files", "change.txt"));
    } catch(err){
        console.error(err);
    }
}

api();


//Snippet to execute if error is occured
process.on("uncaughtException", (err)=>{
    console.error(err);
    process.exit(1);
})