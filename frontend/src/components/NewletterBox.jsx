const NewletterBox = () => {

    // submit Handler
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }


    return (

        <div className='text-center'>

            <div className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</div>

            <p className='text-gray-400 mt-3'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, totam?
            </p>

            {/* Email Input */}
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input type="email" placeholder='Enter Your Email' className='w-full sm:flex-1 outline-none' />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4 hover:bg-gray-900'>SUBSCRIBE</button>
            </form>

        </div>
    )
}

export default NewletterBox
