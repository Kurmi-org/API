import User from '../models/client.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const registerClient = async (req, res) => {
   try{

    const {
        name,
        last_names,
        ci,
        user,
        password,
        date_birth,
        departament,
        province,
        address,
        phone,
        email
    } = req.body;

    const passwordHast = await bcrypt.hash(password, 10);
     
    const newUser = new User({
        name,
        last_names,
        ci,
        user,
        password: passwordHast,
        date_birth,
        location: {
            departament,
            province,
            address
        },
        phone,
        email
    });
    const userSaves =  await newUser.save();

   const token =await createAccessToken({id: userSaves._id});

    res.cookie("token", token);
    res.json({
        id: userSaves._id,
        name: userSaves.name,
        last_names: userSaves.last_names,
        ci: userSaves.ci,
        user: userSaves.user,
        date_birth: userSaves.date_birth,
        location: {
            departament: userSaves.location.departament,
            province: userSaves.location.province,
            address: userSaves.location.address
        },
        phone: userSaves.phone,
        email: userSaves.email
    });

   }catch(error){
    res.status(500).json({message: error.message});
    }
    
};

export const registerProducer = async (req, res) => {
    try{
     
      const {
            name,
            last_names,
            ci,
            
            user,
            password,
            date_birth,
            departament,
            province,
            address,
            latitude,
            longitude,
            phone,
            email
      } = req.body;
     
      const passwordHast = await bcrypt.hash(password, 10);

      const newProducer = new Producer({
            name,
            last_names,
            ci,
            user,
            password: passwordHast,
            date_birth,
            location: {
                departament,
                province,
                address,
                latitude,
                longitude
            },
            phone,
            email
      });
        const producerSaves =  await newProducer.save();

        const token =await createAccessToken({id: producerSaves._id});

        res.cookie("token", token);
        res.json({
            id: producerSaves._id,
            name: producerSaves.name,
            last_names: producerSaves.last_names,
            ci: producerSaves.ci,
            user: producerSaves.user,
            date_birth: producerSaves.date_birth,
            location: {
                departament: producerSaves.location.departament,
                province: producerSaves.location.province,
                address: producerSaves.location.address,
                latitude: producerSaves.location.latitude,
                longitude: producerSaves.location.longitude
            },
            phone: producerSaves.phone,
            email: producerSaves.email
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};


export const login = async (req, res) => {
   try{

    const {user, password} = req.body;

    const userFound = await User.findOne({user: user});
    if(!userFound) return res.status(400).json({message: "incorrect credentials"});


    const isMatch = await bcrypt.compare(password, userFound.password);
    if(!isMatch) return res.status(400).json({message: "incorrect credentials"});
    
   const token =await createAccessToken({id: userFound._id});

    res.cookie("token", token);
    res.json({
        id: userFound._id,
        name: userFound.name,
        last_names: userFound.last_names,
        ci: userFound.ci,
        user: userFound.user,
        date_birth: userFound.date_birth,
        location: {
            departament: userFound.location.departament,
            province: userFound.location.province,
            address: userFound.location.address
        },
        phone: userFound.phone,
        email: userFound.email
        
    });

   }catch(error){
    res.status(500).json({message: error.message});
    }
    
};

export const logout = async (req, res) => {
    res.clearCookie("token","",{
        expires: new Date(Date.now()),
    });
    res.status(200).json({message: "logout"});
};
