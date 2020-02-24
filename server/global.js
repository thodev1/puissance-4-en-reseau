<<<<<<< HEAD
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
=======
import {WebsocketManager} from "./ws/WebsocketManager";

WebsocketManager.ws = new WebsocketManager();
>>>>>>> 351bfe8f81498679dfae3d1971621f5200f415a5
