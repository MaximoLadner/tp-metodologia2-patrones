import { Portfolio } from "../../models/types";
import { RiskStrategy } from "./RiskStrategy";

export class AggressiveRiskStrategy implements RiskStrategy {
  calculateRisk(diversificationScore: number, volatilityScore: number, portfolio: Portfolio): "low" | "medium" | "high" {
    if (volatilityScore < 40) {
      return "low";
    } else if (volatilityScore < 70) {
      return "medium";
    }
    return "high";
  }
}
