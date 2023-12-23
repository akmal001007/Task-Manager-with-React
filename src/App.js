import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddForm, setshowAddForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const result = await fetch("http://localhost:8000/task");
    const data = await result.json();

    return data;
  };

  // delete function for app
  const deleteTask = async (id) => {
    await fetch(`http://localhost:8000/task/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle section
  const toggleReminder = async (task) => {
    const updatedTask = { ...task, reminder: !task.reminder };
    const result = await fetch(`http://localhost:8000/task/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await result.json();

    setTasks(
      tasks.map((item) =>
        item.id === task.id ? { ...item, reminder: data.reminder } : item
      )
    );
  };

  // add task
  const addTask = async (task) => {
    const result = await fetch("http://localhost:8000/task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await result.json();

    setTasks([...tasks, data]);

    // codes for adding task in ui not server
    // const id = Math.floor(Math.random() * 1000 + 1);
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // hide the form

  return (
    <>
      <div className="container">
        <Header
          showAddForm={showAddForm}
          onAdd={() => setshowAddForm(!showAddForm)}
          title="Task Manager"
        />
        {showAddForm && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            onToggle={toggleReminder}
            onDelete={deleteTask}
            tasks={tasks}
          />
        ) : (
          "No task existed"
        )}

        <Footer />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
