import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch toys");
        }
        return response.json();
      })
      .then((data) => setToys(data))
      .catch((error) => console.error(error));
  }, []);

  function handleClick() {
    setShowForm((previous) => !previous);
  }

  // POST: Add a new toy
  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add toy");
        }
        return response.json();
      })
      .then((createdToy) => {
        setToys((currentToys) => [...currentToys, createdToy]);
      })
      .catch((error) => console.error(error));
  }

  // PATCH: Increase likes
  function handleLike(toy) {
    const updatedLikes = toy.likes + 1;

    // Update the interface immediately
    setToys((currentToys) =>
      currentToys.map((currentToy) =>
        currentToy.id === toy.id
          ? { ...currentToy, likes: updatedLikes }
          : currentToy
      )
    );

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedLikes,
      }),
    }).catch((error) => console.error(error));
  }

  // DELETE: Remove a toy
  function handleDonate(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete toy");
        }

        setToys((currentToys) =>
          currentToys.filter((toy) => toy.id !== id)
        );
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Header />

      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        onLike={handleLike}
        onDonate={handleDonate}
      />
    </>
  );
}

export default App;