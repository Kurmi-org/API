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
    const userFound = await Person.findById(req.decoded.id);
    if(!userFound) return res.status(404).json({message: "user not found"});
    if(userFound.rol != 3) return res.status(403).json({message: "Unauthorized"});
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
         longitude,
         latitude,
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
             address,
             longitude,
             latitude
         },
         phone,
         email
     });
     const userSaves =  await newUser.save();
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

    }
    catch(error){
     res.status(500).json({message: error.message});
     }

};

//perfile
export const getProfile= async (req, res) => {
    const userFound = await Person.findById(req.decoded.id);
    if(!userFound) return res.status(404).json({message: "user not found"});
    const roles = {
            1: "client",
            2: "producer",
            3: "admin"
        }
    return res.json({
        id: userFound._id,
        name: userFound.name,
        last_names: userFound.last_names,
        rol: roles[userFound.rol],
        ci: userFound.ci,
        user: userFound.user,
        date_birth: userFound.date_birth,
        location: {
            departament: userFound.location.departament,
            province: userFound.location.province,
            address: userFound.location.address,
            longitude: userFound.rol == 2 ? userFound.location.longitude : undefined,
            latitude: userFound.rol == 2 ? userFound.location.latitude : undefined
        },
        phone: userFound.phone,
        email: userFound.email
    });
    
    
};


export const login = async (req, res) => {
    
   try{

    const {user, password} = req.body;

    const userFound = await Person.findOne({user: user});
    if(!userFound) return res.status(400).json({message: "incorrect credentials"});


    const isMatch = await bcrypt.compare(password, userFound.password);
    if(!isMatch) return res.status(400).json({message: "incorrect credentials"});
    
   const token =await createAccessToken({id: userFound._id});

        const roles = {
            1: "client",
            2: "producer",
            3: "admin"
        }
   
    res.cookie("token", token);
    res.json({
        token: token,
        rol: roles[userFound.rol],
        
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


//update password person logged
export const updatePassword = async (req, res) => {
    try {
        // Buscar al usuario por email en lugar de por ID.
        const user = await Person.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordHash = await bcrypt.hash(req.body.newPassword, 10);
        user.password = passwordHash;

        // Guardar el usuario actualizado.
        const updatedUser = await user.save();
        res.json({ message: "Password updated successfully", userId: updatedUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};