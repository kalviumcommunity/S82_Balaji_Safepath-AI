import express from "express";
import { functionCallingChecklist } from "../controllers/functionCallingChecklist.js";

const router = express.Router();
router.post("/", functionCallingChecklist);
export default router;
