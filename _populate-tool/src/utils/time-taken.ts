export function timeTaken(operation: () => void): void {
	const startTime = performance.now();

	operation();

	const time = performance.now() - startTime;
	console.log(time);
}
