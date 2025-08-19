import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../model/user.js'

export const registerUser = async(req, res) => {
    try {
        const {name, email, password, role} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'Username or email already exists.'});
        
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({name, email, password: hashedPassword, role});
        const savedUser = await user.save()

        res.json(savedUser); 
    } catch (error) {
        console.log("Error in register controller", error);
        res.status(500).json({message: error.message});
    }
}