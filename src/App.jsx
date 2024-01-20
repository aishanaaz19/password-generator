import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback (() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "!@#$%^&*_";
    }
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(char);
    }

    setPassword(pass)
    
  }, [length, number, character, setPassword])

  const copyPasswordToClipboard = useCallback (() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

    // useEffect(() => {
    //   passwordGenerator()
    // }, [length, number, character, passwordGenerator])

  return (
    <>
      <h1 
      className='text-2xl text-center text-slate-700 bg-white w-full max-w-md mx-auto my-8 py-2 rounded-lg shadow-sm border-2'
      >Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-8 py-8 bg-slate-700'>
        <div className='flex overflow-hidden mb-6 '>
          <input 
            type='text' 
            value={password}
            className='outline-none w-full py-1 px-3 rounded-md mr-4'
            placeholder='Password'
            ref={passwordRef}
            readOnly
          />
          <button 
            className='outline-none bg-blue-700 hover:bg-blue-800 text-white px-3 py-0.5 shrink-0 rounded-md'
            onClick={copyPasswordToClipboard}
          >Copy 📋</button>
        </div>
        <div className='flex text-sm gap-x-2 text-white'>
          <div className='flex items-center gap-x-1'>
            <input 
            type='range'
            value={length}
            className='curser-pointer'
            min={8}
            max={50}
            onChange={(e) => {setLength(e.target.value)}}
            ></input>
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={number}
              id="numberInput"
              onChange={() => {setNumber((prev) => (!prev));}}
            ></input>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={character}
              id="characterInput"
              onChange={() => {setCharacter((prev) => (!prev));}}
            ></input>
            <label htmlFor='characterInput'>Character</label>
          </div>
        </div>
        <div className='flex items-center gap-x-1'>
            <button 
              className='outline-none text-sm mx-auto mt-6 bg-slate-600 hover:bg-slate-700 text-white px-3 py-0.5 shrink-0 rounded-md'
              onClick={passwordGenerator}
            >Generate Password</button>
        </div>
      </div>
    </>
  )
}

export default App
