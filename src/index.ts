// import { dirname } from 'path'
// import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
// const __dirname = dirname(fileURLToPath(import.meta.url))
import { auth } from './utils/auth.js'
import { errorHandling } from './utils/errorHandling.js'
import 'express-async-errors'

const PORT = process.env.PORT || 4444
const app = express()

app.use(cors())
app.use(express.json())

app.use('/', express.static('public'))

app.post('/articles', auth, (req, res) => res.send(req.body))
app.get('/articles', auth, (req, res) => res.send('articles!'))

app.get('/', (req, res) => {
    // console.log('req', req)
    // console.log('res', res)

    // res.send('Hello pro IT!')
    return res.json({ login: 'andrew', password: 'password' })
})

app.get('/errortest', (req, res) => {
    // console.log('req', req)
    // console.log('res', res)

    // res.send('Hello pro IT!')
    throw new Error('Oh no, this is a backend error')
})

app.use(errorHandling)

app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
})
