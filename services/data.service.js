database = {
  1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
  1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
  1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }
}

// register 

const register = (acno, password, uname) => {


  if (acno in database) {
    return {
      statuscode: 422,
      status: false,
      message: "user already exist.... please Login"

    }
  }
  else {
    database[acno] = {
      acno,
      uname,
      password,
      balance: 0,
      transaction: []

    }
    return {
      statuscode: 200,
      status: true,
      message: "Registered successfully"

    }
  }
}

// login

const login = (acno, password) => {
  if (acno in database) {

    if (password == database[acno]["password"]) {
      currentAcno = acno
      currentUname = database[acno]["uname"]

      return {
        statuscode: 200,
        status: true,
        message: "successfully Login",
        currentAcno,
        currentUname

      }

    }
    else {
      return {
        statuscode: 422,
        status: false,
        message: "incorrect password"

      }
    }


  }
  else {
    return {
      statuscode: 422,
      status: false,
      message: "user doesnot exist"

    }
  }

}

// /deposit
const deposit = (acno, password, amt) => {
  var amount = parseInt(amt)
  if (acno in database) {

    if (password == database[acno]["password"]) {

      database[acno]["balance"] += amount
      database[acno]["transaction"].push({
        amount: amount,
        type: "CREDIT"
      })
      return {
        statuscode: 200,
        status: true,
        message: amount + "successfully deposit.. And new balance is" + database[acno]["balance"]

      }

    }
    else {
      return {
        statuscode: 422,
        status: false,
        message: "user doesnot exist"

      }
    }


  }
  else {
    return {
      statuscode: 422,
      status: false,
      message: "user doesnot exist"

    }
  }
}




module.exports = {
  register, login, deposit
}

