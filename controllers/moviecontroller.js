import mongoose from "mongoose";
import Movie from "../models/postmodel.js";
import User from "../models/usermodel.js";
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (movies.length === 0) {
      res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getMovie = async (req, res) => {
  const { name } = req.params;
  try {
    const movie = await Movie.find({ name: name });
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createMovie = async (req, res) => {
  const {
    title,
    description,
    genre,
    releaseDate,
    duration,
    language,
    director,
    cast,
    ageRating,
    ratings,
    videoUrl,
    coverImageUrl,
    trailerUrl,
    featured,
  } = req.body;
  const newMovie = new Movie({
    title,
    description,
    genre,
    releaseDate,
    duration,
    language,
    director,
    cast,
    ageRating,
    ratings,
    videoUrl,
    coverImageUrl,
    trailerUrl,
    featured,
  });
  try {
    await newMovie.save();
    if (!newMovie) {
      res.status(404).json({ message: "Error creating Movie" });
    }
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const deleteMovie = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Movie not found" });
  }
  console.log(id);
  const data = await Movie.findById(id);
  if (!data) {
    res.status(404).json({ message: "Movie not found" });
  } else {
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  }
};
export const updateMovie = async (req, res) => {
  const id = req.params.id;
  const {
    title,
    description,
    genre,
    releaseDate,
    duration,
    language,
    director,
    cast,
    ageRating,
    ratings,
    videoUrl,
    coverImageUrl,
    trailerUrl,
    featured,
  } = req.body;
  const updatedMovie = {
    title,
    description,
    genre,
    releaseDate,
    duration,
    language,
    director,
    cast,
    ageRating,
    ratings,
    videoUrl,
    coverImageUrl,
    trailerUrl,
    featured,
  };
  try {
    await Movie.findByIdAndUpdate(id, updatedMovie, { new: true });
    if (!updatedMovie) {
      res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSuggestedMovie = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from authenticated request
    console.log("User ID:", userId);

    const user = await User.findById(userId).select("watchHistory");
    const watchedMovies = user.watchHistory || [];

    // Find movies not in the user's watchedMovies list
    const suggestedMovies = await Movie.aggregate([
      {
        $match: {
          _id: { $nin: watchHistory }, // Exclude watched movies
        },
      },
      { $sample: { size: 10 } }, // Randomly select 10 movies
    ]);

    res.status(200).json(suggestedMovies);
  } catch (error) {
    console.error("Error in getSuggestedMovie:", error.message);
    res.status(500).json({ error: "Error fetching suggested movies" });
  }
};
