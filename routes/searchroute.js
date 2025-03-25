import express from "express";
const router = express.Router();
import {
  searchperson,
  searchmovie,
  searchtv,
  getSearchHistory,
  deleteSearchHistory,
} from "../controllers/searchcontroller.js";
router.get("/person/:query", searchperson);
router.get("/movie/:query", searchmovie);
router.get("/tv/:query", searchtv);
router.get("/history", getSearchHistory);
router.delete("/history/:id", deleteSearchHistory);

export default router;
