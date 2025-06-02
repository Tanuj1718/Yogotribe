import express from 'express';

const app = express();
const port = 3000;

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false; // Divisible by any number other than 1 and itself
    }
  }
  return true;
}

// Defining a route/Api endpoint
app.get('/is-prime', (req, res) => {
  const { number } = req.query;

  // Validate if number is provided and is a valid integer
  if (!number || isNaN(number)) {
    return res.status(400).json({ error: 'Please provide a valid number.' });
  }

  const num = parseInt(number);

  if (num <= 0) {
    return res.status(400).json({ error: 'Please provide a positive number.' });
  }

  const result = isPrime(num);
  res.json({ number: num, isPrime: result });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
