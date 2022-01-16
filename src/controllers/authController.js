import User from '../models/User';
import Role from "../models/Role";

import jwt from 'jsonwebtoken';
import config from '../config';

export const signUp = async (req, res) => {
    
    try {
        //Get the request Body
        const { username, email, password, role } = req.body;
        //Crear un nuevo Usuario
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
        });

        // Comprobar los roles del usuario
        if (req.body.role) {
            // Utilizando el modelo de datos buscar el rol
            const foundRoles = await Role.find({ name: { $in: role } });
            newUser.role = foundRoles.map((role) => role._id);     //Solo queremos el id para relacionar
        } else {
            const role = await Role.findOne({ name: "user" });  //Rol por defecto
            newUser.role = [role._id];
        }

        // Guardar usuario en MongoDB
        const savedUser = await newUser.save();

        // Crear un token para el usuario
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400 //24 horas
        });

        res.status(201).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const signIn = async (req, res) => {
    try {
        // Buscar el usuario en nuestra bd y se devuelve el objeto rol entero
        const userFound = await User.findOne({ email: req.body.email }).populate( "role" );

        if (!userFound) return res.status(400).json({ message: "User Not Found" });

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword) {
            return res.status(401).json({
                token: null,
                message: "Invalid Password",
            });
        }

        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400, // 24 horas
        });

        res.json({ token });
    } catch (error) {
        res.status(500);
        console.log(error);
    }
}