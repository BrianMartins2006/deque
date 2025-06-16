class LinkedList{
    #head;
    #tail;
    #qtd;

    constructor(){
        this.#head = null;
        this.#tail = null;
        this.#qtd = 0;
    }

    addFirst(novoDado){
        const novoNo = new No(novoDado);
        if(this.#head===null)
            this.#tail = novoNo;
        else{
            novoNo.proximo = this.#head;
            this.#head.anterior = novoNo;
        }
        this.#head = novoNo;
        this.#qtd++;
        return true;
    }

    addLast(novoDado){
        const novoNo = new No(novoDado);
        if(this.#head===null)// vazia
            this.#head = novoNo;
        else{
           novoNo.anterior = this.#tail;
           this.#tail.proximo = novoNo;

        }
        this.#tail = novoNo;
        this.#qtd++;
        return true;
    }

     addAtIndex(index, novoDado){
        const novoNo = new No(novoDado);
        let aux = this.#head;
        let pos = 0;
        while(pos < index - 1){
            aux = aux.proximo;
            pos++;
        }
        novoNo.anterior = aux;
        novoNo.proximo = aux.proximo;
        aux.proximo = novoNo;
        novoNo.proximo.anterior = novoNo;
        this.#qtd++;
        return true;
    } 

    removeFirst(){
        const dadoRemovido = this.#head.dado;
        this.#head = this.#head.proximo;
        if(this.#head!==null)
            this.#head.anterior = null;
        else
            this.#tail = null;
        this.#qtd--;
        return dadoRemovido;
    }

    removeLast(){
        const dadoRemovido = this.#tail.dado;
        this.#tail = this.#tail.anterior;
        if(this.#tail!==null)
            this.#tail.proximo = null;
        else
            this.#head = null;
        this.#qtd--;
        return dadoRemovido;
    }
    
    removeAtIndex(index) {
    if (index < 0 || index >= this.#qtd) return null;

    let atual = this.#head;

    if (index === 0) {
        return this.removeFirst();
    }

    if (index === this.#qtd - 1) {
        return this.removeLast();
    }

    for (let i = 0; i < index; i++) {
        atual = atual.proximo;
    }

    const anterior = atual.anterior;
    const proximo = atual.proximo;

    anterior.proximo = proximo;
    proximo.anterior = anterior;

    this.#qtd--;

    return atual.dado;
}

    
    getLast(){
      return this.#tail.dado;
    }
     getFirst(){
        return this.#head.dado;
     }
    isEmpty(){
        return this.#head === null;
    }

    get length(){
        return this.#qtd;
    }

    //-------------------------------------
//Quando um objeto tem um iterator, ele pode ser iterado com construções como [ for(const item of minhaLista)*/

[Symbol.iterator]() {         
    let noAtual = this.#head;
          return {
            next: function() {
              if (noAtual!==null) {
                let valor = noAtual.dado;
                noAtual = noAtual.proximo;
                return { value: valor, done: false };
              } else {
                return { done: true };
              }
            }
          };
        }
  //—----------------
    toString() {
          let result = "";
          let noAtual = this.#head;
          while (noAtual !== null) {
              result += noAtual;
              noAtual = noAtual.proximo;
          }
          return result;
      }
   //----------------   
    }