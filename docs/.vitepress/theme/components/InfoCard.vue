<template>
  <div class="info-card" :class="type">
    <div class="icon" v-if="icon">{{ icon }}</div>
    <div class="content">
      <h3 v-if="title">{{ title }}</h3>
      <p>{{ content }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'info' | 'success' | 'warning' | 'error'
  icon?: string
  title?: string
  content: string
}>()
</script>
