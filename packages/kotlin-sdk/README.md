# Fintava Kotlin SDK for Android

🚧 **Coming Soon** - Android SDK for Fintava Pay integration.

## Overview

The Fintava Kotlin SDK will provide native Android integration for Fintava Pay services, offering:

### Planned Features

- 📱 **Native Android Integration**: Kotlin-first SDK for Android apps
- 💳 **Payment Processing**: Initialize and verify payments natively
- 👤 **Customer Management**: Create and manage customer profiles
- 💰 **Wallet Operations**: Wallet creation and transaction management
- 🏦 **Transfer Operations**: Bank transfers and internal transfers
- 💳 **Card Management**: Virtual and physical card operations
- 📄 **Bill Payments**: Utility bills and airtime/data purchases
- 🔔 **Webhook Handling**: Secure webhook verification
- 🎨 **UI Components**: Pre-built payment UI components
- 🔒 **Security**: Built-in security best practices

## Installation (When Available)

### Gradle (Kotlin DSL)

```kotlin
dependencies {
    implementation("com.fintava:kotlin-sdk:1.0.0")
}
```

### Gradle (Groovy)

```groovy
dependencies {
    implementation 'com.fintava:kotlin-sdk:1.0.0'
}
```

## Quick Start (Preview)

```kotlin
import com.fintava.sdk.FintavaClient
import com.fintava.sdk.models.PaymentRequest

class MainActivity : AppCompatActivity() {
    private lateinit var fintava: FintavaClient
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize Fintava client
        fintava = FintavaClient.Builder()
            .publicKey("your-public-key")
            .environment(Environment.SANDBOX)
            .build()
        
        // Initialize payment
        val paymentRequest = PaymentRequest.Builder()
            .amount(10000) // Amount in kobo
            .email("customer@example.com")
            .reference("unique-reference")
            .build()
            
        fintava.payment.initialize(
            request = paymentRequest,
            onSuccess = { response ->
                // Handle successful payment
                Log.d("Payment", "Success: ${response.reference}")
            },
            onError = { error ->
                // Handle payment error
                Log.e("Payment", "Error: ${error.message}")
            }
        )
    }
}
```

## Requirements

- **Android API Level**: 21+ (Android 5.0)
- **Kotlin**: 1.8+
- **Gradle**: 7.0+
- **Android Gradle Plugin**: 7.0+

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
- [ ] UI components library
- [ ] Comprehensive testing
- [ ] Documentation and examples
- [ ] Beta release

## Contributing

Interested in contributing to the Kotlin SDK? Check out our [Contributing Guide](../../CONTRIBUTING.md) and [Development Guide](../../DEVELOPMENT.md).

## Support

For questions about the Kotlin SDK development:
- Open an issue in the [main repository](https://github.com/a-short-dev/fintava/issues)
- Join our community discussions

## License

MIT License - see the [LICENSE](../../LICENSE) file for details.