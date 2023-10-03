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
        res.status(200).json(order);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

//mostrar un control de ventas por productor
export const getSalesByProducer = async (req, res) => {
    const producerId = req.params.id;

    try{
        const orders = await Order.find({producer: producerId});
        res.status(200).json(orders);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

//mostrar la cantidad de ordenes completadas y sus ordenes pendientes

export const getOrdersByStatus = async (req, res) => {
    const status = req.params.status;

    try{
        const orders = await Order.find({status: status});
        res.status(200).json(orders);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}