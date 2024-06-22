import vitePlugin from '@wal-li/11ty-vite';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(vitePlugin, {
    includes: ['src/**/*.js'],
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
}
