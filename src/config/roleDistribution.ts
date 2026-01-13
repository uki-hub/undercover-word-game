import { RoleDistribution } from "@/types/game";

export const DEFAULT_DISTRIBUTIONS: Record<number, RoleDistribution> = {
  4: { undercovers: 1, mrWhites: 0, fool: 0, traitor: 0, detective: 0, saboteur: 0 },
  5: { undercovers: 1, mrWhites: 1, fool: 1, traitor: 0, detective: 0, saboteur: 0 },
  6: { undercovers: 1, mrWhites: 1, fool: 1, traitor: 0, detective: 0, saboteur: 0 },
  7: { undercovers: 2, mrWhites: 1, fool: 1, traitor: 0, detective: 1, saboteur: 0 },
  8: { undercovers: 2, mrWhites: 1, fool: 1, traitor: 0, detective: 1, saboteur: 0 },
  9: { undercovers: 3, mrWhites: 1, fool: 1, traitor: 0, detective: 1, saboteur: 1 },
  10: { undercovers: 3, mrWhites: 1, fool: 1, traitor: 0, detective: 1, saboteur: 1 },
};

export const calculateDefaultDistribution = (playerCount: number): RoleDistribution => {
  return DEFAULT_DISTRIBUTIONS[playerCount] || DEFAULT_DISTRIBUTIONS[4];
};

export const distributionMeetsLimits = (distribution: RoleDistribution, playerCount: number): boolean => {
  const { undercovers, mrWhites, fool, traitor, detective, saboteur } = distribution;
  const totalSpecialRoles = undercovers + mrWhites + fool + traitor + detective + saboteur;
  const civilians = playerCount - totalSpecialRoles;

  return totalSpecialRoles <= civilians 
         && undercovers < civilians
         && undercovers >= 0
         && mrWhites >= 0
         && fool >= 0
         && traitor >= 0
         && detective >= 0
         && saboteur >= 0
         && totalSpecialRoles > 0;
};