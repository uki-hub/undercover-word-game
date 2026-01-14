# New Game Mechanics

- The host no longer controls the game flow; everything is handled automatically by the program.
- Roles are assigned randomly and no longer need to be decided before the game starts.

---

# Roles

## Fool (TESTING)
**Team:** Solo  
**Word:** Random Word  

**Objective:**  
Wins if voted out, but will die on their own after 2–3 players die (depending on the number of players).

---

## Traitor (TESTING)
**Team:** Civilian → Undercover  
**Word:** Civilian / Undercover Word  

**Objective:**  
Plays as a civilian for the first 2–3 rounds (depending on the number of players).  
After passing the round limit, the player becomes an undercover.

---

## Detective (TESTING)
**Team:** Civilian  
**Word:** Civilian Word  

**Objective:**  
On their turn, the detective can scan 2 players.  
The game reveals whether the two players have the same word or not using:
- `=` same word  
- `≠` different word  

---

## Pacific
**Team:** Civilian  
**Word:** Civilian Word  

**Objective:**  
A civilian-aligned role with the power to cancel a voting phase once per game.

---

## Sabotase (TESTING)
**Team:** Undercover  
**Word:** Undercover Word  

**Objective:**  
Before WordReveal This Role can select 1 player to silence, preventing them from giving their word during a round.

---

## Corruptor
**Team:** Undercover  
**Word:** Undercover Word  

**Objective:**  
Can remove 1 vote from the voting result.  
This ability can be used up to 2 times per game.

---

## Manipulator
**Team:** Undercover  
**Word:** Undercover Word  

**Objective:**  
Can select 2 players.  
If those players are scanned by the Detective, the scan result will always be the opposite of the truth.
