// implement your API here

// import express
const express = require('express');
const server = express()
server.use(express.json())

// bring in the users data
const users = require('./data/db');

// GET: users
server.get('/api/users', (req, res) => {
    users.find()
    .then(users => res.status(200).json({users: users}))
    .catch(err => res.status(400).json({message: " Ubable to get users", err: err}))
})

// GET: get user by id
server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    users.findById(userId)
    .then(user => {
        console.log(user)
        if(user){     
            res.status(200).json({user: user})
        } else {
            res.status(404).json({user: user})
        }   
    })
    .catch(err => res.status(500).json({ error: "The user information could not be retrieved."}))
})

// POST: users, create a new user
server.post("/api/users", (req, res) => {
    const newUser = req.body
    if(!newUser.name || !newUser.bio) {
        res.status(401).json({message: " Please provide a name and bio for a user"})
    }
    users.insert(newUser)
    .then(newUser => res.status(201).json({newUserId: newUser}))
    .catch(err => res.status(500).json({message: "Something happened in the server", err: err}))
})

// DELETE: Delete a passed user
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    users.findById(id)
    .then( user => {
        if(user){ 
            res.status(200).json({user:user})
            users.remove(id)
            .catch(err => res.status(500).json({message: "The user could not be removed"}))
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    })
})


const port = 8000;
server.listen(port, () => console.log(` API IT LISTENING ON PORT ${port}`))