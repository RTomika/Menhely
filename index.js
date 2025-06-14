const closedEye = document.getElementById("closedEye");
const openEye = document.getElementById("openEye");
const userPassword = document.getElementById("userPassword");

closedEye.addEventListener("click", () => {
    userPassword.type = "text";
    closedEye.style.display = "none";
    openEye.style.display = "block";
});
openEye.addEventListener("click", () => {
    userPassword.type = "password";
    openEye.style.display = "none";
    closedEye.style.display = "block";
});
