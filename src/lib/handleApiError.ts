export function handleApiError(error: unknown, defaultMessage = 'Failed to process request') {
    console.error('API error:', error);
  
    let errorMessage = defaultMessage;
    let statusCode = 500;
  
    if (error instanceof Error) {
      errorMessage = error.message;
  
      if (error.message.includes('Missing required field')) {
        statusCode = 400;
      }
    }
  
    return Response.json({ error: errorMessage }, { status: statusCode });
  }
  