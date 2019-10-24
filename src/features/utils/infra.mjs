import fs from 'fs';

export default class InfraUtil {
  /**
   * Salva o resultado da operação em um arquivo físico.
   * @param {string} resultPath caminho físico do arquivo de resultado.
   * @param {any} result conteúdo do resultado da operação, onde será gravado no arquivo.
   */
  static saveResultProcess(resultPath, result) {
    InfraUtil.configureResultPath(resultPath)
      .then(() => {
        fs.writeFile(resultPath, JSON.stringify(result, null, 2), (err) => {
          if (!err) console.log(`write: ${resultPath}`);
          else console.error(err);
        });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Em casos onde o diretório de saída não exista, ao gravar um determinado arquivo uma exceção
   * será gerada no processo de execução. Portanto, este trata de realizar a devida
   * validação e criar o diretório se necessário.
   * @param {string} resultPath endereço relativo completo do arquivo de resultado.
   */
  static configureResultPath(resultPath) {
    return new Promise((resolve, reject) => {
      let directory = resultPath.split('/');
      directory = directory.slice(0, directory.length - 1).join('/');
      fs.exists(directory, (exists) => {
        if (!exists) {
          fs.mkdir(directory, (err) => {
            if (!err) resolve();
            else reject(err);
          });
        }
        resolve();
      });
    });
  }
}
