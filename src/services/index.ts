import { WalletService, VirtualWalletService } from "./wallet.service";
import { CustomersService } from "./customer.service";
import { BankService } from "./bank.service";
import { TransactionService } from "./transactions.service";

export {
    BankService as Bank,
    CustomersService as Customers,
    TransactionService as Transactions,
    WalletService as Wallet,
    VirtualWalletService as VirtualWallet,
};
