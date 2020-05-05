const express = require("express");
const router = express.Router();
const oracledb = require('oracledb');
const connection = require('../models/database');

router.get('/', (req, res) => getBooks(req, res));
router.get('/search/title/:title', (req, res) => getBookForTitle(req, res));
router.get('/search/isbn/:isbn', (req, res) => getBookForIsbn(req, res));
router.get('/search/author/:author', (req, res) => getBookForAuthor(req, res));
router.get('/recommended/nyauthor/:email', (req, res) => getTopNYAuthorRec(req, res));
router.get('/recommended/booksRead/:email', (req, res) => getBooksReadRec(req, res));
router.get('/recommended/booksLiked/:email', (req, res) => getBooksLikedRec(req, res));
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

router.get('/dashboard/liked/:email', (req, res) => getDashboardLiked(req, res));
router.get('/dashboard/read/:email', (req, res) => getDashboardRead(req, res));

function getDashboardLiked(req, res) {
  var email = req.params.email;

  connection.then((con) => {
    const sql = `
    WITH userBooksISBN AS
    (
      SELECT distinct(isbn)
      FROM memberchoices
      WHERE memberchoices.email = '${email}' AND likeflag = 1
    ),
    bookstemp as
    (
      select * 
      from books
      where isbn in (select * from userbooksisbn)
    )
    select * 
    from bookstemp`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}



function getDashboardRead(req, res) {
  var email = req.params.email;

  connection.then((con) => {
    const sql = `
    WITH userBooksISBN AS
    (
      SELECT distinct(isbn)
      FROM memberchoices
      WHERE memberchoices.email = '${email}' AND readflag = 1
    ),
    bookstemp as
    (
      select * 
      from books
      where isbn in (select * from userbooksisbn)
    )
    select * 
    from bookstemp`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


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
function getBooksReadRec(req, res) {

  const email = req.params.email;

  connection.then((con) => {
    // console.log(con);
    const sql = `
    WITH BookTemp AS
    (
      SELECT isbn, rating FROM Books
    ),
    BookAuthorUC AS
    (
      SELECT BookAuthor.authorid, bmain.isbn
      FROM MemberChoices uc
      INNER JOIN BookTemp bmain
      ON bmain.isbn = uc.isbn
      INNER JOIN BookAuthor
      ON bmain.isbn = BookAuthor.isbn
      WHERE uc.email = '${email}'
      AND uc.readflag = 1
    ),
    BooksSuggested AS 
    (
      SELECT distinct bma.isbn, bma.rating, BookAuthor.authorid
      FROM BookTemp bma
      INNER JOIN BookAuthor
      ON bma.isbn= BookAuthor.isbn
      INNER JOIN BookCategory bCat
      ON bCat.isbn = bma.isbn
      WHERE bma.isbn NOT IN 
      (
        SELECT isbn FROM BookAuthorUC
      )
      AND bCat.categoryId IN
      (
        SELECT BookCategory.categoryId
        FROM  BookTemp
        INNER JOIN BookCategory
        ON BookTemp.isbn = BookCategory.isbn
        INNER JOIN BookAuthorUC 
        ON BookTemp.isbn = BookAuthorUC.isbn
      )
    ),
    isbn_temp AS 
    (
      SELECT bs.isbn
      FROM BooksSuggested bs
      WHERE bs.authorid NOT IN 
      (
        SELECT bauc.authorid
        FROM BookAuthorUC bauc
      )
      ORDER BY bs.rating DESC
    )
    SELECT distinct books.isbn, books.title, books.img_url, books.description, books.url, books.publisher, books.publication_place, books.publication_date, books.rating, books.num_pages, books.lang, books.ages
    FROM isbn_temp INNER JOIN Books
    ON books.isbn = isbn_temp.isbn
    where rownum <= 20
    `;
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
function getTopNYAuthorRec(req, res) {

  const email = req.params.email;

  connection.then((con) => {
    // console.log(con);
    const sql = `
    WITH NYAuthorTemp AS 
    (
      select authorid AUTHORID, count COUNT from 
      (
        SELECT DISTINCT(bookauthor.authorid) as authorId, COUNT(*) AS count 
        FROM (SELECT isbn FROM nytimesseller) NYT
        INNER JOIN bookauthor
        ON NYT.isbn = bookauthor.isbn
        GROUP BY bookauthor.authorid
        ORDER BY count DESC
      )
      where rownum <= 15
    ),
    CategoryUC AS
    (
      select categories CATEGORIES from
      (
        SELECT DISTINCT(b.categoryId) AS categories
        FROM  BookCategory b
        INNER JOIN MemberChoices ON MemberChoices.isbn = b.isbn
        WHERE MemberChoices.email = '${email}'
      )
    ),
    Book_isbn AS 
    (
        SELECT isbn
        FROM Books
    ),
    CombinedTemp AS
    (
      SELECT DISTINCT BookAuthor.authorid, BookCategory.categoryid as categoryid, Book_isbn.isbn
      FROM Book_isbn
      INNER JOIN BookAuthor 
      ON BookAuthor.isbn = Book_isbn.isbn 
      INNER JOIN BookCategory 
      ON Book_isbn.isbn = BookCategory.isbn
    ),
    BestSellingWithCategories AS
    (
      SELECT bmain.authorid, COUNT(bmain.categoryid) AS count2
      FROM CombinedTemp bmain
      JOIN NYAuthorTemp ON NYAuthorTemp.authorId = bmain.authorId
      JOIN CategoryUC ON CategoryUC.categories = bmain.categoryid
      GROUP BY bmain.authorid 
      HAVING COUNT(bmain.categoryid) >= 3
    ), 
    Final_table AS
    (
        SELECT DISTINCT bs.isbn
        FROM CombinedTemp bs
        WHERE bs.authorId IN (SELECT authorid FROM BestsellingWithCategories)
        AND  bs.isbn NOT IN (SELECT uc.isbn
                             FROM MemberChoices uc
                             WHERE uc.email = '${email}')
    )    
    SELECT final_table.isbn, title, img_url, description, url, publisher, publication_place, publication_date, rating, num_pages, lang, ages
    FROM Final_table JOIN Books
    ON Final_table.isbn = Books.isbn
    WHERE rownum < 20
    ORDER BY books.rating DESC
    `;

    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}


function getBooksLikedRec(req, res) {

  const email = req.params.email;

  connection.then((con) => {
    const sql = `
    WITH BookTemp AS
    (
      SELECT isbn
      FROM Books
    ),
    BookAuthorUC AS
    (
      SELECT BookAuthor.authorid, bmain.isbn
      FROM MemberChoices uc
      INNER JOIN BookTemp bmain
      ON bmain.isbn = uc.isbn
      INNER JOIN BookAuthor
      ON bmain.isbn = BookAuthor.isbn
      WHERE uc.email = '${email}'
    ),
    UCTemp AS
    (
      SELECT uc.isbn
      FROM MemberChoices uc
      WHERE uc.email = '${email}'
      AND uc.likeflag = 1
    ),
    BooksSuggested AS 
    (
      SELECT bma.isbn, BookAuthor.authorid
      FROM BookTemp bma
      INNER JOIN BookAuthor
      ON bma.isbn= BookAuthor.isbn
      INNER JOIN BookCategory bCat
      ON bCat.isbn = bma.isbn
      WHERE bma.isbn NOT IN 
      (
        SELECT * FROM UCTemp
      )
      AND bCat.categoryId IN
      (
        SELECT BookCategory.categoryId
        FROM BookCategory
        INNER JOIN UCTemp 
        ON BookCategory.isbn = UCTemp.isbn
      )
    ), 
    Temp1 AS
    (
      SELECT bs.isbn, bauc.authorid
      FROM BooksSuggested bs
      INNER JOIN BookAuthorUC bauc
      ON bauc.isbn = bs.isbn
    ),
    Temp2 AS 
    (
      SELECT bs.isbn, bs.authorid
      FROM BooksSuggested bs
      WHERE bs.authorid NOT IN 
      (
        SELECT bauc.authorid
        FROM BookAuthorUC bauc
      )
    ),
    isbn_temp AS
    (
      SELECT isbn FROM Temp1
      UNION 
      SELECT isbn FROM Temp2  
    )
    SELECT books.isbn, books.title, books.img_url, books.description, books.url, books.publisher, books.publication_place, books.publication_date, books.rating, books.num_pages, books.lang, books.ages
    FROM isbn_temp INNER JOIN books
    ON books.isbn = isbn_temp.isbn
    WHERE rownum <=20    
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
    (SELECT Books.*
    FROM Books
    INNER JOIN (SELECT isbn, weeks_on_list FROM NYTimesSeller) NYT
    ON Books.isbn = NYT.isbn
    WHERE Books.publisher = '${pubName}'
    ORDER BY NYT.weeks_on_list DESC)
    SELECT DISTINCT(Temp.isbn) as isbn, Temp.title, Temp.img_url, Temp.description, Temp.url, Temp.publisher,
     Temp.publication_place, Temp.publication_date, Temp.rating, Temp.num_pages, Temp.lang
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
    const sql = `select DISTINCT(Books.isbn), Books.title, Books.img_url, 
    Books.description, books.url, books.publisher, books.publication_place, books.publication_date, books.rating, books.num_pages, books.lang, books.ages
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
      SELECT DISTINCT(Temp.isbn) as isbn, Temp.title, Temp.img_url, Temp.description, Temp.url, Temp.publisher, Temp.publication_place, Temp.publication_date, Temp.rating, Temp.num_pages, Temp.lang
      FROM Temp
      WHERE ROWNUM<=19`;
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
    const sql = ` WITH CategoryTemp AS 
    (SELECT BookCategory.categoryId, COUNT(DISTINCT(BookCategory.isbn)) AS count FROM BookCategory 
    GROUP BY BookCategory.categoryId 
    ORDER BY count DESC),
    SelectCategories AS 
    (SELECT DISTINCT(CategoryTemp.categoryId) FROM CategoryTemp
    WHERE ROWNUM < 20)
    SELECT DISTINCT(Category.categoryName) FROM Category
    JOIN SelectCategories ON Category.categoryId = SelectCategories.categoryId
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
        SELECT * FROM (
        SELECT DISTINCT(bookauthor.authorid), COUNT(*) AS count 
        FROM (SELECT isbn FROM nytimesseller) NYT
        INNER JOIN bookauthor
        ON NYT.isbn = bookauthor.isbn
        GROUP BY bookauthor.authorid 
        ORDER BY count DESC          
        )
    ),
    CombinedTemp AS
           
    (SELECT Books.*, BookCategory.categoryid, BookAuthor.authorid 
        FROM Books
        JOIN BookAuthor 
        ON BookAuthor.isbn = Books.isbn 
        JOIN BookCategory 
        ON Books.isbn = BookCategory.isbn
     )
        SELECT * FROM
     (
        SELECT DISTINCT(combinedtemp.isbn), combinedtemp.title as title, combinedtemp.img_url,  CombinedTemp.description, CombinedTemp.url, 
        CombinedTemp.publisher, CombinedTemp.publication_place, CombinedTemp.publication_date, CombinedTemp.rating, CombinedTemp.num_pages, CombinedTemp.lang
        FROM nyauthortemp
        inner join combinedtemp
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
  console.log("in ratedL" + inputcategory);
  inputcategory = inputcategory.replace("\'", "\'\'");
  connection.then((con) => {
    const sql = ` WITH bookC AS
    (SELECT Books.*, BookCategory.categoryid
    FROM Books JOIN BookCategory ON Books.isbn = BookCategory.isbn)
  SELECT * FROM (
    SELECT DISTINCT bookC.isbn, bookC.title, bookC.img_url, bookC.description, bookC.url,
bookC.publisher, bookC.publication_place, bookC.publication_date, bookC.rating, bookC.num_pages, bookC.lang, bookC.ages
    FROM bookC 
    WHERE bookC.categoryid IN
    (SELECT categoryId FROM Category
    WHERE categoryName = '${inputcategory}')
    AND bookC.rating IS NOT NULL
    AND bookC.img_url IS NOT NULL
    ORDER BY bookC.rating DESC
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
    const sql = `WITH BookPub AS 
    (SELECT Books.isbn, Books.publisher FROM Books),
    PublishersTemp AS(
         SELECT * FROM (
          SELECT DISTINCT(BookPub.publisher) as pub, COUNT(*) AS count
        FROM (SELECT isbn FROM NYTimesSeller) NYT JOIN BookPub ON NYT.isbn = BookPub.isbn
        GROUP BY BookPub.publisher
        ORDER BY count DESC) 
        WHERE ROWNUM <10
        ),
    CombinedTemp AS
    (
        SELECT Books.*, BookCategory.categoryid
        FROM Books
        INNER JOIN BookCategory ON Books.isbn = BookCategory.isbn
    )
      SELECT * FROM(
        SELECT DISTINCT(CombinedTemp.isbn), CombinedTemp.title, CombinedTemp.img_url,  CombinedTemp.description, CombinedTemp.url, 
        CombinedTemp.publisher, CombinedTemp.publication_place, CombinedTemp.publication_date, CombinedTemp.rating, CombinedTemp.num_pages, CombinedTemp.lang
        FROM PublishersTemp
        INNER JOIN CombinedTemp ON CombinedTemp.publisher = PublishersTemp.pub
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
    const sql = `with booktemp as
                (
                select distinct(title), isbn
                from books
                ),
                movieBookTemp AS
                (
                select booktemp.isbn, bookmovie.moviereleaseyear
                FROM bookmovie
                inner join booktemp
                on bookmovie.booktitle = booktemp.title
                ),
                bookauthortemp as
                (
                select * 
                from bookauthor
                where isbn in (select isbn from moviebooktemp)
                ),
                authorName AS
                (
                select author.authorname, bookauthortemp.isbn
                from bookauthortemp
                inner join author
                on bookauthortemp.authorid = author.authorid
                )
                select moviebooktemp.isbn, books.title, authorname.authorname, books.title, moviebooktemp.moviereleaseyear, books.url
                from moviebooktemp
                inner join books
                on moviebooktemp.isbn = books.isbn
                inner join authorname
                on authorName.isbn = moviebooktemp.isbn`;
    con.execute(sql).then((response) => {
      console.log(response);
      res.json(response);
    })
  });
}



module.exports = router;
