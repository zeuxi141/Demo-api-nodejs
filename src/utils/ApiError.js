/**
 * Define a custom class ApiError that extends the built-in Error class (this is necessary and a best practice because Error class is a built-in class)
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    // Call the constructor of the parent class Error to use its properties (basic object-oriented programming knowledge)
    // The parent class (Error) already has the message property, so we can call it directly in super for simplicity
    super(message)

    // Set the name of this custom Error, if not set, it will inherit the name "Error" by default
    this.name = 'ApiError'

    // Assign our custom http status code here
    this.statusCode = statusCode

    // Capture the Stack Trace for convenient debugging
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError