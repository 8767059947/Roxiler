import { Router } from 'express';
import { loginUser, registerUser, getUserProfile, updateUserPassword, getAllUsers } from '../controllers/user.controller.js';
import { verifyJWT, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/profile").get(verifyJWT, getUserProfile);
router.route("/update-password").patch(verifyJWT, updateUserPassword);

// Admin-only route to get all users with filtering and sorting
router.route("/").get(
    verifyJWT,
    authorizeRoles("SYSTEM_ADMINISTRATOR"),
    getAllUsers
);



export default router;