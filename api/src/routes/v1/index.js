const express = require("express");
// !USER ROUTES
const { userAuthRoute } = require("./user");
// !VENDORS ROUTES
const { vendorAuthRoute, vendorProfileRoute } = require("./vendor");
// !ADMING ROUTES
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
    path: "/vendor/profile",
    route: vendorProfileRoute,
  },
  {
    path: "/admin",
    route: adminAuthRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
