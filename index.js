// implement your API here

// import express
const express = require('express');
const server = express()

const port = 8000;
server.listen(port, () => console.log(` API IT LISTENING ON PORT ${port}`))