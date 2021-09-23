const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(
    ":method :url :body - status :status length :res[content-length] - :response-time ms"
  )
);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  const length = phonebook.length;
  const date = Date();

  response.send(`<p>Phonebook has info for ${length} people</p><p> ${date}`);
});

app.get("/api/phonebook", (request, response) => {
  response.json(phonebook);
});

app.get("/api/phonebook/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId =
    phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;

  return maxId + 1;
};

const checkGetPostBody = (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ error: "the name field is missing" });
  }
  if (!body.number) {
    return res.status(400).json({ error: "the number field is missing" });
  }
  if (phonebook.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: " name must be unique",
    });
  }
  return body;
};

app.post("/api/phonebook", (request, response) => {
  const body = checkGetPostBody(request, response);

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }; //this is returned as a Javascript object

  phonebook = phonebook.concat(person);
  response.json(person); //this actually needs to be parsed into a Json string for morgan
});

app.delete("/api/phonebook/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
