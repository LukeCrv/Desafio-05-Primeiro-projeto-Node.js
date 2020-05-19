import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface Data {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = { income: 0, outcome: 0, total: 0 };

    this.transactions.forEach(element => {
      if (element.type === 'income') {
        balance.income += element.value;
        balance.total += element.value;
      }
      if (element.type === 'outcome') {
        balance.outcome += element.value;
        balance.total -= element.value;
      }
    });

    return balance;
  }

  public create({ title, value, type }: Data): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
