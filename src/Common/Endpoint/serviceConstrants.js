const API = {
  //login
  loginAuth: "/generate-auth-token",
  login: "/login",
  //translation
  translationApi:"/translation-content-get-by-clientid", //"/translation-content/by-client-id",
  //module
  moduleApi:"/module-master",
  getModuleApi: "/module-master",
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
  //user-master
  userMaster: "/userMaster",
  getUserMaster: "/getUserMaster",
  userMaster:"/userMaster",
  //add Coupon
  addCoupon: "/addCoupon",
  //section-master
  postsectionMaster:"/section-master",
  getsectionMaster:"/section-master",
  updatesectionMaster:"/section-master",
  //section-content-master
  postSectionContentMaster:"section-content-master",
  getSectionContentMaster:"section-content-master",
  updateSectionContentMaster:"section-content-master",
  //deal
  postdeal:"/deal",
  getdeal:"/deal",
  updatedeal:"/deal",
  //deal-category
  postdealcategory:"/deal-category",
  getdealcategory:"/deal-category",
  updatedealcategory:"/deal-category",
  //deal-coupon
  postdealcoupon:"/deal-coupon",
  getdealcoupon:"/deal-coupon",
  updatedealcoupon:"/deal-coupon",

};
export default API;
