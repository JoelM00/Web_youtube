const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog');
const { render } = require('ejs');

// Express app
const app = express()

// Connect to mongoDB
const dbURI = 'mongodb+srv://joel:joel@nodeteste.ralbf.mongodb.net/NodeTeste?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("Connected to DB")

        // listen for requests 
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })

// Register view engine
app.set('view engine','ejs')
app.set('views','paginas')


// Middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


/*
// Mongoose and mongo sandbox routes
app.get('/add-blog',(req,res) => {
    const blog = new Blog({
        title: "New Blog 2",
        snippet: "About my new  blog",
        body: "More about my blog"
    })
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all-blogs',(req,res) => {
    Blog.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/single-blog',(req,res) => {
    Blog.findById('621e239510bc2c0d85af491b')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})
*/

//app.use((req,res,next) => {
//    console.log('New request made:')
//    console.log('host:',req.hostname)
//    console.log('path',req.path)
//    console.log('method:',req.method)
//    next()
//})


app.get('/',(req,res) => {
    //res.send('<p>home page</p>');
    //res.sendFile('./paginas/index.html',{root: __dirname})

    /*
    const blogs = [
        {title: 'Joel MArttins', snippet: 'lorelorelorelorelorelore'},
        {title: 'AsTA Brazcu', snippet: 'lorelorelorelorelorelore'},
        {title: 'REVnir Azxtur', snippet: 'lorelorelorelorelorelore'}
    ]

    res.render('index',{title: "HOME", blogs: blogs})
    */

    res.redirect('/blogs')
})

//app.use((req,res,next) => {
//    console.log('in the next middleware')
//    next()
//})


app.get('/about',(req,res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./paginas/about.html',{root: __dirname})
    res.render('about',{title: "ABOUT"})
})

// blog routes
app.get('/blogs',(req,res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/blogs',(req,res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/:aquiId',(req,res) => {
    const id = req.params.aquiId
    Blog.findById(id)
        .then((result) => {
            res.render('details',{blog: result, title: 'Blog Details'})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.delete('/blogs/:aquiId',(req,res) => {
    const id = req.params.aquiId
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => console.log(err))
})


app.get('/blogs/create',(req,res) => {
    res.render('create',{title: "CREATE a new Blog"})
})


////Redirects
//app.get('/about-us',(req,res) => {
//    res.redirect('/about')
//})

// 404 page
app.use((req,res) => {
    //res.status(404).sendFile('./paginas/404.html',{root: __dirname})
    res.status(404).render('404',{title: "NAO EXISTE"})
})