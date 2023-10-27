import Person from '../models/persons.model.js';
import bcrypt from "bcryptjs";

//obtener productor
export const getProducer = async (req, res) => {
    try{
        const producers = await Person.find();
        res.status(200).json(producers);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

export const getProducerById = async (req, res) => {
    try{
        const producerId = req.params.id;

        const producer = await Person.findById(producerId);
        res.json(producer);


    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

//update producer admin
export const updateProducerById = async (req, res) => {
    const producerId = req.params.id;
    try{
        const producer = await Person.findById(producerId);
        if (!producer) {
            return res.status(404).json({ message: "Producer not found" });
        }
        producer.name = req.body.name;
        producer.last_names = req.body.last_names;
        producer.ci = req.body.ci;
        producer.user = req.body.user;
        producer.date_birth = req.body.date_birth;
        producer.location.departament = req.body.departament;
        producer.location.province = req.body.province;
        producer.location.address = req.body.address;
        producer.location.longitude = req.body.longitude;
        producer.location.latitude = req.body.latitude;
        producer.phone = req.body.phone;
        producer.email = req.body.email;
        const updatedProducer = await producer.save();
        res.json(updatedProducer);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

//update producer
export const updateProducer = async (req, res) => {
    const producerId = req.decoded.id;
    try{
        const producer = await Person.findById(producerId);
        if (!producer) {
            return res.status(404).json({ message: "Producer not found" });
        }
        producer.user = req.body.user;
        producer.location.departament = req.body.departament;
        producer.location.province = req.body.province;
        producer.location.address = req.body.address;
        producer.phone = req.body.phone;
        producer.email = req.body.email;
        const updatedProducer = await producer.save();
        res.json(updatedProducer);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}
//delete producer admin
export const deleteProducerById = async (req, res) => {
    const producerId = req.params.id;
    try{
        const producer = await Person.findById(producerId);
        if (!producer) {
            return res.status(404).json({ message: "Producer not found" });
        }
        await producer.remove();
        res.json({ message: "Producer deleted" });
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}


