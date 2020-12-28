const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.static('../../../../web/public'))

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));


















