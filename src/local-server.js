const fastify = require("fastify")({
  logger: true
});

fastify.register(require("@fastify/cors"), { origin: true });

const colleagueList = [
  {
    id: 1,
    name: "Tin Anh Nguyen"
  },
  {
    id: 2,
    name: "Thanh Son Vo"
  },
  {
    id: 3,
    name: "Didrik Fleischer"
  }
];
let runningId = colleagueList.length + 1;

fastify.get("/colleagues", (req, res) => {
  res.send(colleagueList);
});

fastify.get("/colleagues/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const colleague = colleagueList.find(c => c.id === id);

  if (!colleague) {
    res.status(404).send();
    return;
  }

  res.send(colleague);
});

fastify.post("/colleagues", (req, res) => {
  const colleague = req.body;

  if (!colleague.name) {
    res.status(400).send("Missing required 'name' property");
    return;
  }

  const id = runningId++;
  const newColleague = { ...colleague, id };
  colleagueList.push(newColleague);
  res.send(newColleague);
});

fastify.put("/colleagues/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const colleagueIndex = colleagueList.findIndex(c => c.id === id);

  if (colleagueIndex < 0) {
    res.status(404).send();
    return;
  }

  colleagueList[colleagueIndex] = { ...req.body, id };
  res.send(colleagueList[colleagueIndex]);
});

fastify.delete("/colleagues/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const colleagueIndex = colleagueList.findIndex(c => c.id === id);

  if (colleagueIndex < 0) {
    res.status(404).send();
    return;
  }

  const colleague = colleagueList.splice(colleagueIndex, 1);
  res.send(colleague);
});

fastify.listen({ port: 4000 }, (err, address) => {
  if (err) {
    throw err;
  }
  console.log(`Local server listening on ${address}`);
});
