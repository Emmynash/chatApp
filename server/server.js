const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;

app.use(express.static(publicPath));
// app.get('/', (req, res) => {
//     res.sendFile('index.html', (err) => {
//         if (err) {
//             return console.log(err);
//         }
//     })
// })
app.listen(port, (err) => {
    if (err) {
        return console.log(`server unable to start: ${err}`)
    }

    console.log(`server running on port ${port}`);
})