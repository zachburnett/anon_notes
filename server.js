var express= require('express')
var app = express()
var body = require('body-parser')
var path = require('path')

var mongoose = require('mongoose')
mongoose.connect('localhost:27017')

app.use(body.json({ extended: true }));
app.use(express.static(path.join(__dirname, './public/dist')));

var NotesSchema = new mongoose.Schema({
    notetext: String,
    created_at: { type: Date,  default: Date.now }
})
var Note = mongoose.model('Note', NotesSchema)

app.post('/notes', function(req, res){
    // console.log('body: ', req.body);
    var note = new Note(req.body);
    // console.log('about to save the note');
    note.save().then((err) => {
        // console.log('hey: ', note);
        res.json(note);
    })
    
})
app.get('/', function(req, res){
    res.render('index')
})

app.get("/notes", function(req, res){
    Note.find({}, function(err, notes){
        console.log('tried to get some notes: ', notes);
        res.json(notes)
    }).sort({created_at: -1})
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})