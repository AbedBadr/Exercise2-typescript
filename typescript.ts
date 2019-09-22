interface IBankAccount {
    accountNumber: Number;
    balance: Number;
    firstName: string;
    lastName: string;
    rateOfInterest: number;
    ssn: number;

    addInterest(): void;
    addInterest(fee: number): void;
    deposit(amount: number): void;
    getBalance(): number;
    withdraw(amount: number): void;
}
    //
    abstract class BankAccount implements IBankAccount{
    accountNumber: number;
    balance: number;
    firstName: string;
    lastName: string;
    rateOfInterest: number;
    ssn: number;

    static nextAccountNumber: number = 0;

    constructor(ssn: number, firstName: string, lastName: string, rateOfInterest: number){
        this.ssn = ssn;
        this.firstName = firstName;
        this. lastName = lastName;
        this.rateOfInterest = rateOfInterest;
        this.balance = 0;
        this.accountNumber = BankAccount.nextAccountNumber;
        BankAccount.nextAccountNumber++;
    }
    //
    abstract addInterest(): void;
    abstract addInterest(fee: number): void;

    deposit(amount: number): void{
        this.balance += amount;
    }

    getBalance(): number{
        return this.balance;
    }

    withdraw(amount: number): void{
        this.balance -= amount;
    }
}

class OverdraftAccount extends BankAccount{
    overdraftInterest: number;
    overdraftLimit: number;

    constructor(ssn: number, firstName: string, lastName: string, rateOfInterest: number, overdraftInterest: number, overdraftLimit: number){
        super(ssn, firstName, lastName, rateOfInterest);

        this.overdraftInterest = overdraftInterest;
        this.overdraftLimit = overdraftLimit;
    }
    //
    addInterest(fee?: number): void{
        if (this.balance > 0) {
            this.balance += this.balance * this.rateOfInterest / 100;
        } else {
            this.balance -= this.balance * this.overdraftInterest / 100;
        }
        if (fee != null) this.balance -= fee;
    }

    checkLimit(): Boolean{
        if (this.overdraftInterest >= this.overdraftLimit)
            return true;
        else
            return false;
    }
}

class LoanAccount extends BankAccount{
    principal: number;

    constructor(ssn: number, firstName: string, lastName: string, rateOfInterest: number, principal: number){
        super(ssn, firstName, lastName, rateOfInterest);

        this.principal = principal;
    }
    //
    addInterest(fee?: number): void{
        this.balance -= this.balance * this.rateOfInterest / 100;
        if (fee != null) {
            this.balance -= fee;
        }
    }
}
