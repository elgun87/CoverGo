# DemoBlazer

# Cypress UI Automation Framework
This project contains automated UI tests built with Cypress using JavaScript.

Prerequisites
Make sure you have the following installed on your machine:

Node.js (includes npm)

Check Installation:
Run these commands in your terminal:
node -v
npm -v
If you don't have Node.js:

Go to Node.js Official Website

Download and install the LTS version.

🚀 Setup Instructions
1. Clone the Repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
2. Initialize npm (if not already initialized)
If you don't see a package.json file inside your project, run:


npm init -y
This will quickly create a package.json file with default values.

3. Install Cypress
Install Cypress as a development dependency:

npm install cypress --save-dev
After this, you should see cypress listed under devDependencies in your package.json.

🧪 How to Run Cypress Tests
You have two options to run tests:

Option 1: Open Cypress Test Runner (Interactive Mode)

npx cypress open
This will launch the Cypress Test Runner window.

Select the test spec files you want to execute.

Option 2: Run Tests in Headless Mode (Terminal)

npx cypress run
Runs tests without opening a browser window.

Useful for automated pipelines like Jenkins or GitHub Actions.

🛠 Project Structure
Example folder structure:
```
cypress/
  ├── integration/
  │    ├── example/
  │ 
  ├── fixtures/
  ├── support/
  │    ├── commands.js
  │    └── e2e.js
```
cypress.config.js
package.json
README.md
cypress/integration/examples — Contains test specs.

cypress/fixtures — Static test data (JSON files).

cypress/support — Custom commands and test hooks.

cypress.config.js — Cypress global configuration file.
