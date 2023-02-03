import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './routes/AppRouter'
import { store } from './store'


export const LugaresApp = () => {
  return (
  //   <div className='class="bg-grey-lighter h-screen font-sans"'>
  //     <div className='container mx-auto h-full flex justify-center items-center'>

  //       <div>
  //       <h1 className="text-3xl font-bold underline">
  //   Hello world!
  // </h1>
  //       </div>
  //     </div>
  //   </div>
 <Provider store={store}> 
  <AppRouter />
 </Provider>



  )
}
