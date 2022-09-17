function criarConta(tipo){
    
    var nome;
    var tipo;
    var senha;
    var tipo;
    var documento;

    do{
    nome = document.getElementById('nome').value;
    senha = document.getElementById('senha').value;
    saldo = document.getElementById('saldo').value;
    documento = document.getElementById('documento').value;
    tipo = document.getElementById('tipo').value;}while(verificaDocumento() == 1);


 var id = geraID();
    if(tipo == 1){
         conta = new contaPreminun(id,nome,saldo,senha,documento,tipo);
         console.log("Conta P!");
    }else if (tipo == 2){
         conta = new contaBasica(id,nome,saldo,senha,documento,tipo);
         console.log("Conta B!");
    }else if(tipo == 3){
         conta = new contaEstudante(id,nome,saldo,senha,documento,tipo);
         console.log("Conta E!");
    }


    if(localStorage.getItem('contasCadastradas') === null){
    var contas = [];
    contas.push(conta);
    localStorage.setItem('contasCadastradas',JSON.stringify(contas));
    }else{
    var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
    contas.push(conta);
    localStorage.setItem('contasCadastradas',JSON.stringify(contas));
    }
}

function geraID(){
    var x = JSON.parse(localStorage.getItem('ID'));
    x++;
        var ID = [];
        ID.push(x);
        localStorage.setItem('ID',JSON.stringify(ID));
        
        console.log(x);
    return x;
}

function printa(){
    var id = JSON.parse(localStorage.getItem('ID'));
    var carrosResultado = document.getElementById('resultados');

    carrosResultado.innerHTML = id;
}

function verificaConta(){
    var id = document.getElementById('id').value;
    var senha = document.getElementById('senha').value;
    
    var contas = JSON.parse(localStorage.getItem('contasCadastradas'));

    for(var i =0; i<contas?.length; i++){
            if(id == contas[i].documento && senha == contas[i].senha){
                salvaConta(contas[i].id);
                window.location.href = 'login.html';
            }

    }
    


}

function verificaDocumento(){
    var documento = document.getElementById('documento').value;
    
    
    var contas = JSON.parse(localStorage.getItem('contasCadastradas'));

    for(var i =0; i<contas?.length; i++){
            if(documento == contas[i].documento){
                
                
                return 1;
            }

    }
    return 0;


}

function salvaConta(id){
        var ID = [];
        ID.push(id);
        localStorage.setItem('contaLogada',JSON.stringify(ID));
}


function retornaConta(){

    var id = JSON.parse(localStorage.getItem('contaLogada'));
    return id;
}

function mostraPatio(){
    var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
    var carrosResultado = document.getElementById('resultados')
    var i = retornaConta() - 1;

    carrosResultado.innerHTML = '';

        carrosResultado.innerHTML = '<tr><td>' + contas[i].id +
                                        '</td><td>'+  contas[i].nome +
                                        '</td><td>'+  contas[i].documento +
                                        '</td><td>'+  contas[i].tipo +
                                        '</td> ' + '<td><button class="btn btn-outline-dark">SACAR</button></td>'+
                                        '<td><button class="btn btn-outline-dark">TRANSFERIR</button></td>' +
                                        '<td><button class="btn btn-outline-dark">DEPOSITAR</button></td>' +
                                        
                                        '<td><button class="btn btn-outline-dark">EXTRATO</button></td>' +
                                        '</tr>';


    }


