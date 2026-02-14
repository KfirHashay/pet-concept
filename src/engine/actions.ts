/**
 * Stub engine functions.
 * These will be replaced with real game logic later.
 */

import { ActionKind, ActionResult, PetStats, Trait } from './types';

/** Apply an action to current stats. Stub: fixed deltas. */
export function applyAction(action: ActionKind, _currentStats: PetStats, _traits: Trait[]): ActionResult {
    const deltas: Record<ActionKind, Partial<PetStats>> = {
        feed: { hunger: -20 },
        play: { happiness: 15, energy: -10 },
        sleep: { energy: 25, happiness: 5 },
        clean: { cleanliness: 25 },
    };

    return {
        statDeltas: deltas[action],
        xpGained: 5,
        coinsGained: 2,
        message: `You performed: ${action}`,
    };
}

/** Clamp a stat value between 0 and 100. */
export function clampStat(value: number): number {
    return Math.max(0, Math.min(100, value));
}

/** Calculate level from total XP. Stub: every 100 XP = 1 level. */
export function levelFromXp(xp: number): number {
    return Math.floor(xp / 100) + 1;
}
