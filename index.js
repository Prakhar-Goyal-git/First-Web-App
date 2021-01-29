const express = require('express')
const request = require('request')
// Syntax of express
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use('/public', express.static('public'))

app.listen(process.env.PORT, () => {
    console.log(`Server has started at port ${process.env.PORT}`)
})

app.set("view engine", "ejs")


app.get("/", (req, res) => {
    //res.send("Hello")
    res.render("homepage.ejs")

})

app.get("/result", (req, res) => {
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.moviename}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data)
            //res.send(data)
            if (data.Response === 'False') {
                res.send("Movie Not Found")
            }

            res.render("result", { movieData: data })

        } else {
            res.send("Something went wrong")
        }
    })
})

app.get("/result/:id", (req, res) => {
    const url = `http://www.omdbapi.com/?apikey=4004c09d&i=${req.params.id}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data)
            //res.send(data)
            if (data.Response === 'False') {
                res.send("Movie Not Found")
            }
            res.render("Knowmore", { movieData: data })

        } else {
            res.send("Something went wrong")
        }
    })
})

app.get("/Aboutme", (req, res) => {
    res.render("Aboutme")
})

// app.get("/class/:name",(req,res,error)=>{
//     console.log(req.params)
//     if(!error){
//         res.send(`You are in ${req.params.name} classroom`)
//     }else{
//         res.redirect("/error")
//     }

// })

// app.get("/class",(req,res)=>{
//     res.send("You are in corridore")
// })

// app.get("/result",(req,res)=>{
//     console.log(req.query)
//     res.send("Data received")
// })
app.get("*", (req, res) => {
    res.send("Go Back Meowww, Illegal reponse Meowww")
})


