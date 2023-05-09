const usersList = document.querySelector(".users-list");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const addressInput = document.querySelector("#address");
const addUserButton = document.querySelector("#add-user");

addUserButton.onclick = addUser;

async function getUsers() {
  // TODO: get all users
  const response = await fetch("http://localhost:5000/users");
  const { data } = await response.json();
  const users = data.users;
  users.forEach((user) => {
    const li = document.createElement("li");
    li.id = user.id;

    const p = document.createElement("p");
    p.innerHTML = user.name;

    const button = document.createElement("button");
    button.innerHTML = "Delete";

    li.appendChild(p);
    li.appendChild(button);

    usersList.appendChild(li);
  });
}

async function addUser() {
  const name = nameInput.value;
  const phone = phoneInput.value;
  const address = addressInput.value;

  let response = await fetch("http://localhost:5000/users", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      name,
      phone,
      address,
    }),
  });
  response = await response.json();

  if (response.error) {
    alert(response.error.message);
    return;
  }

  const user = response.data.user;

  const li = document.createElement("li"); // <li></li>
  li.id = "user-" + user.id; // user-1

  const p = document.createElement("p"); // <p></p>
  p.innerHTML = user.name; // // <p>user name</p>

  const button = document.createElement("button"); // <button></button>
  button.innerHTML = "Delete"; // <button>Delete</button>

  li.appendChild(p); // <li><p>user name</p></li>
  li.appendChild(button); // <li><p>user name</p><button>Delete</button></li>

  usersList.appendChild(li); // <ul>...<li>...</li></ul>
}

getUsers();
