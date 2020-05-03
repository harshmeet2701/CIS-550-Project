const express = require("express");
const router = express.Router();
const oracledb = require('oracledb');
const connection = require('../models/database');

router.get('/', (req, res) => getBooks(req, res));
router.get('/search/title/:title', (req, res) => getBookForTitle(req, res));
router.get('/search/isbn/:isbn', (req, res) => getBookForIsbn(req, res));
router.get('/search/author/:author', (req, res) => getBookForAuthor(req, res));
router.get('/recommended/topRated', (req, res) => getTopRatedBooks(req, res));
router.get('/recommended/ages', (req, res) => getAges(req, res));
router.get('/recommended/ages/:age', (req, res) => getForAge(req, res));
router.get('/bestseller/publisher', (req, res) => getTopPublisher(req, res));
router.get('/bestseller/publisher/:pubName', (req, res) => getTopNYPublishingBooks(req, res));
router.get('/bestseller/nyauthor/:authorName', (req, res) => getTopNYAuthorBooks(req, res));
router.get('/bestseller/nyauthor', (req, res) => getTopAuthor(req, res));
router.get('/bestseller/rank', (req, res) => getTopNYRank(req, res));
router.get('/bestseller/new', (req, res) => getNewNY(req, res));
router.get('/movies/:bestseller', (req, res) => getMoviesThatBestSeller(req, res));
router.get('/categories', (req, res) => getTopCategories(req, res));
router.get('/categories/nyauthor/:categoryName', (req, res) => getTopCategoryAuthorNY(req, res));
router.get('/categories/publisher/:categoryName', (req, res) => getTopCategoryPublisher(req, res));
router.get('/categories/topRated/:categoryName', (req, res) => getTopCategoryRated(req, res));
router.get('/movies', (req, res) => getMovies(req, res));
router.get('/getAuthors/:isbn', (req, res) => getAuthors(req, res));


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
    const sql = `SELECT DISTINCT books.isbn, books.title, books.img_url, books.description, books.url, books.publisher, books.publication_place, books.publication_date, books.rating, books.num_pages, books.lang, books.ages, MemberChoices.readflag, MemberChoices.likeFlag, MemberChoices.rating 
    from Books
    left join MemberChoices on Books.isbn = MemberChoices.isbn
    where lower(books.title) like '%${searchValue}%'
    AND rownum <=50`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


function getBookForIsbn(req, res) {
  var searchValue = req.params.isbn;
  connection.then((con) => {
    const sql = `SELECT DISTINCT books.isbn, books.title, books.img_url, books.description, books.url, books.publisher, books.publication_place, books.publication_date, books.rating, books.num_pages, books.lang, books.ages, MemberChoices.readflag, MemberChoices.likeFlag, MemberChoices.rating 
    from Books
    left join MemberChoices on Books.isbn = MemberChoices.isbn
    where lower(books.isbn) like '%${searchValue}%'
    AND rownum <=50`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.status(201).json(response);
    })
  });
}


function getBookForAuthor(req, res) {
  var searchValue = req.params.author;
  console.log(searchValue);
  connection.then((con) => {
    const sql = `SELECT DISTINCT books.isbn, books.title, books.img_url, books.description, books.url, books.publisher, books.publication_place, books.publication_date, books.rating, books.num_pages, books.lang, books.ages, MemberChoices.readflag, MemberChoices.likeFlag, MemberChoices.rating 
    from Books
    join BookAuthor on BookAuthor.isbn = Books.isbn
    join Author on Author.authorId = BookAuthor.authorId
    left join MemberChoices on Books.isbn = MemberChoices.isbn
    where lower(Author.authorName) like '%${searchValue}%'
    AND rownum <=50`;

    con.execute(sql).then((response) => {
      console.log(response);
      res.status(201).json(response);
    }, err => {
      console.log(err);
      res.status(404).json(err);
    });
  });
}

