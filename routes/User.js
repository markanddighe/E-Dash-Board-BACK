import express from 'express'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Jwt from 'jsonwebtoken'
import verifyToken from '../middleware/checkAuth.js'

const jwtKey='e-comm'


const router = express.Router()

router.post("/register", async(req,res)=>{

    try {

        const user =new User(req.body)

        let insert = await user.save()

        insert = insert.toObject()   // password ko hide krne ke ley

        delete insert.password

        Jwt.sign({insert},jwtKey,{expiresIn:"2h"},(err,token)=>{

            if(err){
                res.send(err)
            }

            res.send({insert,auth:token})
        })
        
    } catch (error) {
        
        res.status(400).send("error")
    }
})

router.post("/login",async(req,res)=>{

    if(req.body.password && req.body.email) {

        let user = await User.findOne(req.body).select("-password")
    
        if(user){
            
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{

                if(err){
                    res.send(err)
                }

                res.send({user,auth:token})
            })

        }else{
            res.send("no data")
        }
    }else{

        res.send("no result")

    }


})


router.post("/add-product",verifyToken, async (req,res)=>{

    let product = new Product(req.body)

    let result= await product.save()

    res.status(200).send(result)
})


router.get("/products",verifyToken,async(req,res)=>{

    let products = await Product.find()

    if(products.length>0){
        res.status(200).send(products)
    }else{
        res.status(400).send("no product")
    }
})


router.delete("/product/:id",verifyToken,async(req,res)=>{

    let id = req.params.id

    const result = await Product.deleteOne({_id:id})

    res.status(200).send(result)
})



router.get("/product/:id",verifyToken,async(req,res)=>{

    let result= await Product.findOne({_id:req.params.id})

    if(result){
        res.status(200).send(result)
    }else{
        res.status(400).send("no data")
    }
})


router.put("/product/:id",verifyToken, async(req,res)=>{

    let id= req.params.id

    let result = await Product.findByIdAndUpdate(id,req.body,{

        new:true
    })
    res.status(200).send(result)
})


router.get("/search/:Key",verifyToken, async(req,res)=>{

    let result = await Product.find({

        "$or":[
            {name:{$regex:req.params.Key}},
            {category:{$regex:req.params.Key}}
        ]
    })

    res.status(200).send(result)
})
export default router