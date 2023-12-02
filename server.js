    const express = require('express');
    const bodyParser = require('body-parser');

    const server = express();
    const port = 3000;

    server.use(bodyParser.json());
    server.use(express.static('public'));
    server.use('/public', express.static(__dirname + '/public'));

    const notes = [];
    const users = [];

    server.get('/', (req, res) => {
        res.sendFile(__dirname + '/signup.html');
    });

    server.get('/index.html', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    server.get('/bg.gif', (req, res) => {
        res.sendFile(__dirname + '/bg.gif');
    })
    server.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    server.post('/api/notes', (req, res) => {
        const { note } = req.body;
        if (note) {
            notes.push(note);
            console.log(note);
            res.json({ message: 'Note added successfully' });
        } else {
            res.status(400).json({ error: 'Invalid request' });
        }
    });

    server.put('/api/notes/:index', (req, res) => {
        const index = parseInt(req.params.index);
        const { note } = req.body;
        if (!isNaN(index) && index >= 0 && index < notes.length && note) {
            notes[index] = note;
            res.json({ message: 'Note updated successfully' });
        } else {
            res.status(400).json({ error: 'Invalid index or note' });
        }
    });

    server.delete('/api/notes/:index', (req, res) => {
        const index = parseInt(req.params.index);
        if (!isNaN(index) && index >= 0 && index < notes.length) {
            notes.splice(index, 1);
            res.json({ message: 'Note deleted successfully' });
        } else {
            res.status(400).json({ error: 'Invalid index' });
        }
    });

    server.post('/api/signup', (req, res) => {
        const { username, password } = req.body;
        if (username && password) {
            users.push({ username, password });
            res.json({ message: 'User registered successfully' });
            console.log(users);
            res.redirect('/index.html');
        } else {
            res.status(400).json({ error: 'Invalid request' });
        }
    });

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
