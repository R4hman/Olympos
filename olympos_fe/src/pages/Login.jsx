import { useState } from "react";
import Auth from "../components/auth/Auth";

// import Footer from "../components/Footer";
// import Header from "../components/Header";

const Login = () => {
  const [isRememberMe, setIsRememberMe] = useState(false);

  // useEffect(() => {
  //   if (token !== "null" && role) {
  //     navigate("/");
  //   }
  // });

  return (
    <>
      <Auth isRememberMe={isRememberMe} setIsRememberMe={setIsRememberMe} />
    </>
  );
};

export default Login;
