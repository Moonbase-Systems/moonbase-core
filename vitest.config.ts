import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['app/**/__tests__/**/*.{spec,test}.ts', 'server/**/__tests__/**/*.{spec,test}.ts'],
    passWithNoTests: true,
  },
});
