const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This ensures the server can parse JSON requests

// Endpoint to handle form submission
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Log the received data to check
  console.log('Received data:', req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ status: "error", message: "All fields are required" });
  }

  // Nodemailer transporter setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sahild.cse.jisu22@gmail.com", // Replace with your email
      pass: "juzs htvk fuut bbct", // Replace with your email app password
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: "sahild.cse.jisu22@gmail.com", // Your email address
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    // Send success response
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Error sending email:", error);
    // Send failure response
    res.status(500).json({ status: "error", message: "Error sending email" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
