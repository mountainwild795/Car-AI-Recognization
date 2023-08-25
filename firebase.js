import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyCe8-IJKGUd-yXoYR0xQKMdSuIv5YsznDE",
//   authDomain: "fileuploads-be0db.firebaseapp.com",
//   projectId: "fileuploads-be0db",
//   storageBucket: "fileuploads-be0db.appspot.com",
//   messagingSenderId: "832032829361",
//   appId: "1:832032829361:web:f2079f619d4aad32ae9790",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCsrvpsELXKlpgTZ5StebtzyKBP84P5p4o",
  authDomain: "car-recognization.firebaseapp.com",
  projectId: "car-recognization",
  storageBucket: "car-recognization.appspot.com",
  messagingSenderId: "402391471069",
  appId: "1:402391471069:web:599f34ec5ad618de561c34",
  measurementId: "G-7VK9JSY81E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

