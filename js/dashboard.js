const jsonDataString = localStorage.getItem("jsonData");
const jsonData = JSON.parse(jsonDataString);
console.log(jsonData.response.Name);
const stdname = jsonData.response.Name;
document.getElementById("StudentName").innerText = stdname;
document.getElementById("marks").innerText = jsonData.response.Maths;