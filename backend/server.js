
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server: SocketIO } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });
  socket.on('sendAlert', (data) => {
    io.emit('receiveAlert', data);
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lostfound';

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const chatRoutes = require('./routes/chat');
const alertRoutes = require('./routes/alerts');
const moderationRoutes = require('./routes/moderation');
const resolveRoutes = require('./routes/resolve');

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/moderation', moderationRoutes);
app.use('/api/resolve', resolveRoutes);

app.get('/', (req, res) => {
  res.send('Lost & Found Network API running');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
