function salvarUsuario(input){
if(!input){
throw "error-input-undefined"
}

if(!input.name){
throw "error-name-undefined"
}

}

try{
salvarUsuario();
}catch(error){
  if(error === 'error-input-undefined'){
console.log("é necessário enviar um 'input'.")
  }

  if(error === 'error-name-undefined'){
console.log("é necessário enviar um 'nome'.")
  }
}