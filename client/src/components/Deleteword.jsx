import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteWord() {
  const [input, setInput] = useState("");
  const [allWords, setAllWords] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllWords();
  }, []);

  const getAllWords = async () => {
    try {
      const response = await fetch(`/api/words`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch words");
      }

      const json = await response.json();
      setAllWords(json);
    } catch (error) {
      console.error(error.message);
      setError("Failed to fetch words. Please try again later.");
    }
  };

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setInput(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const word = input;

    try {
      const request = await fetch(`/api/words/${word}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!request.ok) {
        throw new Error(`Failed to delete ${word}`);
      }

      alert(`You deleted ${word}`);
      navigate("/allwords");
    } catch (error) {
      console.error(error.message);
      setError(`Failed to delete ${word}. Please try again later.`);
    }
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h3>Which word do you want to delete?</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="dropdown mb-3">
          <button
            className="btn btn-danger dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {input || "Select a word"}{" "}
            {/* Display the selected word or a default message */}
          </button>
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {allWords.map((word) => (
              <li key={word.id}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setInput(word.word);
                  }}
                >
                  {word.word}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="btn btn-dark">
          Sin miedo
        </button>
      </form>
    </div>
  );
}
