const express = require("express");
// !USER ROUTES
const { userAuthRoute, userProfileRoute } = require("./user");

// !VENDORS ROUTES
const {
  vendorAuthRoute,
  vendorProfileRoute,
  vendorServiceRoute,
  vendorPortfolioRoute,
  vendorBookingRoute,
} = require("./vendor");

// !ADMING ROUTES
const {
  adminAuthRoute,
  adminUserfunctionRoute,
  adminVendorfunctionRoute,
} = require("./admin");
const { path } = require("./vendor/portfolio.vendor.route");
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
  {
    path: "/vendor/portfolio",
    route: vendorPortfolioRoute,
  },
  {
    path: "/vendor/booking",
    route: vendorBookingRoute,
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
