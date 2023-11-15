import Order from '../models/orders.model.js';
import Product from '../models/products.model.js';

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
//crear orden

export const createOrder = async (req, res) => {
    const clientId = req.decoded.id;
    try{
        const {
            status,
            price,
            total,
            products,
            client = clientId
        } = req.body;

        const newOrder = new Order({
            status,
            price,
            total,
            products,
            client
        });
        const orderSaved = await newOrder.save();
        res.status(201).json(orderSaved);
        
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
export const getOrderByFullId = async (req, res) => {
    const orderId = req.params.id;

    try{
        const order = await Order.findById(orderId).populate("products.product").populate("client");
        res.status(200).json(order);
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}
 //actualizar orden
export const updateOrderById = async (req, res) => {
    const orderId = req.params.id;
    try{
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = req.body.status;
        order.updatedAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

export const deleteOrderById = async (req, res) => {
    //eliminar orden
    const orderId = req.params.id;
    try{
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await order.remove();
        res.json({ message: "Order deleted" });
    } catch(error){
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

//mostrar las ordenes de un cliente que se a logueado

export const getOrdersByClient = async (req, res) => {
    const clientId = req.decoded.id;

    try{
        const orders = await Order.find({client: clientId});
        res.status(200).json(orders);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}
