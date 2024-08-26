const API = {
  //login
  loginAuth: "generate-auth-token",
  login: "login",
  //translation
  translationApi:"translation-content/by-client-id", //"/translation-content/by-client-id",
  //module
  moduleApi:"module-master",
  //user-role
  RoleMaster: "user-role",
  // user-role-module-access
  postUserRoleModuleAccess: "user-role-module-access",
  getUserRoleModuleAccessbyclientId: "user-role-module-access-by-role-id",

//user-master
  userMaster: "client-user",
  //add Coupon
  addCoupon: "addCoupon",
  //section-master
  sectionMaster:"section-master",
  //section-content-master
  sectionContentMaster:"section-content-master",
  //deal
  deal:"deal",
  //deal-category
  dealCategory:"deal-category",
  //deal-coupon
  dealCoupon:"deal-coupoun",
  //deal-coupon-code
  dealCouponCode:"deal-coupon-code",
  // upload image path
  uploadImage:"upload",
  // nav-configuration
  navConfiguration:"nav-configure",
  // deal-coupon-frequency
  dealcouponfrequency:"deal-coupoun-frequency",
};
export default API;
