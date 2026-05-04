  let defaultAudio =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  let books = [
  {
    id: 1,
    title: "Alice in Wonderland",
    author: "Lewis Carroll",
    desc: "Fantasy advanture book.",
    img: "images/alice.jpg",
    pdf: "https://www.gutenberg.org/files/11/11-h/11-h.htm",
    audio: "",

    publisher: "Diwan Bookstore",
    location: "https://www.google.com/maps?q=Diwan+Bookstore+Zamalek+Cairo&output=embed",

    aboutBook: "A curious girl embarks on a fascinating trip into a fantastical sphere full of odd creatures and inventiveness.",
    aboutAuthor: "Lewis Carroll was an English writer famous for his imaginative fantasy storytelling."

  },

  {
    id: 2,
    title: "Frankenstein",
    author: "Mary Shelley",
    desc: "A scientist creates life.",
    img: "images/frank.jpg",
    pdf: "https://www.gutenberg.org/files/84/84-h/84-h.htm",
    audio: "",

    publisher: "AUC Bookstore",
    location: "https://www.google.com/maps?q=AUC+Bookstore+Tahrir+Cairo&output=embed",

    aboutBook: "A powerful story about science, ambition, and creating life beyond human limits.",
    aboutAuthor: "Mary Shelley was one of the first science fiction writers in history."

  },

  {
    id: 3,
    title: "Dracula",
    author: "Bram Stoker",
    desc: "Vampire story.",
    img: "images/dracula.jpg",
    pdf: "https://www.gutenberg.org/files/345/345-h/345-h.htm",
    audio: "",

    publisher: "Shorouk Bookstore",
    location: "https://www.google.com/maps?q=Shorouk+Bookstore+Cairo&output=embed",

    aboutBook: "A dark horror story about Count Dracula and his terrifying influence.",
    aboutAuthor: "Bram  Stoker wan an Irish writer known for creating Dracula, the iconic vampire."

  },

  {
    id: 4,
    title: "Sherlock Holmos",
    author: "Arthur Conan Doyle.",
    desc: "Detective stories.",
    img: "images/sherlock.jpg",
    pdf: "https://www.gutenberg.org/files/1661/1661-h/1661-h.htm",
    audio: "",

    publisher: "Madbouly Bookstore",
    location: "https://www.google.com/maps?q=Madbouly+Bookstore+Downtown+Cairo&output=embed",

    aboutBook: "A series of detective cases solved logic and observation.",
    aboutAuthor: "Arthur Conan Doyle was the creator of the legendery detective Sherlock Holmes."
  },

  {
    id: 5,
    title: "The Time Machine",
    author: "H.G. Wells",
    desc: "Time travel story.",
    img: "images/time.jpg",
    pdf: "https://www.gutenberg.org/files/35/35-h/35-h.htm",
    audio: "",

    publisher: "Alef Bookstore",
    location: "https://www.google.com/maps?q=Alef+Bookstore+Cairo&output=embed",

    aboutBook: "A science fiction journey exploring the future of the humanity.",
    aboutAuthor: "H.G. Wells is known as the father of the science fiction."
  },

  {
    id: 6,
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    desc: "Pirate advanture.",
    img: "images/treasure.jpg",
    pdf: "https://www.gutenberg.org/files/120/120-h/120-h.htm",
    audio: "",

    publisher: "Dar El Shorouk",
    location: "https://www.google.com/maps?q=Dar+El+Shorouk+Cairo&output=embed",

    aboutBook: "A thrilling pirate advanture full of treasure hunts and danger.",
    aboutAuthor: "Robert Louis Stevenson was a scottish novelist known for advanture stories."
  },

  {
    id: 7,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    desc: "Romance novel.",
    img: "images/pride.jpg",
    pdf: "https://www.gutenberg.org/files/1342/1342-h/1342-h.htm",
    audio: "", 

    publisher: "Diwan Bookstore",
    location: "https://www.google.com/maps?q=Diwan+Bookstore+Zamalek+Cairo&output=embed",

    aboutBook: "A romantic novel about love, society, and misunderstandings.",
    aboutAuthor: "Jane Austen was one of the greatest English novelists."

  },

  {
    id: 8,
    title: "War of the World",
    author: "H.G. Wells",
    desc: "Alien invasion story.",
    img: "images/war.jpg",
    pdf: "https://www.gutenberg.org/files/36/36-h/36-h.htm",
    audio: "audios/waroftheworlds_03_wells_64kb.mp3",

    publisher: "AUC Bookstore",
    location: "https://www.google.com/maps?q=AUC+Bookstore+Tahrir+Cairo&output=embed",

    aboutBook: "A science fiction story about humanity fighting alien invaders.",
    aboutAuthor: "H.G. Wells was a visionary writer who shaped modern science fiction."

  }
];

