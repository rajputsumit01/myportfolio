<template>
  <div class="px-4 sm:px-6 md:px-16 space-y-8 sm:space-y-10 pb-12 sm:pb-20">

    <!-- EXPERIENCE -->
    <section>
      <h1 class="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 text-[#F8F9FA]">
        Experience
      </h1>

      <div class="space-y-4 sm:space-y-6">
        <!-- StreetStyleStore -->
        <div class="glass p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border-l-[5px] border-blue-500 hover:scale-[1.01] transition-all">
          <div class="flex items-start gap-3 sm:gap-4">
            <div class="text-2xl sm:text-3xl text-blue-400 flex-shrink-0">💼</div>
            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-1">
                <h2 class="text-blue-400 font-bold text-base sm:text-lg">Frontend Developer – StreetStyleStore</h2>
                <div class="text-xs sm:text-sm text-gray-300"> — Present</div>
              </div>
              <p class="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Built responsive e-commerce UI components (product cards, listings, checkout pages),
                improved layouts for mobile & desktop, and implemented accessible interactions following SSS
                brand guidelines.
              </p>
            </div>
          </div>
        </div>

        <!-- Excellence Technology training -->
        <div class="glass p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border-l-[5px] border-cyan-400 hover:scale-[1.01] transition-all">
          <div class="flex items-start gap-3 sm:gap-4">
            <div class="text-2xl sm:text-3xl text-cyan-400 flex-shrink-0">🎓</div>
            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-1">
                <h2 class="text-cyan-300 font-bold text-base sm:text-lg">Web Development Training – Excellence Technology</h2>
                <div class="text-xs sm:text-sm text-gray-300">2024</div>
              </div>
              <p class="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Completed intensive hands-on training covering HTML, CSS, Java, responsive layouts, and
                practical project builds (site clones and small apps). Focused on fundamentals and real-world
                implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EDUCATION -->
    <section>
      <h2 class="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-[#F8F9FA]">
        <img src="https://img.icons8.com/fluency/96/graduation-cap.png" class="w-7 h-7 sm:w-9 sm:h-9" alt="education icon" />
        Education
      </h2>

      <div class="space-y-4 sm:space-y-5">
        <div class="glass p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border-l-[5px] border-green-500">
          <div class="flex items-center gap-2 sm:gap-3 mb-1">
            <div class="text-xl sm:text-2xl text-green-400 flex-shrink-0">🎓</div>
            <h3 class="text-green-400 font-bold text-base sm:text-lg">BCA – SPU University, Mandi</h3>
          </div>
          <p class="text-gray-400 text-xs sm:text-sm">2022 – 2025</p>
        </div>

        <div class="glass p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border-l-[5px] border-yellow-500">
          <div class="flex items-center gap-2 sm:gap-3 mb-1">
            <div class="text-xl sm:text-2xl text-yellow-400 flex-shrink-0">🏫</div>
            <h3 class="text-yellow-400 font-bold text-base sm:text-lg">12th – HP Board</h3>
          </div>
          <p class="text-gray-400 text-xs sm:text-sm">Completed senior secondary education.</p>
        </div>

        <div class="glass p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border-l-[5px] border-purple-500">
          <div class="flex items-center gap-2 sm:gap-3 mb-1">
            <div class="text-xl sm:text-2xl text-purple-400 flex-shrink-0">📘</div>
            <h3 class="text-purple-400 font-bold text-base sm:text-lg">10th – HP Board</h3>
          </div>
          <p class="text-gray-400 text-xs sm:text-sm">Completed secondary education.</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
/* No certificate functionality needed anymore */
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.04);
}
</style>
