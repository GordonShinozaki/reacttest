require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(
    ":method :url :body - status :status length :res[content-length] - :response-time ms"
  )
);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  const length = phonebook.length;
  const date = Date();

  response.send(`<p>Phonebook has info for ${length} people</p><p> ${date}`);
});

app.get("/api/phonebook", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/phonebook/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
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

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  }); //this is returned as a Javascript object

  person.save().then((savedperson) => {
    response.json(savedperson);
  });
});

app.delete("/api/phonebook/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
