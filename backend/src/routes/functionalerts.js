import express from "express";
import { functionCallingChecklist } from "../controllers/functioncallingchecklist.js";

const router = express.Router();
router.post("/", functionCallingChecklist);
export default router;
