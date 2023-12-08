import React, { useEffect, useState } from "react";

const ToDoList = () => {
  const [toDoItems, setToDoItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  //This is pulling the data from the API
  useEffect(() => {
    const fetchToDo = async () => {
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/albertr"
      );
      const data = await response.json();
      setToDoItems(data);
    };
    //need to call the function to pull the data
    fetchToDo();
  }, []);

  useEffect(() => {
    const putToDo = async () => {
      const options = {
        method: "PUT",
        body: JSON.stringify(toDoItems),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/albertr",
        options
      );
      const data = await response.json();
      console.log(data);
    };
    putToDo();
  }, [toDoItems]);

  const handleAddItem = () => {
    if (newItem) {
      let toDo = { label: newItem, done: false };
      setToDoItems([...toDoItems, toDo]);
      setNewItem("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const handleDeleteItem = (index) => {
    const newToDoItems = [...toDoItems];
    newToDoItems.splice(index, 1);
    setToDoItems(newToDoItems);
  };

  const toggleDone = (index) => {
    const newToDoItems = [...toDoItems];
    newToDoItems[index].done = !newToDoItems[index].done;
    setToDoItems(newToDoItems);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">To-Do List</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add new item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleAddItem}
              >
                Add
              </button>
            </div>
          </div>
          <ul className="list-group">
            {toDoItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={item.done}
                    onChange={() => toggleDone(index)}
                  />
                  <label
                    className="form-check-label"
                    style={{
                      textDecoration: item.done ? "line-through" : "none",
                    }}
                  >
                    {item.label}
                  </label>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
