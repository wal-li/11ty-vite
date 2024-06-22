# 11ty + Vite

## Prerequisites

- 11ty pre-release only: `^3.0.0-alpha.11`

## Concept

```
11ty > [html] > vite > [dist]
```

## Usage

```bash
npm i -D @wal-li/11ty-vite
```

Eleventy Config file:

```js
import vitePlugin from '@wal-li/11ty-vite';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(vitePlugin, {
    includes: ['src/**/*.ts', 'src/**/*.vue'],

    /* other vite options */
  });
}
```

## License

MIT.
