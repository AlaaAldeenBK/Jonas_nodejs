const fs = require('fs');
const { Server } = require('http');
const server = require('http').createServer();
server.on('request',(req, res) =>{
    // Sloution 1
    // fs.readFile('test-file.txt', (err, data) =>{
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     else
    //     res.end(data);
    // });

    // Solution 2: Stream

    // const readable = fs.createReadStream('testt-file.txt');
    // readable.on('data',chunk =>{
    //     res.write(chunk);
    // });
    // readable.on('end',() =>{
    //     res.end();
    // });
    // readable.on("error", err =>{
    //     res.statusCode = 500;
    //     res.end('File not readable');
    // })


    // Solution 3

    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);


});

server.listen(8000, '127.0.0.1',() =>{
    console.log('listening on port 8000');
})
