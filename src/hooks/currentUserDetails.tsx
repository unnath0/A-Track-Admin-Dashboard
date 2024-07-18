import { useState, useEffect } from 'react';
import { getCurrentEmployeeDetails } from '../database/fs_operations';

const useCurrentUserDetails = () => {
  const [userDetails, setUserDetails] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await getCurrentEmployeeDetails();
        setUserDetails(details);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return userDetails;
};

export default useCurrentUserDetails;
