import { Router } from "express";
import { buscarAdmin, cadastrar, listarAdmins, listarAdminsLogados, listarLogins, listarUsuarios, verificarLogin } from "../repository/loginRepository.js";
import { generateToken, getAuthentication } from "../utils/jwt.js";
const endpoint = Router()

const autenticar = getAuthentication()


endpoint.post('/cadastrar', async (req,resp)=>{
    let body = req.body
    let reg = await cadastrar(body)



    resp.send({
        usuario: body.email,
        token: generateToken(body),

        novoID:reg
    })
})


endpoint.post('/login', async (req,resp)=>{
    let body = req.body
    let reg = await verificarLogin(body)

    if(!reg){
        resp.status(401).send({erro:'Login inválido'})
    }

    resp.send({
        usuario: body.email,
        token: generateToken(body),

        registro:reg
    })

})




endpoint.get('/totalUser', autenticar, async (req,resp)=>{
    let total = await listarUsuarios()
    resp.send({totalUsers: total})
})


endpoint.get('/totalAdmins', autenticar, async (req,resp)=>{

    let total = await listarAdmins()
    resp.send({totalAdmins:total})

})



endpoint.post('/admin', async (req,resp)=>{

    let admin = req.body
    let reg = await buscarAdmin(admin)
    if(!reg){
        resp.status(401).send({erro:'Login inválido'})
    }

    resp.send({
        admin: admin.email,
        token: generateToken(admin)
    })
})

endpoint.get('/usuariosLogados', autenticar, async (req,resp)=>{
    let usuarios = await listarLogins()
    resp.send({usuarios})
})

endpoint.get('/adminsLogados', autenticar, async (req,resp)=>{
    let admins = await listarAdminsLogados()
    resp.send({admins})
})

export default endpoint
