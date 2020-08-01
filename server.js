// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const path = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================

// Routes
// =============================================================

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Displays all notes
app.get("/api/notes", (req, res) => {
    fs.readFile(__dirname, "db/db.json", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        return res.json(data);
      });
  });

  app.post("/api/characters", (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newCharacter = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newCharacter);
  
    characters.push(newCharacter);
  
    res.json(newCharacter);
  });




// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });