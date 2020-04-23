const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
const connection = require('../models/database');

router.get('/', (req, res) => getBooks(req, res));
router.get('/search/title/:title', (req, res) => getBookForTitle(req, res));
router.get('/search/isbn/:isbn', (req, res) => getBookForIsbn(req, res));
router.get('/search/author/:author', (req, res) => getBookForAuthor(req, res));
router.get('/recommended/topRated', (req, res) => getTopRatedBooks(req, res));
router.get('/recommended/ages', (req, res) => getAges(req, res));
router.get('/recommended/ages/:age', (req, res) => getForAge(req, res));
router.get('/bestseller/publishing', (req, res) => getTopNYPublishing(req, res));
router.get('/bestseller/authors', (req, res) => getTopNYAuthors(req, res));
router.get('/bestseller/rank', (req, res) => getTopNYRank(req, res));
router.get('/bestseller/new', (req, res) => getNewNY(req, res));
router.get('/movies/:bestseller', (req, res) => getMoviesThatBestSeller(req, res));
router.get('/categories', (req, res) => getTopCategories(req, res));
router.get('/categories/nyauthor/:categoryName', (req, res) => getTopCategoryAuthorNY(req, res));
router.get('/categories/publisher/:categoryName', (req, res) => getTopCategoryPublisher(req, res));
router.get('/categories/topRated/:categoryName', (req, res) => getTopCategoryRated(req, res));
router.get('/movies', (req, res) => getMovies(req, res));


function getBooks(req, res) {
  console.log('READ all users');

  connection.then((con) => {
    const sql = 'select Books.title from Books WHERE ROWNUM < 10';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}

/**
 * Search bar functionality
 * 1) by title
 * 2) by isbn
 * 3) by author name
 */
function getBookForTitle(req, res) {

  connection.then((con) => {
    var searchValue = req.params.title;
    const sql = `SELECT DISTINCT books.isbn, books.title, author.authorname, authorwiki.wikiurl, books.img_url, books.description 
    from Books
    inner join bookauthor
    on books.isbn = bookauthor.isbn
    inner join author
    on bookauthor.authorid = author.authorid
    left join authorwiki ON authorwiki.authorid=author.authorid
    where lower(books.title) like '%${searchValue}%'
    AND rownum <=15`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


function getBookForIsbn(req, res) {
  var searchValue = req.params.isbn;
  console.log(searchValue);
  connection.then((con) => {
    const sql = `SELECT books.*, author.authorname, authorwiki.wikiurl
    from Books
    inner join bookauthor
    on books.isbn = bookauthor.isbn
    inner join author
    on bookauthor.authorid = author.authorid
    left join authorwiki
    on authorwiki.authorid=author.authorid
    where books.isbn like '${searchValue}'`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


function getBookForAuthor(req, res) {
  // var searchValue = req.params.author;
  var searchValue = 'harry';
  console.log(searchValue);
  connection.then((con) => {
    const sql = `SELECT books.*, author.authorname, authorwiki.wikiurl
    from Books
    inner join bookauthor
    on books.isbn = bookauthor.isbn
    inner join author
    on bookauthor.authorid = author.authorid
    left join authorwiki
    on authorwiki.authorid=author.authorid
    where lower(author.authorName) like '${searchValue}'
    AND rownum <= 15`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}

/**
 * 4) Query to retrieve books that have been highly rated
 *  by users. Retrieves all books that fall between the maximum rating and maximum rating -1 
 * for the entire books dataset/database
 */
function getTopRatedBooks(req, res) {

  connection.then((con) => {
    // console.log(con);
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


/**
 * 5) Displays all unique age groups and users can select one. 
 * Given age group, retrieve all books that are suitable for the chosen age group sorted by rating in descending 
 * order and in alphabetical ordering by title.
 */
function getAges(req, res) {

  connection.then((con) => {
    // console.log(con);
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


function getForAge(req, res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}
/**
 * 6) Displays the top 10 bestselling publishing houses determined using the 
 * maximum books found for a certain publishing house in the 
 * NYTimes bestseller list sorted by the weeks on list.
 *want recommendations or in bestsellings section?
 */
function getTopNYPublishing(req, res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}



/**
 * 7)Displays the best selling books of the top 10 best selling authors on the NYTimes best seller list 
 * (based on their number of bestsellers) sorted by their ranks
 */
function getTopNYAuthors(req, res) {

  connection.then((con) => {
    const sql = ` FILL`
      ;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}



/**
 * 8)Displays all number 1 ranked books on the NYTimes best seller list
 * 
 */
function getTopNYRank(req, res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


/**
 * 9)Displays newer books on the NYTimesBest selling list. A book is new if it was not present on the list in the last week.
 * 
 */
function getNewNY(req, res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}



/**
 * movies which were adapted from a bestseller book
 */
function getMoviesThatBestSeller(req, res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


/**
 * Display based on category name- how to create sub section on a page
 */
function getTopCategories(req, res) {

  connection.then((con) => {
    const sql = ` WITH temp AS (SELECT Books.isbn, BookCategory.categoryId FROM
    Books JOIN BookCategory ON Books.isbn =BookCategory.isbn),
    CategoryTemp AS 
    (SELECT temp.categoryId, COUNT(DISTINCT(temp.isbn)) AS count FROM temp 
    GROUP BY temp.categoryId 
    ORDER BY count DESC),
    SelectCategories AS 
    (SELECT DISTINCT(CategoryTemp.categoryId) FROM CategoryTemp
    WHERE ROWNUM < 20)
    SELECT DISTINCT(Category.categoryName) AS categoryName FROM Category
    WHERE Category.categoryId IN (SELECT * FROM SelectCategories)
    `;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}



/**
 *15) Displays all books written by NYTimes best selling authors 
 for a certain category chosen- catgeoryName
  along with the wiki URL for the authors displayed.
 * 
 */
function getTopCategoryAuthorNY(req, res) {
  var inputcategory = req.params.categoryName;
  console.log(inputcategory);
  connection.then((con) => {
    const sql = ` WITH NYAuthorTemp AS 
    (
    select * from 
    (
    SELECT DISTINCT(author.authorid), COUNT(*) AS count 
    FROM books
    INNER JOIN nytimesseller
    ON books.isbn = nytimesseller.isbn
    INNER JOIN bookauthor
    ON books.isbn = bookauthor.isbn
    INNER JOIN author
    ON bookauthor.authorid = author.authorid
    GROUP BY author.authorid 
    ORDER BY count DESC
    )
    ),
    
    CombinedTemp AS
    (
    select * from 
    (
    SELECT Books.*, Author.AuthorName, BookCategory.categoryid, author.authorid 
    FROM Books
    JOIN BookAuthor 
    ON BookAuthor.isbn = Books.isbn 
    JOIN Author
    ON BookAuthor.authorid = Author.authorid
    JOIN BookCategory 
    ON Books.isbn = BookCategory.isbn
    )
    )
    
    SELECT * FROM
    (
    SELECT DISTINCT(combinedtemp.isbn), combinedtemp.title as title, combinedtemp.AuthorName
    FROM CombinedTemp
    inner join nyauthortemp
    on combinedtemp.authorid = nyauthortemp.authorid
    AND combinedtemp.categoryId =
    (SELECT categoryId FROM category
    WHERE categoryName = '${inputcategory}'))
    WHERE ROWNUM <20`
      ;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}



/**
 * 17) Displays books in a category such that they-categoryName
 *  are highly rated by users
 * 
 */
function getTopCategoryRated(req, res) {
  var inputcategory = req.params.categoryName;
  console.log(inputcategory);
  connection.then((con) => {
    const sql = `WITH bookC AS
    (SELECT Books.*, Author.authorname AS author , category.categoryname, category.categoryid
    FROM Books JOIN BookCategory ON Books.isbn = BookCategory.isbn JOIN Category
     ON category.categoryid=bookcategory.categoryid Join BookAuthor 
     ON bookauthor.isbn=books.isbn JOIN AUTHOR ON BOOKAUTHOR.AUTHORID=author.authorid)
    SELECT * FROM(
     SELECT DISTINCT bookC.isbn, bookC.author, bookC.title, bookC.rating as rating
    FROM bookC
    WHERE bookC.categoryid IN
    (SELECT categoryId FROM Category
    WHERE categoryName =  '${inputcategory}')
    AND rating IS NOT NULL
    ORDER BY rating DESC
    )
    WHERE ROWNUM <20`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


/**
 * 18)Displays books in a certain category-categoryName published 
 * by the best selling NYTimes publishing house
 * along with the wiki URL of the authors displayed
 * 
 */
function getTopCategoryPublisher(req, res) {
  var inputcategory = req.params.categoryName;
  console.log("in publisher" + inputcategory);
  connection.then((con) => {
    const sql = `  WITH PublishersTemp AS
    (
    SELECT DISTINCT(books.publisher), COUNT(*) AS count
    FROM NYTimesSeller JOIN Books ON NYTimesSeller.isbn=Books.isbn
    WHERE ROWNUM <= 10
    GROUP BY books.publisher
    ORDER BY count DESC
    ),
    BookUserTemp AS
    (
    SELECT Books.isbn
    FROM memberchoices
    INNER JOIN Books
    ON Books.isbn = memberchoices.isbn
    ORDER BY Books.rating
    ),
    AuthorTemp AS
    (
    SELECT author.authorid, Author.authorname
    FROM Author
    JOIN bookauthor
    ON author.authorid = bookauthor.authorid
    ),
    CombinedTemp AS
    (
    SELECT Books.*, AuthorTemp.AuthorName, BookCategory.categoryid, authortemp.authorid
    FROM Books
    JOIN BookAuthor ON BookAuthor.isbn = Books.isbn
    LEFT JOIN AuthorTemp ON AuthorTemp.authorId = BookAuthor.authorId
    JOIN BookCategory ON Books.isbn = BookCategory.isbn
    )
    SELECT* FROM(
    SELECT DISTINCT(CombinedTemp.isbn) , CombinedTemp.title, CombinedTemp.AuthorName
    FROM CombinedTemp
    INNER JOIN PublishersTemp ON CombinedTemp.publisher = PublishersTemp.publisher
    WHERE CombinedTemp.categoryId IN
    (SELECT categoryId FROM Category
    WHERE categoryName = '${inputcategory}'))
    WHERE ROWNUM <=20`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}

/**
 * 20)display movies adapted from books
 */
function getMovies(req, res) {

  connection.then((con) => {
    const sql = 'FILL';
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}



module.exports = router;
