import jwt from 'jsonwebtoken';

const generateToken = (_id) => {
    console.log(_id)
    return jwt.sign({ _id }, process.env.JWT_SECRETE, {
        expiresIn: '30d',
    });
};

export default generateToken;
