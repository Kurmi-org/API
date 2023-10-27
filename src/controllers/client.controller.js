import Person from '../models/person.model.js';
import bcrypt from 'bcryptjs';

export const updateClient = async (req, res) => {

    const client = await Person.findById(req.decoded.id);
    if (!client) {
        return res.status(404).json({ message: "Client not found" });
    }
    try{
        client.user = req.body.user;
        client.date_birth = req.body.date_birth;
        client.location.departament = req.body.departament;
        client.location.province = req.body.province;
        client.location.address = req.body.address;
        client.phone = req.body.phone;
        client.email = req.body.email;
        const updatedClient = await client.save();
        res.json(updatedClient);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something goes wrong"});
    }

}




