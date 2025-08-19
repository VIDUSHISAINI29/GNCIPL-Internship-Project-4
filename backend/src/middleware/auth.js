import jwt from 'jsonwebtoken';

import User from '../model/user.js'

export const auth = async(req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        console.log("bearer = ", bearerHeader)
        if(typeof bearerHeader != 'undefined'){
            const token = bearerHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
// console.log('id = ', decoded.userId)
    // Fetch full user document (without password)
    const user = await User.findById(decoded.userId).select('-password');
    // console.log('user =', user)
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;   // ✅ attach user here

            console.log(user);
            req.token = user
            next();
            }
            else{
                res.status(401).json({message: 'No token provided'});
            }
    } catch (error) {
        console.log("Error in auth middleware", error);
        res.status(403).json({message: 'Invalid or expired token'});
    }
}