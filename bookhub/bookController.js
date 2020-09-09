// Import model
Book = require('./bookModel');
// Handle index actions
exports.index = function (req, res) {
    
    Book.get(function (err, books) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "books retrieved successfully",
            data: books
        });
    });
};
// Handle create book actions
exports.new = function (req, res) {
    var book = new Book();
    book.title = req.body.title ? req.body.title : book.title
    book.author = req.body.author;
    book.publisher = req.body.publisher;
    book.isbn = req.body.isbn;

    book.save(function (err) {
        res.json({
            message: 'New book added!',
            data: book
        });
    });
};
// Handle view book info
exports.view = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err)
            res.send(err);
        res.json({
            message: 'Book details loading..',
            data: book
        });
    });
};
// Handle update book info
exports.update = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err)
            res.send(err);
        book.title = req.body.title ? req.body.title : book.title;
        book.author = req.body.author;
        book.publisher = req.body.publisher;
        book.isbn = req.body.isbn;
        // save the book and check for errors
        book.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Book Info updated',
                data: book
            });
        });
    });
};
// Handle delete book
exports.delete = function (req, res) {
    Book.remove({
        _id: req.params.book_id
    }, function (err, book) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Book deleted'
        });
    });
};