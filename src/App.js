import React,{useEffect, useState} from 'react'

function App() {
  const [amount,setAmount] = useState(10)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')
  const [result,setResult] = useState("")
  useEffect(function(){
    async function currencyConvert(){
      const amt = amount || 1

      if(from === to){
        return setResult(amount)
      }

      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amt}&from=${from}&to=${to}`)
      const data = await response.json()
      const res = data.rates[to]
      setResult(res)
      
    }

    currencyConvert()
  },[from,to,amount])
  return (
    <div >
      <input type='text' value={amount} onChange={e => setAmount(e.target.value)}></input>
      <select value={from} onChange={(e) =>setFrom(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select value={to} onChange={(e) =>setTo(e.target.value)}>
        <option value='EUR'>EUR</option>
        <option value='USD'>USD</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <div>{result}</div>
    </div>
  );
}

export default App;
