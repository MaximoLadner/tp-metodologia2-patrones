import { Portfolio } from "../../models/types";
import { RiskStrategy } from "./RiskStrategy";

export class ConservativeRiskStrategy implements RiskStrategy {
  calculateRisk(diversificationScore: number, volatilityScore: number, portfolio: Portfolio): "low" | "medium" | "high" {
    if (volatilityScore < 25 && diversificationScore > 75) {
      return "low";
    } else if (volatilityScore < 50) {
      return "medium";
    }
    return "high";
  }
}