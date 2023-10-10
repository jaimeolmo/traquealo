# Traquealo

Traquealo is a web application where Puertorriqueños can report and monitor incidents that affect the quality of life of citizens. It serves as a repository of incidents for citizen oversight.

## Architecture Overview

This project is built using Next.js 13 as the front-end framework following the App Router paradigm. Vercel is used for hosting and deployment, and Azure Cosmos DB for the backend database. Other services will be used to delegate functions to them through different integrations. The idea is to be able to reuse existing services that are robust and of reasonable cost to avoid creating features that result in increasing the maintenance costs of the application.

## Architecture

### Front-end

- **Next.js**: This project uses Next.js as the front-end framework. Next.js is a React framework that provides server-side rendering, routing, and other features for building modern web applications.

### Hosting and Deployment

- **Vercel**: Vercel is used for hosting and deploying the Next.js application. It provides a seamless way to deploy and scale the application.

### Backend Database

- **Azure Cosmos DB**: Azure Cosmos DB is used as the backend database for this project. It's a globally distributed, multi-model database service that ensures high availability, low-latency, and scalability. For the Traquealo we are using the Serverless model and the Core (SQL) API for NoSQL which provides the flexibility of a NoSQL document store combined with the power of SQL for querying.

### Authentication and User Management

- **Clerk.com**: This project relies on Clerk.com as the authentication and user management provider. Clerk.com offers a secure and customizable solution for user authentication, identity management, and user account workflows.

## Continuous Integration and Continuous Deployment (CI/CD)

### Development Approach: Trunk-Based Development

By following the Trunk-based development model with a main branch for production-ready code and a staging branch for pre-deployment testing, we ensure a balance between rapid development and reliable releases. Vercel's automation and staging features complement this approach, making our development workflow efficient and controlled.

### The Main Branch

Main line of development. In this project, we follow the Trunk-based development model, which centers around a robust and stable main branch. Code that is merged into the main branch is considered production-ready. It undergoes rigorous testing and quality assurance processes to ensure stability and reliability.

### The Staging Branch

While the main branch is dedicated to production-ready code, we recognize the need for an intermediate staging branch. The staging branch acts as a testing ground for new features, bug fixes, and other changes. Code that is ready for testing but not yet production-ready is merged into the staging branch. Before code is deployed to the main production environment, it should undergo thorough testing in the staging environment. This allows us to catch and resolve issues in a controlled environment.

### Vercel Integration

- **CI/CD Pipeline**: Vercel serves as the backbone of our Continuous Integration and Continuous Deployment (CI/CD) pipeline. This means that as you make changes to project's codebase and push them to your GitHub repository, Vercel automatically handles the process of building, testing, and deploying the application.

- **Automated Deployments**: Whenever you push code changes to your designated branch (e.g., `main`), Vercel's CI/CD pipeline triggers an automated deployment process. It builds and deploys the updated version of your Next.js application seamlessly.

- **Preview Deployments**: Vercel provides the capability to create preview deployments for each pull request you open. This allows you and your team to review and test new features or changes in an isolated environment before merging them into the main branch.

## Vercel Configuration

To fully utilize Vercel for your CI/CD needs, you should configure your Vercel account and repository integration to align with your specific project requirements. Refer to Vercel's documentation for detailed instructions on setting up CI/CD workflows and configuring deployment settings.

By leveraging Vercel for CI/CD, we ensure that your project's development process is agile, efficient, and reliable, ultimately leading to a smoother and more productive development cycle.

## Contributing via Fork and Pull Request:

Collaborating involves a structured process to contribute to the project's development. The typical approach, is to fork the repository and then open a pull request (PR). However, if you are a collaborator with write access to the repository, you can create branches directly instead of forking. Here's a step-by-step guide for both scenarios:

Collaborating on an open-source project on GitHub involves a structured process to contribute to the project's development. The typical approach, as you mentioned, is to fork the repository and then open a pull request (PR). However, if you are a collaborator with write access to the repository, you can create branches directly instead of forking. Here's a step-by-step guide for both scenarios:

**Contributing via Fork and Pull Request:**

- **Fork the Repository:**

  - Go to the GitHub repository of the project you want to contribute to.
  - Click the "Fork" button in the upper-right corner of the repository's page. This will create a copy of the repository under your GitHub account.

- **Clone Your Fork:**

  - After forking, go to your forked repository on GitHub.
  - Click the "Code" button and copy the repository's URL.
  - Open your terminal and run the `git clone` command with the copied URL to create a local copy of your fork.

  ```bash
  git clone https://github.com/your-username/repository-name.git
  ```

