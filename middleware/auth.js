const jwt = require("jsonwebtoken");
import UserModel from "../models/UserModel";
import RegisterModel from "../models/Registermodel";

const users_auth = async (req, res, next) => {
  try {
    //console.log('Hello user')
    const { token } = req.cookies;
    //console.log(token)
    const verify_token = jwt.verify(token, "jayrajrao1");
    //console.log(verify_token)
    next();
  } catch (error) {
    res.status(201).json({
      success: true,
    });
  }
};

module.exports = users_auth;
