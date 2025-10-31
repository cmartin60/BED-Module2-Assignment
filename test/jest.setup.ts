import dotenv from "dotenv";

// Load environment variables from .env for tests (if present)
dotenv.config();

// Provide safe defaults for Firebase environment variables during tests so
// initialization in `config/firebaseConfig.ts` doesn't throw. These values
// are only used in the test environment and should NOT be used in production.
if (process.env.NODE_ENV === "test" || process.env.JEST_WORKER_ID !== undefined) {
	process.env.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "test-project";
	process.env.FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL || "test@testing.iam.gserviceaccount.com";
	// Provide a dummy private key with escaped newlines (the config replaces \n with real newlines)
	process.env.FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY ||
		"-----BEGIN PRIVATE KEY-----\\nTEST_PRIVATE_KEY_VALUE\\n-----END PRIVATE KEY-----\\n";
}

// Any other global test setup can go here.
