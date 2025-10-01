import { RecommendationStrategy } from "./RecommendationStrategy";

export class RiskLevelStrategy implements RecommendationStrategy {
  generateRecommendations(
    diversificationScore: number,
    volatilityScore: number,
    riskLevel: string
  ): string[] {
    if (riskLevel === "high") {
      return [
        "Nivel de riesgo alto detectado, revisa tu estrategia de inversión",
      ];
    }
    return [];
  }
}
