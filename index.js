// import express
const express =require('express')
const { json } = require('express/lib/response')

const res = require('express/lib/response')

const dataservice = require('./services/data.service')


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
// Bank App -API

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
app.post('/deposit',(req,res)=>{
    const result=  dataservice.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statuscode).json(result)
  })

  



// set up the port number
app.listen(3000,()=>{
    console.log("server started at port no:3000");
})