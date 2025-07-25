import { defineConfig } from 'orval';

export default defineConfig({
  'federal-register-api': {
    input: './openapi.json',
    output: {
      mode: 'split',
      target: './src/api/generated/endpoints.ts',
      schemas: './src/api/generated/model',
      client: 'axios',
      httpClient: 'axios',
      mock: false,
      clean: true,
      prettier: false,
      override: {
        operations: {
          Document: {
            mutator: {
              path: './src/api/client.ts',
              name: 'customInstance',
            },
          },
        },
        mutator: {
          path: './src/api/client.ts',
          name: 'customInstance',
        },
        header: () => [
          '/* eslint-disable */',
          '/* tslint:disable */',
          '// @ts-nocheck',
          '/**',
          ' * Generated by orval 🍺',
          ' * Do not edit manually.',
          ' * Federal Register API Documentation',
          ' * OpenAPI spec version: 3.0.0',
          ' */',
          '',
        ],
      },
    },
  },
  'federal-register-mcp': {
    input: './openapi.json',
    output: {
      mode: 'single',
      client: 'mcp',
      baseUrl: 'https://www.federalregister.gov',
      target: './src/mcp/handlers.ts',
      schemas: './src/mcp/http-schemas',
      override: {
        header: () => [
          '/* eslint-disable */',
          '/* tslint:disable */',
          '// @ts-nocheck',
          '/**',
          ' * Generated by orval 🍺',
          ' * Do not edit manually.',
          ' * Federal Register API Documentation',
          ' * OpenAPI spec version: 3.0.0',
          ' */',
          '',
        ],
      },
    },
    hooks: {
      afterAllFilesWrite: 'bun run scripts/fix-mcp-types.ts',
    },
  },
});
