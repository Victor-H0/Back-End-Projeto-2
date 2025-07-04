const { connect } = require("./db");
const Logger = require('./logger');

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    this.senha = senha;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      const result = await db.collection("usuarios").insertOne({
        nome: this.nome,
        senha: this.senha
      });
      console.log("Usuário inserido:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir usuário: " + error);
    }
  }

  static async inserir(nome, senha) {
    const usuario = new Usuario(nome, senha);
    return await usuario.inserir();
  }


  static async atualizar(filtro, novosDados){
    try {
      const { db, client } = await connect();
      const result = await
      db.collection("usuarios").updateMany(filtro, {
      $set: novosDados,
      });
      console.log("Usuários atualizados:", result.modifiedCount);
      client.close();
      } catch (error) {
      Logger.log("Erro ao atualizar usuários: " + error);
    }
  }


  static async deletar(filtro){
    try{
      const {db, client} = await connect();
      const result = await db.collection("usuarios").deleteMany(filtro);
      console.log("Usuário(s) deletado(s)!:", result.deletedCount);
      client.close();
    }catch(error){
      Logger.log("Erro ao deletar usuário(s): " + error);
    }
  }


  static async buscar (filtro={}){
    try{
      const { db, client } = await connect();
      const usuarios = await db.collection("usuarios").find(filtro).toArray();
      client.close();
      return usuarios;
    } catch(error){
      return [];
    }
  }


}

module.exports = Usuario;