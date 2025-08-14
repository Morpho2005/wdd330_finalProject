accountJson = "./database/account.json"
const fs = require("fs")


/* *****************************
*   Sign up new account
******************************** */
async function signUpAccount(username, email, password) {
    const favorites = []
    const accountlist = JSON.parse(await fs.promises.readFile(accountJson, 'utf-8'))
  const newAccount = {
    id: accountlist.length + 1,
    account_username: username,
    account_email: email,
    account_password: password,
    favorites: favorites
  }
  console.log("New account created:", accountlist)
  accountlist.push(newAccount)
  // Write the updated accountJson back to the file
    await fs.promises.writeFile(accountJson, JSON.stringify(accountlist, null, 2))
  return newAccount
}

async function updatePassword(account_id, account_password) {
  try {
    const accountlist = JSON.parse(await fs.promises.readFile(accountJson, 'utf-8'))
    accountlist.forEach((account) => {
      if (account.id === account_id) {
        account.password = account_password
      }
    })
  await fs.promises.writeFile(accountJson, JSON.stringify(accountlist, null, 2))
  } catch (error) {
    return error.message
  }
}

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const accountlist = JSON.parse(await fs.promises.readFile(accountJson, 'utf-8'))
    const account = accountlist.find(acc => acc.account_email === account_email)
    if (account) {
      return account
    } else {
      throw new Error("No matching email found")
    }
  } catch (error) {
    return error.message
  }
}

async function getAccountById(account_id) {
  try {
    const accountlist = JSON.parse(await fs.promises.readFile(accountJson, 'utf-8'))
    const account = accountlist.find(acc => acc.id === account_id)
    if (account) {
      return account
    } else {
      throw new Error("No matching ID found")
    }
  } catch (error) {
    return error.message
  }
}

async function checkExistingEmail(account_email) {
  try {
    const accountlist = JSON.parse(await fs.promises.readFile(accountJson, 'utf-8'))
    let account
    for (let i = 0; i < accountlist.length; i++) {
      if (accountlist[i].account_email === account_email) {
        account = true
      }
    }
    return account // returns true if account exists, false otherwise
  } catch (error) {
    return error.message
  }
}



module.exports = {
  signUpAccount,
  getAccountByEmail,
  updatePassword,
  checkExistingEmail,
  getAccountById
}