async function getTransactions() {
  const transactions = await fetch('http://localhost:3000/transactions').then(res => res.json())
  return transactions
}

async function getTransaction(id) {
  const transactions = await fetch(`http://localhost:3000/transactions/${id}`).then(res => res.json())
  return transactions
}

async function postTransaction() {
  const transactionData = {
    name: document.querySelector('#name').value,
    value: parseFloat(document.querySelector('#value').value)
  }

  const response = await fetch('http://localhost:3000/transactions', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(transactionData)
  }).then(res => res.json())

  return response
}

async function putTransaction(id) {
  const transactionData = {
    name: document.querySelector('#name').value,
    value: parseFloat(document.querySelector('#value').value)
  }

  const response = await fetch(`http://localhost:3000/transactions/${id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(transactionData)
  }).then(res => res.json())

  return response
}

async function deleteTransaction(id) {
  await fetch(`http://localhost:3000/transactions/${id}`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' }
  })
}

export { getTransactions, getTransaction, postTransaction, putTransaction, deleteTransaction }