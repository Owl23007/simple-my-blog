<template>
  <div class="article">
    <h1>Article {{ $route.params.id }}</h1>
    <p>This is the content of article {{ $route.params.id }}.</p>
    <router-link to="/blog">Back to blog</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArticleView',
});
</script>

<style scoped>
.article {
  padding: 20px;
}
</style>
