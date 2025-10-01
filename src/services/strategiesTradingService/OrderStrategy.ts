import { Transaction } from "../../models/types";

export interface OrderStrategy {
  execute(userId: string, symbol: string, quantity: number): Promise<Transaction>;
}