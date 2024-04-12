import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp)=> {

const firebaseConfig = {
  apiKey: "AIzaSyAdx1Q6dmnTDB4CFQ9k2RTrzqvLjQK8EDI",
  authDomain: "daptee-test.firebaseapp.com",
  projectId: "daptee-test",
  storageBucket: "daptee-test.appspot.com",
  messagingSenderId: "931551813468",
  appId: "1:931551813468:web:b7327b4743135356292b99"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


return {
    provide: {
        auth,
    }
}
})