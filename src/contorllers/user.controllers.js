import { User } from "../models/user.models.js";

import { ApiResponse } from "../utility/APIResponse.js";

const UserLogin = async (req, res) => {
  const { username, password } = req.body;
  console.table([username, password]);

  if (!username || !password) {
    res.status(400).json(new ApiResponse(400, {}, "something is missing"));
  }

  try {
    // const ress = await User.findOne(username);

    // if (!ress) {
    //   res.status(400).json(new ApiResponse(400, {}, "Can't find the user"));
    // }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { message: "Successfully loggedin" }, "Working")
      );
  } catch (error) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: "Somethig went wrong can't loggin now " },
          "Not working"
        )
      );
  }
};

const RegisterUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userID = await User.create({ username, password });

    const resp = await User.findById(userID._id);

    if (!resp) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            { message: "Something went wrong" },
            "Can't get the data"
          )
        );
    }

    return res
      .status(400)
      .json(
        new ApiResponse(
          200,
          { message: "Everything worked" },
          "Registered successfully "
        )
      );
  } catch (error) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { message: "Something went wrong" },
          "Can't get the data"
        )
      );
  }
};

export { UserLogin, RegisterUser };
