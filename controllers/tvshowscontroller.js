import { fetchfromTMDB } from "../services/movieservices.js";
export const getTrendingtvshows = async (req, res) => {
  try {
    const data = await fetchfromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    res.json({ success: true, trendingtvshows: data.results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const getTvshowDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        error: "No details found for the given movie ID",
      });
    }

    res.json({ success: true, Details: data });
  } catch (error) {
    console.error("Error fetching movie details:", error.message || error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching movie details",
    });
  }
};
export const getTvshowTrailer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
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
export const getTvByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US`
    );
    res.json({ success: true, movies: data.results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const getSimilarTvshows = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`
    );
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No similar Tv shows found for the given Tv show ID",
      });
    }
    res.json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
