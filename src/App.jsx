import React from 'react';
import Header from './Components/Header';
import Info from './Components/Info';
// import UserProfile from './Components/UserProfile';



const App = () => {
  

  return (
    <>
    <div className=' h-screen bg-amber-50'>
    <div className='bg-amber-100'>
      <Header />
    </div>
    <Info />
    {/* <UserProfile /> */}

    </div>
      
    </>
  )
}

export default App
