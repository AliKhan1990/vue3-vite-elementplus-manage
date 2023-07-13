/* eslint-disable */
import { ConfigEnv, loadEnv } from 'vite';
import legacyPlugin from '@vitejs/plugin-legacy';
import * as path from 'path-browserify';
import vuePlugin from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ViteRequireContext from '@originjs/vite-plugin-require-context'
import envCompatible from 'vite-plugin-env-compatible'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import eslintPlugin from 'vite-plugin-eslint';
import viteSvgIcons, { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// element-plus icons
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// import stylelintPlugin from '@frsource/vite-plugin-stylelint'
// import viteStylelint from 'vite-plugin-stylelint';
// import VitePluginHtmlEnv from 'vite-plugin-html-env'


// @see https://cn.vitejs.dev/config/
export default ({
  command,
  mode
}: ConfigEnv) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  let rollupOptions = {}

  let optimizeDeps = {};

  let alias = {
    '.git': path.resolve(__dirname, './.git'),
    '.husky': path.resolve(__dirname, './.husky'),
    'node_modules': path.resolve(__dirname, './node_modules'),
    'public': path.resolve(__dirname, './public'),
    '@': path.resolve(__dirname, './src'),
    'path': path.resolve(__dirname, 'node_modules/path-browserify/index.js'),
    '~': '',
    '~@': path.resolve(__dirname, 'src')
  }

  let proxy = {
        '/api': {
          target: 'https://api.imooc-admin.lgdsunday.club/',
          changeOrigin: true,
          // ws: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }

  // todo 替换为原有变量
  let define = {
    'process.env.VITE_NODE_ENV': import.meta.env === 'dev' ? '"development"' : '"production"'
  }

  let esbuild = {}

  return {
    base: './', // index.html文件所在位置
    root: './', // js导入的资源路径，src
    resolve: {
      alias,
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    define: define,
    // envPrefix:"APP_", 原为 VITE_
    server: {
      // 服务配置
      target: 'https://api.imooc-admin.lgdsunday.club/', // env.VITE_TARGET as string
      port: 8080, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      // cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      changeOrigin: true,
      host: '0.0.0.0',
      // 代理
      proxy
    },
    build: {
      target: 'es2015',
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      outDir: 'build', // 产出目录
      rollupOptions,
    },
    esbuild,
    optimizeDeps,
    plugins: [
      // VitePluginHtmlEnv(),
      ViteRequireContext(),
      viteCommonjs(),
      envCompatible(),
      // viteStylelint(),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
        cache: false
      }),
      legacyPlugin({
        targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
      }), vuePlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver(), IconsResolver({
          prefix: 'Icon',
        })]
      }),
      Components({
        resolvers: [ElementPlusResolver(), IconsResolver({
          // ep 是 Element Plus 的缩写
          enabledCollections: ['ep'],
        })]
      }),
      Icons({
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), './src/icons/svg/')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      })
      // VitePluginHtmlEnv({
      //   compiler: true
      // })
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
        css: {},
        scss: {
          // 支持内联 JavaScript
          javascriptEnabled: true
        }
      }
    },
  };
};