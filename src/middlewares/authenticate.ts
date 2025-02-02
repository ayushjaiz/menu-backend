import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { envConfig } from "../config/env";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
            };
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ status: false, message: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, envConfig.jwtSecret);
        req.user = decoded as any;
        next();
    } catch (err) {
        res.status(403).json({ status: false, message: "Invalid token" });
    }
};
