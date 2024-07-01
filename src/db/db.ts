import initSqlJs from "sql.js";
import { Transaction } from "../types";

let db: any;

export const initializeDatabase = async () => {
  const SQL = await initSqlJs({
    locateFile: (file) => `public/${file}`,
  });

  db = new SQL.Database();
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      TransactionId TEXT PRIMARY KEY,
      Status TEXT,
      Type TEXT,
      ClientName TEXT,
      Amount TEXT
    );
  `);

  // Завантажити дані з localStorage
  const storedData = localStorage.getItem("transactions");
  if (storedData) {
    const transactions: Transaction[] = JSON.parse(storedData);
    transactions.forEach((transaction) => {
      insertTransaction(transaction);
    });
  }
};

export const insertTransaction = (transaction: Transaction) => {
  if (db) {
    const stmt = db.prepare(`
      INSERT INTO transactions (TransactionId, Status, Type, ClientName, Amount)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run([
      transaction.TransactionId,
      transaction.Status,
      transaction.Type,
      transaction.ClientName,
      transaction.Amount,
    ]);
    stmt.free();

    // Оновити дані в localStorage
    const transactions = fetchTransactions();
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
};

export const fetchTransactions = (): Transaction[] => {
  if (db) {
    const stmt = db.prepare("SELECT * FROM transactions");
    const transactions: Transaction[] = [];
    while (stmt.step()) {
      const row = stmt.getAsObject() as Transaction;
      transactions.push(row);
    }
    stmt.free();
    return transactions;
  }
  return [];
};

export const deleteTransaction = (transactionId: string) => {
  if (db) {
    const stmt = db.prepare("DELETE FROM transactions WHERE TransactionId = ?");
    stmt.run([transactionId]);
    stmt.free();

    // Оновити дані в localStorage
    const transactions = fetchTransactions();
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
};

export const updateTransaction = (transaction: Transaction) => {
  if (db) {
    const stmt = db.prepare(`
      UPDATE transactions
      SET Status = ?, Type = ?, ClientName = ?, Amount = ?
      WHERE TransactionId = ?
    `);
    stmt.run([
      transaction.Status,
      transaction.Type,
      transaction.ClientName,
      transaction.Amount,
      transaction.TransactionId,
    ]);
    stmt.free();

    // Оновити дані в localStorage
    const transactions = fetchTransactions();
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
};
