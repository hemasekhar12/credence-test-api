const express = require('express');
const dbInit = require('./db/init');
const booksRoute = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;


dbInit();


app.use(express.json());


app.use('/books', booksRoute);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
