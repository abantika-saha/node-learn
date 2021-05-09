const fs=require('fs');

// //read large docs
// const readStream=fs.createReadStream('./docs/blog3.txt');

// //chunk takes a chunk of data
// //.on is event listener
// //in a stream large package of data comes to us
// //so that we can start using them right away
// readStream.on('data',(chunk)=>{
//     console.log('----NEW CHUNK---');
//     console.log(chunk.toString()); //toString to convert buffer
//                                    //to a readable format
// })


// to print it in a readable format 
//without using toString
//use encoding in readstream
const readStream=fs.createReadStream('./docs/blog3.txt',{encoding:'utf8'});

//writestream
const writeStream=fs.createWriteStream('./docs/blog4.txt',{encoding:'utf8'});

//chunk takes a chunk of data
//.on is event listener
//in a stream large package of data comes to us
//so that we can start using them right away
readStream.on('data',(chunk)=>{
    console.log('----NEW CHUNK---');
    console.log(chunk);
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk);
});

//pass data directly from readable stream to a writable one
//piping
readStream.pipe(writeStream);