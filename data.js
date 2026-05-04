
function toggleTheme() {
  document.body.classList.toggle('dark');
  var status = document.body.classList.contains('dark') ? 'on' : 'off';
  localStorage.setItem('userTheme', status);
}

window.onload = function () {

  if (localStorage.getItem('userTheme') === 'on') {
    document.body.classList.add('dark');
  }

  const grids = document.querySelectorAll('.books-grid');
  if (grids.length > 0) {
    const savedBooks = JSON.parse(localStorage.getItem('myFavorites')) || [];

    grids.forEach(grid => grid.innerHTML = '');

    if (savedBooks.length === 0) {
      grids.forEach(grid => {
        grid.innerHTML = '<p style="color:#bbb; font-style:italic;">No books added to this rating yet.</p>';
      });
    } else {
      savedBooks.forEach(book => {
        const targetGrid = document.querySelector(`#group-${book.rating} .books-grid`);
        if (targetGrid) {
          if (targetGrid.querySelector('p')) targetGrid.innerHTML = '';
          const card = document.createElement('div');
          card.className = 'book-card';
          card.innerHTML = `<span>${book.title}</span>`;
          targetGrid.appendChild(card);
        }
      });
    }
  }

  loadUser();
};

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const error = document.getElementById("error");
  const success = document.getElementById("success");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    error.innerText = "";
    success.innerText = "";

    if (
      nameInput.value === "" ||
      emailInput.value === "" ||
      passwordInput.value === "" ||
      confirmPasswordInput.value === ""
    ) {
      error.innerText = "All fields are required";
      return;
    }

    if (!emailInput.value.includes("@")) {
      error.innerText = "Invalid email";
      return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      error.innerText = "Passwords do not match";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.email === emailInput.value);

    if (exists) {
      error.innerText = "Email already exists";
      return;
    }

    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    success.innerText = "Registered successfully";

    registerForm.reset();

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

const loginForm = document.getElementById('loginForm');

if (loginForm) {

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorElement = document.getElementById('errorMessage');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === "" || password === "") {
      showError("Please fill in all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(user =>
      user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      loginSuccess();
    } else {
      showError("Invalid Email or Password!");
    }
  });

  function showError(message) {
    errorElement.textContent = message;
    errorElement.style.color = "red";
    errorElement.style.display = "block";
  }

  function loginSuccess() {
    errorElement.textContent = "Login successful! Redirecting...";
    errorElement.style.color = "green";
    errorElement.style.display = "block";

    setTimeout(() => {
      window.location.href = "profile.html";
    }, 1500);
  }
}

function loadUser() {
  const nameEl = document.getElementById("userName");
  const emailEl = document.getElementById("userEmail");

  if (!nameEl || !emailEl) return;

  let user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    nameEl.textContent = user.name;
    emailEl.textContent = user.email;
  } else {
    nameEl.textContent = "Guest";
    emailEl.textContent = "No Email";
  }
}
