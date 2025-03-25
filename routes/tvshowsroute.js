import express from "express";
import {
  getTrendingtvshows,
  getTvshowDetails,
  getTvshowTrailer,
  getSimilarTvshows,
  getTvByCategory,
} from "../controllers/tvshowscontroller.js";
const router = express.Router();

router.get("/trending", getTrendingtvshows);
router.get("/:id/details", getTvshowDetails);
router.get("/:id/trailers", getTvshowTrailer);
router.get("/:id/similar", getSimilarTvshows);
router.get("/:category", getTvByCategory);
export default router;
