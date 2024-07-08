const express = require("express");
const { userAuthRoute, userProfileRoute } = require("./user");
const { vendorAuthRoute } = require("./vendor");
const { adminAuthRoute } = require("./admin");
const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: userAuthRoute,
  },
  {
    path: "/vendor/auth",
    route: vendorAuthRoute,
  },
  {
    path: "/admin",
    route: adminAuthRoute,
  },
  {
    path: "/user",
    route: userProfileRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
