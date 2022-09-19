class contas{

    constructor(id, nome, saldo,senha, documento) {
        this.id = id;
        this.nome = nome;
        this.saldo = parseFloat(saldo);
        this.extrato = '';
        this.limTrans = null;
        this.limExtrato = null;
        this.limSaque = null;
        this.senha = senha;
        this.documento = documento;
        this.tipo = null;
    }


      }

      

    





class contaPreminun extends contas{

    limTrans = -1;
    limSaque = -1;
    limExtrato = -1;
    tipo = 1;
    
}

class contaBasica extends contas{

    limTrans = 3;
    limSaque = 1000;
    limExtrato = 3;
    tipo = 2;


}

class contaEstudante extends contas{

    limTrans = 1;
    limSaque = 300;
    limExtrato = 1;
    tipo = 3;


}