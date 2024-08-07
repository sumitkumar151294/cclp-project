const API = {
  //login
  loginAuth: "/generate-auth-token",
  login: "/login",
  //translation
  translationApi:"/translation-content/by-client-id", //"/translation-content/by-client-id",
  //module
  moduleApi:"/module-master",
  getModuleApi: "/module-master",
  //customer segment get api
  customerSegment: "/customerSegment",
  productContent: "/productContent",
  postproductApi: "/postProductSection",
  getProductApi: "/getProductSection",
  //user-role
  postRoleMaster: "/user-role",
  getRoleMaster: "/user-role",
  // user-role-module-access
  postUserRoleModuleAccess: "/user-role-module-access",
  getUserRoleModuleAccess: "/user-role-module-access-by-role-id",
  //client-master
  clientMaster: "/clientMaster",
  getclientMaster: "/getClientMaster",
  //client-user
  userMaster: "/client-user",
  getUserMaster: "/client-user",
  userMaster:"/client-user",
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
  postdealcoupon:"/deal-coupoun",
  getdealcoupon:"/deal-coupoun",
  updatedealcoupon:"/deal-coupoun",
  //deal-coupon-code
  postdealcouponcode:"/deal-coupon-code",
  getdealcouponcode:"/deal-coupon-code",
  updatedealcouponcode:"/deal-coupon-code",
  // upload image path
  uploadImage:"/upload",
  // nav-configuration
  postnavconfiguration:"/nav-configure",
  gettnavconfiguration:"/nav-configure"
};
export default API;
