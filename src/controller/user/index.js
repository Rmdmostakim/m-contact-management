const User = require("../../model/user");

const user = {};
//store new user
user.store = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      success: "new user created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "server side error",
    });
  }
};

module.exports = user;
