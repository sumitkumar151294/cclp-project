import { useEffect, useState } from "react";
import {
  onLoginAuthReset,
  onLoginAuthSubmit,
} from "../../Store/Slices/loginAuthSlice";
import {
  onTranslationReset,
  onTranslationSubmit,
} from "../../Store/Slices/translationSlice";
import PageError500 from "../../Components/PageError/PageError";
import { useDispatch, useSelector } from "react-redux";
import RouteConfiq from "../../Routing/routes";
import { config } from "../../Common/Client/ClientConfig";
import Loader from "../../Components/Loader/Loader";
import { onPartnerKeyLoginSubmit } from "../../Store/Slices/loginSlice";
import axiosInstanceAdmin from "../../Common/Axios/axiosInstanceAdmin";

const Auth = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const [pageError, setPageError] = useState({
    StatusCode: "",
    ErrorName: "",
    ErrorDesription: "",
    url: "",
    buttonText: "",
  });
  // to get data from redux store
  const translationData = useSelector((state) => state.translationReducer);
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const currentUrl = window.location.href;
  useEffect(() => {
    setShowLoader(true);
    // find the configuration that matches the current URL
    let matchingConfig = config.filter((item) =>
      currentUrl.includes(item.API_URL)
    );
    if (matchingConfig.length > 1) {
      matchingConfig = matchingConfig.find(
        (item) => item.PARTNER_KEY === "UIAdmin"
      );
    } else if (matchingConfig.length === 1) {
      matchingConfig = matchingConfig[0];
    }
    // get data from present url
    if (matchingConfig) {
      const { ACCESS_KEY, SECRET_KEY, PARTNER_KEY } = matchingConfig;
      // var APICalled = false;
      // if (PARTNER_KEY !== loginDetails.partner_Key) {
      //   APICalled = true;
      // }
      dispatch(onPartnerKeyLoginSubmit(PARTNER_KEY));
      axiosInstanceAdmin.defaults.headers["partner-code"] = PARTNER_KEY;
      axiosInstanceAdmin.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
      axiosInstanceAdmin.defaults.headers["client-code"] =
        loginAuthData?.data?.[0]?.clientId;
      if (!loginAuthData?.data.length) {
        dispatch(onTranslationReset());
        dispatch(
          onLoginAuthSubmit({
            partnerCode: PARTNER_KEY,
            accessKey: ACCESS_KEY,
            secretKey: SECRET_KEY,
          })
        );
      } else {
        setShowError(false);
        setShowLoader(false);
      }
    } else {
      setShowLoader(false);
      setShowError(true);
      setPageError({
        StatusCode: "401",
        ErrorName: "Permission Denied",
        ErrorDesription:
          "Your application url is not registerd to our application",
        url: "/",
        buttonText: "Back to Home",
      });
    }
  }, [currentUrl]);

  useEffect(() => {
    if (loginAuthData?.status_code === "200") {
      axiosInstanceAdmin.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
      axiosInstanceAdmin.defaults.headers["client-code"] =
        loginAuthData?.data?.[0]?.clientId;
      dispatch(onTranslationSubmit());
      dispatch(onLoginAuthReset());
    } else if (loginAuthData?.status_code) {
      setShowError(true);
      setShowLoader(false);
      setPageError({
        StatusCode: loginAuthData.status_code,
        ErrorName: "Internal Server Error",
        ErrorDesription: "You do not have permission to view this resource",
        url: "/",
        buttonText: "Back to Home",
      });
    }
  }, [loginAuthData]);

  useEffect(() => {
    if (translationData.status_code === "200" && !translationData?.isLoading) {
      setShowLoader(false);
      setShowError(false);
      dispatch(onTranslationReset());
    } else if (
      translationData?.status_code !== "200" &&
      translationData?.status_code
    ) {
      setShowError(true);
      setShowLoader(false);
      setPageError({
        StatusCode: "500",
        ErrorName: "Internal Server Error",
        ErrorDesription: "You do not have permission to view this resource",
        url: "/",
        buttonText: "Back to Home",
      });
    }
  }, [translationData]);
  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          {showError ? <PageError500 pageError={pageError} /> : <RouteConfiq />}
        </>
      )}
    </>
  );
};

export default Auth;
