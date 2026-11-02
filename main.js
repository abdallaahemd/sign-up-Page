let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let username = id("username"),
  email = id("email"),
  password = id("password"),
  form = id("form"),
  errorMsg = classes("error"),
  successIcon = classes("success-icon"),
  failureIcon = classes("failure-icon");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const results = [
    engine(username, 0, "Username cannot be blank"),
    engine(email, 1, "Email cannot be blank"),
    engine(password, 2, "Password cannot be blank"),
  ];

  // all fields valid: show the success popup
  if (results.every(Boolean)) {
    showModal({
      type: "success",
      icon: "✅",
      title: "Welcome!",
      message: "All fields look good. Your account is ready.",
      buttonText: "Continue",
      onClose: resetForm,
    });
  }
});

let engine = (id, serial, message) => {
  if (id.value.trim() === "") {
    errorMsg[serial].innerHTML = message;
    id.style.border = "2px solid red";

    // icons
    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity = "0";
    return false;
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "2px solid green";

    // icons
    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "1";
    return true;
  }
};

// clear the form after the popup is closed
function resetForm() {
  form.reset();
  [username, email, password].forEach((input) => (input.style.border = ""));
  Array.from(errorMsg).forEach((el) => (el.innerHTML = ""));
  Array.from(successIcon).forEach((icon) => (icon.style.opacity = "0"));
  Array.from(failureIcon).forEach((icon) => (icon.style.opacity = "0"));
}