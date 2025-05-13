# Justlife React Native Case Study

A scalable React Native application built with a feature-based architecture and strict TypeScript, using HearthStone API integration (https://omgvamp-hearthstone-v1.p.rapidapi.com).

This project was built as if it would be released as a real product, with a focus on performance, stability, and scalability.

## 🎥 Demo Video

[![Watch the demo](https://img.youtube.com/vi/PaIRIBqB_t4/hqdefault.jpg)](https://www.youtube.com/watch?v=PaIRIBqB_t4)

---

## 🧠 Key Decisions & Architectural Notes

- **Handling the Hearthstone API Data**  
  The Hearthstone API can be very slow, so a high timeout value (`320000ms`) is set to give enough time for the response.

  The API does not support pagination. When getting all cards using `/cards?collectible=1`, it returns a very large response (around 4MB). However, to get the list of card types or to search for a card, the full data is still needed.

  Because of this, the app makes one request at the beginning to get all the cards and saves (caches) them locally:

  - The data is downloaded once and stored in memory.
  - Card types are taken from this cached data.
  - When the user searches or selects a card type, the app filters the cards locally without sending another request.
  - UI-level pagination is applied using `FlatList` to render the cards in pages (default 10 items). More cards are loaded as the user scrolls, which helps improve performance on large datasets.

  This method improves speed and avoids making the same heavy API call multiple times.

- **Axios over Fetch**  
  Axios is preferred over Fetch due to several practical advantages that improve reliability and developer experience:

  - Built-in timeout support for slow or unresponsive network conditions (e.g., `timeout: 10000ms`).
  - The Hearthstone API can be very slow, so a high timeout value (`320000ms` = 5 minutes 20 seconds) is set to give enough time for the response. In testing, the response time varied between 30 seconds and 5 minutes. While this is longer than usual (standard timeouts are 10–30 seconds), it is necessary because the API sends a large dataset (~4MB) in a single response and does not support pagination.
  - Request and response interceptors for logging, token injection, and error handling.
  - Automatic JSON parsing via `response.data`, no need for manual `response.json()` calls.
  - Structured error objects with full context (`response`, `request`, `config`, and `message`).
  - Global configuration with `axios.create()` for base URL, headers, and shared settings.

- **Caching Strategy**  
  The full card data is fetched once and stored in memory to avoid downloading 4MB of data multiple times. The cache is valid for 48 hours, which provides a good balance between performance and data freshness.

  - The API data does not change frequently.
  - The freshness of the card data is not critical for the app's functionality.

  This approach improves speed and reduces network usage without affecting the user experience.

- **MMKV over AsyncStorage**  
  The app uses `react-native-mmkv` instead of `AsyncStorage` to cache large API responses like all cards and card types.

  In this case, the `/cards?collectible=1` endpoint returns a single JSON response of around **4MB**, which is considerably large for typical local storage.

  While AsyncStorage is a common default, it has performance and reliability limitations for this use case:

  - AsyncStorage is JavaScript-based and all read/write operations go through disk access.
  - This leads to slower performance, especially:
    - on app startup,
    - when working with large datasets,
    - or when accessing cache during scrolling.
  - It also has practical size limits. Although not strictly defined, writing large objects (e.g., >1MB) may lead to inconsistencies or crashes depending on the platform.

- **Retry Mechanism**  
  A custom retry logic was implemented to gracefully handle intermittent failures common with free APIs:

  - Configurable retry count (3 attempts) and delay (1000ms).
  - Exponential backoff strategy.
  - Only retries on server errors (5xx status codes).

- **Request Cancellation**  
  AbortController implementation in all data fetching hooks to prevent memory leaks and unnecessary network requests:

  - Automatically cancels in-flight requests when components unmount.
  - Prevents state updates on unmounted components.
  - Properly handles aborted request errors.

- **Image Optimization**  
  `react-native-fast-image` is used instead of the standard `Image` component to benefit from:

  - Better caching and loading performance.
  - Configurable priority and cache control.
  - Fallback image support.
  - Loading and error state handling.
  - Fallback image used from [Vecteezy.com](https://www.vecteezy.com) under free usage license.

- **Centralized Logging System**  
  A dedicated and environment-aware logger utility was implemented to:

  - Standardize error and event tracking across the app.
  - Support configurable log levels (`debug`, `info`, `warn`, `error`).
  - Enable logging only in development to keep production clean.
  - Allow easy future integration with Sentry or similar platforms without changing application code.

- **Type Management**

  - Small, one-time-use types are defined inline for simplicity.
  - Shared or reusable types are modularized in separate files.
  - Strongly typed API responses for better development experience.

- **Custom Hooks**  
  The app uses two custom React hooks to simplify logic and improve reusability:

  - `useAllCards`: Handles fetching and caching all card data, including loading and error states.
  - `useDebounce`: Adds a short delay to the search input before applying filters, even though the search runs locally. This improves performance and avoids filtering on every keystroke.

  These hooks help keep the components clean and separate the UI from business logic. Even though no API request is made during search, using `useDebounce` improves responsiveness and prepares the app for future scalability.

- **Error Handling**  
  Errors are handled at the section level to ensure the UI gracefully degrades when something fails:

  - Dedicated error components for consistent UI.
  - Detailed error messages with status codes.
  - Graceful degradation strategies.

- **Network Testing**  
  The app was tested under slow network conditions using Network Link Conditioner, and optimizations were applied accordingly.

- **Internet Connectivity Monitoring**  
  A connectivity monitoring system was implemented using React Context:

  - NetInfo library integration for real-time connection status.
  - Context API to provide connection state throughout the app.
  - User feedback through non-intrusive banner notifications.

---

## 🛠️ To Be Done / Future Enhancements

To keep the scope lean and avoid overengineering, the following features are postponed for later iterations:

- API pagination (once supported by the endpoint).
- Implement a more efficient querying layer using a library like React Query, Zustand, or RTK Query for better request control and cache handling.
- Global error logger (centralized handler, e.g., Sentry integration).
- Internationalization (i18n) support.
- Improved responsiveness for multiple screen sizes:
  - Tablet support with optimized layouts.
  - Screen orientation support (portrait/landscape).
  - Better responsive design for various device dimensions.
- Environment-based configuration setup.
- Skeleton loading for progressive UI rendering.
- Lazy loading using FlashList.  
  🔗 [FlashList Documentation](https://shopify.github.io/flash-list/)
- In-app error boundaries for safer crash handling.
- Centralized toast/alert system for consistent user feedback.
- CI/CD pipeline setup for automated testing and build verification.

---

## 🧪 Testing

Important logic and data-related layers of the application are covered with unit tests.  
Smaller UI components were intentionally skipped to keep the focus on core functionality and performance-critical logic.

Tests include:

- API service logic (`cardService`)
- Local cache system (`cacheService`)
- Custom hook (`useAllCards`)
- Key container components (`Cards`, `CardTypes`, `CardSearchResults`)
- Application bootstrap (`App.tsx`)

### 🧾 Coverage Summary

    Statements   : 93.68%
    Branches     : 80.34%
    Functions    : 100%
    Lines        : 98.39%
    Test Suites  : 8 passed (100%)

Coverage was collected using Jest, with a focus on testing the main logic instead of all UI details.

---

## 🧩 Credits & Source Acknowledgement

Some of the logic, patterns, and UI behaviors in this project are simplified and adapted from real-world experiences, company work, and open resources I’ve learned from and applied in production or personal projects:

- Adapted from improvements I developed at **Leo AR** (previous company):

  - Network connectivity monitoring using `NetInfo` with a dismissable banner.
  - Retry mechanism with exponential backoff and server error filtering (5xx only), including AbortController support.
  - Centralized, environment-aware logging utility with log level filtering.

- Adapted from my in-progress personal project **JudgeMee** (React Native party game app):

  - Optimized image component built with `react-native-fast-image`, supporting placeholder, fallback image, and loading/error states.

- The **connection alert banner UI behavior** was inspired by the implementation in the current **Justlife** mobile app.

- Theme structure inspired by [Ignite CLI by Infinite Red](https://docs.infinite.red/ignite-cli/).

- Sources I referred to while making technical decisions:
  - AsyncStorage vs MMKV comparison: https://medium.com/@furkankayadev/react-native-mmkv-vs-asyncstorage-react-native-uygulamanızda-en-i̇yi-anahtar-değer-depolama-çözümü-3f928a01f818 , https://blog.logrocket.com/using-react-native-mmkv-improve-app-performance/#:~:text=Faster%20performance
  - Axios vs Fetch comparison: https://blog.logrocket.com/axios-vs-fetch-2025/ ,
    https://codeparrot.ai/blogs/axios-vs-fetch-which-one-should-you-choose-for-your-project

---

## 📁 Project Structure

```
src/
├── assets/       # Static assets like images and fonts
├── components/   # Reusable UI components
├── config/       # Application configuration files
├── constants/    # Application constants including API endpoints
├── context/      # React Context providers for state management
├── hooks/        # Custom React hooks
├── navigation/   # React Navigation setup
├── screens/      # Screen components
├── services/     # API services and business logic
├── theme/        # Theme primitives (colors, spacing, etc.)
├── types/        # TypeScript type definitions
└── utils/        # Utility functions including retry logic
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- Yarn
- CocoaPods (for iOS)
- Android Studio / Xcode

### Installation

```sh
# Install dependencies
yarn install

# For iOS, install CocoaPods dependencies
bundle install
bundle exec pod install
```

### Running the App

```sh
# Start Metro bundler
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios
```
