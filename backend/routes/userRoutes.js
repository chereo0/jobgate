const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllCompanies,
    getCompanyById,
    getFeaturedCompanies,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/featured-companies", getFeaturedCompanies);

// Protected routes
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

// Admin routes - Get all users
router.get("/", protect, admin, getAllUsers);

// Admin routes - Company management
router.get("/companies", protect, admin, getAllCompanies);
router.get("/companies/:id", protect, admin, getCompanyById);

// Admin routes - User management by ID
router.route("/:id")
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

module.exports = router;
