import {
  addNewProject,
  editExistingProject,
  deleteExistingProject,
  addImageProject,
  checkSystem,
  getProjects,
} from "../contorllers/projects.controllers.js";

import express from "express";
import { upload } from "../middleware/Multer.js";

const router = express.Router();

router.route("/getAll").get(getProjects);
router.route("/system").get(checkSystem);
router.route("/").get(checkSystem);
router
  .route("/addNewProject")
  .post(upload.fields([{ name: "ProjectImages", maxCount: 5 }]), addNewProject);
router.route("/addNewProject").get((req, res) => {
  res.status(200).json({ message: "this route is working" });
});

router.route("/editProject/:projectID").post(editExistingProject);
router.route("/delete").post(deleteExistingProject);
router.route("/addImages").post(addImageProject);

export default router;
