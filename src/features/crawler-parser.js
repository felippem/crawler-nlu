import { Parser } from 'htmlparser2';

/**
 * A responsabilidade deste é de interpretar um determinado conteúdo
 * e realizar a extração de partes determinantes para servir de ensumo a
 * outros módulos que irão enriquecer a informação.
 */
export default class CrawlerParser {
  /**
   * Dado um conteúdo html, este retornará uma coleção de links encontrados
   * por toda a extensão de elementos contidos no mesmo, fazendo uso
   * da lib htmlparser2.
   * @param {string} content conteúdo html a ser avaliado através do htmlparser2.
   */
  static extractLinkCollection(content) {
    return new Promise((resolve, reject) => {
      const collection = {
        array: [],
        push: (element) => {
          if (collection.array.indexOf(element) < 0) { collection.array.push(element); }
        },
      };

      const parser = new Parser({
        onopentag(name, attribs) {
          switch (name) {
            case 'a':
              collection.push(attribs.href);
              break;
            default:
              break;
          }
        },
        onerror(error) {
          reject(error);
        },
      });

      parser.write(content);
      parser.end();

      resolve(collection.array);
    });
  }
}
