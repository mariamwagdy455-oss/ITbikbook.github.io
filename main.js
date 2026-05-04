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
