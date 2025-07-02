const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'https://helpdesk-assignment.vercel.app',  // ✅ <-- your frontend's deployed URL
  credentials: true
}));
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

app.get('/', (req, res) => {
  res.send('🎉 Helpdesk API is running!');
});

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


app.post('/tickets', (req, res) => {
  const newTicket = req.body;
  newTicket.id = tickets.length + 1;
  tickets.unshift(newTicket);
  res.status(201).json({ success: true, ticket: newTicket });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
