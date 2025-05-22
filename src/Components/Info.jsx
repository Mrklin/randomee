import React, { useEffect, useState } from 'react'

const Info = () => {
    const  [users, setUser] = useState([]);

    const fetchData = async () => {
        fetch('https://randomuser.me/api/')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok' + res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            if(data.results && data.results.length > 0) {
                setUser({
                    userId: data.results[0].login.uuid,
                    firstName: data.results[0].name.first,
                    lastName: data.results[0].name.last,
                    email: data.results[0].email,
                    picture: data.results[0].picture.large, // Get the large size picture
                });
            } else {
                setUser(null); // No user data found
            }
        })
        .catch((err) => {
            console.log(`error fetching random users: ${err}`); 
        })
    }

    useEffect(()=> {
        
        fetchData();
        
    }, []);
  return (
    <>
    <div className='flex flex-col items-center justify-center h-screen bg-amber-100'>
    <h1 className='text-3xl font-bold mb-5'>Random User Generator</h1>

    <div className='flex flex-col items-center justify-center '>
        {users ? (
            <div className='flex flex-col gap-4 items-center justify-center bg-white shadow-lg rounded-lg p-5'>
            <div key={users.userId} className='flex flex-col items-center justify-center transition-all duration-300 ease-in-out'>
            
                <img src={users.picture} className='w-[60%] rounded-3xl mb-2.5 transition-all duration-300 ease-in-out' alt="user" />
               <h3> <strong>Name:</strong>{users.firstName} {users.lastName} </h3>
                <p> <strong>Email:</strong> {users.email}</p>
                <button onClick={fetchData} className='px-3 py-2 font-light --font-inter
                 bg-blue-200 rounded-lg outline-0 hover:bg-blue-400 mt-2'>
                {users ? "Get User Data" : "Loading..."}</button>
            </div>
            </div>
        ) : 
            <p>Loading Users.....</p>
        } 
        
    </div>

    </div>
    </>
  )
}

export default Info