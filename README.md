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
