const { get } = require("request")
accountJson = require("../database/account.json")


/* *****************************
*   Sign up new account
******************************** */
async function signUpAccount(username, email, password) {
  const newAccount = {
    id: accountJson.length + 1,
    account_username: username,
    account_email: email,
    account_password: password,
  }
  accountJson.push(newAccount)
  await fs.promises.writeFile(accountFilePath, JSON.stringify(accountJson, null, 2))
  return newAccount
}

async function updatePassword(account_id, account_password) {
  try {
    accountJson.forEach((account) => {
      if (account.id === account_id) {
        account.account_password = account_password
      }
    })
  await fs.promises.writeFile(accountFilePath, JSON.stringify(accountJson, null, 2))
  } catch (error) {
    return error.message
  }
}

async function getAccountByEmail (account_email) {
  try {
    const account = accountJson.find(acc => acc.account_email === account_email)
    if (account) {
      return account
    } else {
      throw new Error("No matching email found")
    }
  } catch (error) {
    return error.message
  }
}



exports = {
  signUpAccount,
  getAccountByEmail,
  updatePassword,
}