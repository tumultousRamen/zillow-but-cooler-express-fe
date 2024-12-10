import React from 'react';

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">

      <label className="text-base  text-[#000929]">{label}</label>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-12 px-4 text-sm  text-[#000929] bg-[#F7F7FD] border-2 border-[#E0DEF7] rounded-md placeholder-opacity-50 placeholder:text-[#000929] focus:outline-none focus:ring-2 focus:ring-[#7065F0] focus:border-[#7065F0]"

      />
    </div>
  );
};

export default TextInput;