# VoltFlow EV Aggregator - Demo App

This is a React-based EV Charging Aggregator client-side demo. It features a unified map for discovery, simulated charging sessions, and wallet-based payment flows.

## 🚀 Quick Start

1.  **Clone/Extract** the project files.
2.  **API Key Setup**:
    *   Get a Google Maps API Key from the [Google Cloud Console](https://console.cloud.google.com/).
    *   Enable **Maps JavaScript API**.
    *   In `index.html`, replace `PASTE_YOUR_KEY_HERE` with your key.
3.  **Run Development Server**:
    ```bash
    npm install
    npm run dev
    ```

## 🛠 Tech Stack
*   **React** (UI Logic)
*   **Tailwind CSS** (Styling)
*   **Google Maps SDK** (Geospatial Discovery)
*   **React Router** (Navigation)

## 📱 Features Demonstrated
*   **Discovery**: Real-time status markers (Green: Available, Yellow: Busy, Grey: Offline).
*   **Fallback Mode**: If the API key is invalid, the app automatically switches to a beautiful "List Discovery Mode" so the demo never fails.
*   **Unified Wallet**: Simulated ₹450 balance across all operators.
*   **Live Sessions**: Simulated energy delivery and cost calculation with animations.

## 🔑 API Restriction Note (For Development)
To ensure the map works in **AI Studio**, on **Localhost**, and on **Mobile**:
1. Go to Google Cloud Console > Credentials.
2. Edit your API Key.
3. Set **Application Restrictions** to `None` while testing.
4. Set **API Restrictions** to `Maps JavaScript API` only.
5. **Delete the key** once your demo is finished.
