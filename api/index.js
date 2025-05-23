import  express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from "cors";
dotenv.config();
 mongoose.connect(process.env.MONGO).then(()=>{
    console.log('MongoDb is connected')
 })

 .catch((err)=> {
    console.log(err)
 })

 const __dirname = path.resolve();
const app =express();

const PORT= process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser());

const CLIENT_URL_PROD =process.env.PROD_CLIENT_URL;
// const CLIENT_URL_DEV =process.env.DEV_CLIENT_URL;

app.use(cors(
  {
     origin: CLIENT_URL_PROD,
     methods: ["GET", "POST", "PUT",],
     credentials: true
  }
))

app.listen(PORT, ()=> {
    console.log(`Server  is running on port ${PORT}`)
});

app.get('/test',(req,res)=> {
    res.json({message:'API is working'});
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  })

