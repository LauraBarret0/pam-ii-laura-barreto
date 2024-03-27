let num1 = 2
const num2 = 3
var msg = "Olá amigos! Esse é o meu número: "

console.log(msg, num1)
console.log(num1 + num2)
console.log(typeof num1)
console.log(typeof msg)

// métodos são funcionalidades próprias da linguagem e que
// podem receber parâmetros

function Somar() {
    n1= 2
    n2 = 5
    console.log("O resultado é:", n1 + n2)
} // função é algo que eu crio! mas..tudo em js
// é função 

Somar() // aqui ela é executada
Somar()

function SomarComParametros (n1, n2) {
    let resultado = "O resultado é: " + (n1 + n2)
    console.log(resultado)
}

SomarComParametros(16,30)
SomarComParametros(23,25)

// arrow function
const Test = (n) => {
    let result = n % 2

    if(result == 1){
        return "Número ÍMPAR"
    }
    
    return "Número PAR"
}

console.log(Test(23)) 
Test(23) // essa linha não vai executar pois não tem console