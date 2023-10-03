import Person from '../models/persons.model.js';
import { createAccessToken } from '../libs/jwt.js';

//obtener productor
export const getProducer = async (req, res) => {
    try{
        const producers = await Person.find({rol: 2}, {ci: 1, user: 1, date_birth: 1, phone: 1, email: 1});
        res.status(200).json(producers);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}

export const getProducerById = async (req, res) => {
    try{
        const producerId = req.params.id;
        //mostrar datos del productor:  ci, user, date_birth, location, phone, email

        const producer = await Person.findById(producerId, {ci: 1, user: 1, date_birth: 1, location: 1, phone: 1, email: 1});
        res.json(producer);


    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }
}