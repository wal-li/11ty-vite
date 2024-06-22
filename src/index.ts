import { extname, relative, resolve } from 'node:path';
import { existsSync, rmSync } from 'node:fs';
import { mkdir, rename, rm } from 'node:fs/promises';
import { build } from 'vite';
import { PluginOptions } from './types';

export default function (eleventyConfig, pluginOptions?: PluginOptions) {
  pluginOptions ??= {};
  pluginOptions.includes ??= [];

  const outputDir = resolve(eleventyConfig.dir.output);
  const publicDir = resolve(pluginOptions.publicDir || 'public');
  const tmpDir = resolve('.11ty-vite');

  // copy assets
  for (const item of pluginOptions.includes) {
    eleventyConfig.addPassthroughCopy(item);
  }

  eleventyConfig.ignores.add(publicDir);
  eleventyConfig.addPassthroughCopy(publicDir);

  // remove dir
  if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true });

  eleventyConfig.on('eleventy.after', async ({ results }) => {
    const options = {
      root: tmpDir,
      build: {
        rollupOptions: {
          input: [],
        },
        outDir: outputDir,
        emptyOutDir: true,
      },
      publicDir,
    };

    options.build.rollupOptions.input = results
      .filter((entry) => !!entry.outputPath)
      .filter((entry) => extname(entry.outputPath || '') === '.html')
      .map((entry) => {
        return resolve(tmpDir, relative(outputDir, entry.outputPath));
      });

    try {
      await mkdir(tmpDir, { recursive: true });
      await rename(outputDir, tmpDir);
      await build(options);
    } catch (err) {
      await rename(tmpDir, outputDir);
      throw err;
    } finally {
      await rm(tmpDir, { recursive: true });
    }
  });
}
