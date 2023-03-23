
export default {
	bail: true,
	// The directory where Jest should store its cached dependency information
	cacheDirectory: ".cache",

	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,

	// An array of file extensions your modules use
	moduleFileExtensions: [
		"js",
		"ts"
	],

	// The glob patterns Jest uses to detect test files
	testMatch: [
		"**/tests/**/*.test.ts"
	],

	// A map from regular expressions to paths to transformers
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},

	// Indicates whether each individual test should be reported during the run
	verbose: true,

};
