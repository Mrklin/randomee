import React from 'react'
import  { useState, useEffect } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Function to fetch user data
    const fetchUserData = async () => {
      setLoading(true); // Set loading to true whenever we start a new fetch
      setError(null);   // Clear any previous errors
  
      try {
        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const userData = data.results[0];
          setUser({
            firstName: userData.name.first,
            lastName: userData.name.last,
            email: userData.email,
            picture: userData.picture.large, // Get the large size picture
          });
        } else {
          setUser(null); // No user data found
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };
  
    // Initial fetch when the component mounts
    useEffect(() => {
      fetchUserData();
    }, []); // Empty dependency array means this runs once on mount
  
    if (loading && !user) { // Only show initial loading if no user data yet
      return <div>Loading user profile...</div>;
    }
  
    if (error) {
      return (
        <div>
          Error: {error.message}
          <button onClick={fetchUserData} disabled={loading}>
            Try Again
          </button>
        </div>
      );
    }


  
    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <h2>Random User Profile</h2>
          {user ? (
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', display: 'inline-block' }}>
              <img
                src={user.picture}
                alt={`${user.firstName} ${user.lastName}`}
                style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover', marginBottom: '15px' }}
              />
              <p>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ) : (
            <p>No user profile loaded.</p>
          )}
    
          <button
            onClick={fetchUserData}
            disabled={loading} // Disable the button while fetching
            style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            {loading ? 'Loading...' : 'Get New User'}
          </button>
        </div>
      );
  
}

export default UserProfile



// function UserProfileFetcher() {
 

 
// }

