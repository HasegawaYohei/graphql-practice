<template>
  <div v-if="articles === null">
    <v-progress-circular
      indeterminate
      color="red"
    ></v-progress-circular>
  </div>
  <div v-else>
    <div
      v-for="article in articles"
      :key="article.id">
      <v-layout>
        <v-flex offset-xs1 xs10>
          <v-card class="mt-4" color="#fafafa">
            <v-card-title primary-title>
              <router-link tag="div" class="link" :to="{ name: 'article', params: { id: article.id } }">
                <h1 class="mb-0 title-color">{{article.title}}</h1>
              </router-link>
            </v-card-title>
            <v-card-actions>
              <div
                v-for="tag in article.tags"
                :key="tag.id">
                <v-chip color="#FF5252" text-color="white">{{tag.name}}</v-chip>
              </div>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <div v-if="pageInfo !== null && pageInfo.hasNext">
      <v-btn class="mt-4" color="#FF5252" style="color: #FFFFFF" @click="fetchMore(pageInfo.after)">more</v-btn>
    </div>
  </div>
</template>

<script>
import Api from '@/services/Api';

export default {
  data() {
    return {
      articles: null,
      pageInfo: null,
    };
  },
  async mounted() {
    const fetchResult = await Api.fetchArticles('');
    this.articles = fetchResult.edges.map(edge => edge.node);
    this.pageInfo = fetchResult.pageInfo;
  },
  methods: {
    async fetchMore(after) {
      if (!this.pageInfo.hasNext) return;
      const fetchResult = await Api.fetchArticles(after);
      this.articles = this.articles.concat(fetchResult.edges.map(edge => edge.node));
      this.pageInfo = fetchResult.pageInfo;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.title-color
  color #FF5252

.link:hover
  cursor pointer

h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
