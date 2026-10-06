<template>
  <div class="mx-auto w-full max-w-5xl px-6 py-12">
    <!-- Hero -->
    <section class="pb-16">
      <h1 class="max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
        Автошкола, де водити навчаються впевнено
      </h1>
      <p class="mt-5 max-w-xl text-lg text-slate-600">
        Теорія, практика та підготовка до іспиту в одному місці. Записуйтесь онлайн і стежте за
        своїм прогресом в особистому кабінеті.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink
          to="/register"
          class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Записатися на навчання
        </RouterLink>
        <RouterLink
          to="/login"
          class="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Увійти
        </RouterLink>
      </div>
    </section>

    <!-- Advantages -->
    <section class="border-t border-slate-200 py-16">
      <h2 class="text-2xl font-bold text-slate-900">Чому обирають нас</h2>
      <div class="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        <div v-for="item in advantages" :key="item.title" class="border-l-4 border-blue-600 pl-4">
          <h3 class="text-lg font-semibold text-slate-900">{{ item.title }}</h3>
          <p class="mt-1 text-slate-600">{{ item.text }}</p>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="border-t border-slate-200 py-16">
      <h2 class="text-2xl font-bold text-slate-900">Категорії навчання</h2>
      <ul class="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        <li v-for="cat in categories" :key="cat.code" class="flex items-center gap-5 p-5">
          <span
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xl font-bold text-white"
          >
            {{ cat.code }}
          </span>
          <div>
            <h3 class="font-semibold text-slate-900">{{ cat.title }}</h3>
            <p class="text-slate-600">{{ cat.text }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- Steps -->
    <section class="border-t border-slate-200 py-16">
      <h2 class="text-2xl font-bold text-slate-900">Як почати навчання</h2>
      <ol class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(step, index) in steps" :key="step.title">
          <span class="text-3xl font-bold text-blue-600">{{ index + 1 }}</span>
          <h3 class="mt-2 font-semibold text-slate-900">{{ step.title }}</h3>
          <p class="mt-1 text-slate-600">{{ step.text }}</p>
        </li>
      </ol>
    </section>

    <!-- Final CTA -->
    <section class="rounded-2xl bg-slate-900 px-8 py-12 text-center">
      <h2 class="text-2xl font-bold text-white">Готові сісти за кермо?</h2>
      <p class="mx-auto mt-3 max-w-md text-slate-300">
        Створіть акаунт і оберіть свою першу дату заняття.
      </p>
      <RouterLink
        to="/register"
        class="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      >
        Зареєструватися
      </RouterLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const advantages = [
  {
    title: 'Досвідчені інструктори',
    text: 'Усі інструктори мають багаторічний стаж і вміють знайти підхід до новачків.',
  },
  {
    title: 'Гнучкий графік',
    text: 'Обирайте зручний час для теорії та практики: вранці, ввечері або у вихідні.',
  },
  {
    title: 'Сучасні автомобілі',
    text: 'Навчальний автопарк із механічною та автоматичною коробкою передач.',
  },
  {
    title: 'Підготовка до іспиту',
    text: 'Тести, розбір типових помилок і пробні заїзди на маршрутах сервісного центру.',
  },
]

const categories = [
  { code: 'A', title: 'Мотоцикли', text: 'Навчання керуванню мотоциклами та скутерами.' },
  {
    code: 'B',
    title: 'Легкові автомобілі',
    text: 'Найпопулярніша категорія: механіка або автомат.',
  },
  {
    code: 'C',
    title: 'Вантажні автомобілі',
    text: 'Для тих, хто хоче працювати водієм-професіоналом.',
  },
]

const steps = [
  { title: 'Зареєструйтесь', text: 'Створіть акаунт на сайті, це займе хвилину.' },
  { title: 'Оберіть категорію', text: 'Визначтесь, на яке посвідчення ви навчаєтесь.' },
  { title: 'Вивчайте теорію', text: 'Проходьте заняття та тести у зручному темпі.' },
  { title: 'Їздіть з інструктором', text: 'Записуйтесь на практику та складайте іспит.' },
]
</script>
