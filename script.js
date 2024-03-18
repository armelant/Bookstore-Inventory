class Book {
    constructor(title, author, category) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.added = Date.now();
    }
}

let inventory = [];

function addBook() {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const categoryInput = document.getElementById('category');

    const title = titleInput.value;
    const author = authorInput.value;
    const category = categoryInput.value;

    const newBook = new Book(title, author, category);
    inventory.push(newBook);

    displayInventory();

    titleInput.value = '';
    authorInput.value = '';
    categoryInput.value = '';
}

function displayInventory(filteredInventory = inventory) {
    const inventoryDiv = document.getElementById('inventory');
    inventoryDiv.innerHTML = ''; 
  
    if (filteredInventory.length > 0) {
        filteredInventory.forEach((book, index) => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            const bookInfoDiv = document.createElement('div');
            bookInfoDiv.classList.add('book-info');
            const bookInfo = `<p><strong>Title:</strong> ${book.title}</p>
                              <p><strong>Author:</strong> ${book.author}</p>
                              <p><strong>Category:</strong> ${book.category}</p>`;
            bookInfoDiv.innerHTML = bookInfo;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('removeBookButton');
            removeButton.addEventListener('click', () => {
                removeBook(index);
            });

            bookDiv.appendChild(bookInfoDiv);
            bookDiv.appendChild(removeButton);
            inventoryDiv.appendChild(bookDiv);
        });
    } else {
        const message = '<p>No books found in this category.</p>';
        inventoryDiv.innerHTML = message;
    }
}

function searchBooks() {
    const searchTerm = document.getElementById('searchCategory').value.toLowerCase();
    const filteredInventory = inventory.filter(book => book.category.toLowerCase().includes(searchTerm));
  
    displayInventory(filteredInventory);
}

function clearInventory() {
    inventory = [];
    displayInventory();
}

function removeBook(index) {
    inventory.splice(index, 1);
    displayInventory();
}

function sortBooks(sortBy) {
    if (sortBy === 'title') {
        inventory.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'author') {
        inventory.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === 'category') {
        inventory.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === 'added') {
        inventory.sort((a, b) => a.added - b.added);
    }
  
    displayInventory();
}
 
const sortOptions = ['title', 'author', 'category', 'added'];

const sortButtonsContainer = document.createElement('div');

for (const sortOption of sortOptions) {
    const sortButton = document.createElement('button');
    sortButton.textContent = `Sort by ${sortOption}`;
    sortButtonsContainer.appendChild(sortButton);
  
    sortButton.addEventListener('click', () => {
        sortBooks(sortOption);
    });
}

document.body.insertBefore(sortButtonsContainer, document.getElementById('inventory'));

const clearInventoryButton = document.createElement('button');
clearInventoryButton.textContent = 'Clear Inventory';
document.body.insertBefore(clearInventoryButton, document.getElementById('inventory'));

clearInventoryButton.addEventListener('click', clearInventory);

document.getElementById('addBookForm').addEventListener('submit', addBook);
document.getElementById('searchButton').addEventListener('click', searchBooks);

const inventoryJSON = localStorage.getItem('bookStoreInventory');
if (inventoryJSON) {
    inventory = JSON.parse(inventoryJSON);
}

document.getElementById('addBookForm').addEventListener('submit', () => {
    localStorage.setItem('bookStoreInventory', JSON.stringify(inventory));
});

document.getElementById('inventory').addEventListener('click', (event) => {
    if (event.target.classList.contains('removeBookButton')) {
        const index = event.target.dataset.index;
        removeBook(index);
    }
});

displayInventory();
