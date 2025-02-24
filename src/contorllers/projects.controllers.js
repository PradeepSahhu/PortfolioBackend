import { Project } from "../models/projects.models.js";

const addNewProject = async (req, res) => {
  //   console.table(req.body);

  const {
    projectName,
    projectDescription,
    projectImages,
    tags,
    links,
    githubLink,
    developer,
    date,
  } = req.body;

  //   console.log(req.body);

  console.log("the files are");
  console.log(req.files);

  if (!projectName || !projectDescription) {
    res.status(400).json({
      message: "can't leave empty the projectName, or projectDescription",
    });
  }

  const response = await Project.findOne({ projectName });

  //   console.log(response);

  //   console.log(response);

  if (response) {
    res.status(200).json({
      message: "The project with the same name already  exist in the database",
    });
    return;
  }

  const respond = await Project.create({
    projectName,
    projectDescription,
    projectImages,
    tags,
    links,
    githubLink,
    developer,
    date,
  });

  const check = await Project.findById(respond._id);

  if (!check) {
    res.status(200).json({ message: "Cant save this project now" });
    return;
  }

  return res
    .status(200)
    .json({ message: "This is addNewProject route is working" });
};

const getProjects = async (req, res) => {
  const allProjects = await Project.find({});

  if (!allProjects) {
    return res.status(400).json({ message: "Can't find any project" });
  }

  return res.status(200).json(allProjects);
};

const editExistingProject = (req, res) => {
  console.table(req.body);
  return res
    .status(200)
    .json({ message: "This is editExistingProject route is working" });
};

const deleteExistingProject = (req, res) => {
  console.table(req.body);
  return res
    .status(200)
    .json({ message: "This is deleteExistingProject route is working" });
};

const addImageProject = (req, res) => {
  console.table(req.body);
  return res
    .status(200)
    .json({ message: "This is addImageProject route is working" });
};

const checkSystem = (req, res) => {
  return res
    .status(200)
    .json({ message: "This is checksystem check is completed " });
};

export {
  addNewProject,
  editExistingProject,
  deleteExistingProject,
  addImageProject,
  checkSystem,
  getProjects,
};
