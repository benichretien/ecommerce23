import express from 'express';
const router = express.Router();
router.get('/home', (req, res)=>{
    res.json({data:'les tests sont bons!'})
})

export default router;