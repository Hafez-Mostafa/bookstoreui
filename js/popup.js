


const authorInfo = () => {
    const pop_up_window = document.querySelector('.pop_up_window');
    pop_up_window.innerHTML = `
    <div class="popup-content">
        <span class="close" onclick="closePopup()">&times;</span>
        <form id="authorForm" method="post" onsubmit="addAuthor(event)">
            <label for="name">Name</label>
            <input class="nameid" type="text" name="name" id="name" required> <br>
            <label for="bio">Bio</label>
            <input class="bioid" type="text" name="bio" id="bio" required><br>
            <label for="bdate">Date of Birth</label>
            <input class="bdateid" type="date" name="bdate" id="bdate" required> <br>
            <input type="submit" value="Submit">
        </form>
    </div>`;
}

const addAuthor = async (event) => {
    event.preventDefault();
    let nameid = document.getElementById('name'),
        bioid = document.getElementById('bio'),
        bdateid = document.getElementById('bdate');

    let inputs = {
        name: nameid.value,
        bio: bioid.value,
        birthDate: bdateid.value
    };

    try {
        let response = await fetch("http://localhost:3000/authors", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
        } else {
            console.log(`Error: ${data.error}`);
        }
    } catch (error) {
        console.log(`Error fetching data: ${error}`);
    }
    closePopup();
    openPopup('book') 
}

function openPopup(type) {
    document.getElementById("popup").style.display = "block";
    if (type === 'author') {
        authorInfo();
    } else if (type === 'book') {
        bookInfo();
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

window.onclick = function(event) {
    var popup = document.getElementById("popup");
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

const bookInfo = async () => {
    const pop_up_window = document.querySelector('.pop_up_window');
    pop_up_window.innerHTML = `
        <div class="popup-content">
            <span class="close" onclick="closePopup()">&times;</span>
            <form id="bookForm" method="post" onsubmit="addBook(event)">
                <label for="title">Title</label>
                <input class="titleid" type="text" name="title" id="title" required> <br>
                <label for="content">Content</label>
                <textarea name="content" id="content" cols="30" rows="10" required></textarea><br>
                <label for="authorId">Author</label>
                <select name="author" id="select" required></select><br>
                <input type="submit" value="Submit">
            </form>
        </div>`;

    try {
        const response = await fetch("http://localhost:3000/authors/");
        const data = await response.json();
        const authors = data.Authors;
        const select = document.getElementById('select');

        authors.forEach(author => {
            let option = document.createElement("option");
            option.value = author.id || author.ID || author._id || ''; 
            option.textContent = author.name || author.Name || author.fullName || ''; 
            select.appendChild(option);
        });

        let newAuthor = document.createElement("option");
        newAuthor.textContent = 'New Author ...';
        newAuthor.setAttribute('value', 'new');
        select.appendChild(newAuthor);
        
        select.addEventListener('change', function() {
            if (this.value === 'new') {
                openPopup('author');
            }
        });

    } catch (error) {
        console.log(`Error fetching authors: ${error}`);
    }
};

const addBook = async (event) => {
    event.preventDefault();

    let title = document.getElementById('title'),
        content = document.getElementById('content'),
        selectAuthor = document.getElementById('select');

    let inputs = {
        title: title.value,
        content: content.value,
        authorId: selectAuthor.value
    };

    try {
        let response = await fetch("http://localhost:3000/books", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            title.value = '';
            content.value = '';
            selectAuthor.value = '';
        } else {
            console.log(`Error: ${data.error}`);
        }
    } catch (error) {
        console.log(`Error fetching data: ${error}`);
    }
    closePopup();
};
