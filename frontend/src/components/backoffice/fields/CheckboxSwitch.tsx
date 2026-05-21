import { useState } from "react";

interface CheckboxSwitchProps {
    label: string;
    initialValue?: boolean;
    onChange?: (value: boolean) => void;
}
export default function YesNoSwitch({ label, initialValue, onChange }: CheckboxSwitchProps) {
  const [checked, setChecked] = useState(initialValue ?? false);

  return (
    <div className="switch-container">
    <span className="small-label switch-text">
        {label}
      </span>
    <label className={`switch ${checked ? "yes" : "no"}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          if (onChange) {
            onChange(e.target.checked);
          }
        }}
      />

      <span className="switch-slider" />
    </label>
    </div>
  );
}
