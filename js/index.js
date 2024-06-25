// Get the books container element
let booksId = document.getElementById('books');

// Function to display books
const displayBooks = async () => {
    const response = await fetch("http://localhost:3000/books/gbwa");
    const data = await response.json();
    booksId.innerHTML = '';

    data.books.forEach((book, index) => {
        booksId.innerHTML += `
<div class="card" data-index="${index}">
    <div class="foto">
        <img src="./media/la.jpeg"  />
    </div>
    <div class="card-content">
        <div class="action">
            <span onClick="editBook(${index})" class="edit act" data-index="${index}"></span>
            <span onClick="deleteBook(${index})" class="delete act" data-index="${index}"></span>
        </div>
        <h2 class="title">Book Title: <span  id="tid-${index}">${book.title}</span></h2>
        <div class="publishdate" id="pid-${index}">Date of Publishing: ${book.publishAt}</div>
        <div " class="author">Author: <a href="#"><span id="aid-${index}">${book.authorName}</span></a></div>

        <p class="content" id="cid-${index}">Content: ${book.content}</p>
    </div>
</div>
        `;
    });
    console.log(data.books);
};


// newBook.style.display = 'block';
// updatePopup.style.display = 'none';
displayBooks();

// Function to edit a book
const editBook = async (index) => {
    const updatePopup = document.getElementById('updatepopup');
    const newBook = document.getElementById('books');
    newBook.style.display = 'none';
    updatePopup.style.display = 'block';

    const bookTitle = document.getElementById(`tid-${index}`).innerText.trim();
    const bookContent = document.getElementById(`cid-${index}`).innerText.trim().replace('Content: ', '');

    updatePopup.innerHTML = `
        <form method="post" class='form'>
            <label for="title">Title</label>
            <input class="titleid" type="text" name="title" id="title" value="${bookTitle}"><br>
            <label for="content">Content</label>
            <textarea name="content" id="contentid" cols="30" rows="10">${bookContent}</textarea><br>
            <input onclick="updateBook(${index})" id="bttnid" type="submit" value="Update">
        </form>
    `;


    // updatePopup.style.display = 'none';
};

// Function to update a book
const updateBook = async (index) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const titleInput = document.getElementById('title').value;
    const contentInput = document.getElementById('contentid').value;

    let inputs = {
        title: titleInput,
        content: contentInput
    };

    const bookId = document.querySelector(`.card[data-index="${index}"]`).getAttribute('data-id');

    try {
        let response = await fetch(`http://localhost:3000/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
        });
        const data = await response.json();
        console.log(data);

        displayBooks();

        const updatePopup = document.getElementById('updatepopup');
        const newBook = document.getElementById('books');
        newBook.style.display = 'block';
        updatePopup.style.display = 'none';
    } catch (error) {
        console.log(`Error updating book: ${error}`);
    }
};

// Function to delete a book (to be implemented)
const deleteBook = async (index) => {
    // const bookTitle = document.querySelector(`.card-content[data-index="${index}"]`).innerText;
    const bookTitle = document.querySelector(`#tid-${index}`)
    let dtitle = bookTitle.innerText.trim()

    console.log(bookTitle)
    try {
        let response = await fetch(`http://localhost:3000/books/${dtitle}`, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log(data);

        displayBooks();
    } catch (error) {
        console.log(`Error deleting book: ${error}`);
    }
};

document.querySelectorAll('.edit').forEach(element => {
    element.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        editBook(index);
    });
});

document.querySelectorAll('.delete').forEach(element => {
    element.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        deleteBook(index);
    });
});

// ---------------------------------------


//---------------------------------------
