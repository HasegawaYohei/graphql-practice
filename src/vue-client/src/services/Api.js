import axios from 'axios';

const rest = axios.create({
  baseURL: 'http://localhost:3001',
});

const graphql = axios.create({
  baseURL: 'http://localhost:3002',
});

const asyncMap = (arr, fn) => Promise.all(arr.map(async v => fn(v)));

// /article 用のfetch関数

const internalFetchArticleV1 = async (id) => {
  const article = (await rest.get(`/api/article/${id}`)).data;
  const tagUris = (await rest.get(article.tags)).data;
  const tags = await asyncMap(tagUris, async tagUri => (await rest.get(tagUri.uri)).data);
  article.tags = tags;
  return article;
};

const internalFetchArticleV2 = async () => {
};

const internalFetchArticleV3 = async () => {
};


// / 用のfetch関数
const internalFetchArticlesV1 = async () => {
  const result = (await rest.get('/api/articles')).data;
  return asyncMap(result, async (v) => {
    const article = (await rest.get(v.uri)).data;
    const tagUris = (await rest.get(article.tags)).data;
    const tags = await asyncMap(tagUris, async tagUri => (await rest.get(tagUri.uri)).data);
    article.tags = tags;
    return article;
  });
};

const internalFetchArticlesV2 = async () => {
};

const internalFetchArticlesV3 = async () => {
};


// export
const fetchArticles = async () => internalFetchArticlesV1();
const fetchArticle = async id => internalFetchArticleV1(id);

export default {
  fetchArticles,
  fetchArticle,
};
