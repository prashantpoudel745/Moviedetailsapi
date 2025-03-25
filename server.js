import express from "express";
import dotenv from "dotenv";
import connectDb from "./connection/connectdb.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authroute.js";
import movieRoutes from "./routes/moviesroute.js";
import tvShowsRoutes from "./routes/tvshowsroute.js";
import checkAuthentication from "./auth/checkauth.js";
import searchRoutes from "./routes/searchroute.js";
import cors from "cors";
connectDb();
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/movie", movieRoutes);
app.use("/api/tvshow", checkAuthentication, tvShowsRoutes);
app.use("/api/search", checkAuthentication, searchRoutes);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
