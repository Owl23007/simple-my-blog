<script setup lang="ts">
import { onMounted, ref } from 'vue'

const particles = ref<Array<{ x: number, y: number, size: number, opacity: number, dx: number, dy: number }>>([])

onMounted(() => {
  // 生成背景粒子效果
  for (let i = 0; i < 20; i++) {
    particles.value.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    })
  }

  // 动画循环
  const animate = () => {
    particles.value.forEach(particle => {
      particle.x += particle.dx
      particle.y += particle.dy

      // 边界反弹
      if (particle.x < 0 || particle.x > 100) particle.dx *= -1
      if (particle.y < 0 || particle.y > 100) particle.dy *= -1

      particle.x = Math.max(0, Math.min(100, particle.x))
      particle.y = Math.max(0, Math.min(100, particle.y))
    })
    requestAnimationFrame(animate)
  }
  animate()
})
</script>

<template>
  <div class="hero-enhance">
    <!-- 粒子背景 -->
    <div class="particles">
      <div v-for="(particle, i) in particles" :key="i" class="particle" :style="{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        opacity: particle.opacity
      }" />
    </div>

    <!-- 装饰线条 -->
    <div class="decoration-lines">
      <div class="line line-1" />
      <div class="line line-2" />
      <div class="line line-3" />
    </div>
  </div>
</template>

<style scoped lang="less">
.hero-enhance {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  filter: blur(1px);
}

html[theme].dark .particle {
  background: var(--vp-c-brand-1);
  opacity: calc(var(--opacity) * 0.6) !important;
}

.decoration-lines {
  position: absolute;
  width: 100%;
  height: 100%;
}

.line {
  position: absolute;
  background: linear-gradient(90deg, transparent, var(--vp-c-brand-1), transparent);
  opacity: 0.1;
  animation: moveLines 8s linear infinite;

  &-1 {
    width: 100%;
    height: 1px;
    top: 25%;
    animation: moveLines 12s linear infinite;
  }

  &-2 {
    width: 100%;
    height: 1px;
    top: 50%;
    animation: moveLines 15s linear infinite reverse;
  }

  &-3 {
    width: 100%;
    height: 1px;
    top: 75%;
    animation: moveLines 10s linear infinite;
  }
}

@keyframes moveLines {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
