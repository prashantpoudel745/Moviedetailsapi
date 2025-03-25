import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const fetchfromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };

  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB");
  }

  if (!response.data) {
    throw new Error("Invalid response data from TMDB");
  }

  return response.data;
};
