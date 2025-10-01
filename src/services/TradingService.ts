import { Transaction } from "../models/types";
import { BuyOrderStrategy } from "./strategiesTradingService/BuyOrderStrategy";
import { SellOrderStrategy } from "./strategiesTradingService/SellOrderStrategy";
import { OrderStrategy } from "./strategiesTradingService/OrderStrategy";
import { storage } from "../utils/storage";

export class TradingService {
  private strategies: { [key: string]: OrderStrategy } = {
    buy: new BuyOrderStrategy(),
    sell: new SellOrderStrategy(),
  };

  async executeOrder(type: "buy" | "sell", userId: string, symbol: string, quantity: number): Promise<Transaction> {
    const strategy = this.strategies[type];
    if (!strategy) throw new Error("Tipo de orden no soportado");
    return await strategy.execute(userId, symbol, quantity);
  }

  getTransactionHistory(userId: string): Transaction[] {
    return storage.getTransactionsByUserId(userId);
  }
}