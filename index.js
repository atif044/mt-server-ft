const db=require('./db/db')
require('dotenv').config()
const cors = require('cors');
const cookieParser=require('cookie-parser')
const path=require("path")
const express=require('express');
const app=express();
const auth=require('./Routes/userRoutes')
const adminAuth=require('./Routes/adminRoutes')
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
db();
app.use('/api/auth', auth);
app.use(express.static(path.join(__dirname,'/public/Photos')))
app.use('/api/auth/admin',adminAuth)
app.listen(process.env.PORT)
