class Forca {
  constructor(palavra){
    this.palavra = palavra.toLowerCase()
    this.letrasChutadas = []
    this.vidas = 6
    this.secreto =  [...Array(this.palavra.length).fill('_')]
    this.controlador = false
  }

  verificaChute(entrada){
    // validando se o chute tem apenas uma letra e se esta entre a-z
    const myRe = /[a-z]/;
    if(entrada.length > 1){
      return false;
    }else if(myRe.test(entrada)){
      return true;
    }else{
      return false;
    }
  }

  chutar(letraChutada) {
    if(this.verificaChute(letraChutada.toLowerCase())){
      let chute = letraChutada.toLowerCase();
      if(this.letrasChutadas.includes(chute)){
        // verificando se a letra chutada ja tinha sido chutada antes
        return
      }else{
        this.letrasChutadas.push(chute);
      }
      let cont = 0;
  
      for(let letra of this.palavra){
        if(chute === letra){
          this.secreto.splice(cont, 1, chute);
        }
        cont += 1;
      }
      if(this.secreto.join('') == this.palavra){
        // verificando se as letras chutadas completam a palavra
        // utilizando apenas == pois this.secreto eh um objeto e 
        // this.palavra eh uma string
        this.controlador = true;
      }
      if(!(this.palavra.includes(chute))){
        this.vidas--;
      }
    }
  }

  buscarEstado() {
    if(this.controlador){
      return "ganhou";
    }else if(this.vidas === 0){
      return "perdeu";
    }else{
      return "aguardando chute";
    }
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
    return {
      letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
      vidas: this.vidas, // Quantidade de vidas restantes
      palavra: this.secreto // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
    };
  }
}



module.exports = Forca;


/*
TO DO{
  1. O jogo deve iniciar com 6 vidas - OK
  2. O jogo deve iniciar com o estado `aguardando chute`. - OK
  5. Toda chamada ao método chutar deve registrar a letra em letrasChutadas - OK
  6. Se a letra chutada não estiver contida na palavra, deve subtrair uma vida - OK
  7. Se a letra chutada estiver contida na palavra, deve ser substituida na "palavra" em sua respectiva 
  posição. - OK
  Ex.: A palavra secreta é "bala" e o jogador chutou a letra "b", então a palavra que é retornada no 
  método buscarDadosDoJogo, deve ser ["b", "_", "_", "_" ]. - OK
  8. Caso a quantidade de vidas chegue a 0 (zero), o estado do jogo deve mudar para `perdeu`.- OK
  9. Caso a quantidade de vidas seja maior que zero e o jogador acerte a última letra, o estado do 
  jogo deve mudar para `ganhou`. - OK
  3. Todo chute deve conter apenas uma letra, caso tenha mais de uma a jogada deve ser ignorada, 
  ou seja, não deve alterar nenhum estado. - ok
  4. Caso a letra chutada esteja errada mas já foi chutada anteriormente a jogada deve ser ignorada, 
  ou seja, não deve alterar nenhum estado. -ok
}
*/
