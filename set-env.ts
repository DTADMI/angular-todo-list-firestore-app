const {writeFile} = require('fs');

// read environment variables from .env file
require('dotenv').config();

if (!process.env['NG_APP_FIREBASE_API_KEY'] || !process.env['NG_APP_FIREBASE_PROJECT_ID']) {
  console.error('All the required environment variables were not provided!');
  process.exit(-1);
}
console.log(`import meta env NG_APP_FIREBASE_MEASUREMENT_ID : ${process.env['NG_APP_FIREBASE_MEASUREMENT_ID']}`);

const targetPath = `./src/environments/environment.default.ts`;

const environmentFileContent = `
export const defaultEnvironment = {
    firebase: {
      apiKey: "${process.env['NG_APP_FIREBASE_API_KEY']}",
      authDomain: "${process.env['NG_APP_FIREBASE_AUTH_DOMAIN']}",
      projectId: "${process.env['NG_APP_FIREBASE_PROJECT_ID']}",
      storageBucket: "${process.env['NG_APP_FIREBASE_STORAGE_BUCKET']}",
      messagingSenderId: "${process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID']}",
      appId: "${process.env['NG_APP_FIREBASE_APP_ID']}",
      measurementId: "${process.env['NG_APP_FIREBASE_MEASUREMENT_ID']}"
    },
    serverUrl: "https://node-todo-list-api.web.app/todolist",
    authServerUrl: "https://node-todo-list-api.web.app/auth",
    production: false
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err: NodeJS.ErrnoException | null) => {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(`Wrote variables to ${targetPath}`);
});
