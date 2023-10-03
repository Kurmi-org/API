import Product from '../models/products.model.js';
import { createAccessToken } from '../libs/jwt.js';

export const createProduct = async (req, res) => {
    try{
        const {
            name,
            description,
            price,
            stock,
            unit,
            images,
            type,
            readyForSale,
            producer
        } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            unit,
            images,
            type,
            readyForSale,
            producer
        });
        const productSaves = await newProduct.save();
        
        const token = await createAccessToken({id: productSaves._id});

        res.cookie("token", token);
        res.json({
            id: productSaves._id,
            name: productSaves.name,
            description: productSaves.description,
            price: productSaves.price,
            stock: productSaves.stock,
            unit: productSaves.unit,
            images: productSaves.images,
            type: productSaves.type,
            readyForSale: productSaves.readyForSale,
            producer: productSaves.producer
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({}, {images: 1, name: 1, price: 1, stock: 1, unit: 1, producer: 1});
        res.json(products);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

export const getProductById = async (req, res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.json(product);


    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

//lista de productos segun el id del productor
export const getProductsByProducer = async (req, res) => {
    try{
        const producerId = req.params.id;
        const products = await Product.find({producer: producerId});
        res.json(products);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}
