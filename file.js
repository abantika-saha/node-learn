const fs=require('fs'); //file system(module is called that)

fs.readFile('./docs/blog1.txt',(err,data)=> {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
}); //reading files //it's an asynchronus function which prints some time later.


//this prints before what is 
//present in blog1 because 
//to read from blog1 is 
//asynchronus and hence takes 
//some time to read
console.log('last line'); 



//writing file 
//this is asynchronus too
fs.writeFile('./docs/blog1.txt','hello, what up?',()=>{
    console.log('file modified');
}); //rewriting a file

fs.writeFile('./docs/blog2.txt','hello, what up?',()=>{
    console.log('file was written');
}); //makes a new file and writes in it

//make directory
if(!fs.existsSync('./assets')){ //to check whether file 
                               //already exists.
    fs.mkdir('./assets',(err)=>{
        if(err){
            console.log(err);
        }
        console.log('folder created');
    });
}
 // we run it once, a new folder created named assets
    //we run it twice, we get an error saying file exists
    else{
        fs.rmdir('./assets',(err)=>{ //remove dir
            if(err){
                console.log(err);
            }
            console.log('folder removed');
        });
    }

//delete files
if(fs.existsSync('./docs/deleteme.txt')){ //to check whether file 
                                          //already exists.
   fs.unlink('./docs/deleteme.txt',(err)=>{
   if(err){
    console.log(err);
   }
   console.log('folder created');
   });
}

//ALL THE ABOVE USED FUNCS ARE ASYNCHRONUS


