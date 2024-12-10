interface TextAreaProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-medium text-[#000929]">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full px-4 py-2 text-sm font-medium text-[#000929] bg-[#F7F7FD] border-2 border-[#E0DEF7] rounded-md placeholder-opacity-50 placeholder:text-[#000929] focus:outline-none focus:ring-2 focus:ring-[#7065F0] focus:border-[#7065F0]"
      ></textarea>
    </div>
  );
};

export default TextArea;
