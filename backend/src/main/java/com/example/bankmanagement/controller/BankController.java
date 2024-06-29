import com.example.bank.model.Account;
import com.example.bank.model.AccountHolder;
import com.example.bank.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bank")
public class BankController {

    @Autowired
    private BankService bankService;

    @PostMapping("/account")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        return ResponseEntity.ok(bankService.createAccount(account));
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable Long id) {
        return ResponseEntity.ok(bankService.getAccount(id));
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(bankService.getAllAccounts());
    }

    @PostMapping("/accountHolder")
    public ResponseEntity<AccountHolder> createAccountHolder(@RequestBody AccountHolder accountHolder) {
        return ResponseEntity.ok(bankService.createAccountHolder(accountHolder));
    }

    @GetMapping("/accountHolder/{id}")
    public ResponseEntity<AccountHolder> getAccountHolder(@PathVariable Long id) {
        return ResponseEntity.ok(bankService.getAccountHolder(id));
    }
}