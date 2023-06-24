//dependencies
const bcrypt = require("bcrypt");
const User = require("../../../models/user");
const Token = require("../../../models/token");
const validators = require("../../../validators");
const { encode } = require("../../../helpers");

//scaffolding
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
    validators(err, res);
  }
};
// login user
user.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = encode({
      phone: user.phone,
      name: user.name,
      uuid: user.uuid,
    });

    try {
      const accessToken = {
        user_uuid: user.uuid,
        token,
        expired: new Date().setDate(new Date().getDate() + 30),
      };
      const newToken = new Token(accessToken);
      await newToken.save();
      res.status(201).json({
        token,
      });
    } catch (err) {
      validators(err, res);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = user;
