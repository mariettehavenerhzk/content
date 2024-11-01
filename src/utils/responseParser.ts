export function parseWebhookResponse(response: any): string {
  try {
    // Handle null or undefined
    if (!response) {
      throw new Error('Empty response received');
    }

    // Handle string responses
    if (typeof response === 'string') {
      if (!response.trim()) {
        throw new Error('Empty string response received');
      }
      return response;
    }

    // Handle JSON responses
    if (typeof response === 'object') {
      // Check common response fields
      const possibleFields = ['response', 'content', 'text', 'message', 'data', 'result'];
      
      for (const field of possibleFields) {
        if (response[field]) {
          const content = response[field];
          if (typeof content === 'string') {
            return content;
          }
          if (typeof content === 'object') {
            return JSON.stringify(content);
          }
        }
      }

      // If no known fields found but response is an object, stringify it
      const stringified = JSON.stringify(response);
      if (stringified !== '{}') {
        return stringified;
      }
    }

    throw new Error('Invalid response format');
  } catch (error) {
    throw new Error(`Failed to parse response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}