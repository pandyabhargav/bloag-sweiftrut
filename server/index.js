import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './Config/mongoose.js';
import router from './Router/blogrouter.js';
import cors from 'cors';


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/',router)

connectDB();
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`);
});