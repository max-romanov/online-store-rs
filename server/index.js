import http from "http"
import url from "url"
import fruits from "./fruits/data.js"

const server = http.createServer((req , res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const urlData = url.parse(req.url)
  if (!urlData.query) {
    res.end(JSON.stringify(fruits))
    return
  }

  const filteredFruits = fruits.filter(fruit => fruit.colors.includes(urlData.query))

  console.log(fruits[1].colors.includes(urlData.query))
  res.end(JSON.stringify(filteredFruits))
})

server.listen(8081, 'localhost', () => {
  console.log(Date.now(), 'server url: http://localhost:8081')
})
