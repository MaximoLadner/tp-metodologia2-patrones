import { Portfolio } from "../../models/types";
import { RiskStrategy } from "./RiskStrategy";

export class ModerateRiskStrategy implements RiskStrategy {
  calculateRisk(diversificationScore: number, volatilityScore: number, portfolio: Portfolio): "low" | "medium" | "high" {
    if (volatilityScore < 30 && diversificationScore > 70) {
      return "low";
    } else if (volatilityScore < 60 && diversificationScore > 40) {
      return "medium";
    }
    return "high";
  }
}
