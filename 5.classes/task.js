class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100; 
    this.type = null;
  }

  fix() {
    this.state *= 1.5; 
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i][type] === value) {
        return this.books[i];
      }
    }
    return null; 
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex(book => book.name === bookName);
    
    if (index !== -1) {
      return this.books.splice(index, 1)[0];
    }
    
    return null; 
  }
}

const myLibrary = new Library("Городская центральная библиотека");

myLibrary.addBook(new DetectiveBook("Артур Конан Дойл", "Приключения Шерлока Холмса", 2019, 500));
myLibrary.addBook(new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168));
myLibrary.addBook(new Magazine("Мурзилка", 1924, 60));

const book1919 = new NovelBook("Александр Блок", "Двенадцать", 1919, 32);
myLibrary.addBook(book1919);
console.log("Найдена книга 1919 года:", myLibrary.findBookBy("releaseDate", 1919).name); 

const issuedBook = myLibrary.giveBookByName("Пикник на обочине");
console.log("Выдана книга:", issuedBook.name);
console.log("Количество книг в библиотеке после выдачи:", myLibrary.books.length); 


issuedBook.state = 25;
console.log("Состояние выданной книги после повреждения:", issuedBook.state); 

issuedBook.fix(); // 25 * 1.5 = 37.5
console.log("Состояние выданной книги после восстановления:", issuedBook.state); 

myLibrary.addBook(issuedBook);
console.log("Количество книг в библиотеке после возврата:", myLibrary.books.length); 

console.log("Есть ли 'Пикник на обочине' в библиотеке?", myLibrary.findBookBy("name", "Пикник на обочине") !== null); 
