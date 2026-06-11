// Local Firebase Emulator config for Sticker Swap.
//
// Copy this file to firebase-config.js when testing against the Firebase
// Emulator Suite. This is not for production and does not require a real
// Firebase project.
//
// Start emulators first:
//   firebase emulators:start --only auth,database
//
// Then serve the app locally:
//   npm run serve
//
// Open:
//   http://127.0.0.1:4173/index.html?emulator=1
window.STICKER_SWAP_FIREBASE_CONFIG = {
  apiKey: "demo-api-key",
  authDomain: "sticker-swap-local.firebaseapp.com",
  databaseURL: "https://sticker-swap-local-default-rtdb.firebaseio.com",
  projectId: "sticker-swap-local",
  emulators: {
    authHost: "127.0.0.1",
    authPort: 9099,
    databaseHost: "127.0.0.1",
    databasePort: 9000
  }
};
