#!/usr/bin/env node

const Fs = require('fs');
const Path = require('path');

const fileDir = Path.join(__dirname, '..', 'docs_readme.md');

const { VERSION, DATE } = process.env;

const template =
`# Gym Mate Backend

### Current versión: ${VERSION}

### Author: Pablo García Egido <pgarciaegido@gmail.com>

### Latest update: ${DATE}

### [Github repository](https://github.com/pgarciaegido/gym-mate_backend)

### [Open an issue](https://github.com/pgarciaegido/gym-mate_backend/issues)
`;


Fs.writeFile(fileDir, template, 'utf8', (err) => {

    if (err) return console.log(`There was an error: ${err}`);

    console.log(`
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    Docs modified with ${VERSION} version
    
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    `);
});
