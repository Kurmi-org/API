import Order from '../models/orders.model.js';
import { createAccessToken } from '../libs/jwt.js';

//crear orden

export const createOrder = async (req, res) => {
    try{
        const {
            quantity,
            price,
            total,
            product,
            client
        } = req.body;

        const newOrder = new Order({
            quantity,
            price,
            total,
            product,
            client
        });

        const orderSaved = await newOrder.save();
        const token = await createAccessToken({id: orderSaved._id});
        res.cookie("token", token);
        res.status(201).json(orderSaved);
        
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

//obtener ordenes

export const getOrders = async (req, res) => {
    try{
        const orders = await Order.find();
        const token = await createAccessToken({id: orders._id});
        res.cookie("token", token);
        res.status(200).json(orders);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

//obtener orden por id

export const getOrderById = async (req, res) => {
    const orderId = req.params.id;

    try{
        const order = await Order.findById(orderId);
        const token = await createAccessToken({id: order._id});
        res.cookie("token", token);
        res.status(200).json(order);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}