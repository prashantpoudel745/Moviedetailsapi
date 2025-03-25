import User from "../models/usermodel.js";
import { fetchfromTMDB } from "../services/movieservices.js";

export const searchperson = async (req, res) => {
  const { query } = req.params;
  if (!query) {
    return res.status(400).json({ message: "Provide any name to search" });
  }
  try {
    const response = await fetchfromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    const data = await User.findByIdAndUpdate(req.user.id, {
      $push: {
        watchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          type: "person",
          createdAt: Date.now(),
        },
      },
    });
    await data.save();
    res.status(200).json({ message: "Success", person: response, data: data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const searchmovie = async (req, res) => {
  const { query } = req.params;
  if (!query) {
    return res.status(400).json({ message: "Provide any name to search" });
  }
  try {
    const response = await fetchfromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}`
    );
    if (response.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }
    console.log(response.results[0]);
    const data = await User.findByIdAndUpdate(req.user.id, {
      $push: {
        watchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          type: "movie",
          createdAt: Date.now(),
        },
      },
    });
    await data.save();
    res.status(200).json({ message: "Success", movie: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const searchtv = async (req, res) => {
  const { query } = req.params;
  if (!query) {
    return res.status(400).json({ message: "Provide any name to search" });
  }

  try {
    const response = await fetchfromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}`
    );
    if (response.results.length === 0) {
      return res.status(400).json({ message: "No results found" });
    }
    console.log(response.results[0]);
    const data = await User.findByIdAndUpdate(req.user.id, {
      $push: {
        watchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          type: "tvshows",
          createdAt: Date.now(),
        },
      },
    });
    await data.save();
    console.log(response.results[0]);
    res.status(200).json({ message: "Success", tv: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getSearchHistory = async (req, res) => {
  try {
    const data = await User.findById(req.user.id).select("-password");
    if (data.watchHistory.length === 0) {
      return res.status(404).json({ message: "No history found" });
    }
    res.status(200).json({ message: "Success", message: data.watchHistory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteSearchHistory = async (req, res) => {
  let { id } = req.params; // ID of the watchHistory item to be deleted
  id = parseInt(id);
  try {
    // Use `findByIdAndUpdate` with `$pull` to remove the specific `watchHistory` item
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { watchHistory: { id: id } },
      },
      { new: true } // Returns the updated document after deletion
    ).select("-password");
    await user.save();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "History item deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
