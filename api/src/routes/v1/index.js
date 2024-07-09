const express = require("express");
// !USER ROUTES
const { userAuthRoute, userProfileRoute } = require("./user");

// !VENDORS ROUTES
const {
  vendorAuthRoute,
  vendorProfileRoute,
  vendorServiceRoute,
} = require("./vendor");

// !ADMING ROUTES
const {
  adminAuthRoute,
  adminUserfunctionRoute,
  adminVendorfunctionRoute,
} = require("./admin");
const router = express.Router();

const defaultRoutes = [
  // !USER ROUTES STARTS HERE
  {
    path: "/auth",
    route: userAuthRoute,
  },
  {
    path: "/user",
    route: userProfileRoute,
  },

  // !VENDOR ROUTES STARTS HERE
  {
    path: "/vendor/auth",
    route: vendorAuthRoute,
  },
  {
    path: "/vendor/profile",
    route: vendorProfileRoute,
  },
  {
    path: "/vendor/service",
    route: vendorServiceRoute,
  },
  // !ADMIN ROUTES STARTS HERE
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
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
