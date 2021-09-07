import React from "react";

const Numbers = ({ listofthings, deleteimp }) => {
  return (
    <ul>
      {listofthings.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          {/* Note to self, when you pass parameters into onclick, not using () => basically runs the call, and not just onclick. Thats bad. */}
          <button type="submit" onClick={() => deleteimp(person.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Numbers;
