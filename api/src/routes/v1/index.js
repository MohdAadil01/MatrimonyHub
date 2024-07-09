const express = require("express");
// !USER ROUTES
const { userAuthRoute } = require("./user");
// !VENDORS ROUTES
const { vendorAuthRoute, vendorProfileRoute } = require("./vendor");
// !ADMING ROUTES
const { adminAuthRoute, adminUserfunctionRoute, adminVendorfunctionRoute } = require("./admin");
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
    path: "/admin/auth",
    route: adminAuthRoute,
  },
  {
    path: "/admin/users",
    route: adminUserfunctionRoute,
  },
  {
    path: "/admin/vendors",
    route: adminVendorfunctionRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
