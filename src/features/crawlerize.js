/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import request from 'request-promise-native';
import fs from 'fs';
import infra from './utils/infra';

export default class Crawlerize {
  /**
   * A responsabilidade deste consiste em baixar o conteúdo de uma url, processar e posteriormente
   * armazená-lo em um diretório especificado no arquivo de origem.
   * @param {string} pathSource caminho do arquivo de origem .json, contendo todas
   * as url's que devem ser rastreadas no formato array[json].
   * @param {CrawlerParser} crawlerParser instância de CrawlerParser.
   * @param {CrawlerTranslator} crawlerTranslator instância de CrawlerTranslator.
   * @param {int} offset determina a quantidade de páginas ignoradas para cada
   * nó principal do @param {pathSource}.
   */
  constructor(pathSource, crawlerParser, crawlerTranslator, offset = 0) {
    this.pathSource = pathSource;
    this.crawlerParser = crawlerParser;
    this.crawlerTranslator = crawlerTranslator;
    this.offset = offset;
  }

  start() {
    this.getSourceCollection().then(async (rootPath) => {
      for (let x = 0; x < rootPath.length; x += 1) {
        const { routes } = rootPath[x];
        for (let y = this.offset; y < routes.length; y += 1) {
          await this.executeWork(routes[y], rootPath[x].resultPath);
        }
      }
    });
  }

  /**
   * Executa a requisição http, obtém o conteúdo, repassa o mesmo para a função de transformação e
   * salva o resultado em um arquivo físico.
   * @param {json} item cada nó encontrado na coleção de endereços a mapeados.
   * @param {string} resultPath diretório na qual será gravado o resultado da operação.
   */
  async executeWork(item, resultPath) {
    await request(item.uri, item.options)
      .then((contentBody) => {
        this.crawlerParser.extractLinkCollection(contentBody)
          .then(async (links) => {
            for (let x = 0; x < links.length; x += 1) {
              await this.crawlerTranslator
                .discover(links[x], item.nluOptions)
                .then(nlu => {
                  if (nlu && nlu.metadata)
                    infra.saveResultProcess(`${resultPath}/${nlu.metadata.title.replace(/[^\w]/gi, '-')}.json`, nlu);
                })
                .catch(err => {
                  console.error(err)
                })
            }
          });
      })
      .catch((err) => console.error(err));
  }

  /**
   * Retorna os items de origem a serem processados a partir do arquivo físico encontrado.
   * Lembrando que a mal formatação das informações contidas no mesmo, poderá
   * impedir o processo de ser executado.
   */
  getSourceCollection() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.pathSource, (err, data) => {
        if (!err) resolve(JSON.parse(data));
        else reject(err);
      });
    });
  }
}
