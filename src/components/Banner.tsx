import React from 'react'

function Banner() {
  return (
    <div className='flex justify-center items-center flex-col mt-5 md:mt-10'>
        <h1 className='text-4xl font-bold text-center'>
            Summarize Articles with <br className='max-md:hidden' />
            <span className='text-blue-500 font-extrabold'>OpenAI GPT-4</span>
        </h1>
        <h2 className='text-2xl font-medium text-center mt-4 max-w-2xl'>
            Simplify your reading with Summize, an open-source article summarizer
            that transforms lengthy articles into clear and concise summaries
        </h2>
        <button
          onClick={() =>
            window.open("https://github.com/TidbitsJS/Summize", "_blank")
          }
          className='bg-gray-800 text-white font-bold mt-4 py-2 px-4 rounded-full hover:bg-gray-700 transition duration-200 ease-in-out'
        >
          GitHub
        </button>
    </div>
  )
}

export default Banner