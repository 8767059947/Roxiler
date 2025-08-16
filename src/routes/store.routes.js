import { Router } from 'express';
import { createStore, getAllStores, submitRating, modifyRating } from '../controllers/store.controller.js';
import { verifyJWT, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();


router.route("/add").post(
    verifyJWT, 
    authorizeRoles("SYSTEM_ADMINISTRATOR"), 
    createStore
);

router.route("/").get(verifyJWT, getAllStores);
router.route("/:storeId/rate")
.post(verifyJWT, submitRating)
 .put(verifyJWT, modifyRating); 


export default router;