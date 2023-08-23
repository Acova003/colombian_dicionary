import React from "react";
import { useState, useEffect } from "react";

export default function Wordform({ initialData = null, mode = "add" }) {
  // Initialize the request state with initialData or default values
  // An object containing word data
  const [request, SetRequest] = useState({
    word: initialData ? initialData.word : "",
    category: initialData ? initialData.category : "",
    definition_es: initialData ? initialData.definition_es : "",
    definition_en: initialData ? initialData.definition_en : "",
    example_1: initialData ? initialData.example_1 : "",
    example_2: initialData ? initialData.example_2 : "",
  });
  // An array containing all words fetched from the database
  const [allWords, setAllWords] = useState([]);
  // The word selected from the dropdown to be updated
  const [selectedWord, setSelectedWord] = useState(null);

  // Gets all the words from the DB to set glossary state
  const getAllWords = async () => {
    try {
      const response = await fetch(`/api/words`, {
        method: "GET",
      });

      const json = await response.json();
      setAllWords(json);
    } catch (error) {
      console.log("errors");
    }
  };

  // this function does the PUT into the DB
  const updateWord = async () => {
    try {
      const response = await fetch(`/api/words`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const updatedWords = await response.json();
        console.log("Updated words:", updatedWords);
      } else {
        console.log("Failed to update word.");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  // function to check if request is empty
  const allFieldsFilled = () => {
    for (const key in request) {
      if (!request[key]) {
        return false; // return false if any field is empty
      }
    }
    return true; // all fields have values
  };

  // If mode is update, call getAllWords when the component mounts
  useEffect(() => {
    if (mode === "update") {
      getAllWords();
    }
  }, [mode]);

  //handles changes and updates the state with the prevSate + {keyname:inputvalue}
  const handleChange = (event) => {
    SetRequest((prevRequest) => ({
      ...prevRequest,
      [event.target.name]: event.target.value,
    }));
  };

  // this functions handles the submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    if (allFieldsFilled()) {
      mode === "add" ? postWord() : updateWord();
      alert(
        `Action successful for ${
          mode === "add" ? mode : mode.slice(0, -1)
        }ing a word`
      );
    } else {
      alert("Pongase las pilas y ponga todas las palabras");
    }
  };

  // this function does the POST into the DB
  const postWord = async () => {
    try {
      const response = await fetch(`/api/words`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      // getAllwords();
    } catch (error) {
      console.log("errors");
    }
  };

  return (
    <div className="container">
      {mode === "update" && (
        <div className="dropdown">
          <div>
            <h3>Which word do you want to update?</h3>
          </div>
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Select a word
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {allWords.map((word) => (
              <a
                className="dropdown-item"
                href="#"
                key={word.id}
                onClick={(event) => {
                  event.preventDefault();
                  SetRequest(word);
                  setSelectedWord(word);
                }}
              >
                {word.word}
              </a>
            ))}
          </div>
        </div>
      )}

      {(mode === "add" || selectedWord) && (
        <form onSubmit={handleSubmit}>
          <label>Qué palabra quieres definir ? </label>
          <input
            type="text"
            name="word"
            value={request.word}
            onChange={handleChange}
          />
          <label>Que categoria es ? </label>
          <input
            type="text"
            name="category"
            value={request.category}
            onChange={handleChange}
          />
          <label>Porfavor define la palabra : </label>
          <textarea
            name="definition_es"
            value={request.definition_es}
            onChange={handleChange}
          ></textarea>
          <label>Ahora en inglés - sin esta no se gradua mija: </label>
          <textarea
            name="definition_en"
            value={request.definition_en}
            onChange={handleChange}
          ></textarea>
          <label>Aquí va un ejemplo : </label>
          <textarea
            name="example_1"
            value={request.example_1}
            onChange={handleChange}
          ></textarea>
          <label>Y si quiere otro sumercé : </label>
          <textarea
            name="example_2"
            value={request.example_2}
            onChange={handleChange}
          ></textarea>
          <br />
          <button className="btn btn-dark">Hagale!</button>
        </form>
      )}
    </div>
  );
}
