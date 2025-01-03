import app from './app.js';
import connectDb from './config/connect.js';

const PORT = process.env.PORT || 3000;

connectDb()
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});