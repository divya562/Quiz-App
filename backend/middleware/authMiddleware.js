import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/users.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    // console.log(req.headers);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // console.log('Token:', token);
            const decoded = jwt.verify(token, process.env.JWT_SECRETE);
            // console.log('Decoded:', decoded);
            req.user = await User.findById(decoded._id).select('-password');
            // console.log('User:', req.user);
            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req, res, next) => {
    // console.log(req.user);
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, admin };
