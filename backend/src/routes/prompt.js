import { Router } from "express";
import { zeroShotChecklist } from "../controllers/promptcontroller.js";
import { oneShotChecklist } from "../controllers/oneshotpromptcontoller.js";
import { multiShotChecklist } from "../controllers/multishotprompting.js";
import { functionCallingChecklist } from "../controllers/functioncallingchecklist.js";

const router = Router();

router.post("/zero-shot", zeroShotChecklist);
router.post("/one-shot", oneShotChecklist)
router.post("/multi-shot",multiShotChecklist)
router.post("/function-calling",functionCallingChecklist)
export default router;
