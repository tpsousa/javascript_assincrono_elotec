
//imagine que todas essas funcoes estao no event loop
//cada callback sera executado sequencialmente no event loop

// ====== event loop =====
//o event loop tambem guarda as stack de cada funcao
//a stack mostra as informacoes de cada funcao -- o nome,oque ela retorna etc
//consultarBancoDeDados()
//one()
//two()
function one() {
    console.log("one");
}
function two(){
    console.log("two");
}
//agora imagine o seguinte -- que temos uma funcao que faz uma consulta em um banco de dados com 10k

//imagine que aqui tem 10k linhas
const bancoDeDados = [{"nome" : thiago , "id" : id},
    {"nome" : thiago , "id" : id},
    {"nome" : thiago , "id" : id},
    {"nome" : thiago , "id" : id},
    {"nome" : thiago , "id" : id},
    {"nome" : thiago , "id" : id},
    {"nome" : thiago , "id" : id},
    {"nome" : thiago , "id" : id},
    {"nome" : thiago , "id" : id},
    {"nome" : thiago , "id" : id},
    {"nome" : thiago , "id" : id},
    console.log(".......")
]

//essa funcao demandaria muito tempo,imagine que essa funcao estivesse no primeiro callback do event loop
function consultarBancoDeDados(bancoDeDados){
  for (let i = 0 ; i < bancoDeDados.length ; i++){
    try {
    if (bancoDeDados[i]){
      console.log(bancoDeDados[i]);

      return 1;
    } else {
        console.log("cannot get the user because some reason");
    } 
    
    const filtro = bancoDeDados.filter(n => n == 'thiago');
    const mapeamento = bancoDeDados.map(idade => idade > 18);
    return filtro;
    return mapeamento;

    }catch(err){
        err("cannot get the user of the database");
        return 0;
    }
  }
}
//e se tivessemos uma forma de mandar essa funcao para fora do event loop,fazendo com que nao 
//parasse o nosso event loop

//para fazer isso iremos usar uma coisa chamada programacao assincrona
//mas afinal oque e uma coisa sincrona?
//bom basicamente o event loop e sincrono
//porque ele vai executar uma funcao de cada vez
//e se quissemos executar mais de uma funcao ao mesmo tempo
//e ai que entra a assincrocidade
//por exemplo,vamos definir a funcao de consultarBancoDeDados para executar depois de 5 segundos

//vamos definir ela de forma assincrona usando o setTimeOut()


function consultarBancoDeDados(bancoDeDados){
 setTimeout(()=>{
  for (let i = 0 ; i < bancoDeDados.length ; i++){
    try {
    if (bancoDeDados[i]){
      console.log(bancoDeDados[i]);

      callback(bancoDeDados[i])

      return 1;
    } else {
        console.log("cannot get the user because some reason");
    } 
    
    const filtro = bancoDeDados.filter(n => n == 'thiago');
    const mapeamento = bancoDeDados.map(idade => idade > 18);
    return filtro;
    return mapeamento;

    }catch(err){
        err("cannot get the user of the database");
        return 0;
    }
  }
 },5000)
}

//agora peca que os alunos executam o codigo para ver como ficara a ordem de execucao
//e eles vao perceber que por mais que a funcao de consultar banco de dados veioa antes
//com o setTimeOut definimos que ela exutara depois

//=============== assync ========= 
// consultarBancoDeDados

//==============event loop ==========
//one()
//two()
// ---------- consultar banco de Dados depois de 5 segundos
// ---------- consultarBancoDeDados()

//ou seja,ele vai executar de 'forma assincrona'

//vamos fazer mais algumas manipulacoes na nossa funcao para que
//fique mais parecida com a promise: 

//beleza agora a gente vai definir alguns parametros importantes para a funcao
//vamos dizer que nossa funcao pode ser executada com sucesso ou nao

function consultarBancoDeDados(bancoDeDados,resolve,rejetc,callback){
 setTimeout(()=>{
  for (let i = 0 ; i < bancoDeDados.length ; i++){
    try {
    
    if (bancoDeDados[i]){
      console.log(bancoDeDados[i]);

      resolve("a funcao foi executada com sucesso");   
      //ou seja o callback e uma funcao que ira dar retorno da nossa requisicao para o banco de dados
      callback("callback chamado");
      return 1;
    } else {
        console.log("cannot get the user because some reason");
  
        rejetc("a funcao foi recusada");
        callback("callback chamado");
    } 
    
    const filtro = bancoDeDados.filter(n => n == 'thiago');
    const mapeamento = bancoDeDados.map(idade => idade > 18);
    return filtro;
    return mapeamento;

    }catch(err){
        err("cannot get the user of the database");
        return 0;
    }
  }
 },5000)
}
//temos que definir que o callback vai ser uma funcao que sera passada como parametro para a funcao
consultarBancoDeDados = (callback)=>{
 return callback();
}

