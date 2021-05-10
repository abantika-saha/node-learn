const express = require('express');

//express app
const app=express();

//listen for requests
app.listen(3000); //can store in a const but not required

//first -> what url to listen to
// app.get('/',(req,res)=>{
//     res.send('<b>Home Page</b>');//adv of send is it 
//                                 //automatically detects 
//                                 //the content type and 
//                                 //sets statuscode too
// });

// app.get('/about',(req,res)=>{
//     res.send('<b>About Page</b>');
// });

//__dirname to find the root or 
//parent directory of the file path mentioned
app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname});
});
app.get('/about',(req,res)=>{
    res.sendFile('./views/about.html',{root:__dirname});
});

//redirecting
app.get('/about-redirect',(req,res)=>{
    res.redirect('/about');
})

//404 page
//should always be at the bottom
//express doesn't realise that this is an error
//so we have to set status manually 
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname});
})

