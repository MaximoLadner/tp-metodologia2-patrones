import { Portfolio } from "../../models/types";

export interface RiskStrategy {
  calculateRisk(diversificationScore: number, volatilityScore: number, portfolio: Portfolio): "low" | "medium" | "high";
}