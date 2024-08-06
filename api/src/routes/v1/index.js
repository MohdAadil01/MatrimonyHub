const express = require("express");

// !USER ROUTES
const {
  userAuthRoute,
  userProfileRoute,
  userServiceRoute,
  userVendorRoute,
  userBookingROute,
  userReviewRoute,
  userNotificationRoute,
  userPaymentRoute,
} = require("./user");
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
  adminReviewsfunctionRoute,
  adminBookingfunctionRoute,
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
  {
    path: "/services",
    route: userServiceRoute,
  },
  {
    path: "/vendors",
    route: userVendorRoute,
  },
  {
    path: "/bookings",
    route: userBookingROute,
  },
  {
    path: "/reviews",
    route: userReviewRoute,
  },
  {
    path: "/notifications",
    route: userNotificationRoute,
  },
  {
    path: "/payment",
    route: userPaymentRoute,
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
  {
    path: "/admin/reviews",
    route: adminReviewsfunctionRoute,
  },
  {
    path: "/admin/booking",
    route: adminBookingfunctionRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
