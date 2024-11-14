const menuBtn = document.getElementById("menu_cel_btn");
const menu = document.getElementById("menu");
const header = document.getElementById("header");

const headerDisplayPhone = () => {
  menuBtn.addEventListener("click", () => {
    if (menu.classList.contains("flex")) {
      menu.classList.remove("flex");
      menu.classList.add("hidden");
    } else {
      menu.classList.remove("hidden");
      menu.classList.add("flex");
    }
  });
};

headerDisplayPhone();

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 0 && window.innerWidth > 640) {
    header.classList.add("bg-slate-950");
  } else {
    header.classList.remove("bg-slate-950");
  }
});
