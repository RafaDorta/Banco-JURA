function criarConta(tipo){
    
    var nome;
    var tipo;
    var senha;
    var tipo;
    var documento;

    do{
    nome = document.getElementById('nome').value;
    senha = document.getElementById('senha').value;
    saldo = parseFloat(document.getElementById('saldo').value);
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

function verificaID(id){
    
    
    
    var contas = JSON.parse(localStorage.getItem('contasCadastradas'));

    for(var i =0; i<contas?.length; i++){
            if(id == contas[i].id){
                
                
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

function mostraConta(){
    var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
    var conta = document.getElementById('resultados')
    var i = retornaConta() - 1;

    conta.innerHTML = '';

    conta.innerHTML = '<tr><td>' + contas[i].id +
                                        '</td><td>'+  contas[i].nome +
                                        '</td><td>'+  contas[i].documento +
                                        '</td><td>'+  contas[i].tipo +
                                        '</td> ' + '<td>' + contas[i].saldo+ '</td>'

                                        + '<td><button class="btn btn-outline-dark" onclick = "saque()">SACAR</button></td>'+
                                        '<td><button class="btn btn-outline-dark" onclick = "transferir()">TRANSFERIR</button></td>' +
                                        '<td><button class="btn btn-outline-dark" onclick = "deposito()">DEPOSITAR</button></td>' +
                                        
                                        '<td><button class="btn btn-outline-dark">EXTRATO</button></td>' +
                                        '</tr>';


    }
    function transferir(){
        var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
        var i = retornaConta() - 1;
        do{var id = +prompt('Digite o ID da conta que queira transferir: ');} while(verificaID(id)==0);
        var saldo = +prompt('Digite o saldo da transferencia: ');
        contas[i].saldo -= saldo;
        var conta = contas[i];
        contas.splice(i,1,conta);
        var j = id-1;
        contas[j].saldo += saldo;
        var conta2 = contas[j];
        contas.splice(j,1,conta2);
        localStorage.setItem('contasCadastradas',JSON.stringify(contas));

        mostraConta();


    }

    function deposito(){
        var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
        var i = retornaConta() - 1;
        var saldo = +prompt('Digite o saldo do deposito: ');
        contas[i].saldo += saldo;
        var conta = contas[i];
        contas.splice(i,1,conta);
        localStorage.setItem('contasCadastradas',JSON.stringify(contas));
        mostraConta();
    }

    function saque(){
        var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
        var i = retornaConta() - 1;
        var saldo = +prompt('Digite o saldo do saque: ');
        contas[i].saldo -= saldo;
        var conta = contas[i];
        contas.splice(i,1,conta);
        localStorage.setItem('contasCadastradas',JSON.stringify(contas));
        mostraConta();
    }
