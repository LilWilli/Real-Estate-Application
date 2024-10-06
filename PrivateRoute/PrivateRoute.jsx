import { AuthContext } from 'context/AuthProvider';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!loading && !user) {
      router.push({
        pathname: '/login',
        query: { from: router.pathname },
      });
    }
  }, [user, loading, router]);

  if (!isClient || loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return children;
  }

  return null;
};

export default PrivateRoute;