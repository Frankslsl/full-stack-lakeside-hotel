export function cusError(error: unknown, message: string): Error | null {
	if (error instanceof Error) {
		const newError = new Error(message) as Error & { originalError: Error };
		newError.originalError = error;
		console.error(error);
		return newError;
	}
	return null;
}
