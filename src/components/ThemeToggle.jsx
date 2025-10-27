import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../globalState/Features/themeSlice";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  return (
  <button
  onClick={() => dispatch(toggleTheme())}
  className="flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-lg transition bg-white dark:bg-gray-800"
>
  {theme === "dark" ? (
    <BsSunFill className="text-yellow-400 w-5 h-5" />
  ) : (
    <BsMoonStarsFill className="text-blue-600 w-5 h-5" />
  )}
</button>

  );
};

export default ThemeToggle;
