# Zeller React Native Code Challenge – Step-by-Step Guide

This guide explains the full project setup, mock server usage, testing instructions, and folder structure.

---

## 📱 How to Run the App

Make sure you have the React Native environment set up.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the Metro server:
   ```bash
   npm start
   ```

3. To run the Android app:
   ```bash
   npm run android
   ```

4. To run the iOS app:
   ```bash
   npm run ios
   ```

---

## 🧪 How to Run Tests

Unit tests are written using Jest and React Native Testing Library.

Run all tests with:
```bash
npm test
```

Make sure you have the mock server running for tests involving network data.

---

## 🚀 Mock Server Setup

The project uses Apollo Server with GraphQL mocks.

1. To start the mock GraphQL server:
   ```bash
   node mock-server.js
   ```

2. This server uses the schema from `src/graphql/schema.gql` and mocks resolvers from:
   - `src/graphql/listZellerCustomers.js`
   - `src/graphql/getZellerCustomer.js`

3. The server starts on the default port (likely `4000`). You can change the port inside `mock-server.js` if needed.

---

## 🗂 Project Structure

```
zellerApp/
├── App.tsx                         # Entry point with ApolloProvider & Navigation
├── index.js                        # React Native entry
├── package.json                    # Scripts and dependencies
├── mock-server.js                  # GraphQL mock server
├── src/
│   ├── components/
│   │   └── UserCard.tsx            # UI card to render each user
│   ├── screens/
│   │   └── HomeScreen.tsx          # Main screen for user filtering & display
│   ├── graphql/
│   │   ├── schema.gql              # GraphQL schema definition
│   │   ├── listZellerCustomers.js  # Mock resolver
│   │   └── getZellerCustomer.js    # Mock resolver
│   └── aws-exports.js              # Mocked AWS config (not actually used)
├── __tests__/
│   ├── App.test.tsx                # Basic render test
│   └── HomeScreen.test.tsx         # UI test for filtering and rendering
├── jest.config.js                  # Jest config
├── jest.setup.js                   # Test setup
├── tsconfig.json                   # TypeScript config
└── .eslintrc.js / .prettierrc.js   # Linting and formatting
```

---

## 💡 Notes

- Make sure the mock server is running when using GraphQL queries.
- The role-based filtering includes `Admin`, `Manager`, and `All`.
- Supports pull-to-refresh and search.