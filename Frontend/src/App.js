import React, { useEffect, useState } from "react";
import numberService from "./services/contacts";
import Filter from "./components/Filter";
import NewForm from "./components/NewForm";
import Numbers from "./components/Numbers";
import Success from "./components/Success";
import Failure from "./components/Failure";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newfilter, setNewFilter] = useState("");
  const [results, setResults] = useState([]);
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");

  useEffect(() => {
    numberService.getAll().then((response) => {
      setResults(response.data);
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons, "data");

  const handleFilter = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };
  const handleNamechange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberchange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const addPerson = (event) => {
    //addname is called via an event
    event.preventDefault(); //stops page from automatically submitting shit
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.map((person) => person.name).includes(nameObject.name)) {
      const record = persons
        .map((person) => person)
        .find((person) => person.name === nameObject.name); //you need a way to fetch the person's id. the map/find function will do the trick
      if (
        !window.confirm(
          `${nameObject.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      } else {
        numberService
          .update(record.id, nameObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : response.data
              )
            );
            setResults(
              persons.map((person) =>
                person.name !== newName ? person : response.data
              )
            );
            setSuccess(`You have updated ${record.name}'s number`);
            setTimeout(() => {
              setSuccess(null);
            }, 5000);
          })
          .catch((error) => {
            setFailure(
              `${record.name}'s number has already been deleted from the Server`
            );
            setTimeout(() => {
              setFailure(null);
            }, 5000);
          });
        setNewName("");
        setNewNumber(""); //reset button states
      }
    } else {
      numberService.create(nameObject).then((response) => {
        setPersons(persons.concat(response.data));
        setResults(results.concat(response.data));
        setNewName("");
        setNewNumber(""); //reset button states
        setSuccess(`You have added ${nameObject.name}'s number`);
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      });
    }
  };

  const filterimp = (event) => {
    event.preventDefault();
    const perstoshow = persons.filter((person) =>
      person.name.toLowerCase().includes(newfilter.toLowerCase())
    );
    setResults(perstoshow);
    setNewFilter("");
  };

  const deleteimp = (id) => {
    if (!window.confirm("Are you sure?")) return;
    const record = persons
      .map((person) => person)
      .find((person) => person.id === id); //you need a way to fetch the person's id. the map/find function will do the trick
    numberService.remove(id).then(() => {
      setResults(persons.filter((person) => person.id !== id));
      setSuccess(`You have deleted ${record.name}'s number`);
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    });
  };

  return (
    <div>
      <Success message={success} />
      <Failure message={failure} />
      <h2>Phonebook</h2>
      <Filter
        newfilter={newfilter}
        handleFilter={handleFilter}
        filterimp={filterimp}
      />
      <h2>Add a New</h2>
      <NewForm
        name={newName}
        namechange={handleNamechange}
        number={newNumber}
        numberchange={handleNumberchange}
        clickhandle={addPerson}
      />
      <h2>Numbers</h2>
      <Numbers listofthings={results} deleteimp={deleteimp} />
    </div>
  );
};

export default App;
