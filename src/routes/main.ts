import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('http://localhost:3000/')
})

const mainRouter = router;
export default mainRouter