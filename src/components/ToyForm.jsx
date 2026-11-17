import React from "react";

function ToyForm({ onAddToy }) {
  function handleSubmit(event) {
    event.preventDefault();

     const formData = new FormData(event.currentTarget);
     const name = formData.get("name");
     const image = formData.get("image");


    onAddToy({ name, image });

    event.currentTarget.reset();
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>

        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          required
        />

        <br />

        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          required
        />

        <br />

        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;