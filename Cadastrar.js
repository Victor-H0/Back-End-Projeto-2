const Usuario = require("./model/usuario");

async function insercaoDB() {    
  await Usuario.inserir("Jorge", 123);
  await Usuario.inserir("Maria", 456);
  await Usuario.inserir("Felipe", 789);
}

insercaoDB()