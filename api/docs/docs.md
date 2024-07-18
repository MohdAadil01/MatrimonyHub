**MESSAGE**:::::::**Financial, preformance, support, notification and message API for admin will be create later**

**Basic structure for all roles(User, Vendor and admin)**

### User Functionalities and Corresponding APIs

| **Functionality** | **Description** | **Corresponding API Endpoints** |
| --- | --- | --- |
| **User Registration and Login** | User can register and log in to the website. | \- POST /api/auth/register&lt;br&gt;- POST /api/auth/login |
| **Profile Management** | User can update and manage their profile. | \- GET /api/user/profile&lt;br&gt;- PUT /api/user/profile |
| **Browse Services** | User can browse services provided by multiple vendors. | \- GET /api/services |
| **Service Search and Filtering** | User can search and filter services by category, location, price, etc. | \- GET /api/services/search&lt;br&gt;- GET /api/services/filter |
| **View Vendor Profiles** | User can view detailed vendor profiles, including services offered and portfolio. | \- GET /api/vendors/{vendor_id} |
| **Check Vendor Availability** | User can check the availability of vendors for specific dates. | \- GET /api/vendors/{vendor_id}/availability |
| **Service Booking** | User can book services provided by vendors. | \- POST /api/bookings |
| **Cancel Booking** | User can cancel previously made bookings. | \- DELETE /api/bookings/{booking_id} |
| **View Booking History** | User can view their past and upcoming bookings. | \- GET /api/user/bookings |
| **Leave Reviews and Ratings** | User can leave reviews and ratings for vendor services. | \- POST /api/reviews |
| **View Reviews and Ratings** | User can view reviews and ratings left by other users. | \- GET /api/reviews |
| **Add Comments** | User can add comments to reviews. | \- POST /api/reviews/{review_id}/comments |
| **Add Services to Wishlist** | User can add services to a wishlist for future reference. | \- POST /api/wishlist&lt;br&gt;- GET /api/wishlist&lt;br&gt;- DELETE /api/wishlist/{service_id} |
| **Payment Processing** | User can make payments for booked services. | \- POST /api/payments |
| **Receive Notifications** | User can receive notifications regarding booking confirmations, updates, etc. | \- GET /api/notifications |
| **Customer Support** | User can access customer support for help with bookings, payments, and other issues. | \- POST /api/support/tickets&lt;br&gt;- GET /api/support/tickets |

### Database Schema for User-related Functionalities

#### User Schema

| **Field Name** | **Data Type** | **Description** |
| --- | --- | --- |
| user_id | UUID | Unique identifier for the user |
| name | String | Full name |
| email | String | Contact email |
| phone_number | String | Contact phone number |
| password_hash | String | Hashed password for authentication |
| bookings | Array | List of bookings made by the user |
| reviews | Array | List of reviews written by the user |
| wishlist | Array | List of services added to the wishlist |
| notifications | Array | List of notifications |
| created_at | Timestamp | Account creation date |
| updated_at | Timestamp | Last update date |

#### Booking Schema

| **Field Name** | **Data Type** | **Description** |
| --- | --- | --- |
| booking_id | UUID | Unique identifier for the booking |
| user_id | UUID | ID of the user who made the booking |
| vendor_id | UUID | ID of the vendor providing the service |
| service_id | UUID | ID of the booked service |
| booking_date | Date | Date of the booking |
| status | String | Booking status (confirmed, cancelled, etc.) |
| payment_status | String | Payment status (paid, pending, etc.) |
| created_at | Timestamp | Booking creation date |
| updated_at | Timestamp | Last update date |

#### Review Schema

| **Field Name** | **Data Type** | **Description** |
| --- | --- | --- |
| review_id | UUID | Unique identifier for the review |
| user_id | UUID | ID of the user who wrote the review |
| vendor_id | UUID | ID of the vendor being reviewed |
| service_id | UUID | ID of the reviewed service |
| rating | Float | Rating given by the user |
| comment | String | Review comment |
| comments | Array | List of comments on the review |
| created_at | Timestamp | Review creation date |
| updated_at | Timestamp | Last update date |

#### Wishlist Schema

| **Field Name** | **Data Type** | **Description** |
| --- | --- | --- |
| wishlist_id | UUID | Unique identifier for the wishlist entry |
| user_id | UUID | ID of the user who added the service to wishlist |
| service_id | UUID | ID of the service added to wishlist |
| added_at | Timestamp | Date when the service was added to wishlist |

**Vendor Functionalities and Corresponding APIs**

