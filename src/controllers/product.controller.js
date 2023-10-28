import Product from '../models/products.model.js';
import { createAccessToken } from '../libs/jwt.js';

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);

}

export const createProduct = async (req, res) => {

    try{
        
        const { 
            name, 
            description, 
            price, 
            stock, 
            unit, 
            images = [],
            type, 
            readyForSale, 
            producer } = req.body;

        const newProduct = new Product({ 
            name, 
            description, 
            price, 
            stock, 
            unit, 
            images,
            type, 
            readyForSale, 
            producer });

        const productSaves = await newProduct.save();
        res.status(200).json(productSaves);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

export const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message: "Product not found"})
    res.json(product);
}

export const updateProduct = async (req, res) => {
    const  product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!product) return res.status(404).json({message: "Product not found"})
    res.json(product);

    
}
export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product) return res.status(404).json({message: "Product not found"})
    res.json({message: "Product deleted successfully"});

}
export const getProductsByProducer = async (req, res) => {
    const products = await Product.find({
        producer: req.params.id});
    if(!products) return res.status(404).json({message: "Products not found"})
    res.json(products);
}


export const updateStock = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.stock -= quantity;
        await product.save();
        res.status(200).json({ message: 'Stock updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

