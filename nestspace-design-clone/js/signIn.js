const userList = JSON.parse(
  localStorage.getItem("userList") || "[]"
);

const newUser = localStorage.getItem("newUser");
$("#username").val(newUser || "");

function handleSubmit(event) {
  event.preventDefault();

  const username = $("#username").val();
  const password = $("#password").val();

  const usernameErr = $("#username-error");
  const passwordErr = $("#password-error");

  usernameErr.text("");
  passwordErr.text("");

  let isValid = true;

  if (!username.trim()) {
    usernameErr.text("Username is required!");
    isValid = false;
  }

  if (!password.trim()) {
    passwordErr.text("Password is required!");
    isValid = false;
  }

  if (isValid) {
    let userData = null;
    for (let data of userList) {
      if (data.username === username) {
        userData = data;
        break;
      }
    }
    if (userData) {
      if (userData.password !== password) {
        passwordErr.text("Password incorrect!");
      } else {
        localStorage.setItem(
          "userData",
          JSON.stringify(userData)
        );
        localStorage.removeItem("newUser");
        alert("Sign In Successfully!");
        window.location.href = "../index.html";
      }
    } else {
      usernameErr.text("Username not found!");
    }
  }
}
