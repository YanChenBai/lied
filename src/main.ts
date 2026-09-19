import { PiniaColada } from '@pinia/colada';
import { MotionPlugin } from 'motion-v';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import './styles/main.css';

import App from './App.vue';
import { router } from './router/index.ts';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(MotionPlugin);
app.use(PiniaColada, {
  // Optionally provide global options here for queries
  queryOptions: {
    gcTime: 300_000, // 5 minutes, the default
  },
});

app.mount('#app');
