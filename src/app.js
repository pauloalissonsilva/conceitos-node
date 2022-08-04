const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 5
  };

  repositories.push(repository);

  return response.json(repository)

});


app.put("/repositories/:id", (request, response) => {
  console.log(repositories);
  
  const {id} = request.params;
  const {title,url ,techs} = request.body;

  const index = repositories.findIndex( r => r.id === id);

  if(index < 0){
    return response.status(400).json({error:"Você não pode realizar está ação"});
  }

  console.log(repositories[index].likes)

  const repository = {
    id: id,
    title,
    url,
    techs,
    likes: repositories[index].likes
  } 

  repositories.splice(index,1,repository);

  
  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
 
  const index = repositories.findIndex( (repo) => repo.id === id)

  if(index < 0){
    return response.status(400).json({error:"Erro ao deletar"})
  }


  if(index >= 0){
    repositories.splice(index, 1);
  }

  return response.status(204).json();
  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const index = repositories.findIndex( i => i.id === id);

  if(index < 0){
    return response.status(400).json({error:"Algo deu errado, talvez você não possa realizar essa operação!"})
  }

  repositories.map(
    l => l.likes += 1
  )

  return response.json(repositories[index])

});

module.exports = app;
