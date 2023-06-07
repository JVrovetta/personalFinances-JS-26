import { renderTransaction, updateTransaction } from './displayHandle.js'
import { postTransaction, putTransaction } from './dbHandle.js'
import { balance } from './balanceHandle.js'

async function formSubmitPost(ev) {
  ev.preventDefault()
  const transaction = await postTransaction()
  renderTransaction(transaction)
  form.reset()
  balance()
}

async function formSubmitPut(ev) {
  ev.preventDefault()

  const form = document.querySelector('#form')
  const submitBtn = document.querySelector('#submit')
  const id = document.querySelector('#id').value

  const updatedTransaction = await putTransaction(id)
  updateTransaction(`transaction${id}`, updatedTransaction)
  balance()
  submitBtn.textContent = 'Enviar'
  submitBtn.classList.toggle('edit')
  form.reset()
  form.removeEventListener('submit', formSubmitPut)
  form.addEventListener('submit', formSubmitPost)
}

export { formSubmitPost, formSubmitPut }