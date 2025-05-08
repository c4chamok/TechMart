import { useEffect } from "react";
import useZustStates from "./Store/useZustStates";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";

const App = () => {
  const { getUser, user } = useZustStates();

  console.log(user);

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