| **Functionality** | **Description** | **Corresponding API Endpoints** |
| --- | --- | --- |
| **Vendor Registration and Login** | Vendors can register and log in to the website. | \- POST /api/auth/register&lt;br&gt;- POST /api/auth/login |
| **Profile Management** | Vendors can update and manage their profile, including business details and contact information. | \- GET /api/vendor/profile&lt;br&gt;- PUT /api/vendor/profile |
| **Service Setup Post-Registration** | After registration, vendors can fill in details of their services. | \- POST /api/vendor/services/bulk |
| **Portfolio Management** | Vendors can upload and manage their portfolio, including photos and videos. | \- POST /api/vendor/portfolio&lt;br&gt;- DELETE /api/vendor/portfolio/{media_id} |
| **Service Management** | Vendors can add, update, and delete services they offer. | \- POST /api/vendor/services&lt;br&gt;- PUT /api/vendor/services/{service_id}&lt;br&gt;- DELETE /api/vendor/services/{service_id} |
| **Set Availability** | Vendors can set and update their availability for bookings. | \- POST /api/vendor/availability&lt;br&gt;- PUT /api/vendor/availability |
| **Booking Management** | Vendors can view and manage booking requests, confirm or decline bookings. | \- GET /api/vendor/bookings&lt;br&gt;- PUT /api/vendor/bookings/{booking_id}&lt;br&gt;- DELETE /api/vendor/bookings/{booking_id} |
| **Review Management** | Vendors can view and respond to user reviews and ratings. | \- GET /api/vendor/reviews&lt;br&gt;- POST /api/vendor/reviews/{review_id}/responses |
| **Financial Management** | Vendors can view their earnings, payment history, and manage withdrawals. | \- GET /api/vendor/earnings&lt;br&gt;- POST /api/vendor/withdrawals |
| **Performance Analytics** | Vendors can view performance analytics such as number of bookings, revenue, and customer feedback. | \- GET /api/vendor/analytics |
| **Communication** | Vendors can communicate with users via chat or messaging system. | \- GET /api/vendor/messages&lt;br&gt;- POST /api/vendor/messages |
| **Notifications** | Vendors can receive notifications regarding new bookings, reviews, and other important updates. | \- GET /api/vendor/notifications |
| **Customer Support** | Vendors can access customer support for help with bookings, payments, and other issues. | \- POST /api/support/tickets&lt;br&gt;- GET /api/support/tickets |

**Connection with users**

#### Booking Management API (shared with users)

1. **View Bookings**: GET /api/vendor/bookings
2. **Confirm/Decline Booking**: PUT /api/vendor/bookings/{booking_id}
3. **Delete Booking**: DELETE /api/vendor/bookings/{booking_id}

#### Review Management API (shared with users)

1. **View Reviews**: GET /api/vendor/reviews
2. **Respond to Review**: POST /api/vendor/reviews/{review_id}/responses

#### Financial Management API

1. **View Earnings**: GET /api/vendor/earnings
2. **Manage Withdrawals**: POST /api/vendor/withdrawals

#### Communication API (shared with users)

1. **View Messages**: GET /api/vendor/messages
2. **Send Message**: POST /api/vendor/messages

#### Notifications API (shared with users)

1. **View Notifications**: GET /api/vendor/notifications

#### Customer Support API (shared with users)

1. **Create Support Ticket**: POST /api/support/tickets
2. **View Support Tickets**: GET /api/support/tickets

#### Vendor Schema

| **Field Name** | **Data Type** | **Description** |
| --- | --- | --- |
| vendor_id | UUID | Unique identifier for the vendor |
| business_name | String | Name of the vendor's business |
| email | String | Contact email |
| phone_number | String | Contact phone number |
| address | String | Business address |
| service_categories | Array | Categories of services provided |
| portfolio | Array | List of media (photos, videos, etc.) |
| availability | JSON | Availability details |
| ratings | Float | Average rating |
| reviews | Array | List of reviews |
| earnings | Float | Total earnings |
| password_hash | String | Hashed password for authentication |
| created_at | Timestamp | Account creation date |
| updated_at | Timestamp | Last update date |

#### Booking Schema (shared with users)

| **Field Name** | **Data Type** | **Description** |
| --- | --- | --- |
| booking_id | UUID | Unique identifier for the booking |
| user_id | UUID | ID of the user who made the booking |
| vendor_id | UUID | ID of the vendor providing the service |
| service_id | UUID | ID of the booked service |
| booking_date | Date | Date of the booking |
| status | String | Booking status (confirmed, cancelled, etc.) |
| payment_status | String | Payment status (paid, pending, etc.) |
| created_at | Timestamp | Booking creation date |
| updated_at | Timestamp | Last update date |

#### Review Schema (shared with users)

| **Field Name** | **Data Type** | **Description** |
| --- | --- | --- |
| review_id | UUID | Unique identifier for the review |
| user_id | UUID | ID of the user who wrote the review |
| vendor_id | UUID | ID of the vendor being reviewed |
| service_id | UUID | ID of the reviewed service |
| rating | Float | Rating given by the user |
| comments | Array | List of comments on the review |
| created_at | Timestamp | Review creation date |
| updated_at | Timestamp | Last update date |

