// Copy this shape into firebase-config.js after the owner creates the fresh
// public MVP Firebase project.
//
// Use the Firebase web app config from Project settings. Do not paste Firebase
// Admin SDK service-account JSON here.
//
// This web config is not an admin secret. Security comes from Anonymous Auth
// plus database.rules.json, which must be deployed before real-user testing.
//
// Demo mode at index.html?demo=1 does not use Firebase config.
window.STICKER_SWAP_FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.REGION.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
  measurementId: "G-XXXXXXXXXX"
};

// For local Firebase Emulator Suite testing, copy
// firebase-config.emulator.js to firebase-config.js instead.
