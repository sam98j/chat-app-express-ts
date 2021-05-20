import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({msg: "Hello word"})
})

const mainRouter = router;
export default mainRouter