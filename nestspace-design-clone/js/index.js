const header = document.getElementById("header__container");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("shrink");
    document.getElementById("scroll__btn").style.display =
      "flex";
  } else {
    header.classList.remove("shrink");
    document.getElementById("scroll__btn").style.display =
      "none";
  }
});

const userData = JSON.parse(
  localStorage.getItem("userData")
);

if (userData) {
  $("#signup-btn").hide();
  $("#signup2-btn").hide();
  $("#account-info").text(
    "Chào mừng " + userData.username + "!"
  );
  $("#account2-info").text(
    "Chào mừng " + userData.username + "!"
  );
  $("#signout-btn").show();
  $("#signout2-btn").show();
} else {
  $("#signup-btn").show();
  $("#signup2-btn").show();
  $("#account-info").hide();
  $("#account2-info").hide();
  $("#signout-btn").hide();
  $("#signout2-btn").hide();
}

function handleSignOut() {
  subMenu.classList.toggle("active");
  localStorage.removeItem("userData");
}

const subMenu = document.getElementById("sub-menu");

function toggleMenu() {
  subMenu.classList.toggle("active");

  if (subMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}