//porem temos uma forma mais eficaz de resolver esse problema
//agora nos iremos usar uma estrutura muito melhor que o setTimeOut()
//vamos usar uma promessa
//uma promessa -- promise -- pode ser bem sucedida ou nao

function consultarBancoDeDados(bancoDeDados,resolve,rejetc,callback){
 Promise((resolve,reject,callback)=>{
  for (let i = 0 ; i < bancoDeDados.length ; i++){
    try {
    
    if (bancoDeDados[i]){
      console.log(bancoDeDados[i]);

      resolve("a funcao foi executada com sucesso");   
      //ou seja o callback e uma funcao que ira dar retorno da nossa requisicao para o banco de dados
      callback("callback chamado");
      return 1;
    } else {
        console.log("cannot get the user because some reason");
  
        rejetc("a funcao foi recusada");
        callback("callback chamado");
    } 
    
    const filtro = bancoDeDados.filter(n => n == 'thiago');
    const mapeamento = bancoDeDados.map(idade => idade > 18);
    return filtro;
    return mapeamento;

    }catch(err){
        err("cannot get the user of the database");

        reject("a consulta ao banco de dados foi recusada");
        return 0;
    }
  }
 },5000);
}
consultarBancoDeDados = new Promise();
/* Estado Pendente: A operação ainda está em andamento.
Estado Cumprido: A operação foi concluída com sucesso.
Estado Rejeitado: A operação falhou. */
consultarBancoDeDados
.then(e => return resolve(e))
.catch(e => return reject(e))
.finnaly(()=> console.log("ending the function"))

//temos que definir que o callback vai ser uma funcao que sera passada como parametro para a funcao
consultarBancoDeDados = (callback)=>{
 return callback();
}


//entao como fazemos para dizer que uma funcao e assicrona:
//basta colocar antes da funcao que se trata de uma funcao assincrona:
async function consultarBancoDeDados(bancoDeDados,resolve,rejetc,callback){
 const resposta =()=> await (Request, Response){
  for (let i = 0 ; i < bancoDeDados.length ; i++){
    try {
    
    if (bancoDeDados[i]){
      console.log(bancoDeDados[i]);

      resolve("a funcao foi executada com sucesso");   
      //ou seja o callback e uma funcao que ira dar retorno da nossa requisicao para o banco de dados
      callback("callback chamado");
      return 1;
    } else {
        console.log("cannot get the user because some reason");
  
        rejetc("a funcao foi recusada");
        callback("callback chamado");
    } 
    
    const filtro = bancoDeDados.filter(n => n == 'thiago');
    const mapeamento = bancoDeDados.map(idade => idade > 18);
    return filtro;
    return mapeamento;

    }catch(err){
        err("cannot get the user of the database");

        reject("a consulta ao banco de dados foi recusada");
        return 0;
    }
  }
 },5000)
 }
}
  
}

//estrutura basica de uma promise
/* const fetchPromise = fetch(
  "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
  .then((resposta) => {
    if (!resposta.ok) {
      throw new Error(`HTTP error: ${resposta.status}`);
    }
    return resposta.json();
  })
  .then((data) => {
    console.log(data[0].name);
  })
  .catch((error) => {
    console.error(`Não foi possível obter os produtos: ${error}`);
  });

  */
//temos que definir que o callback vai ser uma funcao que sera passada como parametro para a funcao


//estrutura basica de uma funcao assincrona: 

/*
function resolverDepoisDe2Segundos(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function adicionar1(x) {
  var a = resolverDepoisDe2Segundos(20);
  var b = resolverDepoisDe2Segundos(30);
  return x + (await a) + (await b);
}

adicionar1(10).then((v) => {
  console.log(v); // exibe 60 depois de 2 segundos.
});

async function adicionar2(x) {
  var a = await resolverDepoisDe2Segundos(20);
  var b = await resolverDepoisDe2Segundos(30);
  return x + a + b;
}

adicionar2(10).then((v) => {
  console.log(v); // exibe 60 depois de 4 segundos.
});

*/
consultarBancoDeDados = (callback)=>{
 return callback();
}
console.log(one())
console.log(two())
