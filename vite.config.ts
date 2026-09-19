import { fileURLToPath } from 'node:url';

import { PiniaColadaDevtools } from '@pinia/colada-devtools/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { nitro } from 'nitro/vite';
import { pathstrider } from 'pathstrider/vite';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import { configDefaults, defineConfig, lazyPlugins } from 'vite-plus';
import vueRouter from 'vue-router/vite';

// https://vite.dev/config/
export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },

  fmt: {
    singleQuote: true,
    sortImports: true,
    sortTailwindcss: true,
    sortPackageJson: true,
    arrowParens: 'avoid',
    embeddedLanguageFormatting: 'auto',
  },

  lint: {
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
    rules: {
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },

  resolve: {
    tsconfigPaths: true,
  },

  plugins: lazyPlugins(() => [
    nitro(),
    pathstrider(),
    vueRouter(),
    vue(),
    tailwindcss(),
    vueDevTools(),
    PiniaColadaDevtools(),
    components({
      dirs: ['./src/components'],
    }),
    autoImport({
      dirs: ['./src/lib'],
      vueTemplate: true,
    }),
  ]),

  nitro: {
    serverDir: 'server',
    renderer: {
      template: './index.html',
    },
    tracingChannel: true,
    experimental: {
      openAPI: true,
      tasks: true,
      // tracingLogger: true,
    },
    scanDirs: [],
  },

  devtools: {
    enabled: true,
    mcp: true,
  },

  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
});
