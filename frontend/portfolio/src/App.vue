
<template>
  <div class="min-h-screen neon-bg">
    <NavBar />
    <main class="pt-20 sm:pt-24 pb-6 sm:pb-10">
      <RouterView />
    </main>

    <!-- WhatsApp floating button -->
    <a
      href="https://wa.me/917876778254"
      target="_blank"
      class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-500 text-black px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg hover:shadow-blue-500/70 hover:scale-110 transition z-40 text-sm sm:text-base"
    >
      <span class="hidden sm:inline">WhatsApp </span>💬
    </a>

    <footer class="border-t border-blue-500/30 text-center text-[10px] sm:text-xs text-gray-400 py-3 sm:py-4 mt-6 sm:mt-10 px-4">
      © 2025 Sumit — All Rights Reserved
    </footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>
