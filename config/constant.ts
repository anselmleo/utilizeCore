const SYSTEM_FAILURE = 'Internal server error!!!';

// middleware auth
const MIDDLEWARE_AUTH_CONSTANTS = {
  INVALID_API_KEY: 'Invalid API key',
  ACCESS_DENIED: 'Access denied. No authorization token provided',
  RESOURCE_FORBIDDEN: "You don't have access to the request resource.",
  INVALID_AUTH_TOKEN: 'Invalid token'
};

// order contants
const ORDER_CONSTANTS = {
  ORDER_SUCCESS: 'Operation successful',
  ORDER_FAILED: 'Operation failed',
  ORDER_NOT_FOUND: 'Order not found!'
};

// order contants
const ITEM_CONSTANTS = {
  ITEM_SUCCESS: 'Operation successful',
  ITEM_FAILED: 'Operation failed',
  ITEM_EXISTS: 'Item already exists',
  ITEM_NOT_FOUND: 'Item not found!'
};

export {
  SYSTEM_FAILURE,
  MIDDLEWARE_AUTH_CONSTANTS,
  ORDER_CONSTANTS,
  ITEM_CONSTANTS
};
