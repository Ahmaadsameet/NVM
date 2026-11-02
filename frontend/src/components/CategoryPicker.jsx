import React from "react";
import { ChevronDown } from "lucide-react";

const categories = ["Bikerwear", "Denim", "Leatherwear", "Tracksuits", "Hoodies", "Sportswear"];

export default function CategoryPicker({ label, placeholder }) {
  const [selected, setSelected] = React.useState("");
  const picker = React.useRef(null);
  const id = React.useId();

  React.useEffect(() => {
    const close = (event) => {
      if (picker.current && !picker.current.contains(event.target)) picker.current.open = false;
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return <div className="category-field">
    <span className="category-label" id={id}>{label}</span>
    <details className="category-picker" ref={picker} onKeyDown={event => {
      if (event.key === "Escape") {
        event.preventDefault();
        picker.current.open = false;
        picker.current.querySelector("summary").focus();
      }
    }}>
      <summary aria-labelledby={id + " " + id + "-value"}>
        <span id={id + "-value"}>{selected || placeholder}</span><ChevronDown size={18} aria-hidden="true" />
      </summary>
      <div className="category-menu" role="radiogroup" aria-labelledby={id}>
        {categories.map(category => <label className="category-option" key={category}>
          <input type="radio" name="product_type" value={category.toLowerCase()} required checked={selected === category}
            onInvalid={event => {
              event.preventDefault();
              picker.current.open = true;
              requestAnimationFrame(() => event.target.focus());
            }}
            onChange={() => setSelected(category)}
            onClick={() => {
              picker.current.open = false;
              picker.current.querySelector("summary").focus();
            }} />
          <span>{category}</span>
        </label>)}
      </div>
    </details>
  </div>;
}
