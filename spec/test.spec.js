process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const {
  topicData, userData, articleData, commentData,
} = require('../db/data');
const { dateRef, dateRef1 } = require('../db/utils/index');
const connection = require('../db/connection');

const request = supertest(app);

describe('/', () => {
  it('non-existent route', () => request
    .get('/vefv')
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).to.equal('Page not found');
    }));

  describe('/api', () => {
    beforeEach(() => connection.seed.run());

    after(() => connection.destroy());

    it('GET: 200 status and serves up an object of all the end points within this API', () => request
      .get('/api')
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
      }));

    describe('Tables', () => {
      it('returns a created_at value in the correct format (ie. converted from a timestamp to date format', () => {
        expect(dateRef(articleData)[0].created_at).to.equal('2018-11-15T12:21:54.171Z');
      });
      it('returns an array of keys within the articleData table', () => {
        expect(articleData[0]).to.contain.keys('title', 'topic', 'author', 'body', 'created_at');
      });
      it('Table returns an array of objects', () => {
        expect(topicData).to.be.an('array');
      });
      it('returns an array of keys within the topicData table', () => {
        expect(topicData[0]).to.contain.keys('description', 'slug');
      });
      it('Table returns an array of objects', () => {
        expect(userData).to.be.an('array');
      });
      it('returns an array of keys within the userData table', () => {
        expect(userData[0]).to.contain.keys('username', 'name', 'avatar_url');
      });
      it('Table returns an array of objects', () => {
        expect(commentData).to.be.an('array');
      });
      it('returns an array of keys within the commentData table', () => {
        expect(commentData[0]).to.contain.keys(
          'body',
          'belongs_to',
          'created_by',
          'votes',
          'created_at',
        );
        it('returns a created_at value in the correct format (ie. converted from a timestamp to date format', () => {
          expect(dateRef1(commentData)[0].created_at).to.equal('2016-07-09T18:07:18.932Z');
        });
      });
    });
    describe('/topics', () => {
      it('GET gives 200 status and serves up an array of topic objects', () => request
        .get('/api/topics')
        .expect(200)
        .then((res) => {
          expect(res.body.topics).to.be.an('array');
          expect(res.body.topics[0]).to.contain.keys('description', 'slug');
          expect(res.body.topics[0].slug).to.equal('mitch');
          expect(res.body.topics[0].description).to.equal('The man, the Mitch, the legend');
        }));
      it('POST 201 posts a new topic object given object data', () => {
        const newTopic = {
          slug: 'Willem',
          description: 'On course for Northcoders graduation!',
        };
        return request
          .post('/api/topics')
          .send(newTopic)
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.topic).to.eql(newTopic);
            expect(res.body.topic.slug).to.equal('Willem');
            expect(res.body.topic.description).to.equal('On course for Northcoders graduation!');
          });
      });
      it('POST 400 when given insufficient information', () => {
        const newTopic = {};
        return request
          .post('/api/topics')
          .send(newTopic)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('violates not null violation');
          });
      });
      it("404 when the route doesn't exist", () => request
        .get('/api/topics/1')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Page not found');
        }));
    });
    describe('/articles', () => {
      it('GET gives status 200 and serves up an array of articles', () => request
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0]).to.contain.keys(
            'author',
            'title',
            'article_id',
            'topic',
            'created_at',
            'votes',
          );
        }));
      it('GET gives status 200 and serves up an array of articles given a sort_by query with default descending order', () => request
        .get('/api/articles?sort_by=title')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].title).to.equal('Z');
          expect(res.body.articles[0].body).to.equal('I was hungry.');
          expect(res.body.articles[0].topic).to.equal('mitch');
          expect(res.body.articles[0].author).to.equal('icellusedkars');
        }));
      it("404 when sorting by a route which doesn't exist", () => request
        .get('/api/articles?sort_by=abc')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Not found');
        }));
      it('GET gives status 200 and serves up an array of articles given a sort_by query with ascending order', () => request
        .get('/api/articles?sort_by=title&order=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].title).to.equal('A');
          expect(res.body.articles[0].body).to.equal('Delicious tin of cat food');
          expect(res.body.articles[0].topic).to.equal('mitch');
          expect(res.body.articles[0].author).to.equal('icellusedkars');
          expect(res.body.articles[0].created_at).to.equal('1998-11-20T12:21:54.171Z');
        }));
      it('GET gives status 200 and serves up an array of articles given a sort_by query which should default to created_at when passed no column with default descending order', () => request
        .get('/api/articles?sort_by')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].created_at).to.equal('2018-11-15T12:21:54.171Z');
          expect(res.body.articles[0].body).to.equal('I find this existence challenging');
          expect(res.body.articles[0].topic).to.equal('mitch');
          expect(res.body.articles[0].author).to.equal('butter_bridge');
        }));
      it('GET gives status 200 and serves up an array of articles given a sort_by query which should default to created_at when passed no column with ascending order', () => request
        .get('/api/articles?sort_by&order=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].created_at).to.equal('1974-11-26T12:21:54.171Z');
          expect(res.body.articles[0].body).to.equal('Have you seen the size of that thing?');
          expect(res.body.articles[0].topic).to.equal('mitch');
          expect(res.body.articles[0].title).to.equal('Moustache');
          expect(res.body.articles[0].author).to.equal('butter_bridge');
        }));
      it('GET gives status 200 and serves up an article given a filter query on author', () => request
        .get('/api/articles?author=butter_bridge')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].author).to.equal('butter_bridge');
          expect(res.body.articles[0].topic).to.equal('mitch');
          expect(res.body.articles[0].votes).to.equal(100);
        }));
      it('GET gives status 200 and serves up an article given a filter query on topic', () => request
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles[0].author).to.equal('butter_bridge');
          expect(res.body.articles[0].topic).to.equal('mitch');
          expect(res.body.articles[0].votes).to.equal(100);
        }));
      it('POST 201 and a new article object given object data', () => {
        const newArticle = {
          title: 'Making a POST request',
          body: 'This is a test',
          topic: 'mitch',
          author: 'butter_bridge',
        };
        return request
          .post('/api/articles')
          .send(newArticle)
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.article.title).to.equal('Making a POST request');
            expect(res.body.article.topic).to.equal('mitch');
            expect(res.body.article.author).to.equal('butter_bridge');
            expect(res.body.article.body).to.equal('This is a test');
          });
      });
      it('POST 400 when given insufficient information', () => {
        const newArticle = {};
        return request
          .post('/api/articles')
          .send(newArticle)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('violates not null violation');
          });
      });
      it('Status 405 when trying to POST given an article id', () => request
        .post('/api/articles/1')
        .expect(405)
        .then((res) => {
          expect(res.body.msg).to.equal('Method not allowed');
        }));
      it("GET gives a status 200 and returns an article object given an id number in it's parameter", () => request
        .get('/api/articles/1')
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.all.keys('article');
          expect(res.body.article).to.be.an('object');
          expect(res.body.article.title).to.equal('Living in the shadow of a great man');
          expect(res.body.article.topic).to.equal('mitch');
        }));
      it("GET 400 when given an id that doesn't exist", () => request
        .get('/api/articles/hi')
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal('Bad request: invalid input');
        }));
      it('PATCH gives a status 202 and returns an article object with an upvoted votes given an article parameter', () => {
        const newVote = { inc_votes: 1 };
        const expected = [
          {
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: '2018-11-15T12:21:54.171Z',
            votes: 101,
          },
        ];
        return request
          .patch('/api/articles/1')
          .send(newVote)
          .expect(202)
          .then((res) => {
            expect(res.body).to.have.all.keys('article');
            expect(res.body.article).to.eql(expected);
          });
      });
      it('PATCH gives a status 202 and returns an article object with a downvoted vote given a negative article parameter', () => {
        const newVote = { inc_votes: -1 };
        const expected = [
          {
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: '2018-11-15T12:21:54.171Z',
            votes: 99,
          },
        ];
        return request
          .patch('/api/articles/1')
          .send(newVote)
          .expect(202)
          .then((res) => {
            expect(res.body).to.have.all.keys('article');
            expect(res.body.article).to.eql(expected);
          });
      });
      it('404 for invalid method when trying to make a PATCH request without correct information', () => {
        const newDesc = 'This is a test';
        return request
          .patch('/api/articles/1')
          .send(newDesc)
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal("Article couldn't be updated");
          });
      });
      it('DELETE gives a status 204 and deletes the given article by article_id', () => request
        .delete('/api/articles/1')
        .expect(204)
        .then(() => request.get('/api/articles').then((res) => {
          expect(articleData.find(article => article.article_id === 1)).to.equal(undefined);
        })));
      it('405 for invalid method', () => request
        .delete('/api/articles')
        .expect(405)
        .then((res) => {
          expect(res.body.msg).to.equal('Method not allowed');
        }));
    });
    describe('/comments', () => {
      it('GET gives status 200 and returns an array of comments for the given article_id', () => request
        .get('/api/articles/1/comments')
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.all.keys('comments');
          expect(res.body.comments.length).to.equal(13);
          expect(res.body.comments[1].votes).to.equal(100);
          expect(res.body.comments[1].author).to.equal('icellusedkars');
          expect(res.body.comments[1].created_at).to.equal('2015-11-23T12:36:03.389Z');
        }));
      it("404 for invalid method when trying to make a GET request for an article id which doesn't exist", () => request
        .get('/api/articles/hi/comments')
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal('Bad request: invalid input');
        }));
      it('GET gives status 200 and serves up an array of articles given a sort_by query with default descending order', () => request
        .get('/api/articles/1/comments?sort_by=votes')
        .expect(200)
        .then((res) => {
          expect(res.body.comments).to.be.an('array');
          expect(res.body.comments[0].votes).to.equal(100);
          expect(res.body.comments[0].body).to.equal(
            'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
          );
          expect(res.body.comments[0].author).to.equal('icellusedkars');
        }));
      it('GET gives status 200 and serves up an array of articles given a sort_by query with ascending order', () => request
        .get('/api/articles/1/comments?sort_by=votes&order=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.comments).to.be.an('array');
          expect(res.body.comments[0].votes).to.equal(-100);
          expect(res.body.comments[0].body).to.equal(
            ' I carry a log — yes. Is it funny to you? It is not to me.',
          );
          expect(res.body.comments[0].author).to.equal('icellusedkars');
        }));
      it('GET gives status 200 and serves up an array of articles given a sort_by query which should default to created_at when passed no column and with default descending order', () => request
        .get('/api/articles/1/comments?sort_by')
        .expect(200)
        .then((res) => {
          expect(res.body.comments).to.be.an('array');
          expect(res.body.comments[0].created_at).to.equal('2016-11-22T12:36:03.389Z');
          expect(res.body.comments[0].body).to.equal(
            'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
          );
          expect(res.body.comments[0].votes).to.equal(14);
          expect(res.body.comments[0].author).to.equal('butter_bridge');
        }));
      it('GET gives status 200 and serves up an array of articles given a sort_by query which should default to created_at when passed no column and with an ascending order', () => request
        .get('/api/articles/1/comments?sort_by&order=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.comments).to.be.an('array');
          expect(res.body.comments[0].created_at).to.equal('2000-11-26T12:36:03.389Z');
          expect(res.body.comments[0].body).to.equal(
            'This morning, I showered for nine minutes.',
          );
          expect(res.body.comments[0].votes).to.equal(16);
          expect(res.body.comments[0].author).to.equal('butter_bridge');
        }));
      it('POST 201 and posts a new comment object given a new comment', () => {
        const newComment = {
          username: 'rogersop',
          body: 'Everything is awesome!',
        };
        return request
          .post('/api/articles/1/comments')
          .send(newComment)
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.comment.author).to.equal('rogersop');
            expect(res.body.comment.votes).to.equal(0);
            expect(res.body.comment.body).to.equal('Everything is awesome!');
          });
      });
      it('PATCH gives a status 202 and returns a comments object with an upvoted votes given a comment parameter', () => {
        const newVote = { inc_votes: 1 };
        const expected = [
          {
            comment_id: 1,
            author: 'butter_bridge',
            article_id: 9,
            votes: 17,
            created_at: '2017-11-22T12:36:03.389Z',
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          },
        ];
        return request
          .patch('/api/comments/1')
          .send(newVote)
          .expect(202)
          .then((res) => {
            expect(res.body).to.have.all.keys('comment');
            expect(res.body.comment).to.eql(expected);
          });
      });
      it('PATCH gives a status 202 and returns a comments object with downvoted votes given a negative comment parameter', () => {
        const newVote = { inc_votes: -1 };
        const expected = [
          {
            comment_id: 1,
            author: 'butter_bridge',
            article_id: 9,
            votes: 15,
            created_at: '2017-11-22T12:36:03.389Z',
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          },
        ];
        return request
          .patch('/api/comments/1')
          .send(newVote)
          .expect(202)
          .then((res) => {
            expect(res.body).to.have.all.keys('comment');
            expect(res.body.comment).to.eql(expected);
          });
      });
      it('404 for invalid method when trying to make a PATCH request without correct information', () => {
        const newDesc = 'This is a test';
        return request
          .patch('/api/comments/1')
          .send(newDesc)
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal("Comment couldn't be updated");
          });
      });
      it('DELETE gives a status 204 and deletes the given comment by comment_id', () => request
        .delete('/api/comments/1')
        .expect(204)
        .then(() => request.get('/api/comments').then((res) => {
          expect(commentData.find(comment => comment.comment_id === 1)).to.equal(undefined);
        })));
      it('400 for bad request when trying to delete comment object', () => request
        .delete('/api/comments/qwe')
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal('Bad request: invalid input');
        }));
    });
    describe('/users', () => {
      it('GET returns 200 and returns an array of users', () => request
        .get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body.users).to.be.an('array');
          expect(res.body.users[0]).to.contain.keys('username', 'name', 'avatar_url');
          expect(res.body.users[0].username).to.equal('butter_bridge');
          expect(res.body.users[0].name).to.equal('jonny');
          expect(res.body.users[0].avatar_url).to.equal(
            'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
          );
        }));
      it('POST 201 and a new user object given object data', () => {
        const newUser = {
          username: 'WillyWehWah',
          name: 'Willem Taylor',
          avatar_url: 'https://willemtaylor.com',
        };
        return request
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.users).to.eql(newUser);
            expect(res.body.users.username).to.equal('WillyWehWah');
            expect(res.body.users.name).to.equal('Willem Taylor');
          });
      });
      it('POST 400 when given insufficient information', () => {
        const newUser = {};
        return request
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('violates not null violation');
          });
      });
      it('405 for invalid method when trying to POST given a user id', () => request
        .post('/api/users/1')
        .expect(405)
        .then((res) => {
          expect(res.body.msg).to.equal('Method not allowed');
        }));
      it('GET gives a status 200 and returns a user object given a username', () => request
        .get('/api/users/butter_bridge')
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.all.keys('users');
          expect(res.body.users).to.be.an('object');
          expect(res.body.users.username).to.equal('butter_bridge');
          expect(res.body.users.name).to.equal('jonny');
          expect(res.body.users.avatar_url).to.equal(
            'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
          );
        }));
      it('404 for invalid when trying to GET using an incorrect username', () => request
        .get('/api/users/will')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal("user doesn't exist");
        }));
    });
  });
});
