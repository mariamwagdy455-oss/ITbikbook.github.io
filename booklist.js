
function setGrid() {
  const container = document.getElementById("books-container");
  container.classList.remove("list");
  container.classList.add("grid");
}

function setList() {
  const container = document.getElementById("books-container");
  container.classList.remove("grid");
  container.classList.add("list");
}

// ✅ Theme function (FIXED)
function toggleTheme() {
  document.body.classList.toggle('dark');
  var status = document.body.classList.contains('dark') ? 'on' : 'off';
  localStorage.setItem('userTheme', status);
}

// ✅ Load saved theme
window.onload = function () {
  if (localStorage.getItem('userTheme') === 'on') {
    document.body.classList.add('dark');
  }

  applyCategoryFilter(); // 🔥 auto apply filter on load
};

// 🔍 Search
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  let value = this.value.toLowerCase();
  let books = document.querySelectorAll(".book-card");

  books.forEach(book => {
    let title = book.querySelector("h3").textContent.toLowerCase();

    if (title.includes(value)) {
      book.style.display = "";
    } else {
      book.style.display = "none";
    }
  });
});

// 📚 Category filter
function applyCategoryFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("cat");

  if (!category) return;

  let books = document.querySelectorAll(".book-card");

  books.forEach(book => {
    let bookCat = book.querySelector(".category").textContent.trim();

    if (bookCat.toLowerCase() === category.toLowerCase()) {
      book.style.display = "";
    } else {
      book.style.display = "none";
    }
  });
}