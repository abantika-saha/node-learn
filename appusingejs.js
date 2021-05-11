const express = require('express');
const morgan = require('morgan');

//express app
const app=express();

//register view engine
app.set('view engine', 'ejs');

//if u want to chnage th location where 
//express views ejs files use:
/******app.set('views','folder name u give')******/

//listen for requests
app.listen(3000); 

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});


app.get('/',(req,res)=>{
    const blogs=[
        {title:'Talking points memo',snippet:'At some point during the disputed US election of 2000 - when Al Gore was famously defeated by a few hanging chads - Joshua Micah Marshall lost patience. Despite working as a magazine editor, Marshall chose to vent on the web. Eight years later Talking Points Memo and its three siblings draw in more than 400,000 viewers a day from their base in New York.'},
        {title:'The Drudge Report',snippet:'The Report started life as an email gossip sheet, and then became a trashy webzine with negligible traffic. But thanks to the decision in 1998 to run a scurrilous rumour – untouched by mainstream media – about Bill Clinton and a White House intern named Monica Lewinsky, it became a national phenomenon. Recent scoops include Barack Obama dressed in tribal garb and the fact Prince Harry was serving in Afghanistan. Drudge is scorned by journalists and serious bloggers for his tabloid sensibilities, but his place in the media history books is guaranteed. And much though they hate him, the hacks all still check his front page – just in case he gets another president-nobbling scoop.'},
        {title:'Beppe Grillo',snippet:'Among the most visited blogs in the world is that of Beppe Grillo, a popular Italian comedian and political commentator, long persona non grata on state TV, who is infuriated daily - especially by corruption and financial scandal in his country.'},
    ];
    res.render('index',{title: 'Home',blogs}); //look inside the views folder and find index auto
});
app.get('/about',(req,res)=>{
    res.render('about',{title: 'About'});
});

//redirecting
app.get('/about-redirect',(req,res)=>{
    res.redirect('/about');
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title: 'Create a new blog'});
})

app.use((req,res)=>{
    res.status(404).render('404',{title: '404'});
})
