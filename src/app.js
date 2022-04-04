const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()

//DEFINE PATHS FOR EXPRESS CONFIG
const publicdirectorypath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)


//Setup static directory to serve
app.use(express.static(publicdirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Nilotpal Raj'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About ME',
        name: 'Nilotpal Raj'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext: 'This is some helpful text printing!',
        title: 'Help',
        name: 'Nilotpal Raj'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    /* res.send([{
        forecast:'The weather here is very good',
        location:'This is Muzaffarpur',
        address:req.query.address
    }]) */
})




app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Nilotpal Raj',
        errormessage: 'Help page doesnot exist'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Nilotpal Raj',
        errormessage: 'Page Not Found'
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})