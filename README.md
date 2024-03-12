# Email Scheduler Application

This is a Node.js application built with NestJS that allows scheduling and sending emails using SendGrid.

## Prerequisites

Before running the application, ensure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org) (version >= 14)
- [MongoDB](https://www.mongodb.com/) (running instance or connection URI)

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/iliyas-tech/email-scheduler.git
    ```

2. Navigate to the project directory:

    ```bash
    cd email-scheduler
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Configuration

Set up your environment variables by creating a `.env` file in the root directory of the project and adding the following content:

```plaintext
MONGO_CONNECTION_URI=your_mongo_uri
DB_NAME=your_db_name
SENDGRID_API_KEY=your_sendgrid_api_key
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
