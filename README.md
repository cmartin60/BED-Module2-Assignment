## Project Overview

This is a small Node.js + TypeScript API for managing branches and employees. It's for learning and demo purposes.

- Base path: `/api/v1`
- Data: Firestore (firebase-admin)
- Validation: Joi
- Docs: Swagger (OpenAPI)
-Security: Helmet and CORS

## Quick setup

1. Clone the repo and install:

```bash
git clone <repo-url>
cd BED-Module2-Assignment
npm install
```

2. Create a `.env` file (example below) and DON'T commit it or put it on .gitignore

3. Start the server:

```bash
npm start
```

## Minimal .env example

```env
NODE_ENV=development
PORT=3000
SWAGGER_SERVER_URL=http://localhost:3000/api/v1
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
ALLOWED_ORIGINS=https://example.com
```

## Quick examples

1) List employees:

```bash
curl http://localhost:3000/api/v1/employees
```

2) Get a branch:

```bash
curl http://localhost:3000/api/v1/branches/branch_123
```

3) Create an employee:

```bash
curl -X POST http://localhost:3000/api/v1/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name":"Jane","position":"Engineer","email":"jane@example.com","branchId":"branch_123"}'
```

## Docs

Open the Swagger UI after starting the server:

```
http://localhost:3000/api-docs
```

## Short security notes

- Don't commit `.env` or service-account JSONs. If you do, rotate keys or just add it to your .gitignore file
- Store secrets in GitHub Secrets or your CI provider. For `FIREBASE_PRIVATE_KEY` keep `\n` for newlines.

## Help

If something breaks (tests or keys), check `test/jest.setup.ts` and `config/firebaseConfig.ts`.
