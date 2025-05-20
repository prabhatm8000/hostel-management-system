import { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { envvars } from "../config/constants";
import { userOps, type User } from "../models/user";

// adding user to request
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const authAdminOnly = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, envvars.JWT_SECRET);
        if (typeof decoded === "string" || !decoded.user) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        // Attach user to request for downstream use
        const userFromToken = (decoded as JwtPayload).user as User;
        const user = userOps.getUserByUsername(userFromToken.username) as User;
        if (user.role !== "admin") {
            res.status(401).json({ message: "Not an admin!" });
            return;
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};

const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, envvars.JWT_SECRET);
        if (typeof decoded === "string" || !decoded.user) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        // Attach user to request for downstream use
        const userFromToken = (decoded as JwtPayload).user as User;
        const user = userOps.getUserByUsername(userFromToken.username) as User;
        if (user.role !== "student" && user.role !== "admin") {
            res.status(401).json({ message: "Not an good user!" });
            return;
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};

export default {
    authAdminOnly,
    auth,
};
