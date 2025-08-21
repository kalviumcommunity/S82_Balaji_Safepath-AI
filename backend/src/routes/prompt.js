import { Router } from "express";
import { zeroShotChecklist } from "../controllers/promptcontroller.js";
import { oneShotChecklist } from "../controllers/oneshotpromptcontoller.js";

const router = Router();

router.post("/zero-shot", zeroShotChecklist);
router.post("/one-shot", oneShotChecklist)

export default router;
