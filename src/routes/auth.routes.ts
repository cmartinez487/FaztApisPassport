import { Router } from "express";
const router = Router();

import { signIn, signUp } from "../controllers/user.controller";

router.post("/signup", signUp)
router.post("/signin", signIn)



export default router;