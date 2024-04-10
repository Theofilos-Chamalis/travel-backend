/**
 * Get the configuration for the server and database from the environment variables
 *
 * @returns {{server: {environment: any, isProduction: boolean, port: any, certificatesPath: string, domain: any, serverUrl: string, ipAddress: any, https: boolean}, database: {password: any, port: any, host: any, name: any, connectionUrl: string, user: any}}}
 */
export const getConfig = () => {
  const environment = process.env.NODE_ENV || 'development';
  const isProduction = environment === 'production';

  let port;

  if (isProduction) {
    port = process.env.PROD_PORT || 3334;
  } else {
    port = process.env.DEV_PORT || 3333;
  }

  const https = process.env.HTTPS === 'true';
  const domain = process.env.DOMAIN || '';
  const ipAddress = process.env.IP_ADDRESS || 'localhost';
  const serverUrl = https ? 'https://' + domain : 'http://' + ipAddress;
  const certificatesPath = https ? '/etc/letsencrypt/live/' + domain : '';

  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbPort = process.env.DB_PORT;
  const dbName = process.env.DB_NAME;
  const dbAuth = process.env.DB_AUTH;

  const dbAuthString =
    dbAuth?.toLowerCase() === 'true' ? `${dbUser}:${dbPassword}@` : '';

  const connectionUrl = `postgresql://${dbAuthString}${dbHost}:${dbPort}/${dbName}?connect_timeout=10`;

  return {
    server: {
      environment,
      isProduction,
      port,
      domain,
      https,
      ipAddress,
      serverUrl,
      certificatesPath,
    },
    database: {
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      port: dbPort,
      name: dbName,
      connectionUrl,
    },
  };
};
