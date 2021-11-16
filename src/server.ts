import { App } from './app';
import { IndexRoute } from './routes/index';

module.exports = (async () => {
  try {
    const app = new App([new IndexRoute()]);
    app.listen();
  } catch (e: any) {
    console.error(`server init encountered an error: ${e.message}`);
  }
})();
