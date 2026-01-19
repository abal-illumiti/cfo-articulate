# CFO Articulate

This project is a Node.js application designed to run on SAP BTP (Cloud Foundry environment). It serves static Articulate Storyline content securely using the SAP Application Router and XSUAA service.

## Project Structure

The project consists of two main microservices:

*   **approuter**: The entry point for the application. It handles user authentication (via XSUAA) and routes requests to the backend application.
*   **apps**: A Node.js (Express) backend application that serves the static HTML5 content.

### Directories

*   `approuter/`: Contains the Application Router configuration and dependencies.
*   `apps/`: Contains the backend logic and static content.
    *   `CFOHome/`: Static content for the "CFO Home" articulate story.
    *   `101History/`: Static content for the "101 History" articulate story.
*   `security/`: Contains the XSUAA security descriptor (`xs-security.json`).

## Prerequisites

*   Node.js (v10 or higher recommended)
*   Cloud Foundry CLI (`cf`)
*   An SAP BTP subaccount with Cloud Foundry enabled.

## Installation

1.  Clone the repository.
2.  Install dependencies for the App Router:
    ```bash
    cd approuter
    npm install
    ```
3.  Install dependencies for the backend app:
    ```bash
    cd ../apps
    npm install
    ```

## Configuration

*   **manifest.yml**: Defines the deployment configuration for Cloud Foundry, including memory, routes, and service bindings.
*   **security/xs-security.json**: Defines the scopes and role templates for the XSUAA service.

## Deployment

1.  **Login to Cloud Foundry:**
    ```bash
    cf login
    ```

2.  **Create the XSUAA Service Instance (Manual Step):**
    Before deploying, you must MANUALLY create the XSUAA service instance using the security descriptor. This is not automated by the push command.
    ```bash
    cf create-service xsuaa application cfo-articulate-uaa -c security/xs-security.json
    ```

3.  **Deploy the Application:**
    Navigate to the root directory and push the application using the manifest.
    ```bash
    cf push
    ```

## Usage

Once deployed, the application will be accessible via the App Router's URL.

*   **CFO Home**: `https://<approuter-url>/home/CFOHome/`
    *   Serves `CFOHome/story.html`
    *   Requires `read` scope.
*   **101 History**: `https://<approuter-url>/home/101History/`
    *   Serves `101History/story.html`
    *   Requires `read` scope.
*   **Form 101**: `https://<approuter-url>/home/Form101/`
    *   Serves `Form101/story.html`
    *   Requires `read` scope.

*Note: The `/home` path segment is defined in the `approuter/xs-app.json` route configuration.*
