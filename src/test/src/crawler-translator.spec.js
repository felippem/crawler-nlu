import { expect } from 'chai';
import { describe, it } from 'mocha';

import CrawlerTranslator from '../../features/crawler-translator';

describe('CrawlerTranslator', () => {
  const Translator = new CrawlerTranslator(process.env);
  describe('Quando eu tentar interpretar o conteúdo de uma página: discover()', () => {
    it('Espero receber o título da página no resultado.', async () => {
      const resultTranslate = await Translator.discover('http://www.google.com', { clean: false })
      expect(resultTranslate.metadata).to.have.property('title');
    });
  })
});