- **Create a New Branch:**

  - Use the `git checkout` command to create and switch to a new branch for your contribution. Name the branch according to the feature or bug you're working on.

  ```bash
  git checkout -b feature-branch
  ```

- **Make Changes and Commit:**

  - Make the necessary code changes in your local branch.
  - Use the `git add` command to stage your changes and the `git commit` command to commit them with a descriptive commit message.

  ```bash
  git add .
  git commit -m "Add feature X"
  ```

- **Push Changes to Your Fork:**

  - Push your branch and changes to your fork on GitHub.

  ```bash
  git push origin feature-branch
  ```

- **Open a Pull Request (PR):**

  - Go to your fork on GitHub and switch to the branch you pushed.
  - Click the "New Pull Request" button.
  - Compare the changes between your branch and the original repository's branch.
  - Add a descriptive title and comments to explain your changes.
  - Click "Create Pull Request."

- **Collaborative Review and Merge:**
  - The project maintainers will review your PR.
  - Make any requested changes based on the review feedback.
  - Once approved, your PR can be merged into the main project.

## Development Environment Setup

To set up your development environment for this project, follow these steps:

Make sure you are using Node version 18.xx and npm 9.xx.

- **Clone the Repository**: Clone the project repository to your local machine using Git. Remember to follow the approach mentioned above.

  ```bash
  git clone https://github.com/jaimeolmo/traquealo.git
  ```

- **Install Dependencies**: Navigate to the project directory and install the required dependencies.

  ```bash
  cd traquealo
  npm install
  ```

- **Environment Variables**: Set up environment variables for your project. You may need to configure environment variables related to your Azure Cosmos DB connection, API keys, and any other sensitive information. All required variables should be described in the .env.local.example file.

  ```bash
  cp .env.local.example .env.local
  ```

  Update the `.env.local` file with your environment-specific configurations.

Before continuing let's talk a little about the database.

## Configuring Azure Cosmos DB Emulator for Development

In your local development environment, you can use the Azure Cosmos DB Emulator to simulate and test interactions with your database before deploying to the production database instance. Follow these steps to set up and configure the emulator:

Note: If you have access to an Azure account and prefer to use it for development, you can skip the emulator steps and go to directly to fill out the required environment variables in the .env.local file. If you are using an Apple device, connecting to Azure is going to be your best option.

### Download and Install Azure Cosmos DB Emulator

- Visit the [Azure Cosmos DB Emulator download page](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator) and download the emulator for your operating system (Windows or Linux).

- Install the emulator following the installation instructions provided on the download page.

- Launch the Azure Cosmos DB Emulator after installation. You can typically find it in your program menu.

- The emulator will start and run locally on your machine, simulating the Azure Cosmos DB environment.

- To Access the Emulator Portal. Open a web browser and navigate to the Azure Cosmos DB Emulator portal. The default URL is usually `https://localhost:8081/_explorer/index.html`.

- Here, you can manage your local Cosmos DB resources, including databases, containers, and documents, using a web-based interface similar to the Azure portal.

- Connect your local development. Go to the .env.local file and update the application's connection settings. Typically, this involves changing the endpoint and authentication key to connect to the local emulator rather than the Azure production instance.

```bash
COSMOSDB_ENDPOINT=••••
COSMOSDB_KEY=••••
COSMOSDB_USERS_CONTAINER=users
COSMOSDB_DATABASE_NAME=traquealo
```

- Make sure to replace `COSMOSDB_KEY` with the appropriate key obtained from the emulator's portal. Same for the endpoint.

- You can now create databases, containers, and insert test data into your local Cosmos DB emulator instance for development and testing purposes.

### Authentication

As mentioned earlier, this project relies on [Clerk](https://clerk.com/) for authentication and user management processes. Therefore, you will need a Clerk account. The free tier should be more than enough for development purposes. The two required keys are:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_••••
CLERK_SECRET_KEY=sk_test_••••
```

### Start the Development Server

Start the Next.js development server to begin working on your project locally.

```bash
npm run dev
```

- **Access the Application**: Open your web browser and access the development version of your application at `http://localhost:3000`.

- **Code and Test**: Begin coding and testing your application. You can make changes to the Next.js components and connect them to Azure Cosmos DB for data storage and retrieval.

- When ready, proceed to upload changes.

## Additional Resources

For more detailed information and specific configurations, refer to the project's documentation and the documentation for Next.js, Vercel, and Azure Cosmos DB.

Now you have a basic understanding of the project architecture and how to set up your development environment. Happy coding!
