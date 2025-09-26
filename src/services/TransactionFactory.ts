import { Transaction } from "../models/types";

export class TransactionFactory {
  static create(
    type: "buy" | "sell",
    userId: string,
    symbol: string,
    quantity: number,
    price: number,
    fees: number
  ): Transaction {
    const transactionId = "txn_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    return new Transaction(transactionId, userId, type, symbol, quantity, price, fees);
  }
}