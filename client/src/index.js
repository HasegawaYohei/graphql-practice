import '@babel/polyfill';
import '../public/favicon.png';
import '../public/logo.png';
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001'
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
}

const nonDisplaySpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
}

const fetchArticle = event => {
  (async () => {
    const result = (await api.get('/api/articles')).data;
    result.forEach(v => {
      (async () => {
        const article = (await api.get(v.uri)).data;
        const tags = (await api.get(article.tags)).data;
        const articleListItem = buildArticleListItem(article, tags);
        addToArticleList(articleListItem);
        nonDisplaySpinner();
      })();
    })
  })();
};

fetchArticle();