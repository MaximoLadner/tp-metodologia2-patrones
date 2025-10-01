import { OrderStrategy } from "./OrderStrategy";
import { Transaction } from "../../models/types";
import { storage } from "../../utils/storage";
import { TransactionFactory } from "../TransactionFactory";
import { config } from "../../config/config";

export class BuyOrderStrategy implements OrderStrategy {
  async execute(userId: string, symbol: string, quantity: number): Promise<Transaction> {
    const user = storage.getUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const asset = storage.getAssetBySymbol(symbol);
    if (!asset) throw new Error("Activo no encontrado");

    const executionPrice = asset.currentPrice;
    const grossAmount = quantity * executionPrice;

    const fees = this.calculateFees(grossAmount, "buy");
    const totalCost = grossAmount + fees;

    if (!user.canAfford(totalCost)) throw new Error("Fondos insuficientes");

    const transaction = TransactionFactory.create("buy", userId, symbol, quantity, executionPrice, fees);
    transaction.complete();

    user.deductBalance(totalCost);
    storage.updateUser(user);

    const portfolio = storage.getPortfolioByUserId(userId);
    if (portfolio) {
      portfolio.addHolding(symbol, quantity, executionPrice);
      portfolio.calculateTotals();
      storage.updatePortfolio(portfolio);
    }

    storage.addTransaction(transaction);

    return transaction;
  }

  private calculateFees(amount: number, type: "buy" | "sell"): number {
    const feePercentage = config.tradingFees.buyFeePercentage;
    const calculatedFee = amount * feePercentage;
    return Math.max(calculatedFee, config.tradingFees.minimumFee);
  }
}