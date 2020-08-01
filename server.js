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



// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });