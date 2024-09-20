import jwt from 'jsonwebtoken';
const UserModel = require('../../models/') // Make sure the path is correct

class EmailVerify {
  static async verify(req, res) {
    const { token } = req.query;

    try {
      // Verify the token
      const decoded = jwt.verify(token, 'jayrajrao1');

      // Find the user by ID and update the email verification status
      await UserModel.findByIdAndUpdate(decoded.userId, { isEmailVerified: true });

      res.send('Email verified successfully!');
    } catch (error) {
      console.error('Verification error:', error); // Log the error for debugging
      res.status(400).send('Invalid or expired token');
    }
  }
}

export default EmailVerify;
