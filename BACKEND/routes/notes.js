const express = require('express');
const router = express.Router();
const notes = require('../DB_models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// fetch notes 
router.get('/fetchnotes',fetchuser ,async(req,res)=>{
    const note = await notes.find({user:req.user.id});
    res.json(note);
});

//add notes
router.post('/addnotes',fetchuser,[
    body('title','title length is too small').isLength({min:4}),
    body('description','enter a valid description').isLength({min:5})],async(req,res)=>{
        try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }    
        const note = await notes.create({
            user:req.user.id,
            title:req.body.title,
            description:req.body.description,
            date:req.body.date,
        });
        res.json(note);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("there is an please try again");
        }
});

// updating notes
router.post('/update/:id',fetchuser,async(req,res)=>{
    const {title,description} = req.body;
    const newnotes = {}
    if(title){
        newnotes.title = title;
    }
    if(description){
        newnotes.description = description;
    }
    let note = await notes.findById(req.params.id);
    if(!note){
        return res.status(401).json({error:"Not found"});
    }
    if(note.user.toString() !== req.user.id){
        return res.status(404).json({error:"User Not Same"});
    }
    note = await notes.findByIdAndUpdate(req.params.id , {$set: newnotes} , {new:true});
    res.json({note});
});
// deleting a notes
router.post('/delete/:id',fetchuser,async(req,res)=>{
    let note = await notes.findById(req.params.id);
    if(!note){
        return res.status(401).json({error:"Can't be deleted"});
    }
    if(note.user.toString() !== req.user.id){
        return req.status(404).json({error:"No permission granted"});
    }
    note = await notes.findByIdAndDelete(req.params.id);
    res.json({note});
})
module.exports = router