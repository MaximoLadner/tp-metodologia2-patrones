import { RecommendationStrategy } from "./RecommendationStrategy";

export class VolatilityStrategy implements RecommendationStrategy {
  generateRecommendations(
    diversificationScore: number,
    volatilityScore: number,
    riskLevel: string
  ): string[] {
    if (volatilityScore > 70) {
      return [
        "Tu portafolio tiene alta volatilidad, considera añadir activos más estables",
      ];
    }
    return [];
  }
}
