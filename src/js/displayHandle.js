import { formSubmitPost, formSubmitPut } from "./formSubmitHandle.js"
import { balance } from "./balanceHandle.js"
import { deleteTransaction, getTransaction } from "./dbHandle.js"

function renderTransaction(transactionData) {
  const tDiv = document.createElement('div')
  tDiv.id = `transaction${transactionData.id}`
  tDiv.classList.add('Tdiv')

  const tName = document.createElement('h3')
  tName.classList.add('Tname')
  tName.textContent = transactionData.name

  const tValue = document.createElement('span')
  tValue.classList.add('Tvalue')
  tValue.dataset.value = transactionData.value
  tValue.textContent = `R$ ${transactionData.value.toFixed(2)}`

  if (transactionData.value > 0) {
    tDiv.classList.add('in')
    tValue.classList.add('in')
  } else {
    tDiv.classList.add('out')
    tValue.classList.add('out')
  }

  const tDivLine = document.createElement('div')
  tDivLine.classList.add('TdivLine')

  const tDivButtons = document.createElement('div')
  tDivLine.classList.add('Tbuttons')

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'Excluir'
  deleteBtn.classList.add('TbuttonDel')
  deleteBtn.addEventListener('click', async (ev) => {
    const parentId = ev.currentTarget.parentNode.parentNode.parentNode.id
    await deleteTransaction(parentId.match(/[0-9]/g))
    removeTransaction(parentId)
    balance()
  })

  const updateBtn = document.createElement('button')
  updateBtn.textContent = 'Editar'
  updateBtn.classList.add('TbuttonUpd')
  updateBtn.addEventListener('click', async (ev) => {
    const parentId = ev.currentTarget.parentNode.parentNode.parentNode.id
    const id = parentId.match(/[0-9]/g)
    const transaction = await getTransaction(id)

    const nameInput = document.querySelector('#name')
    nameInput.value = transaction.name

    const valueInput = document.querySelector('#value')
    valueInput.value = transaction.value

    const idInput = document.querySelector('#id')
    idInput.value = transaction.id

    const submitBtn = document.querySelector('#submit')
    submitBtn.textContent = 'Editar'
    submitBtn.classList.toggle('edit')

    const form = document.querySelector('#form')
    form.removeEventListener('submit', formSubmitPost)
    form.addEventListener('submit', formSubmitPut)
  })

  tDivButtons.append(deleteBtn, updateBtn)
  tDivLine.append(tValue, tDivButtons)
  tDiv.append(tName, tDivLine)
  tDiv.dataset.aos = 'zoom-in'
  tDiv.dataset.aosAnchorPlacement = 'bottom-bottom'
  document.querySelector('#transactions').append(tDiv)
}

function updateTransaction(id, transactionData) {
  const tDiv = document.querySelector(`#${id}`)
  tDiv.removeAttribute('class')
  tDiv.classList.add('Tdiv')

  const tName = tDiv.querySelector('h3')
  tName.textContent = transactionData.name

  const tValue = tDiv.querySelector('div > span')
  tValue.removeAttribute('class')
  tValue.classList.add('Tvalue')
  tValue.dataset.value = transactionData.value
  tValue.textContent = `R$ ${transactionData.value.toFixed(2)}`

  if (transactionData.value > 0) {
    tDiv.classList.add('in')
    tValue.classList.add('in')
  } else {
    tDiv.classList.add('out')
    tValue.classList.add('out')
  }
}

function removeTransaction(id) {
  const tDiv = document.querySelector(`#${id}`)
  tDiv.parentNode.removeChild(tDiv)
}

export { renderTransaction, updateTransaction, removeTransaction }