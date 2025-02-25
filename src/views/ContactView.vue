<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1>联系我们</h1>
      <div class="underline"></div>
      <p class="subtitle">有任何问题或建议？请随时联系我们</p>
    </div>

    <div class="contact-content">
      <div class="contact-info">
        <h2>联系方式</h2>
        <div class="info-item">
          <i class="fas fa-envelope"></i>
          <span>{{ contentStore.personalInfo.email }}</span>
        </div>
        <div class="info-item">
          <i class="fas fa-phone"></i>
          <span>{{ contentStore.personalInfo.phone }}</span>
        </div>
        <div class="info-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ contentStore.personalInfo.location }}</span>
        </div>
      </div>
      <div class="contact-form">
        <h2>给我们留言</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">姓名</label>
            <div class="input-group">
              <i class="fas fa-user"></i>
              <input type="text" id="name" v-model="form.name" required placeholder="请输入您的姓名">
            </div>
          </div>
          <div class="form-group">
            <label for="email">邮箱</label>
            <div class="input-group">
              <i class="fas fa-envelope"></i>
              <input type="email" id="email" v-model="form.email" required placeholder="请输入您的邮箱">
            </div>
          </div>
          <div class="form-group">
            <label for="message">留言</label>
            <div class="input-group textarea-group">
              <i class="fas fa-comment"></i>
              <textarea id="message" v-model="form.message" rows="5" required placeholder="请输入您的留言内容"></textarea>
            </div>
          </div>
          <button type="submit" class="submit-btn">
            <span>提交留言</span>
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>


    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useContentStore } from '@/stores/contentStore';

export default defineComponent({
  name: 'ContactView',
  setup() {
    const contentStore = useContentStore();

    const form = reactive({
      name: '',
      email: '',
      message: ''
    });

    const submitForm = () => {
      // 这里添加表单提交逻辑
      console.log('表单已提交:', form);
      alert('感谢您的留言！我们会尽快回复您。');
      // 重置表单
      form.name = '';
      form.email = '';
      form.message = '';
    };

    return {
      form,
      submitForm,
      contentStore
    };
  }
});
</script>

<style scoped>
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.contact-header {
  text-align: center;
  margin-bottom: 60px;
}

.contact-header h1 {
  color: #2c3e50;
  font-size: 2.8rem;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: 1px;
}

.contact-header .subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-top: 15px;
}

.underline {
  height: 4px;
  width: 100px;
  background: linear-gradient(to right, #42b883, #35495e);
  margin: 0 auto;
  border-radius: 2px;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 60px;
}

.contact-info,
.contact-form {
  flex: 1;
  min-width: 300px;
  background-color: #fff;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-info:hover,
.contact-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.contact-info h2,
.contact-form h2,
.map-section h2 {
  color: #35495e;
  margin-bottom: 25px;
  font-size: 1.8rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;
}

.contact-info h2::after,
.contact-form h2::after,
.map-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: #42b883;
  border-radius: 2px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.2s;
}

.info-item:hover {
  transform: translateX(5px);
  background-color: #f0f4f8;
}

.info-item i {
  margin-right: 15px;
  font-size: 1.2rem;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #42b883;
  border-radius: 50%;
  padding: 8px;
}

.social-links {
  margin-top: 30px;
}

.social-links h3 {
  color: #35495e;
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 500;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #35495e;
  text-decoration: none;
  transition: all 0.3s;
}

.social-icon:hover {
  background-color: #42b883;
  color: white;
  transform: scale(1.1);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #555;
  font-weight: 600;
  font-size: 0.95rem;
}

.input-group {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.input-group:focus-within {
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
}

.input-group i {
  padding: 0 15px;
  color: #aaa;
  font-size: 1.1rem;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 14px;
  border: none;
  background-color: transparent;
  font-size: 1rem;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
}

.textarea-group {
  align-items: flex-start;
}

.textarea-group i {
  padding-top: 14px;
}

.submit-btn {
  background: linear-gradient(to right, #42b883, #35495e);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(66, 184, 131, 0.3);
}

.submit-btn:active {
  transform: translateY(-1px);
}

.map-section {
  margin-top: 60px;
  text-align: center;
}

.map-container {
  margin-top: 30px;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  color: #666;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
  }

  .contact-header h1 {
    font-size: 2.2rem;
  }

  .contact-info,
  .contact-form {
    padding: 25px;
  }

  .map-container {
    height: 300px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-header,
.contact-info,
.contact-form,
.map-section {
  animation: fadeIn 0.8s ease-out forwards;
}

.contact-info {
  animation-delay: 0.2s;
}

.contact-form {
  animation-delay: 0.4s;
}

.map-section {
  animation-delay: 0.6s;
}
</style>
