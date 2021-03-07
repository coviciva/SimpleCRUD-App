import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);

  const [newFoodName, setNewFoodName] = useState("");

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => {
    axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) => {
    axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });
  };

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Food name:</label>
      <input
        type="text"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <label>Days since you ate it:</label>
      <input
        type="number"
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
      <button onClick={addToList}>Add to list</button>
      <h1>Food list</h1>
      {foodList.map((val, key) => {
        return (
          <div className="food" key={key}>
            <h1>{val.foodName}</h1>
            <h1>{val.daysSinceIAte}</h1>
            <input
              type="text"
              placeholder="New food name..."
              onChange={(e) => {
                setNewFoodName(e.target.value);
              }}
            />
            <button onClick={() => updateFood(val._id)}>Update</button>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
