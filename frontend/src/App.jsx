import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bot from './components/bot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Bot/>
 </>
  )
}

export default App
