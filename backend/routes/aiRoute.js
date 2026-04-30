import express from "express";
import { generateSummary, improveBullet, suggestSkills } from "../controllers/aiController.js";

const router = express.Router();

router.post("/summary", generateSummary);
router.post("/improve-bullet", improveBullet);
router.post("/suggest-skills", suggestSkills);

export default router;