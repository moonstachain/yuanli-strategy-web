import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://moonstachain.github.io',
  base: '/yuanli-strategy-web',
  trailingSlash: 'always',
  integrations: [mdx()],
});
