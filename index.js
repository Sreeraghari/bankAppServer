// import express
const express = require('express')
const { json } = require('express/lib/response')

const res = require('express/lib/response')

const dataservice = require('./services/data.service')

const jwt = require('jsonwebtoken')

const cors=require('cors') 
const req = require('express/lib/request')
// cross origin resourse sharing 


// create an app using express
const app = express()

// use cors to specify origin
app.use(cors({
    origin: 'http://localhost:4200'
}))

// to parse json
app.use(express.json())

// resolve http request from client

// // get- to read data
// app.get('/', (req, res) => {
//     res.send("ITS A GET METHOD")
// })

// // post- to create data
// app.post('/', (req, res) => {
//     res.send("ITS A POST METHOD")
// })

// // put- to update/modify data
// app.put('/', (req, res) => {
//     res.send("ITS A PUT METHOD")
// })

// // patch- to update partially data
// app.patch('/', (req, res) => {
//     res.send("ITS A PATCH METHOD")
// })
// // Delete- to Delete data
// app.delete('/', (req, res) => {
//     res.send("ITS A  DELETE METHOD")
// })



// Application specific miidleware
const appmiddleware = (req, res, next) => {
    console.log("application specific middleware")
    next()
}

// app.use(appmiddleware)

// Bank App -API

//to verify token -middleware

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        // verify token

        const data = jwt.verify(token, 'supersecretkey123')
        req.currentAcno = data.currentAcno
        next()
    }
    catch {
        res.status(422).json({
            statusbar: 422,
            status: false,
            message: "please Log In"
        })
    }
}

// register API

// asynchronous
app.post('/register', (req, res) => {
    dataservice.register(req.body.acno, req.body.password, req.body.uname)
        .then(result => {
            res.status(result.statuscode).json(result);

        })

})

// Login API
app.post('/login', (req, res) => {
    dataservice.login(req.body.acno, req.body.password)
        .then(result => {
            res.status(result.statuscode).json(result);

        })
})
// deposit API
app.post('/deposit', jwtMiddleware, (req, res) => {
 dataservice.deposit(req.body.acno, req.body.password, req.body.amt)
    .then(result => {
        res.status(result.statuscode).json(result);

    })
})

// withdraw API
app.post('/withdraw', jwtMiddleware, (req, res) => {
    dataservice.withdraw(req,req.body.acno, req.body.password, req.body.amt)
    .then(result => {
        res.status(result.statuscode).json(result);

    })
})
// transaction API
app.post('/transaction', jwtMiddleware, (req, res) => {
     dataservice.getTransaction(req.body.acno)
    .then(result => {
        res.status(result.statuscode).json(result);

    })
})

// Delete Api
app.delete('/deleteAcc/:acno',jwtMiddleware,(req,res)=>{
    dataservice.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})



// set up the port number
app.listen(3000, () => {
    console.log("server started at port no:3000");
})