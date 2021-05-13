const express = require('express');
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;
console.log(__dirname);
console.log(path.join(__dirname,'../public'));
const pubDir = path.join(__dirname,'../public');
const viewsDir = path.join(__dirname,'../template/views');
const partialsDir = path.join(__dirname,'../template/partials');
app.use(express.static(pubDir));
app.set('view engine','hbs');
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Priyabrat Bania'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Priyabrat Bania',
        image:'Barca'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        help:'thiws is to help you',
        name:'Priyabrat Bania'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {  
        return res.send({
            error: 'You must provide an address!'
        })
    } 

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        } 

        // forecast(latitude, longitude, (error, forecastData) => {
        //     if (error) {
        //         return res.send({ error })
        //     }

        //     res.send({
        //         forecast: forecastData,
        //         location,
        //         address: req.query.address
        //     })
        // })
        res.send({
            location,
            address:req.query.address
        })
    })
})
app.get('/products',(req,res)=>{
    //console.log(req.query)
    if(!req.query.search){
        return res.send({
             error:'you must provide search key'
        })
    }
    console.log(req.query.search);

    res.send({
        products:[]   
    })
})
app.get('*',(req,res)=>{
    res.send('404 error');
})

app.listen(port,()=>{
    console.log('it has started');
})
