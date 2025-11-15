import express from 'express'
import cors from 'cors'
import Rotas from './rotas.js'
const api = express()

api.use(express.json())
api.use(cors())


Rotas(api)


api.listen(5010, () => console.log('API subiucom sucesso na porta 5010'));