### Admin Functionalities and Corresponding APIs

| **Functionality** | **Description** | **Corresponding API Endpoints** |
| --- | --- | --- |
| **Admin Login** | Admin can log in to the website. | \- POST /api/admin/login |
| **View All Users** | Admin can view all registered users. | \- GET /api/admin/getusers |
| **View All Vendors** | Admin can view all registered vendors. | \- GET /api/admin/getvendors |
| **Add New Vendor** | Admin can add a new vendor to the platform. | \- POST /api/admin/addvendors |
| **Remove Vendor** | Admin can remove an existing vendor from the platform. | \- DELETE /api/admin/deletevendor/{vendor_id} |
| **Manage Vendor Services** | Admin can add, update, and delete vendor services. | \- POST /api/admin/vendors/{vendor_id}/services&lt;br&gt;- PUT /api/admin/vendors/{vendor_id}/services/{service_id}&lt;br&gt;- DELETE /api/admin/vendors/{vendor_id}/services/{service_id} |
| **View User Reviews for Vendors** | Admin can view all user reviews for any vendor. | \- GET /api/admin/vendors/{vendor_id}/reviews |
| **Manage Bookings** | Admin can view, update, and delete bookings. | \- GET /api/admin/bookings&lt;br&gt;- PUT /api/admin/bookings/{booking_id}&lt;br&gt;- DELETE /api/admin/bookings/{booking_id} |
| **View Earnings** | Admin can view the earnings of all vendors. | \- GET /api/admin/earnings |
| **View Performance Analytics** | Admin can view performance analytics for the platform. | \- GET /api/admin/analytics |
| **Manage Support Tickets** | Admin can view and respond to support tickets from users and vendors. | \- GET /api/admin/support/tickets&lt;br&gt;- POST /api/admin/support/tickets/{ticket_id}/responses |
| **Manage Notifications** | Admin can send notifications to users and vendors. | \- POST /api/admin/notifications |
| **Manage Messages** | Admin can view and manage messages between users and vendors. | \- GET /api/admin/messages&lt;br&gt;- DELETE /api/admin/messages/{message_id} |

### API Endpoints

#### Admin Authentication and Authorization API

1. **Login**: POST /api/v1/admin/login
2. **Logout**: POST /api/v1/admin/logout

#### User Management API

1. **View All Users**: GET /api/v1/admin/users
3. **Update User**: PUT /api/v1/admin/users/{user_id}
4. **Delete User**: DELETE /api/v1/admin/users/{user_id}

#### Vendor Management API

1. **View All Vendors**: GET /api/v1/admin/vendors/getVendors
2. **Add Vendor**: POST /api/v1/admin/vendors/addvendors
3. **Remove Vendor**: DELETE /api/v1/admin/vendors/deletevendor/{vendor_id}

#### Vendor Service Management API

1. **Add Vendor Service**: POST /api/v1/admin/vendors/{vendor_id}/addservice
2. **Update Vendor Service**: PUT /api/v1/admin/vendors/{service_id}/updateservice
3. **Delete Vendor Service**: DELETE /api/v1/admin/vendors/{service_id}/deleteservice

#### Review Management API

1. **View User Reviews for Vendors**: GET /api/v1/admin/reviews/{vendor_id}/getreviews
4. **Delete Review**: DELETE /api/v1/admin/reviews/{vendor_id}/deletereview/{review_id}

#### Booking Management API

1. **View All Bookings**: GET /api/v1/admin/booking/viewbookings
2. **Update Booking**: PUT /api/v1/admin/booking/{booking_id}/updatestatus
3. **Delete Booking**: DELETE /api/v1/admin/bookings/{booking_id}/deletebooking

#### Financial Management API

1. **View All Earnings**: GET /api/admin/earnings

#### Performance Analytics API

1. **View Performance Analytics**: GET /api/admin/analytics

#### Support Ticket Management API

1. **View Support Tickets**: GET /api/admin/support/tickets
2. **Respond to Support Tickets**: POST /api/admin/support/tickets/{ticket_id}/responses

#### Notification Management API

1. **Send Notifications**: POST /api/admin/notifications

#### Messaging Management API

1. **View All Messages**: GET /api/admin/messages
2. **Delete Message**: DELETE /api/admin/messages/{message_id}

### Database Schema for Admin-related Functionalities

#### Admin Schema

| **Field Name** | **Data Type** | **Description** |
| --- | --- | --- |
| admin_id | UUID | Unique identifier for the admin |
| username | String | Username for admin login |
| email | String | Contact email |
| password_hash | String | Hashed password for authentication |
| created_at | Timestamp | Account creation date |
| updated_at | Timestamp | Last update date |