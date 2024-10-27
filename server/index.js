import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './Config/mongoose.js';
import router from './Router/blogrouter.js';
import cors from 'cors';
import path from 'path';


const app = express();
app.use(bodyParser.json());
const _diname = path.resolve();
app.use(cors());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
}));

app.use('/',router)
app.use(express.static(path.join(_diname,"/client/dist")));
app.get('*', (_,res)=>{
res.sendFile(path.join(_diname,"client","dist","index.html"));
})

connectDB();
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`);
});