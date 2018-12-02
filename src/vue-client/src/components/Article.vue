<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div v-if="article === null">
        <v-progress-circular
            indeterminate
          color="red"
        ></v-progress-circular>
      </div>
      <div v-else>
        <v-card>
          <v-img
            :src="`${article.image}`"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h1 class="text-left mb-0">{{article.title}}</h1>
              <div class="text-left mt-3">{{article.content}}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <div
              v-for="tag in article.tags"
              :key="tag.id">
              <v-chip color="#FF5252" text-color="white">{{tag.name}}</v-chip>
            </div>
          </v-card-actions>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Api from '@/services/Api';

export default {
  data() {
    return {
      article: null,
    };
  },
  async mounted() {
    this.article = await Api.fetchArticle(this.$route.params.id);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.text-left
  text-align left
</style>
