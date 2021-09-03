const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//starts server (not really)
const app = express()

// define paths for Express config
const publicDIR = path.join(__dirname, '..', 'public')
const templatesPath = path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

// Setup handlebars engine and views(templates) location
app.set('view engine', 'hbs') // za dinamicne strani
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDIR))


app.get('' , (req, res) => {
    res.render('index', {
        title: 'Weather',
    }) //dynamic page
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jaka Milavec'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
    })
})


// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error){
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
            
        })
    })      
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',  (req, res) => {
    res.render('404', {
        title: '404',
        errorText: 'Help article not found!'
    })
})

// 404 handler
app.get('*', (req, res) => { // * -> ujemanje usega
    res.render('404', {
        title: '404',
        errorText: 'My 404 page'
    })
})

// starts server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
}) //dev port 3000