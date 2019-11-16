import naturalLanguageUnderstanding from 'ibm-watson/natural-language-understanding/v1';
import watsonConfig from './services/watson/config';

export default class CrawlerTranslator {
  /**
   * A responsabilidade desta é de receber um determinado target e aplicar
   * a inteligência do Watson NLU para extruturar o conteúdo encontrado
   * através do target.
   * @param {json} env variáveis de ambiente ou qualquer outra fonte que atenda
   * as necessidades e dependências da classe.
   */
  constructor(env) {
    this.watsonNaturalLanguage = new naturalLanguageUnderstanding(
      watsonConfig(env),
    );
  }

  discover(targetUrl, options) {
    return this.watsonNaturalLanguage.analyze({
      url: targetUrl,
      clean: options.clean,
      xpath: options.xpath,
      features: {
        metadata: {},
        categories: {
          limit: 5,
        },
        concepts: {
          limit: 50,
        },
        entities: {
          limit: 5,
          mentions: false,
        },
        keywords: {
          limit: 10,
        },
        relations: {},
        sentiment: {},
      },
    });
  }
}
