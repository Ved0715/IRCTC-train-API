const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authroutes');


const app = express();
dotenv.config();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/',  (req, res, next) => {
    res.send('Hello World!');
})

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);


const startServer = () => {
    try {
        app.listen(process.env.PORT, () => console.log(`Server has started on PORT ${process.env.PORT}`));

    } catch (error) {
        console.error(error);
    }
}

startServer();
