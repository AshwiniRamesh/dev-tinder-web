import { useState } from "react";

export default function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">DaisyUI Dark Mode</h1>
      <button className="btn btn-primary" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}
