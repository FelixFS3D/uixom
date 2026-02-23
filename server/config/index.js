require('dotenv').config();
const Joi = require('joi');

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().integer().min(1).max(65535).default(5005),
  MONGODB_URI: Joi.string().uri().default('mongodb://127.0.0.1:27017/uixom'),
  JWT_SECRET: Joi.string()
    .min(20)
    .when('NODE_ENV', {
      is: 'production',
      then: Joi.required(),
      otherwise: Joi.string().default('dev-secret-change-me-please'),
    }),
  JWT_EXPIRES_IN: Joi.string().default('2h'),
  BCRYPT_ROUNDS: Joi.number().integer().min(8).max(14).default(10),
  CORS_ORIGINS: Joi.string().default('*'),
  CORS_ALLOW_CREDENTIALS: Joi.boolean().truthy('true', '1').falsy('false', '0').default(false),
  RATE_LIMIT_WINDOW_MINUTES: Joi.number().integer().min(1).default(15),
  RATE_LIMIT_MAX: Joi.number().integer().min(10).default(100),
  TRUST_PROXY: Joi.boolean().truthy('true', '1').falsy('false', '0').default(false),
  SMTP_HOST: Joi.string().allow(''),
  SMTP_PORT: Joi.number().integer().min(1).max(65535).empty('').default(null),
  SMTP_SECURE: Joi.boolean().truthy('true', '1').falsy('false', '0').default(false),
  SMTP_USER: Joi.string().allow(''),
  SMTP_PASS: Joi.string().allow(''),
  EMAIL_FROM: Joi.string().allow(''),
  EMAIL_TEAM_TO: Joi.string().allow(''),
  EMAIL_REPLY_TO: Joi.string().allow(''),
}).unknown();

const { value: envVars, error } = envSchema.validate(process.env, { abortEarly: false });

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

const parseOrigins = (origins) => {
  if (!origins || origins === '*') return '*';
  return origins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const parseEmails = (emails) => {
  if (!emails) return [];
  return emails
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
};

const emailRecipients = parseEmails(envVars.EMAIL_TEAM_TO);

module.exports = {
  environment: envVars.NODE_ENV,
  isProduction: envVars.NODE_ENV === 'production',
  port: envVars.PORT,
  mongoURI: envVars.MONGODB_URI,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
  bcryptRounds: envVars.BCRYPT_ROUNDS,
  cors: {
    origins: parseOrigins(envVars.CORS_ORIGINS),
    allowCredentials: envVars.CORS_ALLOW_CREDENTIALS,
  },
  rateLimit: {
    windowMs: envVars.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
    max: envVars.RATE_LIMIT_MAX,
  },
  trustProxy: envVars.TRUST_PROXY,
  email: {
    host: envVars.SMTP_HOST || null,
    port: typeof envVars.SMTP_PORT === 'number' ? envVars.SMTP_PORT : null,
    secure: envVars.SMTP_SECURE,
    user: envVars.SMTP_USER || null,
    pass: envVars.SMTP_PASS || null,
    from: envVars.EMAIL_FROM || null,
    replyTo: envVars.EMAIL_REPLY_TO || null,
    teamRecipients: emailRecipients,
    enabled:
      Boolean(envVars.SMTP_HOST)
      && Boolean(envVars.SMTP_PORT)
      && Boolean(envVars.SMTP_USER)
      && Boolean(envVars.SMTP_PASS)
      && Boolean(envVars.EMAIL_FROM)
      && emailRecipients.length > 0,
  },
};
