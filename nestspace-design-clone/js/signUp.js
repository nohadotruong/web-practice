function handleSubmit(event) {
  event.preventDefault();

  const email = $("#email").val();
  const username = $("#username").val();
  const password = $("#password").val();
  const cPassword = $("#cpassword").val();
  const checkbox = $("#checkbox").prop("checked");

  const emailErr = $("#email-error");
  const usernameErr = $("#username-error");
  const passwordErr = $("#password-error");
  const cPasswordErr = $("#cpassword-error");
  const checkboxErr = $("#checkbox-error");

  emailErr.text("");
  usernameErr.text("");
  passwordErr.text("");
  cPasswordErr.text("");
  checkboxErr.text("");

  let isValid = true;

  if (!email.trim()) {
    emailErr.text("Email is required!");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailErr.text("Email is invalid!");
    isValid = false;
  }

  if (!username.trim()) {
    usernameErr.text("Username is required!");
    isValid = false;
  }

  if (!password.trim()) {
    passwordErr.text("Password is required!");
    isValid = false;
  }

  if (!cPassword.trim()) {
    cPasswordErr.text("Confirm password is required!");
    isValid = false;
  } else if (cPassword !== password) {
    cPasswordErr.text("Passwords do not match!");
    isValid = false;
  }

  if (!checkbox) {
    checkboxErr.text("You must agree to continue!");
    isValid = false;
  }

  if (isValid) {
    const userList = JSON.parse(
      localStorage.getItem("userList") || "[]"
    );

    const userData = {
      email: email,
      username: username,
      password: password,
    };

    userList.push(userData);

    localStorage.setItem(
      "userList",
      JSON.stringify(userList)
    );

    localStorage.setItem("newUser", userData.username);

    alert("Sign Up Successfully!");
    window.location.href = "signIn.html";
  }
}
