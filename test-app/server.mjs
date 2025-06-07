import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

// Serve static files from test-app directory
app.use(express.static(path.join(__dirname, 'test-app')))

// Serve built library files
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-app', 'index.html'))
})

app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`)
})