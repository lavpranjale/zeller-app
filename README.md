# Zeller React Native Code Challenge – Step-by-Step Guide

This guide explains the full project setup, code structure, and feature implementation so you can understand everything clearly.

---

## 1. 📁 Project Structure
```
zeller-app/
├── App.tsx                      # Entry point with navigation and ApolloProvider
├── src/
│   ├── components/
│   │   ├── RadioSelector.tsx    # Component for Admin/Manager selection
│   │   └── UserCard.tsx         # Card UI for each user
│   ├── screens/
│   │   ├── UserListScreen.tsx   # Main screen: user list, search, filter
│   │   └── HomeScreen.tsx       # Bonus screen (empty)
│   └── services/
│       └── client.ts            # Apollo Client setup (points to mock server)
├── schema.gql                   # GraphQL schema for query reference
├── aws-exports.js               # (Unused here, as we use mock server)
└── README.md
```

---

## 2. 🚀 App Overview

### 📌 Goal:
Build a React Native app that shows a list of users fetched via GraphQL and allows filtering by user type (Admin/Manager).

### ✅ Core Features:
- Display list of users
- Filter by Admin/Manager
- Real-time search by name
- Pull-to-refresh

### ✨ Bonus Features:
- Navigation between "Users" and "Home"
- All components are modular & commented

---

## 3. ⚙️ Technologies Used
- **React Native + Expo** (cross-platform mobile app framework)
- **TypeScript** (typed JavaScript for safety)
- **Apollo Client** (GraphQL client for data fetching)
- **React Navigation** (for multi-screen setup)

---

## 4. 🔌 Apollo Client Setup
- Configured in `src/services/client.ts`
- Points to: `http://localhost:4000/graphql` (your local mock server)
```ts
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
```

---

## 5. 🔍 UserListScreen Logic
- Uses `useQuery()` to call the `listZellerCustomers` GraphQL query.
- Controlled state for:
  - `userType` — selected role (Admin/Manager)
  - `searchText` — search input
  - `refreshing` — pull-to-refresh flag

- Filters the user list by searchText.

---

## 6. 📦 Components Explained

### `RadioSelector.tsx`
- Renders two custom radio buttons (Admin, Manager)
- Calls `onSelect()` when user changes type

### `UserCard.tsx`
- Displays user's initial as an avatar
- Shows user's name and role

### `SearchBar` (inline in screen)
- Simple `<TextInput />` to search users by name

### `FlatList`
- Renders user cards
- Uses `refreshControl` for pull-to-refresh

---

## 7. 🧪 Running the App
1. Run mock server (if included):
```bash
cd mock-server
npm install
npm start
```

2. In another terminal:
```bash
npm install
npm start
```

Expo will open the simulator or give a QR code to scan.

---

## 8. 🧠 Learning Notes
- Apollo auto-refetches when `variables` change (e.g. type)
- GraphQL queries are strongly typed with TypeScript
- Component-based design keeps things modular and testable

---

Let me know if you want test cases, error handling, or animation added!
