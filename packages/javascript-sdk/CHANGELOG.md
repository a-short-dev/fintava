# fintava

## 2.0.0

### Major Changes

- b3cad7c: # Major Update: Enhanced Endpoints and Frontend Widgets

    ## WHAT Changed
    - Updated all API endpoints with improved response formats
    - Enhanced frontend widgets with new features and better UX
    - Restructured project as monorepo workspace for multi-platform SDKs
    - Improved TypeScript definitions and error handling

    ## WHY These Changes
    - Better developer experience with more intuitive API responses
    - Enhanced widget functionality for modern frontend applications
    - Preparation for multi-platform SDK support (Android, iOS)
    - Improved maintainability and code organization

    ## HOW to Update Your Code

    ### API Endpoints

    ```javascript
    // Before (if using custom endpoint calls)
    const response = await fetch("/api/old-format");

    // After - use the SDK methods instead
    import { Client } from "fintava";
    const client = new Client("your-public-key");
    const response = await client.initializePayment(paymentData);
    ```

    ### Widget Integration

    ```javascript
    // Widget initialization remains the same
    import { Client } from "fintava";
    const client = new Client("your-public-key");
    client.checkout(paymentData);
    ```

    ### Breaking Changes
    - Some internal API response formats have changed
    - Widget styling classes may have been updated
    - Ensure you're using the latest SDK methods rather than direct API calls

### Minor Changes

- a97f914: Better Error Handling
