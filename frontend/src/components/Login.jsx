import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import { Logo } from "./Logo";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const loginSucesso = (credentialResponse) => {
    var credentialDecoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem("user", JSON.stringify(credentialDecoded));
    const { name, sub, picture } = credentialDecoded;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc)
      .then(() => {
        navigate("/", { replace: true })
      })
      .catch((error) => console.log(error));
  };

  const loginFailure = () => {
    console.log("Login Failed");
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <Logo.Root>
              <Logo.Icon />
              <Logo.See />
            </Logo.Root>
            <div className="shadow-2x1">
              <GoogleLogin onSuccess={loginSucesso} onError={loginFailure} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
