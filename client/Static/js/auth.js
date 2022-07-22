async function submitLoginForm(e) {
  e.preventDefault();
  const login = document.querySelector("form");
  const formData = new FormData(login);
  const formDataObj = Object.fromEntries(formData);
  try {
    options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataObj),
    };
    const r = await fetch("https://libits.herokuapp.com/users/login", options);
    const data = await r.json();
    storeLoginData(data.token);
  } catch (err) {
    console.log("Error logging in");
  }
}

async function submitRegisterForm(e) {
  e.preventDefault();
  const register = document.querySelector("form");
  const formData = new FormData(register);
  const formDataObj = Object.fromEntries(formData);

  if (formDataObj.password_set === formDataObj.Password2) {
    delete formDataObj["Password2"];
    try {
      options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObj),
      };
      const r = await fetch(
        "https://libits.herokuapp.com/users/register",
        options
      );
      const data = await r.json();
      submitLoginForm(e);
    } catch (err) {
      console.log("Error sending information to the backend");
    }
  } else {
    alert("Password does not match");
  }
}

function storeLoginData(token) {
  const user = jwt_decode(token);
  localStorage.setItem("token", token);
  localStorage.setItem("username", user.username);
  localStorage.setItem("email", user.email);
  window.location.hash = "#feed";
  const bodyHTML = document.querySelector("body");
  bodyHTML.innerHTML = "";
}

function logout() {
  localStorage.clear();
  location.hash = "#";
}
