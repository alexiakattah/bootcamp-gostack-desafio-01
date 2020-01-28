const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

//Rota que cria o id e title do projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

//Rota que lista todos projetos;
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Rota qara editar o titulo do projeto
server.put("/projects/:id", (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(projects);
});

//Rota para deletar o projeto com o id solicitado
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);
  projects.splice(projectIndex, 1);

  return res.send();
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(title);

  return res.json(project);
});
server.listen(3000);
