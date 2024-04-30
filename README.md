This scaffold will consist of three main components:

1. **Front-end Application:** A Node.js application using Express and EJS as the view engine.
2. **REST API:** Another Node.js application with Express that serves as the backend API.
3. **MongoDB Database:** A MongoDB instance running in a Docker container.

### Directory Structure

Here’s how the project directory might look:

```
/my-web-app
|-- /api                   # API source files
|   |-- server.js          # Entry point for the API server
|   |-- /routes            # API routes
|   `-- /controllers       # API logic
|-- /web                   # Web application source files
|   |-- app.js             # Entry point for the web server
|   |-- /views             # EJS templates
|   |-- /public            # Static files like CSS, JavaScript, images
|   `-- /routes            # Web app routes
|-- /docker-compose.yml    # Docker compose file to orchestrate containers
`-- /README.md             # Project documentation
```

### Setting Up the API

1. **Initialize a new Node.js project:**
   ```bash
   cd api
   npm init -y
   npm install express mongoose
   ```

2. **Create a basic server (`server.js`):**
   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const app = express();

   app.use(express.json());

   const port = process.env.PORT || 3001;

   app.get('/api/status', (req, res) => {
       res.status(200).send('API is running...');
   });

   // Connect to MongoDB
   mongoose.connect('mongodb://mongo:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('MongoDB connected...'))
     .catch(err => console.log(err));

   app.listen(port, () => {
       console.log(`API server listening on port ${port}`);
   });
   ```

### Setting Up the Web Frontend

1. **Initialize a new Node.js project:**
   ```bash
   cd web
   npm init -y
   npm install express ejs
   ```

2. **Create the web server (`app.js`):**
   ```javascript
   const express = require('express');
   const app = express();

   app.set('view engine', 'ejs');
   app.use(express.static('public'));

   const port = process.env.PORT || 3000;

   app.get('/', (req, res) => {
       res.render('index', { title: 'Home Page' });
   });

   app.listen(port, () => {
       console.log(`Web server listening on port ${port}`);
   });
   ```

### Docker Compose Configuration (`docker-compose.yml`)

This Docker Compose file will set up the MongoDB container and allow both the API and web app to connect to it:

```yaml
version: '3.8'
services:
  mongo:
    image: mongo
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"
  api:
    build: ./api
    ports:
      - "3001:3001"
    depends_on:
      - mongo
  web:
    build: ./web
    ports:
      - "3000:3000"
    depends_on:
      - api

volumes:
  mongo-data:
```

### Instructions

1. **Create the necessary directories and files as outlined.**
2. **Fill in the REST API logic and routes as required by your application.**
3. **Develop the EJS views and public assets for your front end.**
4. **Run `docker-compose up` to start all components.**

This scaffold will help your students get started with developing a CI/CD pipeline that involves a front-end, a REST API, and a MongoDB database running in a Docker container. Adjust the complexity and features based on the specific requirements and skill level of the students.


Certainly! We'll expand the scaffold for the web application so that the front-end can send a name to the API, which then stores it in a MongoDB database. The front-end will also retrieve and display greetings for all names stored in the database. Below are the expanded instructions and code for each part of the application:

### Expanding the API

**1. Modify the API to handle storing names and retrieving all names:**

- **Install additional packages:** You'll need `body-parser` for parsing POST requests.
  ```bash
  npm install body-parser
  ```

- **Update `server.js` in the API directory:**
  ```javascript
  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const app = express();

  app.use(bodyParser.json());

  const port = process.env.PORT || 3001;

  // Schema for the Name
  const nameSchema = new mongoose.Schema({
    name: String
  });
  const Name = mongoose.model('Name', nameSchema);

  // POST endpoint to add a new name
  app.post('/api/names', (req, res) => {
    const newName = new Name({ name: req.body.name });
    newName.save()
      .then(() => res.status(201).send('Name added'))
      .catch(err => res.status(400).json(err));
  });

  // GET endpoint to fetch all names
  app.get('/api/names', (req, res) => {
    Name.find()
      .then(names => res.json(names))
      .catch(err => res.status(400).json(err));
  });

  // Connect to MongoDB
  mongoose.connect('mongodb://mongo:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

  app.listen(port, () => {
      console.log(`API server listening on port ${port}`);
  });
  ```

### Expanding the Front-end

**1. Add the capability to send a name to the API and display greetings:**

- **Update `app.js` in the web directory:**
  ```javascript
  const express = require('express');
  const fetch = require('node-fetch'); // You need to install node-fetch
  const bodyParser = require('body-parser');
  const app = express();

  app.set('view engine', 'ejs');
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: true }));

  const port = process.env.PORT || 3000;

  app.get('/', (req, res) => {
    fetch('http://api:3001/api/names')
      .then(response => response.json())
      .then(names => res.render('index', { names }))
      .catch(err => res.status(500).json(err));
  });

  app.post('/add-name', (req, res) => {
    fetch('http://api:3001/api/names', {
      method: 'POST',
      body: JSON.stringify({ name: req.body.name }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => res.redirect('/'))
    .catch(err => res.status(500).json(err));
  });

  app.listen(port, () => {
      console.log(`Web server listening on port ${port}`);
  });
  ```

- **Create or update the `index.ejs` in the views directory:**
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greeting App</title>
  </head>
  <body>
    <h1>Greeting App</h1>
    <form action="/add-name" method="post">
      <input type="text" name="name" required>
      <button type="submit">Add Name</button>
    </form>
    <h2>Greetings</h2>
    <ul>
      <% names.forEach(function(name) { %>
        <li>Hello, <%= name.name %>!</li>
      <% }); %>
    </ul>
  </body>
  </html>
  ```

**2. Install `node-fetch` in the web project:**
```bash
npm install node-fetch
```

### Final Setup and Execution

Make sure all services are correctly configured in your Docker setup to allow communication between containers. Running `docker-compose up --build` will rebuild the images if you've made changes to the Docker configurations or dependencies.

This setup allows the front-end to submit names to the API, which stores them in MongoDB, and then displays greetings for all names stored in the database on the front-end.