let params = new URLSearchParams(window.location.search);
let id = params.get("id") || 1;
let book = books.find(b => b.id == id);

document.getElementById("title").innerText = book.title;
document.getElementById("author").innerText = book.author;
document.getElementById("desc").innerText = book.desc;
document.getElementById("img").src = book.img;

document.getElementById("content").innerHTML += `
  <section class="box">
    <h3>About the Book</h3>
    <p>${book.aboutBook}</p>
  </section>

  <section class="box">
    <h3>About the Author</h3>
    <p>${book.aboutAuthor}</p>
  </section>

  `;

function openPDF () {
  document.getElementById("content").innerHTML = `
    <section class="box">
      <h3>PDF Version</h3>

      <iframe
        src="${book.pdf}"
        width="100%"
        height="500px"
        style="border:none;">
      </iframe>
    </section>
  `;
}

function showAudio() {
  let audioSrc = book.audio ? book.audio : defaultAudio;

  document.getElementById("content").innerHTML = `
    <section class = "box">
      <h3>Audio Version</h3>

      <audio controls style="width:100%" autoplay>
        <source src="${audioSrc}" type="audio/mpeg">
      </audio>
    </section>
  `;
}

document.getElementById("content").innerHTML += `
    <section class="box">
      <h3>Publisher Location</h3>

      <iframe
        src="${book.location}"
        width="100%"
        height="300"
        style="border:0; border-radius:10px;">
      </iframe>
    </section>
  `;

let currentRating = 0;

document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll("#stars span");

  stars.forEach(star => {
    star.addEventListener("click", function () {
      currentRating = Number(this.dataset.value);

      stars.forEach(s => s.style.color = "#ccc");

      for (let i = 0; i < currentRating; i++) {
        stars[i].style.color = "gold";
      }
    });
  });
});
function saveRating() {
  let favs = JSON.parse(localStorage.getItem("myFavorites")) || [];

  let rating = currentRating || 1;

  let existingIndex = favs.findIndex(item => item.id == book.id);

  if (existingIndex !== -1) {
    favs[existingIndex].rating = rating;
  } else {
    favs.push({
      id: book.id,
      title: book.title,
      rating: rating
    });
  }

  localStorage.setItem("myFavorites", JSON.stringify(favs));

  document.getElementById("ratingText").innerText =
    "Rated: " + rating + " star(s)";
}

function addToFavorites () {
  let favs = JSON.parse(localStorage.getItem("myFavorites")) || [];

  let rating = 1;
  let stars = document.querySelectorAll("#stars span");

  for (let i = 0; i < stars.length; i++) {
    if (stars[i].style.color === "gold") {
      rating = i + 1;
    }
  }

  let existingIndex = favs.findIndex(item => item.id == book.id);

  if (existingIndex !== -1) {
    favs[existingIndex].rating = rating;
  } else {
    favs.push({
      id: book.id,
      title: book.title,
      rating: rating
    });
  }

  localStorage.setItem("myFavorites", JSON.stringify(favs));

  console.log("SAVED:", favs);
  alert("Saved successfully!");
}


  function toggleTheme() {
    document.body.classList.toggle('dark');
  var status = document.body.classList.contains('dark') ? 'on' : 'off';
  localStorage.setItem('userTheme', status);
    }

  window.onload = function () {
        if (localStorage.getItem('userTheme') === 'on') {
    document.body.classList.add('dark');
        }

  const savedBooks = JSON.parse(localStorage.getItem('myFavorites')) || [];
  const grids = document.querySelectorAll('.books-grid');

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
    };