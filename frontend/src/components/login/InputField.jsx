
const InputField = ({ delay, visible, ...props }) => (
  <div className={`transition-all duration-500 ${delay}
    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
    <input
      {...props}
      className="w-full px-4 py-3 border border-gray-300 bg-transparent text-gray-800 text-sm
        placeholder-gray-400 outline-none
        focus:border-gray-800 focus:ring-1 focus:ring-gray-800
        hover:border-gray-400
        transition-all duration-200"
    />
  </div>
)

export default InputField;