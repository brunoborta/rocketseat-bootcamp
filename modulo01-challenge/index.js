const express = require("express");

const app = express();
const projects = [];

app.locals.requests = 0;

const countRequests = (req, res, next) => {
  console.log(++app.locals.requests);
  return next();
};

const checkIfExists = (req, res, next) => {
  const { id } = req.params;
  const project = projects.find(project => project.id === parseInt(id));
  if (!project) {
    return res.status(400).json({ message: "Id nao existe!" });
  }
  return next();
  // projects.forEach(project => {
  //   if (project.id === parseInt(id)) {
  //     return next();
  //   }
  // });
  // return res.status(400).json({ message: "Id nao existe!" });
};

app.use(express.json());
app.use(countRequests);

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const newProject = {
    id,
    title,
    tasks: []
  };
  projects.push(newProject);
  return res.json(newProject);
});

app.post("/projects/:id/tasks", checkIfExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  // projects.forEach(project => {
  //   if (project.id === parseInt(id)) {
  //     projectSelected = project;
  //     project.tasks.push(title);
  //   }
  // });

  const project = projects.find(project => project.id === parseInt(id));
  project.tasks.push(title);

  return res.json(project);
});

app.put("/projects/:id", checkIfExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === parseInt(id));
  project.title = title;

  // projects.forEach(project => {
  //   if (project.id == id) {
  //     project.title = title;
  //   }
  // });
  return res.json(projects);
});

app.delete("/projects/:id", checkIfExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(
    project => project.id === parseInt(id)
  );
  projects.splice(projectIndex, 1);
  // projects.forEach((project, index) => {
  //   if (project.id === parseInt(id)) {
  //     projects.splice(index, 1);
  //   }
  // });
  return res.json(projects);
});

app.listen(3000, (req, res) => {
  console.log("Ouvindo na porta 3333");
});
