import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/local', (request, reply) => {
// Acessando dados do corpo da requisição
    const {local, convites, nconvidados} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        local: local,
        convites: convites,
        nconvidados: nconvidados,
    })

    return reply.status(201).send
})

server.get('/local', (request) => {
    const search = request.query.search
    console.log(search)
    const local = database.list(search)
    console.log(local)
    return local
})

server.put('/local/:id', (request, reply) => {
    const localId = request.params.id
    const {local, convites, nconvidados} = request.body
    const locais = database.update(localId, {
        local: local,
        convites: convites,
        nconvidados: nconvidados,
    })
    return reply.status(204).send()
})

server.delete('/local/:id', (request, reply) => {
    const localId = request.params.id

    database.delete(localId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})