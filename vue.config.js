const path = require('path');
const isProduction = process.env.NODE_ENV === "production";
const production = 'pmr-medications-admin.tirscript.com';
// const developer = '192.168.1.188:7500';
const developer = 'pmr-medications-admin.tirscript.com';
let base = isProduction ? production : developer;

process.env.VUE_APP_BASE_URL = base;
// console.log('__dirname', __dirname);
// Используйте настройку configureWebpack для того чтобы переопределить настройки вебпака.
// Дефолтные настройки вебпака, которые использует vue-cli можно посмотреть по пути "\node_modules\@vue\cli-service\webpack.config.js"
module.exports = {
  assetsDir: "assets/",
  // pages: {
  //   index: {
  //     assetsDir: "src/assets/",
  //     // точка входа для страницы
  //     entry: 'src/main.js',
  //     // исходный шаблон
  //     template: 'public/index.html',
  //     // в результате будет dist/index.html
  //     filename: 'index.html',
  //     // когда используется опция title, то <title> в шаблоне
  //     // должен быть <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: 'Index Page',
  //     // все фрагменты, добавляемые на этой странице, по умолчанию
  //     // это извлечённые общий фрагмент и вендорный фрагмент.
  //     //chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  //   // когда используется строковый формат точки входа, то
  //   // шаблон будет определяться как `public/subpage.html`,
  //   // а если таковой не будет найден, то `public/index.html`.
  //   // Выходное имя файла будет определено как `subpage.html`.
  //   // subpage: 'src/subpage/main.js'
  // },
  css: {
    loaderOptions: {
      less: {
        options: {
          modifyVars: require(path.resolve(__dirname, "global.less.js")) // файл с глобальными переменными
        }
      }
    },
  },
  configureWebpack: {
    // Пример
    //   plugins: [
    //     new MyAwesomeWebpackPlugin()
    //   ]
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/views/components"),
        "@views": path.resolve(__dirname, "./src/views"),
        "@layouts": path.resolve(__dirname, "./src/views/layouts"),
      },
    }
  },
  devServer: { // настройки webpack-dev-server
    contentBase: __dirname,
    inline: true,
    hot: true,
    port: 8091,
    historyApiFallback: true,
    proxy: {
      "/files": {
        target: 'http://' + base,
        changeOrigin: true
      },

    }
  },
};