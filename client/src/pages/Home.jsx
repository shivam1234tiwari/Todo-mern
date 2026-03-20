import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const addtodo = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/todo/",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTodos([...todos, res.data.todo]); // ✅ update UI instantly
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchtodo = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/todo/todos",
          { withCredentials: true }
        );
        if (res.data.success) {
          setTodos(res.data.todos);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchtodo();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center mt-10">

        {/* Form */}
        <div className="bg-gray-900 shadow-lg rounded-xl p-6 w-full max-w-lg mb-8">
          <input
            type="text"
            placeholder="Enter Todo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Enter Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            onClick={addtodo}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Todo
          </button>
        </div>

        {/* Todo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-gray-800 text-white p-5 rounded-xl shadow-lg hover:scale-105 transition duration-300"
            >
              <h2 className="text-xl font-semibold text-amber-400 mb-2">
                {todo.title}
              </h2>
              <p className="text-gray-300">{todo.description}</p>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4">
                <button className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
                  Edit
                </button>
                <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Home;