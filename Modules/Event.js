const events = require("events");
const {v4} = require("uuid");
const {format} = require("date-fns");
const fsPromises = require("fs").promises;
const path = require("path");
const fs = require("fs");

async function logEvents(msg){
    const dateTimeFormat = `${format(new Date(), "ddmmyyyy \t HH:mm:ss")}`;
    const data = `${dateTimeFormat} \t ${v4()} \t ${msg} \n}`;

    try{
        if(!fs.existsSync(path.join(__dirname, "NewFile"))){
           await fsPromises.mkdir(path.join(__dirname, "NewFile"))
        }
        await fsPromises.appendFileFile(path.join(__dirname, "NewFile"), data)
    } catch(err){
        console.error(err);
    }
}

const eventEmitter = new events.EventEmitter();

eventEmitter.on("data", (msg)=>{
    logEvents(msg);
})

eventEmitter.emit("data", "Hello everyone!")