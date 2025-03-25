import express from "express";
import {
  getTrendingMovie,
  getTrailer,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
} from "../controllers/moviescontroller.js";

const router = express.Router();

router.post("/trending", getTrendingMovie);
router.get("/:id/trailers", getTrailer);
router.get("/:id/details", getMovieDetails);
router.get("/similar/:id", getSimilarMovies);
router.get("/:category", getMoviesByCategory);
export default router;
