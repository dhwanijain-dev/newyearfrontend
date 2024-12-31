import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [downloadUrl, setDownloadUrl] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)

    try {
      const response = await fetch('http://localhost:5000/generate-ticket', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        setDownloadUrl(url)
      } else {
        console.error('Failed to generate ticket')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>

    <div >
      <h1>Welcome to Ticket Generator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Generate Ticket</button>
      </form>
      {downloadUrl && (
        <a href={downloadUrl} download="ticket.png">
          Download Your Ticket
        </a>
      )}
    </div>
      <Canvas
        style={{ position: "absolute", top: 0, left: 0,zIndex: -1 }}
        gl={{ alpha: true }} // Allow transparency
       >
       
       </Canvas>
    </div>
  

  )
}

export default App