import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvXmvpwMdHXeHujRjVGh8UCRkBZRkGBt0",
  authDomain: "leetcode-clone-e42cd.firebaseapp.com",
  projectId: "leetcode-clone-e42cd",
  storageBucket: "leetcode-clone-e42cd.appspot.com",
  messagingSenderId: "747599546398",
  appId: "1:747599546398:web:6a12583c9723e993e9060f"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);



export { auth, firestore, app };