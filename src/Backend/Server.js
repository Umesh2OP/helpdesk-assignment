const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tickets = [
  {
    id: 1,
    title: 'Login Issue',
    description: 'User unable to login',
    status: 'Open',
    assignedTo: 'John Doe',
  },
  {
    id: 2,
    title: 'Password Reset',
    description: 'Request for password reset',
    status: 'Resolved',
    assignedTo: 'Alice',
  },
  {
    id: 3,
    title: 'VPN Not Working',
    description: 'VPN connection failing',
    status: 'Pending',
    assignedTo: 'Bob',
  },
];

app.get('/tickets', (req, res) => {
  res.json(tickets);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@test.com' && password === '123456') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
