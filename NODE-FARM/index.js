const fs = require("fs");
// fs.readFile("./txt/input.txt","utf8",(err,data)=>{
//     if(err)
//     {
//         console.log(err.message);
//     }
//     else
//     {
//         console.log(data);
//     }
// });

//  Blocking synchronous way

// const textIn = fs.readFileSync("./txt/input.txt","utf8");
// console.log(textIn)

// const textOut = `This what we know about thr avocado: ${textIn}\nCreated on ${Date.now()}`
// fs.writeFileSync("./txt/output.txt",textOut);
// console.log("File written!");

//  Non-blocking asynchronous way
fs.readFile("./txt/start.txt","utf-8",(err, data1)=>{
    if(err) return console.log("Erorr!!!!!!!!!")

    fs.readFile(`./txt/${data1}.txt`,"utf-8",(err,data2)=>{

        fs.readFile(`./txt/append.txt`,"utf-8",(err,data3)=>{
            console.log(data3)
            fs.writeFile("./txt/final.txt",`${data2}\n${data3}`,"utf-8", err =>{
                console.log("File final written")
            })
        });
        
        console.log(data2)
    });
    // console.log(data)

    console.log(data1)
});

console.log("Will read file!");





