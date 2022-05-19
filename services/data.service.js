// import jsonwebtoken

const req = require('express/lib/request')
const jwt = require('jsonwebtoken')

// import user model
const db = require('./db')


// register 

const register = (acno, password, uname) => {

  // asynchronous
  return db.User.findOne({ acno })
    .then(user => {
      if (user) {
        return {
          statuscode: 422,
          status: false,
          message: "user already exist.... please Login"

        }
      }
      else {
        const newUser = new db.User({
          acno,
          uname,
          password,
          balance: 0,
          transaction: []

        })
        newUser.save()
        return {
          statuscode: 200,
          status: true,
          message: "Registered successfully"

        }
      }
    })
}


// login

const login = (acno, password) => {
  // asynchronous
  return db.User.findOne({ acno, password })
    .then(user => {
      if (user) {
        currentAcno = acno
        currentUname = user.uname

        //    token generation
        const token = jwt.sign({
          currentAcno: acno
        }, 'supersecretkey123')

        return {
          statuscode: 200,
          status: true,
          message: "successfully Login",
          currentAcno,
          currentUname,
          token

        }

      }
      else {
        return {
          statuscode: 422,
          status: false,
          message: "incorrect passwordt /Account Number"

        }
      }


    })
}

// /deposit
const deposit = (acno, password, amt) => {
  var amount = parseInt(amt)

  // asynchronous
  return db.User.findOne({ acno, password })
    .then(user => {

      if (user) {
        user.balance += amount
        user.transaction.push({
          amount: amount,
          type: "CREDIT"
        })
        user.save()
        return {
          statuscode: 200,
          status: true,
          message: amount + "successfully deposit.. And new balance is" + user.balance
        }
      }
      else {
        return {
          statuscode: 422,
          status: false,
          message: "user doesnot exist"

        }

      }
    })

}

// withdraw

const withdraw = (req,acno, password, amt) => {
  var amount = parseInt(amt)
  var currentAcno = req.currentAcno
  // asynchronous
  return db.User.findOne({ acno, password })
    .then(user => {


      if (user) {

        if (currentAcno != acno) {
          return {
            statuscode: 422,
            status: false,
            message: "Operation Denied"
  
          }
  
        }
  
        if (user.balance > amount) {
          user.balance -= amount

          user.transaction.push({
            amount: amount,
            type: "DEBIT"
          })
          user.save()
          return {
            statuscode: 200,
            status: true,
            message: amount + "successfully debited.. And new balance is" + user.balance

          }

        }
        else {
          return {
            statuscode: 422,
            status: false,
            message: "insufficient balance"

          }


        }

      }


      else {
        return {
          statuscode: 422,
          status: false,
          message: "incorrect passwordt /Account Number"

        }
      }
    })
}

// transaction

const getTransaction = (acno) => {

  // asynchronous

  return db.User.findOne({ acno})
    .then(user => {
      if(user){
        return {
          statuscode: 200,
          status: true,
          transaction: user.transaction
    
        }
    
      }
      else {
        return {
          statuscode: 422,
          status: false,
          message: "user doesnot exist"
    
        }
      }
    })    
  }

// delete Acc API
const deleteAcc=(acno)=>{
  // asynchronous
  return db.User.deleteOne({acno})
  .then(user=>{
    if(!user){
      return {
        statuscode: 422,
        status: false,
        message: "operation failed"
  
      }

    }
    return {
      statuscode: 200,
      status: true,
      message: "The requested Account Number"+acno+"deleted Successfully"

    }

  })
}





module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
}
