import express from "express";
import {
  login,
  logout,
  signup,
  authcheck,
} from "../controllers/usercontrollers.js";
import checkAuthentication from "../auth/checkauth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authcheck", authcheck);

export default router;
