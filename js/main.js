import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDatabase, ref, set, child, get, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8G4QNQ9hRGmKuiZRhhEkBIX8ici6Am8Y",
  authDomain: "aims-public-school-55307.firebaseapp.com",
  databaseURL: "https://aims-public-school-55307-default-rtdb.firebaseio.com",
  projectId: "aims-public-school-55307",
  storageBucket: "aims-public-school-55307.appspot.com",
  messagingSenderId: "466475030046",
  appId: "1:466475030046:web:10b1bdf14cadd96bf7400f",
  measurementId: "G-6T9PD9D80G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

const signin = document.getElementById('signin');


async function getUserData(userId) {
  const dbRef = ref(database);
  try {
      const snapshot = await get(child(dbRef, `Students/PreBoardOne/${userId}`));
      if (snapshot.exists()) {
          return snapshot.val();
      } else {
          console.log("No data available");
          return null;
      }
  } catch (error) {
      console.error(error);
      return null;
  }
}

signin.addEventListener("click", function(event){
  const email = document.getElementById('your_name').value;
  const password = document.getElementById('your_pass').value;

  event.preventDefault();
  signInWithEmailAndPassword(auth, email, password).then(async(userCredential) => {
    const user = userCredential.user;
    
    if(user){

      getUserData(user.uid).then((response) => {
        if(response){
          const jsonData = { response };
          localStorage.setItem("jsonData", JSON.stringify(jsonData));
          console.log(jsonData);
          window.location.href = "dashboard.html";
        }
      });
      /*if(response){
        console.log(response.Name);
        document.getElementById("StudentName").innerText = response.Name;
        document.querySelector('.form-title').textContent = 'Pre-Board 1';
        document.querySelector('.form-title:nth-of-type(3)').textContent = 'Subjects / Marks';
        document.querySelector('.form-title:nth-of-type(4)').textContent = `Maths (${response.Maths} / 50)`;
        window.location.href = "dashboard.html";
      }*/
    }
  })
  .catch((error) => {
    const errorMessage = error.message;

  });
});