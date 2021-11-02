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
  Person.estimatedDocumentCount({}).then((count) => {
    const message =
      `<p>Phonebook has info for ${count} people </p>` + `<p>${new Date()}</p>`;
    response.send(message);
  });
});

app.get("/api/phonebook", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/phonebook/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const checkGetPostBody = (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ error: "the name field is missing" });
  }
  if (!body.number) {
    return res.status(400).json({ error: "the number field is missing" });
  }
  return body;
};

app.put("/api/phonebook/:id", (request, response, next) => {
  const body = checkGetPostBody(request, response);
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    runValidators: true,
  })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.post("/api/phonebook", (request, response) => {
  const body = checkGetPostBody(request, response);

  const person = new Person({
    name: body.name,
    number: body.number,
  }); //this is returned as a Javascript object
  person.save().then((savedperson) => {
    response.json(savedperson);
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.delete("/api/phonebook/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
