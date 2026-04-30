const burger = document.getElementById("burger");
const navList = document.getElementById("navList");

burger.addEventListener("click", () => {
    navList.classList.toggle("active");
});