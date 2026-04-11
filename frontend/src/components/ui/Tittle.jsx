
const Tittle = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-2'>
      <p className='bg-gray-700 w-8 sm:w-12 h-px sm:h-0.5 text-gray-700'></p>
      <p className='text-gray-500'>{text1}
        <span className='text-gray-700 font-medium'>{text2}</span>
      </p>
      <p className='bg-gray-700 w-8 sm:w-12 h-px sm:h-0.5 text-gray-700'></p>
    </div>

  )
}

export default Tittle
