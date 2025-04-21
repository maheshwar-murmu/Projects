const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const Register = require('./models/register');  

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/Sundoor')
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.log(`MongoDB connection error: ${err}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../template/view'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/display', async (req, res) => {
    const data = await Register.find();
    res.render('display', { data });
});


app.get('/admin', async (req, res) => {
    const data = await Register.find();
    res.render('display', { data, isAdmin: true }); // Pass a flag to identify admin view
});


app.post('/delete/:id', async (req, res) => {
    try {
        await Register.findByIdAndDelete(req.params.id);
        res.redirect('/admin');  // Redirect back to admin page
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send('Error deleting record');
    }
});


app.get('/edit/:id', async (req, res) => {
    const record = await Register.findById(req.params.id);
    res.render('display', { record, isEdit: true });
});


app.post('/update/:id', async (req, res) => {
    const { name, email, college, event } = req.body;
    try {
        await Register.findByIdAndUpdate(req.params.id, { name, email, college, event });
        res.redirect('/admin');  // Redirect back to admin page
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send('Error updating record');
    }
});

app.post('/send', async (req, res) => {
    const { name, email, college, event } = req.body;

    const registerData = new Register({
        name,
        email,
        college,
        event,
    });

    try {
        await registerData.save();
        res.send('Data sent to backend!');
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send('Error saving data');
    }
});
