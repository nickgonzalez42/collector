// components/Login.js
import { useEffect } from "react";

import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { useNavigate, useLocation } from "react-router";

export function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (route === "authenticated") {
      navigate(from, { replace: false });
    }
  }, [route, navigate, from]);
  return (
    <View className="auth-wrapper" style={{ fontFamily: "sans-serif" }}>
      <Authenticator className="mt-10"></Authenticator>
    </View>
  );
}
