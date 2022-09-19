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

    window.location.href = 'index.html';
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
                                        
                                        '<td><a href="extrato.html"><button class="btn btn-outline-dark">EXTRATO</button></a></td>' +
                                        '</tr>';


    }


    

    function transferir(){
        var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
        var i = retornaConta() - 1;
        do{var id = +prompt('Digite o ID da conta que queira transferir: ');} while(verificaID(id)==0);
        do{var saldo = +prompt('Digite o saldo da transferencia: ');} while(contas[i].saldo<saldo || isNaN(saldo) == true); 
        var j = id-1;
        if(contas[i].limTrans != 0){
        contas[i].limTrans -= 1;    
        contas[i].saldo -= saldo;
        contas[i].extrato += 'T(' + (j+1) + ') -' + saldo + ' /';
        var conta = contas[i];
        contas.splice(i,1,conta);
        contas[j].saldo += saldo;
        contas[j].extrato += 'T(' + i+1 + ') +' + saldo + ' /';
        var conta2 = contas[j];
        contas.splice(j,1,conta2);
        localStorage.setItem('contasCadastradas',JSON.stringify(contas));
        
        
                }else{
        
        contas[i].saldo -= (saldo + 0.5);
        contas[i].extrato += 'T(' + (j+1) + ') -' + (saldo + 0.5) + ' /';
        var conta = contas[i];
        contas.splice(i,1,conta);
        contas[j].saldo += saldo;
        contas[j].extrato += 'T(' + (i+1) + ') +' + saldo + ' /';
        var conta2 = contas[j];
        contas.splice(j,1,conta2);
        localStorage.setItem('contasCadastradas',JSON.stringify(contas));
                } 


        mostraConta();


    }

    function deposito(){
        var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
        var i = retornaConta() - 1;
        do{var saldo = +prompt('Digite o saldo do deposito: ');} while(isNaN(saldo) == true); 
        contas[i].saldo += saldo;
        var conta = contas[i];
        contas[i].extrato += 'D +' + saldo + ' /';
        contas.splice(i,1,conta);
        localStorage.setItem('contasCadastradas',JSON.stringify(contas));
        mostraConta();
    }

    function saque(){
        var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
        var i = retornaConta() - 1;
        do{var saldo = +prompt('Digite o saldo do saque: ');} while(contas[i].saldo<saldo || isNaN(saldo) == true || contas[i].limSaque<saldo); 
        contas[i].saldo -= saldo;
        contas[i].extrato += 'S -' + saldo + ' /';
        var conta = contas[i];
        contas.splice(i,1,conta);
        localStorage.setItem('contasCadastradas',JSON.stringify(contas));
        mostraConta();
    }

    function mostraExtrato(){
        

        var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
    var conta = document.getElementById('resultados')
    var i = retornaConta() - 1;

        if(contas[i].limExtrato != 0){
    conta.innerHTML = '';
    conta.innerHTML = '<tr><td>' + contas[i].extrato +
                                        '</td></tr>';
        var account = contas[i];
        contas[i].limExtrato -= 1;
        contas.splice(i,1,account);
            localStorage.setItem('contasCadastradas',JSON.stringify(contas));


        }else{

            contas[i].saldo -= 0.5;
            contas[i].extrato += 'Extrato -' + 0.5 + ' /';
            var account = contas[i];
            contas.splice(i,1,account);
            localStorage.setItem('contasCadastradas',JSON.stringify(contas));

            conta.innerHTML = '';
    
            conta.innerHTML = '<tr><td>' + contas[i].extrato +
                                        '</td></tr>';
        }                             
    }

    function avancarMes(){
        var contas = JSON.parse(localStorage.getItem('contasCadastradas'));
        for(var i =0; i<contas?.length; i++){

            if(contas[i].tipo == 2){
                contas[i].limTrans = 3;
                contas[i]. limExtrato = 3;
                contas[i].extrato += 'Mês Fechado!' + ' |||';
                var account = contas[i];
                contas.splice(i,1,account);
                localStorage.setItem('contasCadastradas',JSON.stringify(contas));

            }else if(contas[i].tipo == 3){
                contas[i].limTrans = 1;
                contas[i].limExtrato = 1;
                contas[i].extrato += 'Mês Fechado!' + ' |||';
                var account = contas[i];
                contas.splice(i,1,account);
                localStorage.setItem('contasCadastradas',JSON.stringify(contas));
            }

        }
        window.location.href = 'index.html';
        alert('Mês avançado!')
    }
