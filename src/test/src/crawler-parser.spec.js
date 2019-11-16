import { expect } from 'chai';
import { describe, it } from 'mocha';

import CrawlerParser from '../../features/crawler-parser';

describe('CrawlerParser', () => {
  describe('Quando eu tentar extrair uma lista de links de uma página: extractLinkCollection()', () => {
    it('Espero receber uma lista de links, caso exista.', async () => {
      const links = await CrawlerParser.extractLinkCollection(`
        <html>
          <body>
            <ul>
              <li><a href="http://www.google.com">Google</a></li>
              <li><a href="http://www.youtube.com">Youtube</a></li>
            </ul>
          </body>
        </html>`);
      expect(links.length).to.equal(2);
    });

    it('Espero receber um array vazio, caso não encontre nenhum link.', async () => {
      const links = await CrawlerParser.extractLinkCollection(`<html><body></body></html>`);
      expect(links.length).to.equal(0);
    })

    it('Espero receber um array vazio, caso o conteúdo seja nulo.', async () => {
      const links = await CrawlerParser.extractLinkCollection(null);
      expect(links.length).to.equal(0);
    })

    it('Espero receber um array vazio, na tentativa de extrair links de um número inteiro.', async () => {
      const links = await CrawlerParser.extractLinkCollection(10);
      expect(links.length).to.equal(0);
    })
  });
});
