'use strict';

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../react-client/dist/'));

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000!'));