import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

let port = process.env.PORT || 4000;

app.listen(port);

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
});
