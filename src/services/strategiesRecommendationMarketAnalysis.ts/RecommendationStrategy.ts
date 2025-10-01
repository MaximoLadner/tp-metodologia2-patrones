export interface RecommendationStrategy {
  generateRecommendations(
    diversificationScore: number,
    volatilityScore: number,
    riskLevel: string
  ): string[];
}
