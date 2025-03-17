const jwt = require("jsonwebtoken");

module.exports.generateToken = async (userid, res) => {
  try {
    const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //millisecond
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return token;
  } catch (error) {}
};
