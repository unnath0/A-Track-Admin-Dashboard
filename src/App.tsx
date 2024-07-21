import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
// import Profile from './pages/Profile';
import FsTest from './components/FsTest';
import { AttendanceProvider } from './contexts/AttendanceContext';
import { auth } from './database/firebase';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  function RequireAuth({ children }: { children: JSX.Element }) {
    if (!auth.currentUser) {
      return <Navigate to="/auth/signin" />;
    }

    return children;
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <AttendanceProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <RequireAuth>
                  <ECommerce />
                </RequireAuth>
              </>
            }
          />
          {/* <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          /> */}
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
          <Route
            path="/firestoreTest"
            element={
              <>
                <PageTitle title="Firestore Test" />
                <FsTest />
              </>
            }
          />
        </Routes>
      </AttendanceProvider>
    </>
  );
}

export default App;
