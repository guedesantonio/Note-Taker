// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const notesData = require("./db/db.json");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//This line is used to add folders that contain static files like CSS and Javascript so they could be used inside the server
app.use(express.static(path.join(__dirname, './public')));



// Api routes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        return res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    console.log(notesData);
    notesData.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notesData), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
    const chosen = req.params.id;
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        let notes = JSON.parse(data);
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == chosen) {
                notes.splice(i, 1);
                fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
                    if (err) throw err;
                    res.send(notes);
                });
            }
        }

    });
});

// Routes
// =============================================================

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});