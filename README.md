# Caffeina Haven - A Restaurant Management Website ☕

![Website's hero section](./src/assets/caffeina-hero-section.png)

## Server Side Repo - [Server Side Repository](https://github.com/nahidul-fahim/caffeina-haven-server)
## Live site - [Website's live link](https://caffeina-haven.web.app)

## Admin login
* email: admin@admin.com
* password: Asdf$$

## Coupons
* FIRSTCOUPON2024
* SECONDCOUPON

# Technologies used:
 1. HTML
 2. CSS
 3. Tailwind CSS
 4. Daisy UI
 5. JavaScript
 6. React.js
 7. React router
 8. Tanstack query
 9. Axios
 10. Tanstack table
 11. Firebase (For authentication + hosting)
 12. JWT (JSON Web Token)
 13. Payment Integration using Stripe
 14. Framer motion for animation

 # About the project

## Overview:
A user can see all the menus available, can order food online, apply valid token for discount, make payment using stripe, a community page where all users can post their stories and memories, interact with other users' stories and can reserve a table.
 **The website has:**
 * Header
 * Footer
 * Homepage
 * Menu page
 * About page
 * Contact page
 * Community page
 * Reservation page
 * Cart page
 * Checkout page
 * Admin dashboard
 * 404 page 
 * Beautiful animations using 'Framer motion'

 # Features

 ## Header
 * Sign in / Sign out options
 * User information if signed in
 * Cart button in signed in user is a normal user
 * Dashboard button if signed in user is an 'Admin'.

## Homepage
 * A slider
 * 6 latest menu items data coming from database
 * Stories and memories that users have posted dynamically coming from database

## Our Menu
 * Showing all available food items
 * Filter items using food category
 * Filter items using food origin
 * User can order food by mentioning the food item quantity

## Reservation/Find A Table
 * User can fill up a form and can make an online reservation here

## Story Hub
* Admins and users can share their stories and memories with or without photo
* Admin can pin any of the posted stories
* A user can react on the of other users's post
* If Admin block a user, he/she cannot post any stories here

## Cart page
* A user can view all the ordered food items here
* A user can delete any item from cart if he/she wants
* User can use coupon here and the specified discount will be applied to the total price

## Checkout page
* A user can make the payment from here using stripe
* On a successful payment, a user will be redirected to a success page
* Here all the cart items will be removed, for which the user has made the payment.

## Admin Dashboard

### Statistics
* Admin can view total users, total reservations and total memories count
* If an admin enters the dashboard, he/she will be redirected to statistics route

### Add Item
* Admin can add new food items from here

### All Item
* Admin can view all the added items here
* Can delete any item

### All Users
* Admin can view all the registered users here
* Admin can block any user

### All Reservation
* Admin can view all the reservations by the users

### Coupons
* Admin can view all the available coupons
* Admin can add new coupon
* Can delete any previous coupon


# == Thank you for your visit ==