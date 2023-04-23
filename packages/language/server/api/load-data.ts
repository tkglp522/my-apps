import fs from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
    const req = event.node.req
    const res = event.node.res
    if (req.method === 'GET') {
        try {
      const filePath = path.join(process.cwd(), 'assets/json/data.json')
      const data = fs.readFile(filePath, 'utf8')
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(data)
    } catch (error: any) {
      console.error('Error reading data.json:', error)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: error.message }))
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
  }
})