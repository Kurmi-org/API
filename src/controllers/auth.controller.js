import Person from '../models/persons.model.js';
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
        rol = 1,
        date_birth,
        departament,
        province,
        address,
        phone,
        email
    } = req.body;

    const passwordHast = await bcrypt.hash(password, 10);
     
    const newUser = new Person({
        name,
        last_names,
        ci,
        user,
        password: passwordHast,
        rol,
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
            address: userSaves.location.address,
            longitude: userSaves.rol == 2 ? userSaves.location.longitude : undefined,
            latitude: userSaves.rol == 2 ? userSaves.location.latitude : undefined
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
            rol = 2,
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

      const newProducer = new Person({
            name,
            last_names,
            ci,
            user,
            password: passwordHast,
            rol,
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
                longitude: producerSaves.location.longitude,
                latitude: producerSaves.location.latitude
            },
            phone: producerSaves.phone,
            email: producerSaves.email
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//perfile
export const getProfileById = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await Person.findById(id, {name: 1, last_names: 1, ci: 1,  user: 1, date_birth: 1, rol:1, location: 1, phone: 1, email: 1});
        const token = await createAccessToken({id: user._id});
        res.cookie("token", token);
        res.status(200).json({
            id: user._id,
            name: user.name,
            last_names: user.last_names,
            ci: user.ci,
            user: user.user,
            date_birth: user.date_birth,
            rol: user.rol == 1 ? "client" : "producer",
            phone: user.phone,
            email: user.email
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};


export const login = async (req, res) => {
   try{

    const {user, password} = req.body;

    const userFound = await Person.findOne({user: user});
    if(!userFound) return res.status(400).json({message: "incorrect credentials"});


    const isMatch = await bcrypt.compare(password, userFound.password);
    if(!isMatch) return res.status(400).json({message: "incorrect credentials"});
    
   const token =await createAccessToken({id: userFound._id});

    res.cookie("token", token);
    res.json({
        id: userFound._id,
        name: userFound.name,
        last_names: userFound.last_names,
        rol: userFound.rol == 1 ? "client" : "producer",
        ci: userFound.ci,
        user: userFound.user,
        date_birth: userFound.date_birth,
        location: {
            departament: userFound.location.departament,
            province: userFound.location.province,
            address: userFound.location.address,
            latitude: userFound.rol == 2 ? userFound.location.latitude : undefined,
            longitude: userFound.rol == 2 ? userFound.location.longitude : undefined
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
