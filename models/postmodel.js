import mongoose from "mongoose";
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
    },
    language: {
      type: String,
      default: "English",
    },
    director: {
      type: String,
      required: true,
    },
    cast: [
      {
        type: String,
        trim: true,
      },
    ],
    ageRating: {
      type: String,
      required: true,
    },
    ratings: {
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
      },
      totalRatings: {
        type: Number,
        default: 0,
      },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    videoUrl: {
      type: String,
      required: true, // URL to the video file or stream
    },
    coverImageUrl: {
      type: String, // URL to cover image
    },
    trailerUrl: {
      type: String, // URL to trailer video
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
