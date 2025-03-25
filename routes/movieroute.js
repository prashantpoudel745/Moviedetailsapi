import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../controllers/moviecontroller.js";
import checkAuthentication from "../auth/checkauth.js";

const router = express.Router();
router.get("/create", createMovie);
router.get("/", getMovies);
router.get("/:name", getMovie);
router.delete("/delete/:id", deleteMovie);
router.put("/update/:id", updateMovie);

export default router;
