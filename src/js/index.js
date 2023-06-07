import { balance } from "./balanceHandle.js"
import { renderTransaction } from "./displayHandle.js"
import { formSubmitPost } from "./formSubmitHandle.js"
import { getTransactions } from "./dbHandle.js"

document.addEventListener('DOMContentLoaded', async () => {
  const transactions = await getTransactions()
  transactions.forEach(renderTransaction)
  balance()
})

const form = document.querySelector('#form')
form.addEventListener('submit', formSubmitPost)