import { Project } from "../models/projects.models.js";
import { uploadCloudinary } from "../utility/Cloudinary.js";

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

  const file = req.files;

  if (!file) {
    res.status(401).json({ message: "Can't find the file" });
  }

  console.log("the files are");
  console.log(req.files);
  console.log(typeof req.files.ProjectImages[0]);
  console.log(req.files.ProjectImages.length);

  if (!projectName || !projectDescription) {
    res.status(400).json({
      message: "can't leave empty the projectName, or projectDescription",
    });
  }

  // uploading to the cloudinary directly usign the file buffer

  // Upload the file buffer directly to Cloudinary

  //   uploadCloudinary();

  //#############################################################

  try {
    const response = await Project.findOne({ projectName });

    if (response) {
      res.status(200).json({
        message:
          "The project with the same name already  exist in the database",
      });
      return;
    }

    //   const totalImages = req.files.ProjectImages.length;

    const imageBuffer = req.files?.ProjectImages;

    // var imageSource = [];

    const respo = await Promise.all(
      imageBuffer.map(async (eachImage, index) => {
        const res = await uploadCloudinary(eachImage.buffer);
        // imageSource[index] = res.secure_url;
        return res.secure_url;
      })
    );
    console.log("This is the normal response");
    console.table(respo);
    console.log(respo);

    // console.table(imageSource);

    //   console.log(response);

    //   console.log(response);

    const respond = await Project.create({
      projectName,
      projectDescription,
      projectImages: respo,
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
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Something went wrong with the server" });
  }
};

const getProjects = async (req, res) => {
  try {
    const allProjects = await Project.find({});

    if (!allProjects) {
      return res.status(400).json({ message: "Can't find any project" });
    }

    return res.status(200).json(allProjects);
  } catch (error) {
    return res
      .status(501)
      .json({ message: "something went wrong with the server" });
  }
};

//completely update the project.
const editExistingProject = async (req, res) => {
  const { projectID } = req.params;

  // const { projectID } = req.body;

  console.log(projectID);

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

  if (
    !projectDescription &&
    !projectName &&
    !tags &&
    !links &&
    !githubLink &&
    !developer &&
    !date
  ) {
    return res.status(400).json({ message: "somethig needs to be updated" });
  }

  try {
    const imageBuffer = req.files?.ProjectImages;

    if (!imageBuffer && imageBuffer.length === 0) {
      return res.status(401).json({ message: "No image uploaded" });
    }

    // var imageSource = [];

    const respo = await Promise.all(
      imageBuffer.map(async (eachImage, index) => {
        const res = await uploadCloudinary(eachImage.buffer);
        // imageSource[index] = res.secure_url;
        return res.secure_url;
      })
    );
    // console.table(imageSource);

    const proj = await Project.findByIdAndUpdate(
      projectID,
      {
        $set: {
          projectName: projectName,
          projectDescription: projectDescription,
          projectImages: respo,
          tags: tags,
          links: links,
          githubLink: githubLink,
          developer: developer,
          data: date,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "This is editExistingProject route is working" });
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Something went wrong with the server" });
  }
};

const editRecord = async (req, res) => {
  const { projectID } = req.params;
  const updateRecord = req.body;

  if (!projectID) {
    return res.status(400).json({ message: "can't find the project" });
  }

  if (Object.keys(updateRecord).length === 0) {
    return res.status(401).json({ message: "nothing to update" });
  }

  try {
    const project = await Project.findByIdAndUpdate(
      projectID,
      {
        $set: updateRecord,
      },
      { new: true }
    );
    if (!project) {
      return res.status(401).json({ message: "can't update the title" });
    }
    return res.status(200).json({ message: "Update completed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteExistingProject = async (req, res) => {
  // console.table(req.body);

  const { projectID } = req.params;

  if (!projectID) {
    return res.status(401).json({ message: "Project id can't be null" });
  }

  try {
    const resp = await Project.findByIdAndDelete(projectID);

    if (!resp) {
      return res
        .status(404)
        .json({ message: "Project Not found or not existed" });
    }
    return res
      .status(200)
      .json({ message: "This is deleteExistingProject route is working" });
  } catch (error) {
    return res
      .status(402)
      .json({ message: "Something went wrong with the server" });
  }
};

const addImageProject = async (req, res) => {
  // console.table(req.body);

  const { projectID } = req.params;

  console.log(projectID);

  if (!projectID) {
    return res.status(401).json({ message: "Project id can't be null" });
  }

  try {
    const imageBuffer = req.files?.ProjectImages;

    if (!imageBuffer || imageBuffer.length === 0) {
      return res.status(401).json({ message: "No image found" });
    }

    // var imageSource = [];

    if (!Array.isArray(imageBuffer)) {
      imageBuffer = [imageBuffer];
    }

    const respo = await Promise.all(
      imageBuffer.map(async (eachImage) => {
        const res = await uploadCloudinary(eachImage.buffer);
        // imageSource[index] = res.secure_url;
        return res.secure_url;
      })
    );
    // console.table(imageSource);
    const resp = await Project.findByIdAndUpdate(
      projectID,
      {
        $push: {
          projectImages: {
            $each: respo,
          },
        },
      },
      { new: true }
    );

    if (!resp) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res
      .status(200)
      .json({ message: "This is addImageProject route is working" });
  } catch (error) {
    console.error(error);
    return res
      .status(501)
      .json({ message: "Something went wrong with the server" });
  }
};

const addTags = async (req, res) => {
  const { projectID } = req.params;

  const { tags } = req.body;

  if (tags.length === 0) {
    return res.status(400).jsoin({ message: "tags can't be empty" });
  }
  try {
    const respond = await Project.findByIdAndUpdate(
      projectID,
      {
        $push: {
          tags: {
            $each: tags,
          },
        },
      },
      { new: true }
    );

    if (!respond) {
      return res.status(500).json({ message: "Can't add tags" });
    }

    if (!projectID) {
      return res.status(401).json({ message: "Can't find the project" });
    }

    return res.status(200).json({ message: "Successfully updated the tags" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Something went wrong with the server" });
  }
};

const checkSystem = (req, res) => {
  return res
    .status(200)
    .json({ message: "This is checksystem check is completed " });
};

export {
  editRecord,
  addNewProject,
  editExistingProject,
  deleteExistingProject,
  checkSystem,
  getProjects,
  addImageProject,
  addTags,
};
