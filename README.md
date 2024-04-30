# Greeting Application

## Introduction

The Greeting Application is a functional demonstration of a web application built using a microservices architecture. This educational tool is designed to enhance understanding of web development workflows and technologies, specifically focusing on Node.js, Express, EJS, and MongoDB. Students will gain hands-on experience by constructing the CI/CD pipeline and Docker configurations as part of their learning process.

## Architecture

The application is divided into three main components:

1. **Front-end Application:** Built with Node.js, utilizing Express as the server framework and EJS for templating. It serves as the user interface where users can submit names and see greetings for each stored name.

2. **REST API:** This Node.js application uses Express to handle HTTP requests. It manages interactions with the MongoDB database by providing endpoints to add new names and retrieve all existing names.

3. **MongoDB Database:** Used for storing names submitted through the API. Students are expected to deploy MongoDB as an independent Docker container, configuring it to integrate seamlessly with the rest of the application.

## Features

- **Submit Names:** Users can input names through a web form.
- **View Greetings:** Displays greetings for each name retrieved from the database.
- **Build and Deploy:** Students are tasked with setting up Docker containers and configuring Docker Compose to manage the application's services.

## Setup Instructions

### Prerequisites

Before setting up the project, ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)
- Docker

### Application Setup

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd my-web-app
   ```

2. **Install Dependencies**
   Navigate to each project component directory (`api` and `web`) and install the required Node.js packages:
   ```bash
   cd api
   npm install
   cd ../web
   npm install
   ```

3. **Create the Docker Compose File**
   As part of the exercise, you are to create a `docker-compose.yml` file that orchestrates the front-end, API, and MongoDB database containers. This file should define the necessary services, networks, and volumes.

4. **Build and Run the Application**
   Once your Docker Compose file is ready, build and run the containers:
   ```bash
   docker-compose up --build
   ```

5. **Access the Application**
   - The web interface can be accessed at `http://localhost:3000`.
   - The API will be available at `http://localhost:3001/api/names`.

## Contributing

We encourage you to contribute to this project as part of your learning. Suggestions for new features, improvements in the documentation, or fixes are welcome.

Please adhere to the following steps for contributing:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
