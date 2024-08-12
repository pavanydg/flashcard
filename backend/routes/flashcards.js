const express = require('express');
const authenticateToken = require('../middleware/auth');
const FlashCard = require('../models/Flashcard');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get all flashcards');
});
router.post('/create',authenticateToken, async (req, res) => {
    const {question,answer} = req.body;
    const adminId = req.user.id;
    try{
        if(!question || !answer){
            return res.status(400).json({msg: "Question and answer are required"})
        }
        
        const newFlashCard = await FlashCard.create({
            question,
            answer,
            admin_id: adminId
        })
        res.status(201).json(newFlashCard)
    }catch(error){
        console.error("Error creating flashcard:",error)
        res.status(500).json({msg: "Server error"})
    }
});

router.put("/edit/:id",authenticateToken, async (req,res) => {
    const {id} = req.params;
    const {question,answer} = req.body;
    const admin_id = req.user.id;

    try{
        const flashcard = await FlashCard.findOne({where: {fid:id,admin_id}})
        if(!flashcard){
            return res.status(404).json({ message: 'Flashcard not found or not authorized' });
        }

        flashcard.question = question || flashcard.question
        flashcard.answer = answer || flashcard.answer
        await flashcard.save();
        res.status(200).json(flashcard)
    }catch(error){
        console.error('Error updating flashcard:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.delete("/delete/:id",authenticateToken, async (req,res) => {
    const {id} = req.params;
    const admin_id = req.user.id;

    try{
        const flashcard = await FlashCard.findOne({where: {fid:id,admin_id}})
        if(!flashcard){
            return res.status(404).json({ message: 'Flashcard not found or not authorized' });
        }

        await flashcard.destroy();

        res.status(200).json({ message: 'Flashcard deleted successfully' });

    }catch(error){
        console.error('Error updating flashcard:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get("/getflashCards",authenticateToken,async (req,res) => {
    const admin_id = req.user.id;
    try{
        const cards = await FlashCard.findAll({where:{admin_id}});
        console.log(cards);

        res.status(200).json({
            flashcards: cards
        })

    } catch(error){
        console.error('Error Getting flashcard:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;