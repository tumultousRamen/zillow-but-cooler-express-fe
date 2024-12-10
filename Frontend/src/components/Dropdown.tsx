interface SelectFieldProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-medium text-[#000929]">{label}</label>
      <div className="w-full h-12 px-4 text-sm font-medium text-[#000929] bg-[#F7F7FD] border-2 border-[#E0DEF7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7065F0] focus:border-[#7065F0] justify-center items-center flex">
        <select
          value={value}
          onChange={onChange}
          className="w-full  px-4 text-sm font-medium text-[#000929] bg-transparent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
