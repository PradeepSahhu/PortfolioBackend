import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    index: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectImages: { type: [String] },
  tags: {
    type: [String],
    index: true,
  },
  links: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    index: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const Project = mongoose.model("Project", ProjectSchema);
