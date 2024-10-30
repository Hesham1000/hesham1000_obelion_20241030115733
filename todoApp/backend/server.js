const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', reportRoutes);

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
