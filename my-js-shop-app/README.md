React Native Shopping App

This project is a feature-rich e-commerce mobile application built using React Native. It simulates a shopping experience with item listings, filtering, cart management, order history, and currency conversion features. It is designed to showcase front-end mobile development, local data persistence, user-specific behavior, and integration with third-party APIs.

 Features

- User Account

Username-based session (non-authenticated demo user logic)

User-specific preferences like currency and order history

- Shopping & Cart

View available stock of items with automatic out-of-stock detection

Add to cart and manage item quantities

Checkout functionality with order recording and stock decrement

Supports dynamic stock updates

- Currency Conversion

Fetches live conversion rates via ExchangeRate API

Supported currencies: USD, EUR, GBP, INR, JPY, CAD, AUD

- Order History

User-specific order storage and listing

View past purchases and timestamps

Delete or download history (web only)

- Filtering & Search

Filter by name, tags, min price, and max price


Tech Stack

-React Native (Expo)

-Context API for state management (Cart, User, Currency, Items, Orders)

-AsyncStorage for local data persistence

-ExchangeRate API for live currency conversion

-React Navigation for screen transitions

-react-native-picker-select for dropdown selections


![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/loginscreen.png)


The above image is the default login screen


![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/joenoacc.png)

Joe tries logging in, but doesnt have an account


![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/joeregacc.png)

Register account


![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/joehomescreen.png)

Sees home screen

![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/joeadditemstocart.png)


Adds items to cart



![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/joefiltering1.png)


Filters items (1)

![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/joefiltering2.png)


Filters items (2)


![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/joecart.png)

Views items in cart and checks out


![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/joeprofile.png)


Joe profile screen. Here, Joe can check his order history and can choose to either eport it, or delete it.


![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/joe%20choose%20currency.png)

Available currencies


![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/joecurrupdates.png)


Joe changes currency (persists)


![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/sohanhome.png)

Sohan home screen.( Items Joe bought are missing from database)


![imagealt](https://github.com/SohanSomaya/FinalProjectSubmission/blob/20cfee7f0e64cb5a04d5e62bcce20b446a6cc30a/my-js-shop-app/sohanprofile.png)


Sohan profile screen (unique currency choice persists)


