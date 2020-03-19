export const environment = {
  production: false,
  caching: false,
  cors: {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Authorization', 'Content-Type', 'Accept'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: [`http://localhost:4200`, `localhost:4200`],
    preflightContinue: false,
    optionsSuccessStatus: 200
  }
};