function getAuthors(req, res) {
  connection.then((con) => {
    const isbn = req.params.isbn;

    const sql = `select author.authorname, authorwiki.wikiurl
    from BookAuthor
    join Author on BookAuthor.authorid = Author.authorId
    left join AuthorWiki on AuthorWiki.authorId = BookAuthor.authorId
    where BookAuthor.isbn ='${isbn}'`;

    con.execute(sql, {}, {
      outFormat: oracledb.OUT_FORMAT_OBJECT   // query result format
    }, function (err, response) {
      const result = response.rows;

      if (err) {
        res.status(501).json({ message: err.message });
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: 'No User Found!'
        });
      } else {
        res.status(201).json(response);
      }

    });
  }, err => {
    console.log(err);
    res.status(504).json({ message: err.message });
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
function getTopPublisher(req, res) {

  connection.then((con) => {
    const sql = `WITH pubTemp AS
    (
    SELECT DISTINCT(books.publisher) as publisher, COUNT(*) AS count FROM Books
    INNER JOIN nytimesseller
    ON books.isbn = nytimesseller.isbn
    GROUP BY publisher
    ORDER BY count DESC
    )
    select pubTemp.publisher from pubTemp
    where rownum <= 15
    `;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


function getTopAuthor(req, res) {

  connection.then((con) => {
    const sql = `WITH AuthorTemp AS
    (
    SELECT * FROM (
    SELECT DISTINCT(author.authorid) as id, COUNT(*) AS count 
    FROM books
    INNER JOIN nytimesseller
    ON books.isbn = nytimesseller.isbn
    INNER JOIN bookauthor
    ON books.isbn = bookauthor.isbn
    INNER JOIN author
    ON bookauthor.authorid = author.authorid
    GROUP BY author.authorid 
    ORDER BY count DESC
    )WHERE ROWNUM <=15)
    SELECT author.authorName FROM author JOIN AuthorTemp ON AuthorTemp.id= author.authorid
    `;
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
function getTopNYPublishingBooks(req, res) {
  var pubName = req.params.pubName;
  pubName = pubName.replace("\'", "\'\'");
  connection.then((con) => {
    const sql = `WITH Temp AS
    (SELECT Books.isbn, Books.title, Books.img_url
    FROM Books
    INNER JOIN NYTimesSeller
    ON Books.isbn = NYTimesSeller.isbn
    WHERE Books.publisher = '${pubName}'
    ORDER BY NYTimesSeller.weeks_on_list DESC)
    SELECT DISTINCT(Temp.isbn) as isbn, Temp.title, Temp.img_url
    FROM Temp WHERE rownum <=20
    `;
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
function getTopNYAuthorBooks(req, res) {
  var authorName = req.params.authorName;
  authorName = authorName.replace("\'", "\'\'");
  console.log("authorName" + authorName);
  connection.then((con) => {
    const sql = `select DISTINCT(Books.isbn), Books.title, Books.img_url, Books.description, books.url, books.publisher, books.publication_place, books.publication_date, books.rating, books.num_pages, books.lang, books.ages
    from Books
    inner join bookauthor
    on books.isbn = bookauthor.isbn
    inner join author
    on bookauthor.authorid = author.authorid
    where author.authorName = '${authorName}'
    AND Books.img_url IS NOT NULL `
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
    const sql = `WITH Temp AS (select books.*
      from books
      inner join nytimesseller
      on books.isbn = nytimesseller.isbn
      where nytimesseller.rank_last_week = 0 
      and nytimesseller.rank != 0 
      and books.publication_date is not null
      order by books.publication_date DESC) 
      SELECT DISTINCT Temp.isbn, Temp.title, Temp.img_url FROM Temp WHERE ROWNUM<=19`;
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
    const sql = ` WITH temp AS(SELECT Books.isbn, BookCategory.categoryId FROM
    Books JOIN BookCategory ON Books.isbn = BookCategory.isbn),
      CategoryTemp AS
        (SELECT temp.categoryId, COUNT(DISTINCT(temp.isbn)) AS count FROM temp 
    GROUP BY temp.categoryId 
    ORDER BY count DESC),
        SelectCategories AS
          (SELECT DISTINCT(CategoryTemp.categoryId) FROM CategoryTemp
    WHERE ROWNUM < 20)
    SELECT DISTINCT(Category.categoryName) AS categoryName FROM Category
    WHERE Category.categoryId IN(SELECT * FROM SelectCategories)
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
  // console.log(inputcategory);
  inputcategory = inputcategory.replace("\'", "\'\'");
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
        SELECT DISTINCT(combinedtemp.isbn), combinedtemp.title as title, combinedtemp.AuthorName, combinedtemp.img_url
    FROM CombinedTemp
    inner join nyauthortemp
    on combinedtemp.authorid = nyauthortemp.authorid
    AND combinedtemp.categoryId =
      (SELECT categoryId FROM category
    WHERE categoryName = '${inputcategory}')
    WHERE combinedtemp.img_url IS NOT NULL
    )
  WHERE ROWNUM < 20`
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
  // console.log(inputcategory);
  inputcategory = inputcategory.replace("\'", "\'\'");
  connection.then((con) => {
    const sql = `WITH bookC AS
    (SELECT Books.*, Author.authorname AS author, category.categoryname, category.categoryid
    FROM Books JOIN BookCategory ON Books.isbn = BookCategory.isbn JOIN Category
     ON category.categoryid = bookcategory.categoryid Join BookAuthor 
     ON bookauthor.isbn = books.isbn JOIN AUTHOR ON BOOKAUTHOR.AUTHORID = author.authorid)
  SELECT * FROM(
    SELECT DISTINCT bookC.isbn, bookC.author, bookC.title, bookC.rating as rating, bookC.img_url
    FROM bookC
    WHERE bookC.categoryid IN
    (SELECT categoryId FROM Category
    WHERE categoryName = '${inputcategory}')
    AND rating IS NOT NULL
    AND bookC.img_url IS NOT NULL
    ORDER BY rating DESC
  )
  WHERE ROWNUM < 20`;
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
  inputcategory = inputcategory.replace("\'", "\'\'");
  connection.then((con) => {
    const sql = `WITH PublishersTemp AS
    (
      SELECT DISTINCT(books.publisher), COUNT(*) AS count
    FROM NYTimesSeller JOIN Books ON NYTimesSeller.isbn = Books.isbn
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
  SELECT * FROM(
    SELECT DISTINCT(CombinedTemp.isbn), CombinedTemp.title, CombinedTemp.AuthorName, CombinedTemp.img_url
    FROM CombinedTemp
    INNER JOIN PublishersTemp ON CombinedTemp.publisher = PublishersTemp.publisher
    WHERE CombinedTemp.categoryId IN
    (SELECT categoryId FROM Category
    WHERE categoryName = '${inputcategory}')
    AND CombinedTemp.img_url IS NOT NULL)
  WHERE ROWNUM <= 20`;
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
    const sql = `SELECT Books.isbn, Books.title, Author.authorName,bookmovie.movietitle, bookmovie.moviereleaseyear, Books.URL
                from BookMovie
                JOIN Books ON Books.title = BOOKMOVIE.booktitle
                JOIN BookAuthor ON Books.isbn = BookAuthor.isbn
                JOIN Author ON Author.authorId = BookAuthor.authorid
                where regexp_like(bookmovie.moviereleaseyear, '^[[:digit:]]+$') 
                order by moviereleaseyear desc`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}



module.exports = router;
