const API = {
  //login
  loginAuth: "/generate-auth-token",
  login: "/login",
  //translation
  translationApi:"/translation-content-get-by-clientid", //"/translation-content/by-client-id",
  //module
  moduleApi: "/module",
  //customer segment get api
  customerSegment: "/customerSegment",
  productContent: "/productContent",
  postproductApi: "/postProductSection",
  getProductApi: "/getProductSection",
  //user-role
  postRoleMaster: "/roleMaster",
  getRoleMaster: "/getRoleMaster",
  roleMaster: "/roleMaster",
  // user-role-module-access
  userRole_moduleAccess: "/user-role-module-access",
  //client-master
  clientMaster: "/clientMaster",
  getclientMaster: "/getClientMaster",
  //userMaster
  userMaster: "/userMaster",
  getUserMaster: "/getUserMaster",
  userMaster:"/userMaster",
  //add Coupon
  addCoupon: "/addCoupon",
  //section-master
  postsectionMaster:"/section-master",
  getsectionMaster:"/section-master",
  updatesectionMaster:"/section-master",
};
export default API;
