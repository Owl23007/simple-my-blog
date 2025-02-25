<template>
  <div class="demo-container">
    <div class="demo-card">
      <div class="demo-icon">
        <i class="fas fa-tools"></i>
      </div>
      <h2>演示链接</h2>
      <p>此链接仅用于作品集展示，并非实际项目链接。</p>
      <p class="demo-message">这是一个示例项目，没有实际的项目内容。</p>
      <button class="demo-button" @click="goBack">返回上一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoPage',
  methods: {
    goBack() {
      //返回主页
        this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.demo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.demo-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.demo-icon {
  font-size: 48px;
  color: #4a6cf7;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

p {
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.6;
}

.demo-message {
  font-weight: 500;
  margin: 24px 0;
  padding: 12px;
  background-color: #f0f5ff;
  border-radius: 6px;
  color: #3366ff;
}

.demo-button {
  background-color: #4a6cf7;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.demo-button:hover {
  background-color: #3a5ad9;
}
</style>
