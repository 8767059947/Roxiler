import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const verifyJWT = async (req, res, next) => {
    try {
        // Request ke header se token nikalein
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request. No token provided." });
        }

        // Token ko verify karein
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Database me user ko dhoondhein
        const user = await prisma.user.findUnique({
            where: { id: decodedToken.id },
            // Password kabhi select na karein
            select: { id: true, email: true, name: true, role: true }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        // User ki info ko request me attach kar dein
        req.user = user;
        req.token = token;
        
        // Request ko aage jaane dein
        next();

    } catch (error) {
        // Agar token invalid ya expire ho gaya ho
        return res.status(401).json({ message: "Invalid token.", error: error.message });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
         console.log("ROLE CHECK: Needed:", roles, "Got:", req.user.role);
        // 'verifyJWT' ne pehle hi req.user set kar diya hai
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden: You do not have permission to perform this action."
            });
        }
        next();
    };
};

export { verifyJWT, authorizeRoles };