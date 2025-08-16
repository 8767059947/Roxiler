import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getStoreOwnerDashboard = async (req, res) => {
    // Logged-in user (Store Owner) ki email
    const ownerEmail = req.user.email;

    try {
        // 1. Owner ki email se unka store dhoondhein
        const store = await prisma.store.findUnique({
            where: { email: ownerEmail }
        });

        if (!store) {
            return res.status(404).json({ message: "No store associated with this owner's email." });
        }

        // 2. Store ki average rating calculate karein
        const averageRatingResult = await prisma.rating.aggregate({
            where: { storeId: store.id },
            _avg: {
                rating_value: true
            }
        });
        const averageRating = averageRatingResult._avg.rating_value || 0; // Agar rating na ho to 0

        // 3. Store ko rate karne waale users ki list nikaalein
        const ratingsWithUsers = await prisma.rating.findMany({
            where: { storeId: store.id },
            select: {
                rating_value: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        // 4. Sabhi data ko ek saath response me bhejein
        return res.status(200).json({
            message: "Store owner dashboard data fetched successfully!",
            dashboard: {
                storeName: store.name,
                averageRating: averageRating,
                ratings: ratingsWithUsers
            }
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

const getAdminDashboardStats = async (req, res) => {
    try {
        // Alag-alag tables se count nikaalein
        const totalUsers = await prisma.user.count();
        const totalStores = await prisma.store.count();
        const totalRatings = await prisma.rating.count();

        // Sabhi stats ko ek object me combine karein
        const stats = {
            totalUsers,
            totalStores,
            totalRatings
        };

        return res.status(200).json({
            message: "Admin dashboard stats fetched successfully!",
            stats: stats
        });

    } catch (error) {
        console.error("Error fetching admin stats:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// Sabhi functions ko export karein
export { getStoreOwnerDashboard, getAdminDashboardStats };