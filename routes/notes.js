const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Route : 1 Get all the notes / Get Request to fetch all notes from Database "/api/notes/getuser"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send(" Internal Server Error occurred")
    }
})
// Route : 2 Add a new Notes  / Post Request to fetch all notes from Database "/api/notes/addnotes"
router.post('/addnote', fetchuser, [
    body('title', 'Enter a Valid Title').isLength({ min: 1 }),
    body('description', 'description length must be up to 8 letters').isLength({ min: 1 })


], async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        // if there are errors returns bad request : and the Errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()


        res.json(savedNote)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send(" Internal Server Error occurred")
    }
})
// Route : 3 Update  an Existing Note : Put "/api/notes/updatenote".Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {


        // create New Note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send(" Internal Server Error occurred")
    }
})

// Route : 4 Delete  an Existing Note : Delete "/api/notes/updatenote".Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send(" Internal Server Error occurred")
    }
})
module.exports = router