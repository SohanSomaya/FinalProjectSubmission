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







