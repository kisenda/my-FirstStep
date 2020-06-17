const path = require ('path');
const express = require ('express');
const hbs = require('hbs');
const forecast = require('./Utils/forecast');
const geocode = require('./Utils/geocode');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public' ));


//define paths for express config
const app = express()
const PublicDirPath = path.join(__dirname, '../public');
const viewPath = path.join (__dirname, '../templates/views');    // >>setting lokasi folder hbs ganti nama
const PartialPath = path.join (__dirname,'../templates/partials');

//setup handlebars for view engine and views location
app.set('view engine','hbs');
app.set('views', viewPath);                                // set-action
hbs.registerPartials(PartialPath);                         //Alhamdulillah, ternyata harus disesuaikan dg perintah API nya (doc).               

//setup static directory to server
app.use(express.static(PublicDirPath));     //app.use is function. menggunakan refference above.

app.get('', (req, res) =>{
    res.render('index', {                       //node provide
        title : "Weather!",
        name : 'MyFirst App experience',
        Names : 'kisenda, wiwit' 
    })
})

app.get('/profile', (req, res) =>{
    res.render('profile',{
        name : 'Yayasan berdiri 2019',
        steps : 'Akan tetap melangkah. akan tetap melangkah',
        Names : 'Allah wa Rasulullah'
    })

})

app.get('/about', (req,res)=> {     //type in browser
    res.render('about', {           //file hbs
        title: 'myFirstExp',
        name: 'kisenda',
        Names: 'Handri, Papa'
    })             
})

app.get('/help', (req,res) => {
    res.render('help', {                    
        title: 'MyExp',
        name : 'i will never give up. One until i mastered it',
        Names: 'Kalandra annafio'
    })
})

// app.get('/help/*', (req, res) => {
//     res.render('404', {                               //bukan 'send' but 'render'. Utk akses page yg melewati template engine 'semisal handlebar, Jade' gunakan 'render'. -googling-
//         errorMessage:'Srry, we can not help for this subject.'})
// })

// app.get('*', (req, res) =>{
//     res.render('404', {
//         errorMessage: 'Srry. 404 pages. Not found'})
// })

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>');

// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name : 'kisenda',
//         usiaku : 32
//     }, {
//         name : 'wiwit e. a.',
//         usinya : 28
//     }]);

// })

// app.get('/about', (req, res) => {
//     res.send('<title>How about me.</title>');

// })
    
app.get('/weather', (req, res) => {
    if (!req.query.address) {                           //yg diminta key pencariannya adalah address (by seetting geocode)
        return res.send({
            error : 'please provide the location you need.'
        })
    }

    /*Alur algoritma programnya :
    1. cek lokasi yg diminta dlu
    2. cari datanya cuacanya.
    */

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {        //(address,callback)
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, response) =>{                      //(latitude,longitude,callback)  --> error,forecastData inside callback.
            if(error) {
                return res.send({ error });
            }

            res.send({                                                          //res.send itu formatnya Express.JS
                forecast : response,                              // forecast adalah response forecast.js-ketiganya    response: wadah/tempat yang menerima value.   
                location,                                         // geocode location
                address : req.query.address                       // geocode address
            })
        })                      
    })

    // console.log(res.query.address)
    // res.send({
    //     forecast :'it is little bit raining',               //ini contoh saja.
    //     location :'kediri',
    //     address : req.query.address    
    // })
})

app.get('/coba', (req,res) =>{
    if (!req.query.search) {
        return res.send({
            error : 'You must provide that search please'})         //object perlu diproses 2x diserver.
    }
  
    console.log(req.query.search)                  //untuk melihat proses yg terjadi. bukan perintah function.
    res.send({product : []})
})

app.listen(3000, () => {
    console.log('the server is up on port 3000');           //to turn off => CTRL + c

})