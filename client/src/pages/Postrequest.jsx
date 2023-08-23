import { useState } from "react";
import Wordform from "../components/Wordform";
import Deleteword from "../components/Deleteword";

export default function Postrequest() {
  const [mode, setMode] = useState("add"); // Can be 'add', 'delete', or 'update'

  const renderContent = () => {
    switch (mode) {
      case "add":
        return <Wordform />;
      case "delete":
        return <Deleteword />;
      case "update":
        // Render the Wordform component in update mode (populate the form with the word to update)
        return <Wordform mode="update" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        {["add", "delete", "update"].map((m) => (
          // dynamically render buttons
          <button key={m} className="wordButton" onClick={() => setMode(m)}>
            {`${m.charAt(0).toUpperCase() + m.slice(1)} word`}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
}
