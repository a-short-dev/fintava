# Fintava Swift SDK for iOS & macOS

🚧 **Coming Soon** - Native Swift SDK for iOS and macOS Fintava Pay integration.

## Overview

The Fintava Swift SDK will provide native iOS and macOS integration for Fintava Pay services, offering:

### Planned Features

- 📱 **Native iOS/macOS Integration**: Swift-first SDK for Apple platforms
- 💳 **Payment Processing**: Initialize and verify payments natively
- 👤 **Customer Management**: Create and manage customer profiles
- 💰 **Wallet Operations**: Wallet creation and transaction management
- 🏦 **Transfer Operations**: Bank transfers and internal transfers
- 💳 **Card Management**: Virtual and physical card operations
- 📄 **Bill Payments**: Utility bills and airtime/data purchases
- 🔔 **Webhook Handling**: Secure webhook verification
- 🎨 **SwiftUI Components**: Pre-built payment UI components
- 🍎 **Apple Pay Integration**: Seamless Apple Pay support
- 🔒 **Security**: Built-in security with Keychain integration

## Installation (When Available)

### Swift Package Manager

```swift
dependencies: [
    .package(url: "https://github.com/a-short-dev/fintava.git", from: "1.0.0")
]
```

### CocoaPods

```ruby
pod 'FintavaSwiftSDK', '~> 1.0'
```

### Carthage

```
github "a-short-dev/fintava" ~> 1.0
```

## Quick Start (Preview)

### SwiftUI

```swift
import SwiftUI
import FintavaSDK

struct ContentView: View {
    @StateObject private var fintava = FintavaClient(
        publicKey: "your-public-key",
        environment: .sandbox
    )
    
    var body: some View {
        VStack {
            Button("Pay with Fintava") {
                initializePayment()
            }
            .fintavaPaymentButton()
        }
    }
    
    private func initializePayment() {
        let paymentRequest = PaymentRequest(
            amount: 10000, // Amount in kobo
            email: "customer@example.com",
            reference: "unique-reference"
        )
        
        fintava.payment.initialize(
            request: paymentRequest,
            onSuccess: { response in
                print("Payment successful: \(response.reference)")
            },
            onError: { error in
                print("Payment failed: \(error.localizedDescription)")
            }
        )
    }
}
```

### UIKit

```swift
import UIKit
import FintavaSDK

class ViewController: UIViewController {
    private let fintava = FintavaClient(
        publicKey: "your-public-key",
        environment: .sandbox
    )
    
    @IBAction func payButtonTapped(_ sender: UIButton) {
        let paymentRequest = PaymentRequest(
            amount: 10000,
            email: "customer@example.com",
            reference: "unique-reference"
        )
        
        fintava.payment.initialize(
            request: paymentRequest,
            presentingViewController: self,
            onSuccess: { [weak self] response in
                DispatchQueue.main.async {
                    self?.showSuccessAlert(reference: response.reference)
                }
            },
            onError: { [weak self] error in
                DispatchQueue.main.async {
                    self?.showErrorAlert(error: error)
                }
            }
        )
    }
}
```

## Requirements

- **iOS**: 13.0+
- **macOS**: 10.15+
- **Xcode**: 12.0+
- **Swift**: 5.3+

## Development Status

This SDK is currently in planning phase. Development will begin after the JavaScript SDK reaches stable release.

### Roadmap

- [ ] Core SDK architecture
- [ ] Payment processing implementation
- [ ] Customer management
- [ ] Wallet operations
- [ ] Transfer functionality
- [ ] Card management
- [ ] Bill payment features
- [ ] SwiftUI components library
- [ ] UIKit components library
- [ ] Apple Pay integration
- [ ] Keychain security implementation
- [ ] Comprehensive testing
- [ ] Documentation and examples
- [ ] Beta release

## Platform Support

| Platform | Status | Notes |
|----------|--------|---------|
| iOS | Planned | Primary target platform |
| macOS | Planned | Desktop support |
| watchOS | Future | Potential future support |
| tvOS | Future | Potential future support |

## Contributing

Interested in contributing to the Swift SDK? Check out our [Contributing Guide](../../CONTRIBUTING.md) and [Development Guide](../../DEVELOPMENT.md).

## Support

For questions about the Swift SDK development:
- Open an issue in the [main repository](https://github.com/a-short-dev/fintava/issues)
- Join our community discussions

## License

MIT License - see the [LICENSE](../../LICENSE) file for details.