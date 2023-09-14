const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ message: "User not found" });
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Invalid Credentials" });
  const token = jwt.sign({ email: user.email, id: user._id }, "test", {
    expiresIn: "1h",
  });
  res.status(200).json({ result: user, token });
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const user = await User.findOne({ email: email });
  if (user) return res.status(400).json({ message: "User already exists" });
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Password dont match" });
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name: `${firstName} ${lastName}`,
  });
  const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
    expiresIn: "1h",
  });
  res.status(200).json({ result: newUser, token });
};

module.exports = { signin, signup };
