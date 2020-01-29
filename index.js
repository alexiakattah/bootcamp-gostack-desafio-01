const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

//Checa se o usuario existe
function checkUserExist(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!req.body.projects) {
    return res.status(400).json({ error: "not found" });
  }
  return next();
}

//Checa se já existe usuário com mesmo ID
function checkIDExist(req, res, next) {
  const { id } = req.body;
  const project = projects.findIndex(p => p.id == id);

  if (project != -1) {
    return res.status(400).json({ error: "Id do usuário ja existe" });
  }

  return next();
}

//conta quantas requisições foram feitas
function reqCount(req, res, next) {
  console.count("Requisições");

  return next();
}
server.use(reqCount);

//Rota que cria o id e title do projeto
server.post("/projects", checkIDExist, (req, res) => {
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
server.put("/projects/:id", checkUserExist, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(projects);
});

//Rota para deletar o projeto com o id solicitado
server.delete("/projects/:id", checkUserExist, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);
  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);
  }

  return res.send();
});

server.post("/projects/:id/tasks", checkUserExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(title);

  return res.json(project);
});
server.listen(3000);
