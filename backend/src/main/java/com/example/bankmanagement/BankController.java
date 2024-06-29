import java.util.*;
import java.math.BigDecimal;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

class AccountHolder {
    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private List<Account> accounts;

    public AccountHolder(String id, String name, String email, String phoneNumber) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.accounts = new ArrayList<>();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void addAccount(Account account) {
        accounts.add(account);
    }
}

class Account {
    private String accountNumber;
    private String type; // e.g., "Savings", "Checking"
    private BigDecimal balance;

    public Account(String accountNumber, String type, BigDecimal balance) {
        this.accountNumber = accountNumber;
        this.type = type;
        this.balance = balance;
    }

    // Getters and setters
    public String getAccountNumber() {
        return accountNumber;
    }

    public String getType() {
        return type;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}

@Service
class BankService {
    private Map<String, AccountHolder> accountHolders;

    public BankService() {
        accountHolders = new HashMap<>();
        initializeSampleData();
    }

    private void initializeSampleData() {
        AccountHolder ah1 = new AccountHolder("1", "John Doe", "john@example.com", "123-456-7890");
        ah1.addAccount(new Account("SAV001", "Savings", new BigDecimal("5000.00")));
        ah1.addAccount(new Account("CHK001", "Checking", new BigDecimal("2500.00")));

        AccountHolder ah2 = new AccountHolder("2", "Jane Smith", "jane@example.com", "098-765-4321");
        ah2.addAccount(new Account("SAV002", "Savings", new BigDecimal("10000.00")));

        accountHolders.put(ah1.getId(), ah1);
        accountHolders.put(ah2.getId(), ah2);
    }

    public void addAccountHolder(AccountHolder accountHolder) {
        accountHolders.put(accountHolder.getId(), accountHolder);
    }

    public AccountHolder getAccountHolder(String id) {
        return accountHolders.get(id);
    }

    public List<AccountHolder> getAllAccountHolders() {
        return new ArrayList<>(accountHolders.values());
    }

    public void addAccount(String accountHolderId, Account account) {
        AccountHolder ah = accountHolders.get(accountHolderId);
        if (ah != null) {
            ah.addAccount(account);
        }
    }

    public BigDecimal getAccountBalance(String accountHolderId, String accountNumber) {
        AccountHolder ah = accountHolders.get(accountHolderId);
        if (ah != null) {
            for (Account account : ah.getAccounts()) {
                if (account.getAccountNumber().equals(accountNumber)) {
                    return account.getBalance();
                }
            }
        }
        return null;
    }

    public void deposit(String accountHolderId, String accountNumber, BigDecimal amount) {
        AccountHolder ah = accountHolders.get(accountHolderId);
        if (ah != null) {
            for (Account account : ah.getAccounts()) {
                if (account.getAccountNumber().equals(accountNumber)) {
                    account.setBalance(account.getBalance().add(amount));
                    return;
                }
            }
        }
    }

    public boolean withdraw(String accountHolderId, String accountNumber, BigDecimal amount) {
        AccountHolder ah = accountHolders.get(accountHolderId);
        if (ah != null) {
            for (Account account : ah.getAccounts()) {
                if (account.getAccountNumber().equals(accountNumber)) {
                    if (account.getBalance().compareTo(amount) >= 0) {
                        account.setBalance(account.getBalance().subtract(amount));
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

@RestController
@RequestMapping("/api/bank")
public class BankController {
    private final BankService bankService;

    public BankController(BankService bankService) {
        this.bankService = bankService;
    }

    @GetMapping("/account-holders")
    public List<AccountHolder> getAllAccountHolders() {
        return bankService.getAllAccountHolders();
    }

    @GetMapping("/account-holders/{id}")
    public AccountHolder getAccountHolder(@PathVariable String id) {
        return bankService.getAccountHolder(id);
    }

    @PostMapping("/account-holders")
    public void addAccountHolder(@RequestBody AccountHolder accountHolder) {
        bankService.addAccountHolder(accountHolder);
    }

    @PostMapping("/account-holders/{id}/accounts")
    public void addAccount(@PathVariable String id, @RequestBody Account account) {
        bankService.addAccount(id, account);
    }

    @GetMapping("/account-holders/{id}/accounts/{accountNumber}/balance")
    public BigDecimal getAccountBalance(@PathVariable String id, @PathVariable String accountNumber) {
        return bankService.getAccountBalance(id, accountNumber);
    }

    @PostMapping("/account-holders/{id}/accounts/{accountNumber}/deposit")
    public void deposit(@PathVariable String id, @PathVariable String accountNumber, @RequestParam BigDecimal amount) {
        bankService.deposit(id, accountNumber, amount);
    }

    @PostMapping("/account-holders/{id}/accounts/{accountNumber}/withdraw")
    public boolean withdraw(@PathVariable String id, @PathVariable String accountNumber,
            @RequestParam BigDecimal amount) {
        return bankService.withdraw(id, accountNumber, amount);
    }
}