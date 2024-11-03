import express, { json } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Use CORS and JSON middleware
app.use(cors({
    origin: '*'
}), express.json());

// API endpoint for registration
app.post('/api/register', (req, res) => {
  const { fullName, address, phoneNumber, dateOfBirth, gender, email } = req.body;

  console.log('Received registration data:', { fullName, address, phoneNumber, dateOfBirth, gender, email });

  // Response to simulate successful registration
  res.status(200).json({
    message: 'Registration successful!',
    userId: Math.floor(Math.random() * 1000), // Dummy user ID
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});