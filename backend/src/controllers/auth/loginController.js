import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../../model/user.js';

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: 'User not found'});
        
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('is',isMatch)
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({
            userId: user._id,
            email: user.email
        },
        process.env.JWT_SECRET, 
        {expiresIn: '1d'}
    );

    res.json({token, user});
    } catch (error) {
        console.log("Error in login Controller");
        res.status(500).json({message: error.message});
    }
}


// Logout Functions


export const logout = async(req, res) => {
    res.json({message: "Logged out successfully."});
}