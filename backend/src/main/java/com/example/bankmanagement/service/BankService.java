import com.example.bank.model.Account;
import com.example.bank.model.AccountHolder;
import com.example.bank.repository.AccountHolderRepository;
import com.example.bank.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountHolderRepository accountHolderRepository;

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account getAccount(Long id) {
        return accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public AccountHolder createAccountHolder(AccountHolder accountHolder) {
        return accountHolderRepository.save(accountHolder);
    }

    public AccountHolder getAccountHolder(Long id) {
        return accountHolderRepository.findById(id).orElseThrow(() -> new RuntimeException("Account holder not found"));
    }
}