const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =  require('./utils/geocode')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlesbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name:'Narcisse Obadiah'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Page',
        name:'John Gusmane'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helptext:"C'est cool de savoir programmer",
        title:'Help Page',
        name:'Amadou Vinarus'
    })
})

app.get('/weather', (req, res) => {
   if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
   }
   geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        res.send({
            forecast:location,
            geocode:req.query.address,
            latitude:latitude,
            longitude:longitude
        })
   })

   
//    res.send({
//         forecast: "It's snowing",
//         location: "Philadelphia",
//         address: req.query.address
//    })
})
app.get('/products', (req, res) => {
   if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
   }
   console.log(req.query.search)
   res.send({
        products: []
   })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Narcisse Obadiah',
        errorMessage:' Help Article not found.'
    })
})

app.get('*', (req,res) =>{
    res.render('404', {
        title:'404',
        errorMessage:'Page not found',
        name:'Mike'
    })
})

app.listen(3000, () => {
    console.log(' Server is up on 3000')
})
 