const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
console.log('Frontend URL:', process.env.FRONTEND_URL);
console.log('Deployed Frontend URL:', process.env.DEPLOYED_FRONTEND_URL);
console.log('Mongo URI:', process.env.MONGO_URI);


app.use(cors());
app.use(express.json());
app.use(
    cors({
      origin: [process.env.NODE_ENV=='development'?process.env.FRONTEND_URL:process.env.DEPLOYED_FRONTEND_URL],
      credentials: true,
    })
  );

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Job Application routes
app.use('/api/application', require('./routes/application'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
