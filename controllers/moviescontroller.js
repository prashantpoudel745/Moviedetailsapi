import { fetchfromTMDB } from "../services/movieservices.js";
const Api = process.env.TMDB_API;
export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchfromTMDB(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US"
    );
    console.log(data.results);
    const randommovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randommovie });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const getTrailer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    console.log(data.results);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No trailers found for the given movie ID",
      });
    }
    res.json({ success: true, trailer: data.results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        error: "No details found for the given movie ID",
      });
    }

    res.json({ success: true, movie: data });
  } catch (error) {
    console.error("Error fetching movie details:", error.message || error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching movie details",
    });
  }
};
export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`
    );
    console.log(data.results);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No similar movies found for the given movie ID",
      });
    }
    res.status(200).json({ success: true, similarMovies: data.results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US`
    );
    console.log(data.results);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No movies found for the given category",
      });
    }
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
