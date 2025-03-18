import {
  addNewProject,
  editExistingProject,
  deleteExistingProject,
  addImageProject,
  checkSystem,
  getProjects,
  editRecord,
  addTags,
  getByProjectId,
} from "../contorllers/projects.controllers.js";

import express from "express";
import { upload } from "../middleware/Multer.js";
import { verifyJWT } from "../middleware/Authentication.js";

const router = express.Router();

router.route("/getAll").get(getProjects);
router.route("/system").get(checkSystem);
router.route("/").get(checkSystem);
router.route("/addNewProject").post(
  verifyJWT,
  upload.fields([
    { name: "ProjectImages", maxCount: 6 },
    { name: "mainImage", maxCount: 1 },
  ]),
  addNewProject
);
router.route("/addNewProject").get(verifyJWT, (_, res) => {
  res.status(200).json({ message: "This route is working" });
});

router.route("/editRecord/:projectID").post(verifyJWT, editRecord);
router
  .route("/editProject/:projectID")
  .post(
    upload.fields([{ name: "ProjectImages", maxCount: 6 }]),
    editExistingProject
  );
router.route("/delete/:projectID").post(verifyJWT, deleteExistingProject);
router
  .route("/addImages/:projectID")
  .post(
    upload.fields([{ name: "ProjectImages", maxCount: 3 }]),
    addImageProject
  );
router.route("/getById/:projectID").get(getByProjectId);

router.route("/addTags/:projectID").post(verifyJWT, addTags);

export default router;
