import express from "express";

import {
  getDustbins,
  addDustbin,
  updateDustbinStatus,
  suggestNearestDustbin
} from "../controllers/dustbinController.js";

const router = express.Router();

// Get all dustbins
router.get("/", getDustbins);

// Suggest nearest available dustbin
router.get("/suggest", suggestNearestDustbin);

// Add a new dustbin
router.post("/", addDustbin);

// Update dustbin status
router.put("/:id", updateDustbinStatus);

export default router;
