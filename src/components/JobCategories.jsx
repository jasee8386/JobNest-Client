import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Development & IT", icon: "💻" },
  { name: "Design & Creative", icon: "🎨" },
  { name: "AI Services", icon: "🤖" },
  { name: "Sales & Marketing", icon: "🤝" },
  { name: "Writing & Translation", icon: "✍" },
  { name: "Admin & Support", icon: "📋" },
  { name: "Finance & Accounting", icon: "🏛" },
  { name: "Legal", icon: "⚖" },
  { name: "HR & Training", icon: "👥" },
  { name: "Engineering & Architecture", icon: "🛠" },
];

export default function JobCategories({ onSelect }) {
  const [active, setActive] = useState("");

  const handleClick = (cat) => {
    setActive(cat);
    onSelect(cat);
  };

  return (
    <section className="py-12 px-6 ">
      <h2 className="text-2xl font-bold text-center mb-8">
        Browse by Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleClick(cat.name)}
            className={`flex flex-col items-center justify-center p-4 border rounded-lg transition cursor-pointer bg-gray-50 
              ${
                active === cat.name
                  ? "border-green-500 shadow-md"
                  : "hover:shadow-md"
              }
            `}
          >
            <span className="text-3xl mb-2">{cat.icon}</span>
            <p className="text-sm font-medium text-center">{cat.name}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
