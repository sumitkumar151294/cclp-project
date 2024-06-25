import { useEffect, useState } from "react";
import { onLoginAuthReset, onLoginAuthSubmit } from "../../Store/Slices/loginAuthSlice";
import { onTranslationReset, onTranslationSubmit } from "../../Store/Slices/translationSlice";
import { useDispatch, useSelector } from "react-redux";
import RouteConfiq from "../../Routing/routes";
import { config } from "../../Common/Client/ClientConfig";

const Auth = () => {
  const dispatch = useDispatch();
  const [pageError, setPageError] = useState({
    StatusCode: "",
    ErrorName: "",
    ErrorDesription: "",
    url: "",
    buttonText: "",
  });

  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const currentUrl = window.location.href;
  useEffect(() => {
    let matchingConfig = config.filter((item) => currentUrl.includes(item.API_URL));
    if (matchingConfig) {
      matchingConfig = matchingConfig.find((item) => item.PARTNER_KEY === "UIAdmin");
    }
    if (matchingConfig && !loginAuthData?.data.length) {
      const { ACCESS_KEY, SECRET_KEY, PARTNER_KEY } = matchingConfig;
      dispatch(onTranslationReset());
      dispatch(
        onLoginAuthSubmit({
          partnerCode: PARTNER_KEY,
          accessKey: ACCESS_KEY,
          secretKey: SECRET_KEY,
        })
      );
    }
  }, [currentUrl]);

  useEffect(() => {
    if (loginAuthData?.status_code === "201") {
      dispatch(onTranslationSubmit());
      dispatch(onLoginAuthReset());
    } else if (loginAuthData?.status_code && loginAuthData?.status_code !== "201") {
      setPageError({
        StatusCode: loginAuthData.status_code,
        ErrorName: "Internal Server Error",
        ErrorDesription: "You do not have permission to view this resource",
        url: "/",
        buttonText: "Back to Home",
      });
    }
  }, [loginAuthData]);

  return (
    <>
      <RouteConfiq />
    </>
  );
};

export default Auth;
