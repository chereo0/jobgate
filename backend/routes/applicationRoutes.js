const express = require("express");
const router = express.Router();
const {
    applyForJob,
    getAllApplications,
    getCompanyApplications,
    getUserApplications,
    updateApplicationStatus,
    notifyApplicant,
} = require("../controllers/applicationController");
const { protect, admin } = require("../middleware/authMiddleware");

// Apply for job
router.post("/jobs/:id/apply", protect, applyForJob);

// Get applications
router.get("/applications", protect, admin, getAllApplications);
router.get("/applications/company", protect, getCompanyApplications);
router.get("/applications/user", protect, getUserApplications);

// Update application status
router.put("/applications/:id/status", protect, updateApplicationStatus);

// Send notification
router.post("/applications/:id/notify", protect, admin, notifyApplicant);

module.exports = router;
