export function handleApiError(
  error: unknown,
  defaultMessage = 'Failed to process request'
) {
  console.error('API error:', error);

  let errorMessage = defaultMessage;
  let statusCode = 500;

  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code?: string };
    if (prismaError.code === 'P2003') {
      errorMessage =
        'Invalid data in the uploaded file. Please ensure all referenced IDs exist in the system.';
      statusCode = 400;
    }
  }

  if (error instanceof Error) {
    errorMessage = errorMessage === defaultMessage ? error.message : errorMessage;

    if (error.message.includes('Missing required field')) {
      statusCode = 400;
    }
  }

  return Response.json({ error: errorMessage }, { status: statusCode });
}
