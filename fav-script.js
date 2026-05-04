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

    const groups = document.querySelectorAll('.books-list');
    groups.forEach(g => g.innerHTML = '');

    if (savedBooks.length === 0) {
        groups.forEach(g => {
            g.innerHTML = '<p style="color:#bbb;font-style:italic;">No favorites yet</p>';
        });
        return;
    }

    savedBooks.forEach(item => {

        const target = document.querySelector(`#group-${item.rating} .books-list`);

        if (!target) return;

        const card = document.createElement('div');
        card.className = 'book-card';

        card.innerHTML = `
            <span>${item.title}</span>
        `;

        target.appendChild(card);
    });
};