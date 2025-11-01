import dotenv from "dotenv";

dotenv.config();

if (!process.env.FIREBASE_PROJECT_ID) {
    process.env.FIREBASE_PROJECT_ID = "test-project";
}

if (!process.env.FIREBASE_CLIENT_EMAIL) {
    process.env.FIREBASE_CLIENT_EMAIL = "test@local.test";
}

if (!process.env.FIREBASE_PRIVATE_KEY) {
    process.env.FIREBASE_PRIVATE_KEY =
        "-----BEGIN PRIVATE KEY-----\nTEST_PRIVATE_KEY_FOR_UNIT_TESTS\n-----END PRIVATE KEY-----\n";
}


export {};