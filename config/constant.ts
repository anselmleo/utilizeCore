const SYSTEM_FAILURE = 'Internal server error!!!';

// middleware auth
const MIDDLEWARE_AUTH_CONSTANTS = {
  INVALID_API_KEY: 'Invalid API key',
  ACCESS_DENIED: 'Access denied. No authorization token provided',
  RESOURCE_FORBIDDEN: "You don't have access to the request resource.",
  INVALID_AUTH_TOKEN: 'Invalid token'
};

// auth contants
// const AUTH_CONSTANTS: object = {
//   INVALID_OPERATOR: "Invalid API key"
// };

export { SYSTEM_FAILURE, MIDDLEWARE_AUTH_CONSTANTS };
