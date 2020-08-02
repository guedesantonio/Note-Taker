// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
let notesData = require("./db/db.json");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Api routes
app.get("/api/notes", (req, res) => {
    fs.readFile(__dirname, "./db/db.json", "utf8", function(error, data) {
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
    fs.writeFile(__dirname,'./db/db.json', JSON.stringify(notesData), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
    const uniqueId = req.params.id;
    fs.readFile(__dirname,'./db/db.json', 'utf8', function (err, data) {
        notesData = JSON.parse(data);
        for (let i = 0; i < notesData.length; i++) {
            if (notesData[i].id === uniqueId) {
                notesData.splice(i, 1);
                fs.writeFile('./db/db.json', JSON.stringify(notesData), function (err) {
                    if (err) throw err;
                    res.send(notesData);
                });
            }
        }

    });
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });