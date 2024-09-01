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
import axiosInstanceClient from "../../Common/Axios/axiosInstanceClient";
import {
  onGetClientMaster,
  onGetClientMasterReset,
} from "../../Store/Slices/clientMasterSlice";

const Auth = () => {
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const [pageError, setPageError] = useState({
    StatusCode: "",
    ErrorName: "",
    ErrorDesription: "",
    url: "",
    buttonText: "",
  });

  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
  const PARTNER_KEY = process.env.REACT_APP_PARTNER_KEY;
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
  const clientMasterData = useSelector((state) => state.clientMasterReducer);
  const clientData = useSelector(
    (state) => state.clientMasterReducer?.clientMasterData
  );
  // to get data from redux store
  const translationData = useSelector((state) => state.translationReducer);
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const loginDetails = useSelector((state) => state.loginReducer);
  const currentUrl = window.location.href;
  //fetch module master data on mount

  useEffect(() => {
    if (!clientData.length) {
      dispatch(onGetClientMaster({ PlatformDomainUrl: currentUrl }));
    }
  }, [currentUrl]);
  useEffect(() => {
    if (clientMasterData?.get_status_code === "200") {
      if (clientData?.[0]?.clientId) {
        dispatch(
          onLoginAuthSubmit({
            partnerCode: PARTNER_KEY,
            accessKey: ACCESS_KEY,
            secretKey: SECRET_KEY,
          })
        );
      }
      dispatch(onGetClientMasterReset());
    } else if (clientMasterData?.get_status_code) {
      setShowError(true);
      setPageError({
        StatusCode: clientMasterData?.get_status_code,
        ErrorName: "Internal Server Error",
        ErrorDescription: "You do not have permission. Please contact admin.",
        url: "/",
        buttonText: "Back to Home",
      });
    }
  }, [clientMasterData, clientData]);

  useEffect(() => {
    if (loginAuthData?.status_code === "200") {
      // axiosInstanceAdmin.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
      // axiosInstanceAdmin.defaults.headers["client-code"] =
      //   loginAuthData?.data?.[0]?.clientId;
      // axiosInstanceClient.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
      // axiosInstanceClient.defaults.headers["client-code"] =
      //   loginAuthData?.data?.[0]?.clientId;
      dispatch(onTranslationSubmit({ clientId: 0 }));
      dispatch(onLoginAuthReset());
    } else if (loginAuthData?.status_code) {
      setShowError(true);

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
      setShowError(false);
      dispatch(onTranslationReset());
    } else if (
      translationData?.status_code !== "200" &&
      translationData?.status_code
    ) {
      setShowError(true);

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
      {clientMasterData?.isgetLoading || translationData?.isLoading ? (
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
