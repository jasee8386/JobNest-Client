// src/components/ThemeToggle.jsx
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../globalState/Features/themeSlice";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  return (
    <button
      className="btn btn-ghost btn-sm"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-blue-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
