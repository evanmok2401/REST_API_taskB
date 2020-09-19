process.env.NODE_ENV = 'test';

let chai = require('chai');
let config = require('config');
let chaiHttp = require('chai-http');
let server = require('../index');
let mongoose = require('mongoose');
let Book = require('../bookModel');

let should = chai.should();
chai.use(chaiHttp);
chai.should();

mongoose.connect(config.DBHost, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.dropDatabase();

describe("Get all Books when there are none", () => {
    describe("GET /api/books", () => {
        it("Should have no books returned", (done) => {
            chai.request(server)
                .get('/api/books')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });
});

describe("Add a book", () => {
    describe("POST /api/books", () => {
        it("Should Add a book into the database", (done) => {
            let book = {
                title: "Wing Chun Basics",
                author: "Aaron Man",
                isbn: "978-9988",
                publisher: "Ip Man Books"
            }
            chai.request(server)
                .post('/api/books')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.title.should.be.eql("Wing Chun Basics")
                    done();
                });
        });
    });
});

describe("Update an existing book in the database", () => {
    describe("PUT /api/books/{id}", () => {
        it("Should Update the book with the specified id", (done) => {
            let updatedBook = {
                title: "Kung Fu Basics",
                author: "Aaron Bruce Lee",
                isbn: "8888-8888",
                publisher: "Ipp Books"
            }
            chai.request(server)
                .get('/api/books')
                .end((err, res) => {
                    res.should.have.status(200);
                    id = res.body.data[0]._id;
                    request_url = '/api/books/' + id;
                    chai.request(server)
                        .put(request_url)
                        .send(updatedBook)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.data.title.should.be.eql('Kung Fu Basics')
                            res.body.data._id.should.be.eql(id)
                        })
                    done();
                });
        });
    });
});

describe("Delete an existing book in the library", () => {
    describe("DEL /api/books/{id}", () => {
        it("Should Delete the book with the specified id", (done) => {
            chai.request(server)
                .get('/api/books')
                .end((err, res) => {
                    res.should.have.status(200);
                    id = res.body.data[0]._id;
                    request_url = '/api/books/' + id;
                    chai.request(server)
                        .delete(request_url)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.status.should.be.eql('success')
                            done();
                        })
                });
        });
        it("Should have no books returned now when performing a GET", (done) => {
            chai.request(server)
                .get('/api/books')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
        
    });
});
