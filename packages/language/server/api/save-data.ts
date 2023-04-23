import fs from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
    const req = event.node.req
    const res = event.node.res
    if (req.method === 'POST') {
    try {
      const data = await new Promise<string>((resolve, reject) => {
        let body = ''
        req.on('data', chunk => {
          body += chunk
        })
        req.on('end', () => resolve(body))
        req.on('error', err => reject(err))
      })

      const filePath = path.join(process.cwd(), 'static/data.json')
      fs.writeFile(filePath, data)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true }))
    } catch (error: any) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: error.message }))
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
  }
})