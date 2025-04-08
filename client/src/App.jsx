   import './App.css'
   import React from 'react'
   import { DarkMode } from './components/shared/DarkMode'


function App() {
 
  return (
    <>
<h1 className="bg-blue-500 text-white p-4 text-2xl font-bold rounded-lg">
  wasupp
</h1>

<DarkMode/>
 <button className="btn btn-neutral">Neutral</button>
<button className="btn btn-primary">Primary</button>
<button className="btn btn-accent">Accent</button>
<button className="btn btn-info">Info</button>
<button className="btn btn-success">Success</button>
<button className="btn btn-warning">Warning</button>
<button className="btn btn-error">Error</button>
    </>
  )
}

export default App
