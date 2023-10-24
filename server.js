const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware to parse JSON and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use(helmet());


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'anya.mantula@hotmail.com',
    pass: 'Akdeniz39!',
  },
});

app.get('/', (req, res, next) => {
  res.json({msg:"API Working"});
})
// Define a route to handle form submissions
app.post('/send-email', (req, res) => {
  res.json({msg:"send email path"});
  // const { name, email, message } = req.body;
  // const mailOptions = {
  //   from: 'anya.mantula@hotmail.com',
  //   to: 'anya.mantula@hotmail.com',
  //   subject: `New contact from ${name}`,
  //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //     res.status(500).json({ success: false, message: 'Email could not be sent.' });
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //     res.status(200).json({ success: true, message: 'Email sent successfully.'});
  //   }
  // });
});
