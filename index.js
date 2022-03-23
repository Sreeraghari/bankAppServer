// import express
const express =require('express')
const { json } = require('express/lib/response')

const res = require('express/lib/response')

const dataservice = require('./services/data.service')

const jwt=require('jsonwebtoken')


// create an app using express
const app =express()

// to parse json
app.use(express.json())

// resolve http request from client

// get- to read data
app.get('/',(req,res)=>{
    res.send("ITS A GET METHOD")
})

// post- to create data
app.post('/',(req,res)=>{
    res.send("ITS A POST METHOD")
})

// put- to update/modify data
app.put('/',(req,res)=>{
    res.send("ITS A PUT METHOD")
})

// patch- to update partially data
app.patch('/',(req,res)=>{
    res.send("ITS A PATCH METHOD")
})
// Delete- to Delete data
app.delete('/',(req,res)=>{
    res.send("ITS A  DELETE METHOD")
})
// Application specific miidleware
const appmiddleware=(req,res,next)=>{
    console.log("application specific middleware")
    next()
}

app.use(appmiddleware)

// Bank App -API

//to verify token -middleware
const jwtMiddleware=(req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]

        // verify token

        const data=jwt.verify(token,'supersecretkey123')
        req.currentAcno=data.currentAcno
        next()
    }
    catch{
        res.status(422).json({
            statusbar:422,
            status:false,
            message:"please Log In"
        })
    }
} 

// register API
app.post('/register',(req,res)=>{
  const result=  dataservice.register(req.body.acno,req.body.password,req.body.uname)
  res.status(result.statuscode).json(result)
})

// Login API
app.post('/login',(req,res)=>{
    const result=  dataservice.login(req.body.acno,req.body.password)
    res.status(result.statuscode).json(result)
  })
  // deposit API
app.post('/deposit',jwtMiddleware,(req,res)=>{
    const result=  dataservice.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statuscode).json(result)
  })

    // withdraw API
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    const result=  dataservice.withdraw(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statuscode).json(result)
  })
      // transaction API
app.post('/transaction',jwtMiddleware,(req,res)=>{
    const result=  dataservice.getTransaction(req.body.acno)
    res.status(result.statuscode).json(result)
  })





// set up the port number
app.listen(3000,()=>{
    console.log("server started at port no:3000");
})