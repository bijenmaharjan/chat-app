const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generatetoken = require("../lib/utils");

//Signup
module.exports.signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generatetoken.generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Login
module.exports.login = (req, res) => {};

//Logout
module.exports.logout = (req, res) => {};
