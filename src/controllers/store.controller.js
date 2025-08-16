import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createStore = async (req, res) => {
    const { name, email, address } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required." });
    }

    try {
        const store = await prisma.store.create({
            data: { name, email, address }
        });

        return res.status(201).json({
            message: "Store added successfully!",
            store: store
        });
    } catch (error) {
        // Agar email pehle se exist karta hai to Prisma error dega
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "Store with this email already exists." });
        }
        console.log("DETAILED ERROR:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

const getAllStores = async (req, res) => {
    const { search } = req.query;
    const userId = req.user.id; // Logged-in user ki ID middleware se

    try {
        const whereClause = {};
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } }
            ];
        }

        // 1. Saari stores fetch karein
        let stores = await prisma.store.findMany({ where: whereClause });

        // 2. Sabhi stores ki average rating nikaalein
        const avgRatings = await prisma.rating.groupBy({
            by: ['storeId'],
            _avg: { rating_value: true },
        });

        // 3. Current user ki ratings nikaalein
        const userRatings = await prisma.rating.findMany({
            where: { userId: userId },
            select: { storeId: true, rating_value: true },
        });

        // 4. Data ko combine karein
        stores = stores.map(store => {
            const avgRatingData = avgRatings.find(r => r.storeId === store.id);
            const userRatingData = userRatings.find(r => r.storeId === store.id);

            return {
                ...store,
                averageRating: avgRatingData?._avg?.rating_value || 0,
                currentUserRating: userRatingData?.rating_value || null,
            };
        });

        return res.status(200).json({
            message: "Stores fetched successfully!",
            stores: stores
        });
    } catch (error) {
        console.log("Error fetching stores:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

const submitRating = async (req, res) => {
    // URL se storeId, body se rating_value, aur middleware se userId lena
    const { storeId } = req.params;
    const { rating_value } = req.body;
    const userId = req.user.id;

    // Validation
    if (!rating_value || rating_value < 1 || rating_value > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    try {
        // Database me nayi rating create karna
        const newRating = await prisma.rating.create({
            data: {
                rating_value: rating_value,
                userId: userId,
                storeId: storeId
            }
        });

        return res.status(201).json({
            message: "Rating submitted successfully!",
            rating: newRating
        });

    } catch (error) {
        // Check karein ki user pehle se to rate nahi kar chuka
        // Yeh hamare schema ke @@unique constraint ki vajah se kaam karega
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "You have already rated this store." });
        }
        console.log("Error submitting rating:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


const modifyRating = async (req, res) => {
    const { storeId } = req.params;
    const { rating_value } = req.body;
    const userId = req.user.id;

    // Validation
    if (!rating_value || rating_value < 1 || rating_value > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    try {
        // Di hui rating ko update karna
        const updatedRating = await prisma.rating.update({
            where: {
                // Hum uss unique record ko target kar rahe hain
                // jiska userId aur storeId match hota hai.
                user_store_unique_rating: {
                    userId: userId,
                    storeId: storeId,
                }
            },
            data: {
                // Sirf rating_value ko update karna hai
                rating_value: rating_value,
            }
        });

        return res.status(200).json({
            message: "Rating updated successfully!",
            rating: updatedRating
        });

    } catch (error) {
        // Agar user ne ab tak rating di hi na ho
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "You have not rated this store yet. Cannot update." });
        }
        console.log("Error updating rating:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


export { createStore, getAllStores, submitRating, modifyRating };