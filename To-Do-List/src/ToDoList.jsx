import React, {useState} from 'react';
import './ToDoList.css';

function ToDoList(){
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  // add task.
  const addTask = () => {
    if(input.trim() === ""){
      return;
    }

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false
    }

    setTasks([...tasks, newTask]);
    setInput("");
  };

  // delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // complete task
  const completeTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    ));
  };

  // edit task
  const startEdit = (task) => {
    setEditId(task.id);
    setEditInput(task.text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, text: editInput} : task
    ));
    setEditId(null);
    setEditInput("");
  };
  return(
    <>
      <div className="todo-container">
    {/* Container div with CSS styling */}

      <h1>React To-Do List</h1>
      {/* Title */}

      <div className="input-section">
      {/* Section for the input box and Add button */}

        <input
          type="text"
          value={input}
          placeholder="Add a task"
          onChange={(e) => setInput(e.target.value)}
          // Update input state when user types

          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          // When user presses Enter key, add task
        />

        <button onClick={addTask}>Add</button>
        {/* Button to add the task */}
      </div>

      <ul className="task-list">
      {/* Unordered list to show all tasks */}

        {tasks.map(task => (
        // For each task in tasks array, create a list item

          <li key={task.id} className={task.completed ? 'completed' : ''}>
          {/* Unique key for react, and style if task completed */}

            {editId === task.id ? (
            // If this task is being edited, show input and Save button

              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={() => saveEdit(task.id)}>Save</button>
              </>
            ) : (
            // Otherwise show task text and Edit/Delete buttons

              <>
                <span onClick={() => completeTask(task.id)}>{task.text}</span>
                {/* Clicking text toggles task complete */}

                <button onClick={() => startEdit(task)}>Edit</button>
                {/* Edit button */}

                <button onClick={() => deleteTask(task.id)}>Delete</button>
                {/* Delete button */}
              </>
            )}

          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
export default ToDoList;