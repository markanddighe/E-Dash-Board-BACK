import Jwt from 'jsonwebtoken'
import express from 'express'
import Product from '../models/Product.js'
import User from '../models/User.js'

const jwtKey='e-comm'

const verifyToken = (req,res,next)=>{

    let token = req.headers['authorization']

    if(token) {
        token= token.split(' ')[1]
        
        Jwt.verify(token,jwtKey, (err,valid) =>{

            if(err) {

                res.status(401).send({result:"please provid valid token"})

            } else {

                next()
            }
        })
    } else {
        res.status(403).send({result:"please add token with headers"})
    }

}

export default verifyToken