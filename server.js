const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// 'port' variable:
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware to parse JSON and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'anya.mantula@hotmail.com',
    pass: 'Akdeniz39!',
  },
});

// Define a route to handle form submissions
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: 'anya.mantula@hotmail.com',
    to: 'anya.mantula@hotmail.com', // Your email address
    subject: `New contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Email could not be sent.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully.'});
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});