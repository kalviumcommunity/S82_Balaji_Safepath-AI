import { Router } from "express";
import { zeroShotChecklist } from "../controllers/promptController.js";

const router = Router();

router.post("/zero-shot", zeroShotChecklist);

export default router;
