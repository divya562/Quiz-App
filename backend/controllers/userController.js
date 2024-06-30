import User from "../models/users.js";
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    // console.log(name, email, password, role);

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    if (role !== 'admin' && role !== 'user') {
        res.status(400);
        throw new Error('Invalid role. Must be either "admin" or "user".');
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const authUser = asyncHandler(async (req, res, userRole) => {
    const { email, password } = req.body;
    // console.log('Attempting login with email:', email, 'and role:', userRole);

    const user = await User.findOne({ email, role: userRole });
// console.log(user);
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        console.error('Login failed for email:', email, 'and role:', userRole);
        res.status(401);
        throw new Error('Invalid email, password, or role');
    }
});


export { authUser, registerUser };
