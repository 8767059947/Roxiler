import { Router } from 'express';
import { getStoreOwnerDashboard, getAdminDashboardStats } from '../controllers/dashboard.controller.js';
import { verifyJWT, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/store-owner").get(
    verifyJWT, 
    authorizeRoles("STORE_OWNER"), 
    getStoreOwnerDashboard
);

router.route("/admin-stats").get(
    verifyJWT,
    authorizeRoles("SYSTEM_ADMINISTRATOR"),
    getAdminDashboardStats
);

export default router;