# K6 - Performance Test   

Esta é uma documentação inicial sobre testes de performance com k6, baseada na documentação oficial. Para além de aprender a utilizar a ferramenta, a documentação do k6 é também um fonte para aprender sobre testes de performance.

K6 é uma ferramenta para executar alguns tipos de teste de performance. A maneira de programar o teste é através da sintaxe do Javascript, porém toda sua engine foi construída com Golang, dada a desenvoltura de Go para execução com boa performance.  K6 é uma alternativa a ferramentas tradicionais, como por exemplo, o Jmeter que é uma ferramenta com interface gráfica que permite teste de performance.  

### Instalação
Sua instalação é simples, feita através de um binário que pode ser instalado nos principais sistemas operacionais e com Docker.     

Segue a Documentação do k6:  
[Detalhes sobre o k6](https://k6.io/docs/)     


## Tipos de testes de performance que podemos fazer com k6.   

* __Smoke tests__ valida se o sistema performa adequadamente acima da carga mínima.
* __Avarage-load test__ valida como o sistema performa acima das condições normais esperadas.  
* __Stress tests__  valida como o sistema performa quando a carga excede o limite da sua capacidade média. 
* __Soak tests__   valida  como o sistema se recupera e performa sob um extenso período.
* __Spike tests__  valida o comportamento e a sobrevivencia do sistema em casos de aumentos repentinos, curtos ou massivo no tráfego de usuários.  
* __Breakpoint tests__ consiste em gradativamente aumentar a carga para identificar o limite da capacidade do sistema.     

Segue abaixo a tabela disponibilizada na documentação oficial do k6. Nela podemos ver resumidamente o tipo com a quantidade de usuários virtuais (__VUs__), a duração e contexto que podemos utilizar estes testes.   


__Tabela de resumo para cada tipo dos testes__

<div class="table-wrapper-module--table-wrapper--0fa35"><table><thead><tr><th>Tipo</th><th>VUs (usuários virtuais)/Throughput</th><th>Duração</th><th>Quando?</th></tr></thead><tbody><tr><td><a href="/docs/test-types/smoke-testing">Smoke</a></td><td>Baixa</td><td>Curta (segundos ou minutos)</td><td>Quando ocorre uma alteração relevante no sistema e é necessário verificar se a lógica de uma funcionalidade importante foi impactada.</td></tr><tr><td><a href="/docs/test-types/load-testing">Carga</a></td><td>Média de produção</td><td>Média (5-60 minutos)</td><td>Avalia se o sistema mantém a performance com a média de usuários em produção.</td></tr><tr><td><a href="/docs/test-types/stress-testing">Stress</a></td><td>Alta (acima da média)</td><td>Média (5-60 minutos)</td><td>Quando o sistema irá receber um carga acima da média e é necessário ver como ele lida com isso.</td></tr><tr><td><a href="/docs/test-types/soak-testing">Soak</a></td><td>Média</td><td>Longa (horas)</td><td>Após alterações para verificar o sistema sob uso contínuo prolongado</td></tr><tr><td><a href="/docs/test-types/spike-testing">Spike</a></td><td>Muito alta</td><td>Curta (alguns minutos)</td><td>Quando o sistema se prepara para eventos sazionais que receberá picos de tráfego</td></tr><tr><td><a href="/docs/test-types/breakpoint-testing">Breakpoint</a></td><td>Aumentar até quebrar</td><td>Enquanto for necessário</td><td>Algumas vezes para encontrar os limites superiores do sistema</td></tr></tbody></table></div>   

__Fonte:__ [k6 - Test type cheat sheet](https://k6.io/docs/test-types/load-test-types/#test-type-cheat-sheet) -  2023.  


Cada tipo de teste deve ser executado de acordo com o contexto da aplicação alinhado com as necessidades da equipe.

## Onde programar os tipos de testes  


## Como executar via CLI

* Execução básica do teste deve informar o nome do arquivo que deve ser executado.
`k6 run script.js`  

* Execucação acrescentando virtual users e duração do teste via CLI (`vus`)  
`k6 run  --vus 10 --duration 30s script.js`  


## Análise das Metricas    

As métricas no k6 aparecem na saída com o resultado dos testes, ao lado esquerdo dos valores.  

![metricas](image/metricas.png)    

Descrição das métricas: [Detalhe das métricas](https://k6.io/docs/using-k6/metrics/reference/)

## Valores das métricas  

* __min__ = minima. O menor tempo de resposta de uma requisição.    

* __max__ = maxima. O maior tempo de resposta de uma requisição.  

* __avg__ = média. O total da soma de total as requisições dividida pela quantidade de requisições.    

* __med__ = mediana. O valor real que está entre (ao meio) de todas as requisições.  

* __p__ = percentil. O valor que atenda uma determinada porcentagem da amostra. Por exemplo: 90% dos usuários tiveram tempo de resposta de até 1.7 segundos.       


Podemos também customizar as métricas: [Custom Metrics](https://k6.io/docs/using-k6/metrics/create-custom-metrics/)  
Exemplo de métricas customizadas: [metricas customizadas](./thresholds-all.js)     

As métricas no K6 estão organizadas pelos seguintes tipos de métricas:    

* __Conters__ soma de valores.
* __Gauges__  identifica o menor, o maior e o último valor.  
* __Rates__   frequencia que um valor diferente de zero ocorre.   
* __Trends__  é a porcentagem.   

É atraveés deste tipos de métricas que podemos criar outras de maneira customizada. Como o exemplo do código dentro de [`thresholds-all.js`](./thresholds-all.js).  


## Assertions (Checks)  

Através dos checks no K6, podemos validar as respostas que esperamos para determinados cenários. Como por exemplo, tempo de resposta, quantidade de caracteres no response body, status code da requisição, conteúdo do response body, entre outras. Segue a documentação com mais exemplos:      

[Checks/Assertions](https://k6.io/docs/using-k6/checks/)   


## Thresholds   

São critérios definidos que o teste deve cumprir  durante a execução, em função de uma ou mais __métricas__ definidas. Esses critérios que definirão se o teste passou ou falhou.    

```javascript
 trhesholds:{
      http_req_failed: ['rate<0.01'],
      http_req_duration: ['p(95)<200'],
    }
```   

No exemplo acima, temos definido que para a metrica `http_req_failed` o cirtério de falha deve ser menor que 1% (threshold `['rate<0.01']`). E para a métrica `http_req_duration`, o critério deve ser que 95% dos usuários devem obter o tempo de resposta da requisição menor que 200 ms (threshold `['p(95)<200']`).   

Definições de Threshold abaixo:     

[Threshold](https://k6.io/docs/using-k6/thresholds/).      



## Opções de execução do teste

O K6 oferece diversas opções para organização do teste. Entre elas, temos a estrutura entre `setup`, `teardown` e `default`. Em __setup__, a função é executada apenas uma única vez na inicialização do teste. Equanto que __teardown__, é a execução em um única vez no final do teste. A função __default__, executa os testes.  

Podemos verificar a ordenação acima em: [opção de ordenação](./config.json).

Outra maneira de ordenar o comportamento do teste, é através do arquivo `config.json`. Nele, definimos as __stages__, __hosts__, __thresholds__, etc. Ele deve ser colocado dentro do diretório __loadimpact/k6/__ . A configuração pode ser vista em [config.js](./config.json).  
Para mais detalhes: [default config path](https://k6.io/docs/using-k6/k6-options/reference/#config).  

Mais opções: [k6 options](https://k6.io/docs/using-k6/k6-options/reference/).    


## Browser (xk6) - Módulo experimental e passivel de alterações. 

O k6 possibilita testes de performace no frontend. Além disso, podemos fazer testes híbridos, ou seja, articular dentro dos testes um fluxo que interaja  backend e frontend. Pode ver sobre o primeiro caso, apenas com frontend no [browser.js](./browser.js). O segundo caso, chamado de híbrido, pode ser conferido em [hibrid.js](./hybrid-test.js).     

Para executar os testes com o browser, precisamos setar a variável de ambiente `$env:K6_BROWSER_ENABLED="true"` .

Para mais detalhes e exemplos, podemos ver em:  [Browser Test](https://k6.io/docs/using-k6-browser/overview/) .


# Manifesto k6
