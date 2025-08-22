import express from "express";
import { getDisasterAlerts } from "../controllers/alerts.js";

const router = express.Router();
router.get("/", getDisasterAlerts);
export default router;
