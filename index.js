const  express = require('express');

const app = express();

const PORT = 8001;

app.listen(PORT , () => console.log(`Server is running on port 8001 : ${PORT}`)); 
