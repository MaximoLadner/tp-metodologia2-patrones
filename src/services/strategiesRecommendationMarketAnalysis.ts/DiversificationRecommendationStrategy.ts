import { RecommendationStrategy } from "./RecommendationStrategy";

export class DiversificationStrategy implements RecommendationStrategy {
  generateRecommendations(
    diversificationScore: number,
    volatilityScore: number,
    riskLevel: string
  ): string[] {
    if (diversificationScore < 40) {
      return [
        "Considera diversificar tu portafolio invirtiendo en diferentes sectores",
      ];
    }
    return [];
  }
}
