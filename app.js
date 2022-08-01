const express = require('express');
const path = require('path');
const router = require('./routes/router');
const app = express();

app.set('view engine', 'ejs')

app.use('/css', express.static(path.join(__dirname, 'assets/css')))
app.use('/js', express.static(path.join(__dirname, 'assets/js')))
app.use('/images', express.static(path.join(__dirname, 'assets/images')))


app.use(router);


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});