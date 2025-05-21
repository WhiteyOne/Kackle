import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkAuthenticate } from "../redux/session";
import Footer from "../components/Footer/Footer";



export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
        {isLoaded && <Outlet />}
        <Footer />
    </>
  );
}
