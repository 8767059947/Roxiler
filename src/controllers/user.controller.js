import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// ======== REGISTER USER ========
const registerUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword, address, role }
        });

        return res.status(201).json({
            message: "User registered successfully!",
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

// ======== LOGIN USER ========
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User with this email not found." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({ message: "User logged in successfully!", token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

// ======== GET USER PROFILE ========
const getUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, address: true, role: true }
        });
        if (!user) return res.status(404).json({ message: "User not found." });
        return res.status(200).json({ message: "User profile fetched successfully!", user });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

// ======== UPDATE USER PASSWORD ========
const updateUserPassword = async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Old password and new password are required." });
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect old password." });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword }
        });

        return res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

// ======== GET ALL USERS (FOR ADMIN) - CORRECTED VERSION ========
const getAllUsers = async (req, res) => {
    const { role, name, email, sortBy, order = 'asc' } = req.query;
    try {
        const whereClause = {};
        const orderByClause = {};
        if (role) whereClause.role = role;
        if (name) whereClause.name = { contains: name, mode: 'insensitive' };
        if (email) whereClause.email = { contains: email, mode: 'insensitive' };
        if (sortBy) orderByClause[sortBy] = order;

        let users = await prisma.user.findMany({
            where: whereClause,
            orderBy: orderByClause,
            select: { id: true, name: true, email: true, address: true, role: true, createdAt: true }
        });
        
        // Find all Store Owners to fetch their store ratings
        const storeOwnerEmails = users
            .filter(u => u.role === 'STORE_OWNER')
            .map(u => u.email);

        if (storeOwnerEmails.length > 0) {
            // Find all stores matching those owner emails
            const stores = await prisma.store.findMany({
                where: { email: { in: storeOwnerEmails } },
                select: { id: true, email: true }
            });

            // Get the average rating for those stores
            const storeAvgRatings = await prisma.rating.groupBy({
                by: ['storeId'],
                _avg: { rating_value: true },
                where: { storeId: { in: stores.map(s => s.id) } }
            });

            // Create a map for easy lookup: storeEmail -> avgRating
            const ownerRatingsMap = new Map();
            stores.forEach(store => {
                const ratingData = storeAvgRatings.find(r => r.storeId === store.id);
                const avgRating = ratingData?._avg?.rating_value || 0;
                ownerRatingsMap.set(store.email, avgRating);
            });
            
            // Add the average rating to the final user object
            users = users.map(user => {
                if (user.role === 'STORE_OWNER' && ownerRatingsMap.has(user.email)) {
                    return { ...user, storeAverageRating: ownerRatingsMap.get(user.email).toFixed(2) };
                }
                return user;
            });
        }

        return res.status(200).json({
            message: "Users fetched successfully!",
            count: users.length,
            users: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


export { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateUserPassword,
    getAllUsers
};