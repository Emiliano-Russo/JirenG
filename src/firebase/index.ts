import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  getFirestore,
  collection,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  limit,
  startAfter,
  orderBy,
  startAt,
  enableIndexedDbPersistence,
  deleteDoc,
} from "firebase/firestore";
import { Game } from "../types/Game.interface";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
enableIndexedDbPersistence(db);

export const registerWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    username,
    authProvider: "local",
    email,
  });
  return res;
};

export const getUsername = async (uid: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  return querySnapshot.docs[0].data().username;
};

export const usernameExists = async (username: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0;
};

export const getUser = async (uid: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0].data();
};

export const getAllUserData = async () => {
  const usersRef = collection(db, "users");
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);
  const dataArr: any[] = [];
  querySnapshot.forEach((doc) => {
    dataArr.push(doc.data());
  });
  return dataArr;
};

export const emailExists = async (email: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0;
};

export const getGames = async (index: number, amount: number) => {
  const gamesRef = collection(db, "Games");
  const q = query(gamesRef, orderBy("title"), startAt(index), limit(amount));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {});
  return querySnapshot;
};

export const getThemes = async () => {
  const themesRef = collection(db, "Themes");
  const q = query(themesRef, orderBy("background"));
  const querySnapshot = await getDocs(q);
  const dataArr: any[] = [];
  querySnapshot.forEach((doc) => {
    dataArr.push(doc.data());
  });
  return dataArr;
};

export const changeUsername = async (uid: string, newUsername: string) => {
  const exists = await usernameExists(newUsername);
  if (exists) {
    throw new Error("Username already taken");
  }
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const userRef = querySnapshot.docs[0].ref;
  updateDoc(userRef, {
    username: newUsername,
  });
};

export const updateThemeUsing = async (uid: string, newTheme: string) => {
  console.log("Updating theme!!!");
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const userRef = querySnapshot.docs[0].ref;
  return updateDoc(userRef, {
    usingTheme: newTheme,
  });
};

export const editGame = async (gameName: string, editedGameParts: any) => {
  const gamesRef = collection(db, "Games");
  const q = query(gamesRef, where("title", "==", gameName));
  const querySnapshot = await getDocs(q);
  const gameRef = querySnapshot.docs[0].ref;
  return updateDoc(gameRef, editedGameParts);
};

export const deleteGame = async (title: string) => {
  const gamesRef = collection(db, "Games");
  const q = query(gamesRef, where("title", "==", title));
  const querySnapshot = await getDocs(q);
  const gameRef = querySnapshot.docs[0].ref;
  return deleteDoc(gameRef);
};

export const addNewGame = async (game: Game) => {
  return addDoc(collection(db, "Games"), game);
};

export const addTheme = async (theme: any) => {
  return addDoc(collection(db, "Themes"), theme);
};

export const deleteTheme = async (title: string) => {
  const gamesRef = collection(db, "Themes");
  const q = query(gamesRef, where("title", "==", title));
  const querySnapshot = await getDocs(q);
  const gameRef = querySnapshot.docs[0].ref;
  return deleteDoc(gameRef);
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  signOut(auth);
};

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (err) {
    console.error(err);
  }
};
