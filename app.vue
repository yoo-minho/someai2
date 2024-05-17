<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <UNotifications class="max-w-400px p-6" />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap");

body {
  margin: 0;
  padding: 0;
}

:root {
  --color: #243746;
  --color-primary: #158876;
  --color-secondary: #0e2233;
  --bg: #f3f5f4;
  --bg-secondary: #fff;
  --border-color: #ddd;
  --header-height: 4rem;
}

.dark {
  --color: #ebf4f1;
  --color-primary: #41b38a;
  --color-secondary: #fdf9f3;
  --bg: #091a28;
  --bg-secondary: #071521;
  --border-color: #0d2538;
}

body {
  background-color: var(--bg);
  color: var(--color);
  transition: background-color 0.3s;
}

a {
  color: var(--color-primary);
}

* {
  font-family: "DM Sans", sans-serif;
}
</style>
