/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This script creates a persistent docker container from the specified environment variables that hosts the PostgreSQL database.
 */
const { exec } = require('child_process');

const { DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const command = `docker run --name ${DB_NAME}-postgres-container -e POSTGRES_PASSWORD=${DB_PASSWORD} -e POSTGRES_USER=${DB_USER} -e POSTGRES_DB=${DB_NAME} -p ${DB_PORT}:5432 -d --restart=always postgres:16-alpine`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec command error: ${error}`);
    return;
  }
  if (stdout) console.log(`stdout: ${stdout}`);
  if (stderr) console.error(`stderr: ${stderr}`);
});

console.log('Docker container is being created...');
