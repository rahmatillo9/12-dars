import { Toaster } from "sonner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoParent from "./components/TodoParent";
import { useState, useEffect } from "react";

export default function App() {
  const [list, setList] = useState([
    {
      todoName: "Task1",
      todoBody: "Task about",
      id: 345,
      todoStatus: "bajarilmagan",
    },
  ]);


  const [isDarkMode, setDarkMode] = useState(false);


  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);


  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <Header list={list} setList={setList} />
      <main className="grow bg-white dark:bg-gray-900 text-black dark:text-white">
        <div className="container mx-auto py-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Todo List</h1>

            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <TodoParent setList={setList} list={list} />
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </>
  );
}
