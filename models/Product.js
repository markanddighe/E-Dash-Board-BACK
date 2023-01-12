import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({

    name:String,
    price:String,
    category:String,
    userId:String,
    company:String,

})

const Product = new mongoose.model('product',productSchema)

export default Product