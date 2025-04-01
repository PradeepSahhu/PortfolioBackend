import { User } from "../models/user.models.js";

import { ApiResponse } from "../utility/APIResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return res.status(500).json({ message: "Somethign went wrong" });
  }
};

const UserLogin = async (req, res) => {
  const { username, password } = req.body;
  console.table([username, password]);

  if (!username || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "something is missing"));
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Can't find the user"));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "Working"
        )
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

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user Logged Out"));
};

const refreshAccessTokens = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized access");
  }

  try {
    const decodedToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is not expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Something went wrong can't refresh the refreshed token"
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

export { UserLogin, RegisterUser, logoutUser, refreshAccessTokens };
