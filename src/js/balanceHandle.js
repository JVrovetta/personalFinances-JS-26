function balance() {
  const values = document.querySelectorAll(".Tvalue")
  let balanceValue = 0
  values.forEach((val) => {
    balanceValue += parseFloat(val.dataset.value)
  })

  const balance = document.querySelector('#balance')
  balance.textContent = `R$${balanceValue.toFixed(2)}`
}

export { balance }