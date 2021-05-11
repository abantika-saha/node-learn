const express = require('express');

//express app
const app=express();

//register view engine
app.set('view engine', 'ejs');

//if u want to chnage th location where 
//express views ejs files use:
/******app.set('views','folder name u give')******/

//listen for requests
app.listen(3000); 

app.get('/',(req,res)=>{
    res.render('index'); //look inside the views folder and find index auto
});
app.get('/about',(req,res)=>{
    res.render('about');
});

//redirecting
app.get('/about-redirect',(req,res)=>{
    res.redirect('/about');
})

app.get('/blogs/create',(req,res)=>{
    res.render('create');
})

app.use((req,res)=>{
    res.status(404).render('404');
})
