export default function createBookstore(document) {

    // aplicando (de forma hardcode) os livros sugeridos pelo desafio
    const bookstore = {
        categories: {
            'tech': {
                displayName: 'Tecnologia',
                bookself: [
                    {
                        title: 'Algoritmos de Destruição em Massa',
                        author: "Cathy O'Neil"
                    },
                    {
                        title: 'Big Tech: A ascensão dos dados e a morte da política',
                        author: 'Evgeny Morozov'
                    },
                    {
                        title: 'Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy',
                        author: "Cathy O'Neil"
                    }
                ]
            },
            'human-social-scienes': {
                displayName: 'Ciências Humanas e Sociais',
                bookself: [
                    {
                        title: 'Sapiens: Uma breve história da humanidade',
                        author: 'Yuval Noah Harari'
                    },
                    {
                        title: 'Homo Deus: Uma breve história do amanhã',
                        author: 'AuYuval Noah Harari'
                    },
                    {
                        title: 'O conto da aia',
                        author: 'Margaret Atwood'
                    }
                ]
            }
        }
    };

    /**
     * Retorna todo o objeto da livraria (apenas para visualização), incluindo todas categorias e todos os livros de
     * cada uma delas.
     */
    function getBookstore() {
        const bookstoreUnmodifiable = {};
        Object.assign(bookstoreUnmodifiable, bookstore);
        Object.seal(bookstoreUnmodifiable);
        Object.freeze(bookstoreUnmodifiable);
        return bookstoreUnmodifiable;
    }

    /**
     * Retorna uma array com apenas os livros existentes na biblioteca toda (incluindo de qual categoria representa).
     * O objeto é alterável, mas imutável.
     */
    function getAllBooks() {
        const books = [];
        for(const categoryId in bookstore.categories) {
            const category = bookstore.categories[categoryId];
            category.bookself.forEach(book => books.push({
                title: book['title'],
                author: book['author'],
                categoryId,
                categoryName: category['displayName']
            }));
        }
        return books;
    }

    /**
     * Retorna o número total de categorias existente.
     */
    function categoriesLength() {
        let length = 0;
        for(const category in bookstore.categories) length++;
        return length;
    }

    /**
     * Retorna um Map, onde a chave (key) é o id da categoria e o valor (value) é o nome de exibição da categoria.
     */
    function getCategories() {
        const map = new Map();
        for(const categoryId in bookstore.categories) {
            const category = bookstore.categories[categoryId];
            map.set(categoryId, category.displayName);
        }
        return map;
    }

    /**
     * Retorna um Map, onde a chave (key) é o id da categoria e o valor (value) é uma array contendo todos seus livros.
     */
    function getCategoriesWithBooks() {
        const map = new Map();
        for(const categoryId in bookstore.categories) {
            const category = bookstore.categories[categoryId];
            map.set(categoryId, category.bookself);
        }
        return map;
    }

    /**
     * Retorna o número total de livros existentes em tal categoria.
     */
    function booksLength(categoryId) {
        const category = bookstore.categories[categoryId];
        return category ? category.bookself.length : undefined;
    }

    /**
     * Retorna todos os livros (incluindo o autor) de tal categoria.
     */
    function getBooksOfCategory(categoryId) {
        const category = bookstore.categories[categoryId];
        if(category) {
            return category.bookself;
        }
        return undefined;
    }

    /**
     * Retorna o número total de autores encontrados na estrutura de dados.
     */
    function authorsLength() {
        return getAllAuthors().length;
    }

    /**
     * Retorna todos os autores encontrados na estrutura de dados.
     */
    function getAllAuthors() {
        const authors = [];
        for(const book of getAllBooks()) {
            const author = book.author;
            let included = false;
            for(const authorTarget of authors) {
                if(authorTarget === author) {
                    included = true;
                    break;
                }
            }
            if(!included) {
                authors.push(author);
            }
        }
        return authors;
    }

    /**
     * Retorna todos os livros de determinado autor.
     */
    function getBooksOfAuthor(authorName) {
        const books = [];
        getAllBooks().filter(book => book.author === authorName).forEach(book => {
            const newObj = { ...book };
            delete newObj.author;
            books.push(newObj);
        });
        return books;
    }

    /**
     * Adiciona uma nova categoria na estrutura de dados. Caso já exista uma categoria com o ID, ela será sobrescrita.
     */
    function addCategory(categoryId, categoryName = categoryId) {
        bookstore.categories[categoryId] = {
            displayName: categoryName,
            bookself: []
        };
    }

    /**
     * Remove tal categoria da estrutura de dados. Todos os livros registrados nela serão perdidos.
     */
    function removeCategory(categoryId) {
        delete bookstore.categories[categoryId];
    }

    /**
     * Verifica se existe alguma categoria com tal id.
     */
    function hasCategory(categoryId) {
        return !!bookstore.categories[categoryId];
    }

    /**
     * Adiciona um/os livro(s) para tal categoria. Caso a categoria não exista, a função não terá efeito.
     */
    function addBooks(categoryId, ...books) {
        const category = bookstore.categories[categoryId];
        if(category) {
            category.bookself = category.bookself.concat(books);
        }
    }

    /**
     * Remove o livro de tal título de tal categoria.
     */
    function removeBook(categoryId, bookTitle) {
        const category = bookstore.categories[categoryId];
        if(category) {
            const index = getIndexOfBook(categoryId, bookTitle);
            if(index > -1) {
                category.bookself.splice(index, 1);
            }
        }
    }

    /**
     * Verifica se existe o livro de tal título em tal categoria.
     */
    function hasBook(categoryId, bookTitle) {
        const category = bookstore.categories[categoryId];
        if(category) {
            return getIndexOfBook(categoryId, bookTitle) > 0;
        }
    }
    
    /**
     * Remove o livro de tal índice de tal categoria.
     */
    function removeBookOfIndex(categoryId, index) {
        const category = bookstore.categories[categoryId];
        if(category) {
            if(index >= 0 && index < category.bookself.length) {
                category.bookself.splice(index, 1);
            }
        }
    }

    /**
     * Retorna o livro de tal índice em tal categoria.
     */
    function getBookOfIndex(categoryId, index) {
        const category = bookstore.categories[categoryId];
        if(category && (index >= 0 && index < category.bookself.length)) {
            for(const entry of category.bookself.entries()) {
                if(entry[0] === index) {
                    return entry[1];
                }
            }
        }
        return undefined;
    }

    /**
     * Retorna o índice de tal livro em tal categoria.
     */
    function getIndexOfBook(categoryId, bookTitle) {
        const category = bookstore.categories[categoryId];
        if(category) {
            for(const entry of category.bookself.entries()) {
                if(entry[1].title === bookTitle) {
                    return entry[0];
                }
            }
        }
        return undefined;
    }

    return {
        getBookstore,
        getAllBooks,
        categoriesLength,
        getCategories,
        getCategoriesWithBooks,
        booksLength,
        getBooksOfCategory,
        authorsLength,
        getAllAuthors,
        getBooksOfAuthor,
        addCategory,
        removeCategory,
        hasCategory,
        addBooks,
        removeBook,
        hasBook,
        removeBookOfIndex,
        getBookOfIndex,
        getIndexOfBook
    }

} 