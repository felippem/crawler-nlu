import Crawlerize from './features/crawlerize';
import CrawlerParser from './features/crawler-parser';
import CrawlerTranslator from './features/crawler-translator';

new Crawlerize(`./source.${process.env.NODE_ENV}.json`,
  CrawlerParser,
  new CrawlerTranslator(process.env),
  0).start();
