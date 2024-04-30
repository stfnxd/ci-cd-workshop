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
|   |-- /routes            # API routes (empty)
|   `-- /controllers       # API logic (empty)
|-- /web                   # Web application source files
|   |-- app.js             # Entry point for the web server
|   |-- /views             # EJS templates
|   |-- /public            # Static files like CSS, JavaScript, images (empty)
|   `-- /routes            # Web app routes (empty)
|-- /docker-compose.yml    # Docker compose file to orchestrate containers
`-- /README.md             # Project documentation
```
### Starting a Docker Container Locally with MongoDB

1. Run the following command to download the MongoDB docker container: 
   ```bash 
   docker pull mongo:4.4
   ```

2. Run the container 
   ```bash
   docker run -d -p 27017:27017 --name=mongo-example mongo:4.4
   ```

3. Verify the container is running
   ```bash
   docker ps
   ```   


