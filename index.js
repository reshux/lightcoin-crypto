class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let total = 0;
    for (let transaction of this.transactions) {
      total += transaction.value;
    }
    return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return this.amount - 2 * this.amount;
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

// DRIVER CODE (yes, keep everything in one file for now... b/c cog load)
const myAccount = new Account("Duru");

const t1 = new Withdrawal(50.25, myAccount);
console.log("Transaction successful:", t1.commit());
console.log(
  `${myAccount.username} has an account balance of: ${myAccount.balance}`
);
console.log("-------");

const t2 = new Deposit(120, myAccount);
console.log("Transaction successful:", t2.commit());
console.log(
  `${myAccount.username} has an account balance of: ${myAccount.balance}`
);
console.log("-------");

const t3 = new Withdrawal(9.99, myAccount);
console.log("Transaction successful:", t3.commit());
console.log(
  `${myAccount.username} has an account balance of: ${myAccount.balance}`
);
