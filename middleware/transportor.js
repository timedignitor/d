import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Example function to send verification email
async function sendVerificationEmail(user) {
  // Generate a verification token
  const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

  // Create a verification URL
  const verificationUrl = `http://yourapp.com/verify-email?token=${token}`;

  // Configure nodemailer or another email service
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'user.eamil',
      pass: 'qzfycwup loztfyhg',
    },
  });
   function sendMail( to, sub, msg){
    transporter.sendMail({
      to:to, 
      subject:sub, 
      html:msg
    })
    console.log("send mail")
   }
   sendMail("user.email", "congraluations", "this is test message")

  // Send the verification email
  // await transporter.sendMail({
  //   from: 'timedignitor1000@gmail.com',
  //   to: "jayrajrao15@.com",
  //   subject: 'Email Verification',
  //   text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
  // });
}
export default {sendVerificationEmail }