import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.listen(4000, () => {
  console.log("Listening to port 4000");
})

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true });

const projectSchema = new mongoose.Schema({
  name: String,
  image: [String],
  features: [String],
  skills: [String],
});

const Project = mongoose.model("Project", projectSchema);

app.get("/projects", function(req, res){
  Project.find(function(err, projects){
    if(err){
      console.log(err)
    }else{
      res.send(projects);
    }
  });
})

// const mj = new Project({
//   name: "Drink Finder",
//   image: "url",
//   features: ["Auto suggest", "CSS Animations", "Multi-Ingredient Search"],
//   skills: ["HTML", "CSS", "JavaScript", "CocktailDB API", "Twitter Typeahead"]
// })
//
// mj.save();
