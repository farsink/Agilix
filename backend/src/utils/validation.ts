/**
 * Validates if a string is a proper UUID format
 * @param id - String to validate
 * @returns boolean indicating if string is valid UUID
 */
export const isValidUUID = (id: string): boolean => {
  if (!id) return false;

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

/**
 * Standardized error response utility
 * @param res - Express Response object
 * @param statusCode - HTTP status code
 * @param message - Error message
 */
export const sendErrorResponse = (res: any, statusCode: number, message: string) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
