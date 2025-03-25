import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "data:image/jpeg;base64,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", // URL of profile picture
    },
    subscription: {
      plan: {
        type: String,
        enum: ["Basic", "Standard", "Premium"],
        default: "Basic",
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
      endDate: {
        type: Date,
        required: false, // Will be set based on subscription length
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    watchHistory: {
      type: Array,
      default: [],
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    settings: {
      language: {
        type: String,
        default: "English",
      },
    },
  },
  { timestamps: true }
);

// Middleware for password hashing, etc., can be added here

const User = mongoose.model("User", userSchema);

export default User;
