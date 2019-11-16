[![GitHub issues](https://img.shields.io/github/issues-raw/felippem/crawler-nlu.svg)](https://github.com/felippem/crawler-nlu/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/felippem/crawler-nlu.svg)](https://github.com/felippem/crawler-nlu/commits/master)

# :space_invader: crawler-nlu
Simples crawler para rastrear endereços da web, extrair e interpretar, através da inteligência artificial do IBM Watson.

O "crawler-nlu" pode ajudá-lo a extrair e transformar o conteúdo de páginas da web, gerando ensumos mais ricos e completos para você criar seus próprios projetos.

## Available Features
:trophy: Incluir uma lista de endereços da web em arquivo físico;

:trophy: Adicionar configurações `http` específicas para cada um dos endereços que serão rastreados;

:trophy: Definir o diretório de saída com o resultado da execução;

:trophy: Atribuir um valor de tempo para cada requisição `http`, mais conhecido como `timeout`;

:trophy: Customizar expressões `xpath` para o mapeamento de elementos `DOM` específicos que devem ser analisados pelo algoritmo do IBM Watson.

## Roadmap
:broken_heart: Realizar download automático das imagens contidas no conteúdo mapeado e armazená-las em algum repositório;

:broken_heart: Criar template de saída, cujo objetivo seja consolidar o resultado obtido na API do IBM Watson;

:broken_heart: Implementar solução para retry em casos de erros de rede ou negação da requisição;

:broken_heart: Pensou em algo além disso? Compartilhe comigo, let's go!

## Stack
- Nodejs 10+
- esm
- htmlparser2
- ibm-watson
- request-promise-native
- env-cmd
- eslint
- nodemon
- mocha
- chai

## Getting Started
Acesse o console da IBM Cloud e crie sua própria instância do serviço <a href="https://cloud.ibm.com/catalog/services/natural-language-understanding">"Natural Language Understanding"</a>;

Após a criação do serviço IBM Watson Natural Language Understanging, obtenha a `API Key` disponibilizada através da lista de recursos criados;

Certifique-se de que o Nodejs esteja instalado no seu ambiente de desenvolvimento ou consulte a <a href="https://nodejs.org/en/download/">documentação oficial do Nodejs</a>:
> ```node -v```

Faça o clone do projeto para um diretório local:
> ```https://github.com/felippem/crawler-nlu.git```

Instale as dependências do projeto:
> ```npm i```

Crie um novo arquivo `.env.development.json` na raiz do projeto, com o seguinte conteúdo (lembre-se de substituir a chave "WATSON_API_KEY" com o valor definitivo):
```json
{
  "NODE_ENV": "development",
  "WATSON_API_KEY": "YOUR_API_kEY",
  "WATSON_API_URL": "https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2018-11-16",
  "WATSON_DISABLE_SSL": true
}
```

Crie um novo arquivo `source.development.json` na raiz do projeto, com o seguinte conteúdo (lembre-se de substituir os valores conforme os seus objetivos):
```json
[
  {
    "title": "crawler-my-domain",
    "resultPath": "./outcome/result-domain",
    "routes": [
      {
        "uri": "https://domain.com",
        "options": {
          "encoding": "utf-8",
          "method": "POST",
          "formData": {
            "action": "list",
            "page": 1,
            "string": ""
          },
          "timeout": 30000
        },
        "nluOptions": {
          "clean": false,
          "xpath": "//article[contains(@class, 'post')]"
        }
      }
    ]
  }
]
```

Por fim, execute no seu terminal:
> ```npm run dev```

Após a execução, verifique o resultado de saída no diretório `./outcome` e seja feliz.

Para executar os testes de unidade em ambiente de desenvolvimento, execute:

> ```npm test```