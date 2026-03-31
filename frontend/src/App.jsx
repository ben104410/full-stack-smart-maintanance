import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Smart Maintenance</h1>
        <p className="mb-6 text-slate-300">
          This is the new frontend structure for your app.
        </p>
        <button
          className="rounded-full bg-sky-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-sky-400"
          onClick={() => setCount((value) => value + 1)}
        >
          Count is {count}
        </button>
      </div>
    </main>
  )
}

export default App
