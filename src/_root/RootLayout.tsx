import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { useFetchCurrentUser } from "@/lib/react-query/queriesAndMutations";

const RootLayout = () => {
  const { data: user, isLoading, error } = useFetchCurrentUser();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error && 'status' in error && error.status !== 401) {
    return <div>Error fetching user data</div>;
  }

 return (
    <div className="w-full">
      {auth ? (
        <>
          <Topbar />
          <LeftSidebar />
          <section className="flex flex-1 h-full">
            <Outlet />
          </section>
        </>
      ) : (
        // Show a login prompt if not authenticated
        <div className="sm:w-420 flex-center flex-col">Please log in</div>
      )}
    </div>
  );
};

export default RootLayout;
