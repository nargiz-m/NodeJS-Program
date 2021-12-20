import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const authenticationFunction = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        res.sendStatus(401);
    }
    
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if(err) res.sendStatus(403);
        res.user = user;
        next();
    });
}