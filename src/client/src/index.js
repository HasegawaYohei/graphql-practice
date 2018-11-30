import '@babel/polyfill';
import '../public/favicon.png';
import '../public/logo.png';
import axios from 'axios';
const rest = axios.create({
  baseURL: 'http://localhost:3001'
});
const graphql = axios.create({
  baseURL: 'http://localhost:3002'
});

const buildArticleListItem = (article, tags=[{name: 'JavaScript'}, {name: 'Ruby'}]) => {
  const { title, author } = article;
  return `<div class="card grey lighten-5" style="text-align: left">
    <div class="card-content">
      <span class="card-title" style="color: #ff5252">${title}</span>
      <p>${author}</p>
    </div>
    <div class="card-action">
      ${
        tags.map(tag => (
          `<div class="chip red accent-2 white-text">${tag.name}</div>`
        )).join('')
      }
    </div>
  </div>
  `;
};

const addToArticleList = articleDomElem => {
  const listElem = document.getElementById('article-list');
  listElem.innerHTML += articleDomElem;
};

const nonDisplaySpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};

const fetchArticleV1 = event => {
  (async () => {
    const result = (await rest.get('/api/articles')).data;
    result.forEach(v => {
      (async () => {
        const article = (await rest.get(v.uri)).data;
        const tags = (await rest.get(article.tags)).data;
        const articleListItem = buildArticleListItem(article, tags);
        addToArticleList(articleListItem);
      })();
    })
    nonDisplaySpinner();
  })();
};

const fetchArticleV2 = () => {
  (async () => {
    const articles = (await rest.get('/api/articlesAndTags')).data;
    articles.forEach(article => {
      const articleListItem = buildArticleListItem(article, article.tags);
      addToArticleList(articleListItem);
    });
    nonDisplaySpinner();
  })();
};

const fetchArticleV3 = () => {
  const query = `
{
  articles {
    title,
    tags {
      name
    }
  }
}
`;
  (async () => {
    const articles = (await graphql.get('/graphql', {
      params: {
        query
      }
    })).data.data.articles;
    articles.forEach(article => {
      const articleListItem = buildArticleListItem(article, article.tags);
      addToArticleList(articleListItem);
    });
    nonDisplaySpinner();
  })();
}

fetchArticleV1();