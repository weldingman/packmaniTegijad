const express = require('express');
const app = express();

app.use(express.static('pacmani veebileht'));

app.listen(process.env.PORT || 8080, () => console.log('All is ok!'));
