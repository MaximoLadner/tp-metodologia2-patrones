import { OrderStrategy } from "./OrderStrategy";
import { Transaction } from "../../models/types";
import { storage } from "../../utils/storage";
import { TransactionFactory } from "../TransactionFactory";
import { config } from "../../config/config";

export class SellOrderStrategy implements OrderStrategy {
  async execute(userId: string, symbol: string, quantity: number): Promise<Transaction> {
    const user = storage.getUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const asset = storage.getAssetBySymbol(symbol);
    if (!asset) throw new Error("Activo no encontrado");

    const portfolio = storage.getPortfolioByUserId(userId);
    if (!portfolio) throw new Error("Portafolio no encontrado");

    const holding = portfolio.holdings.find(h => h.symbol === symbol);
    if (!holding || holding.quantity < quantity) {
      throw new Error("No tienes suficientes activos para vender");
    }

    const executionPrice = asset.currentPrice;
    const grossAmount = quantity * executionPrice;
    const fees = this.calculateFees(grossAmount, "sell");
    const netAmount = grossAmount - fees;

    const transaction = TransactionFactory.create("sell", userId, symbol, quantity, executionPrice, fees);
    transaction.complete();

    user.addBalance(netAmount);
    storage.updateUser(user);

    portfolio.removeHolding(symbol, quantity);
    portfolio.calculateTotals();
    storage.updatePortfolio(portfolio);

    storage.addTransaction(transaction);

    return transaction;
  }

  private calculateFees(amount: number, type: "buy" | "sell"): number {
    const feePercentage = config.tradingFees.sellFeePercentage;
    const calculatedFee = amount * feePercentage;
    return Math.max(calculatedFee, config.tradingFees.minimumFee);
  }
}