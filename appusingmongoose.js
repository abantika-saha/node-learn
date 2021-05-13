const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


//express app
const app=express();

//connect to MongoDB
const dbURI = "mongodb+srv://abantika-saha:27A64b528@@cluster0.82snl.mongodb.net/Cluster0";

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=>app.listen(3000))
 .catch((err)=>console.log(err));

//register view engine
app.set('view engine', 'ejs');

//if u want to chnage th location where 
//express views ejs files use:
/******app.set('views','folder name u give')******/

//listen for requests
// app.listen(3000); 

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
      title: 'blog one',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })
    blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

//to find all the blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

//to find a single blog
//use it's id
app.get('/single-blog', (req, res) => {
    Blog.findById('609b74e38440600640ac969f')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

// app.use((req, res, next) => {
//   console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('in the next middleware');
//   next();
// });


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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


//express app
const app=express();

//connect to MongoDB
const dbURI = "mongodb+srv://abantika-saha:27A64b528@@cluster0.82snl.mongodb.net/Cluster0";

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=>app.listen(3000))
 .catch((err)=>console.log(err));

//register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{title: 'About'});
});

//redirecting
app.get('/about-redirect',(req,res)=>{
    res.redirect('/about');
})

//blog routes
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1}) //sorts newest first
    .then((result)=>{
        res.render('index',{title: 'All Blogs', blogs: result})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title: 'Create a new blog'});
})

app.use((req,res)=>{
    res.status(404).render('404',{title: '404'});
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


//express app
const app=express();

//connect to MongoDB
const dbURI = "mongodb+srv://abantika-saha:27A64b528@@cluster0.82snl.mongodb.net/Cluster0";

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=>app.listen(3000))
 .catch((err)=>console.log(err));

//register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); 
app.use(morgan('dev'));


app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{title: 'About'});
});

//create
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title: 'Create a new blog'});
})

// //redirecting
// app.get('/about-redirect',(req,res)=>{
//     res.redirect('/about');
// })

//blog routes
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1}) //sorts newest first
    .then((result)=>{
        res.render('index',{title: 'All Blogs', blogs: result})
    })
    .catch((err)=>{
        console.log(err);
    })
});

//handling post request
app.post('/blogs', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body); //req.body contains all the info in req format
    blog.save()
      .then(result => { //asynchronus, thats why
        res.redirect('/blogs'); //because we want the new blog to be added in all blogs page
      })
      .catch(err => {
        console.log(err);
      });
  });

//to extract id from url
//then search the blog using id
//to show the details of the blog when i click on it
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
       res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
       console.log(err);
    });
});

//for deleting a blog
//for delete script we used ajax
//when we use ajax, e cannot use redirect
//we will have to use json
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.use((req,res)=>{
    res.status(404).render('404',{title: '404'});
})

