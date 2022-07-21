async function submitHabit() {
  const login = document.querySelector("form");
  const email = localStorage.getItem("email");
  const formData = new FormData(login);
  const formDataObj = Object.fromEntries(formData);
  const emailAddedToBody = {
    ...formDataObj,
    email: email,
    cur_repetition: "0",
    streak: "0",
  };
  try {
    options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailAddedToBody),
    };
    const r = await fetch("http://localhost:3000/habits/", options);
    const data = await r.json();
    location.hash = "#feed";
  } catch (err) {
    console.log("Failed to add Habit");
  }
}

async function getAllPosts() {
  try {
    const options = {
      headers: new Headers({ authorization: localStorage.getItem("token") }),
    };
    const getEmail = localStorage.getItem("email");
    const r = await fetch(`http://localhost:3000/habits/${getEmail}`, options);
    const r_json = await r.json();
    if (r_json.err) {
      localStorage.clear();
      location.hash = "#";
    }
    return r_json;
  } catch (err) {
    console.log("Error getting data");
  }
}

async function deleteHabit(e) {
  const habitSelected = e.target.id;
  try {
    options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: habitSelected }),
    };
    const response = await fetch(
      `http://localhost:3000/habits/entry/${habitSelected}`,
      options
    );
    // const data = await response.json()
    window.location.reload();
  } catch (err) {
    console.log("Failed to delete habit");
  }
}

async function increaseCounter(e) {
  const targetId = e.target.id.split("-")[1];
  try {
    options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: targetId }),
    };
    const response = await fetch(
      `http://localhost:3000/habits/entry/${targetId}`,
      options
    );
    window.location.reload();
  } catch (err) {
    console.log("Failed to increase counter");
  }
}
