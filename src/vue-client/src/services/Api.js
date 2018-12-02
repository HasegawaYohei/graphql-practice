import axios from 'axios';

const rest = axios.create({
  baseURL: 'http://localhost:3001',
});

const graphql = axios.create({
  baseURL: 'http://localhost:3002',
});

const asyncMap = (arr, fn) => Promise.all(arr.map(async v => fn(v)));

// /用のfetch関数
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

const internalFetchArticlesV2 = async () => (await rest.get('/api/articlesAndTags')).data;

const internalFetchArticlesV3 = async () => {
  console.log('internalFetchArticlesV3');
  const query = `
{
  articles {
    id,
    title,
    tags {
      name
    }
  }
}
`;
  return (await graphql.post('/graphql', {
    query,
  })).data.data.articles;
};


// /article用のfetch 関数

const internalFetchArticleV1 = async (id) => {
  const article = (await rest.get(`/api/article/${id}`)).data;
  const tagUris = (await rest.get(article.tags)).data;
  const tags = await asyncMap(tagUris, async tagUri => (await rest.get(tagUri.uri)).data);
  article.tags = tags;
  return article;
};

const internalFetchArticleV2 = async id => (await rest.get(`/api/article/${id}`)).data;

const internalFetchArticleV3 = async (id) => {
  const query = `
{
  article(id: ${id}) {
    title,
    content,
    image,
    tags {
      name
    }
  }
}
`;

  return (await graphql.post('/graphql', {
    query,
  })).data.data.article;
};


// =====================================================
const fetchArticles = async () => internalFetchArticlesV3();
const fetchArticle = async id => internalFetchArticleV3(id);


export default {
  fetchArticles,
  fetchArticle,
};
