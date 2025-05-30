import { Router } from "express";
import passport from "passport";
const router = Router();

router.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('This is a private route, you are authenticated!');
});


export default router;