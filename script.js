const usersList = document.querySelector(".users-list");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const usernameInput = document.querySelector("#username");
const addUserButton = document.querySelector("#add-user");

addUserButton.onclick = addUser;

async function getUsers() {
  // TODO: get all users
  const response = await fetch("http://localhost:5000/users");
  const { data } = await response.json();
  const users = data.users;
  users.forEach((user) => {
    const li = document.createElement("li");
    li.id = "user-" + user._id;

    const p = document.createElement("p");
    p.innerHTML = user.name;

    const button = document.createElement("button");
    button.innerHTML = "Delete";
    button.onclick = () => deleteUser(li.id);

    li.appendChild(p);
    li.appendChild(button);

    usersList.appendChild(li);
  });
}

async function addUser() {
  const name = nameInput.value;
  const email = emailInput.value;
  const username = usernameInput.value;

  let response = await fetch("http://localhost:5000/users", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      username,
    }),
  });
  response = await response.json();

  if (response.error) {
    alert(response.error.message);
    return;
  }

  const user = response.data.user;

  const li = document.createElement("li"); // <li></li>
  li.id = "user-" + user._id; // user-12

  const p = document.createElement("p"); // <p></p>
  p.innerHTML = user.name; // // <p>user name</p>

  const button = document.createElement("button"); // <button></button>
  button.innerHTML = "Delete"; // <button>Delete</button>
  button.onclick = () => deleteUser(li.id);

  li.appendChild(p); // <li><p>user name</p></li>
  li.appendChild(button); // <li><p>user name</p><button>Delete</button></li>

  usersList.appendChild(li); // <ul>...<li>...</li></ul>
}

async function deleteUser(liId) {
  const userId = liId.split("-")[1];

  let response = await fetch("http://localhost:5000/users/" + userId, {
    method: "DELETE",
  });
  response = await response.json();

  if (response.error) {
    alert(response.error.message);
    return;
  }

  const li = document.querySelector(`#${liId}`);
  usersList.removeChild(li);
}

getUsers();
