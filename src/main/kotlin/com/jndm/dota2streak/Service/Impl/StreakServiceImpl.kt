package com.jndm.dota2streak.Service.Impl

import com.jndm.dota2streak.Model.Match
import com.jndm.dota2streak.Model.Streak.Streak
import com.jndm.dota2streak.Model.Streak.StreakInformation
import com.jndm.dota2streak.Service.Rest.MatchRestService
import com.jndm.dota2streak.Service.StreakService
import org.springframework.stereotype.Service

@Service("streakService")
class StreakServiceImpl(private val matchRestService: MatchRestService) : StreakService {

    data class StreakHelper(val highestWinStreak : Streak, val highestLosingStreak : Streak)

    enum class lobbyType(val code : Int) {
        UNRANKED(0),
        RANKED_SOLO(6),
        RANKED_TEAM(7)
    }

    override fun getStreakInformation(accountId: Long): StreakInformation? {
        var matches = matchRestService.getMatches(accountId).execute().body()?.sortedByDescending { it.startTime }

        if(matches == null || matches.isEmpty()) {
            return null
        }

        matches = filterMatches(matches)
        val rankedMatches = filterRankedMatches(matches)
        val unrankedMatches = filterUnrankedMatches(matches)

        val combinedStreak = countStreak(matches)
        val rankedStreak = countStreak(rankedMatches)
        val unrankedStreak = countStreak(unrankedMatches)

        val (highestWinStreak, highestLoseStreak) = countAllTimeHighs(matches)
        val (highestRankedWinStreak, highestRankedLoseStreak) = countAllTimeHighs(rankedMatches)
        val (highestUnrankedWinStreak, highestUnrankedLoseStreak) = countAllTimeHighs(unrankedMatches)

        return StreakInformation(combinedStreak,
                rankedStreak, unrankedStreak,
                highestWinStreak, highestLoseStreak,
                highestRankedWinStreak, highestRankedLoseStreak,
                highestUnrankedWinStreak, highestUnrankedLoseStreak)
    }

    private fun countAllTimeHighs(allMatches: List<Match>): Pair<Streak?, Streak?> {
        var matches = allMatches
        if(matches == null || matches.isEmpty()) {
            return Pair(null, null)
        }

        var ready = false
        var highestWinStreak = 0
        var highestLosingStreak = 0
        while(!ready) {
            val win = matches.first().matchWon()
            val streak = matches.asSequence().takeWhile { it.matchWon() == win }.count()

            if(win && streak > highestWinStreak) {
                highestWinStreak = streak
            } else if(!win && streak > highestLosingStreak) {
                highestLosingStreak = streak
            }

            matches = matches.drop(streak)
            if(matches.isEmpty()) {
                ready = true
            }
        }

        return Pair(Streak(true, highestWinStreak), Streak(false, highestLosingStreak))
    }

    private fun countStreak(matches : List<Match>) : Streak? {
        if(matches == null || matches.isEmpty()) {
            return null
        }
        val win = matches.first().matchWon()
        val streakCount = matches.asSequence().takeWhile { win == it.matchWon() }.count()
        return Streak(win, streakCount)
    }

    private fun filterMatches(matches : List<Match>) : List<Match> {
        return matches.filter {
            it.lobbyType == lobbyType.UNRANKED.code
            || it.lobbyType == lobbyType.RANKED_SOLO.code
            || it.lobbyType == lobbyType.RANKED_TEAM.code
        }
    }

    private fun filterRankedMatches(matches : List<Match>) : List<Match> {
        return matches.filter {
            it.lobbyType == lobbyType.RANKED_SOLO.code
            || it.lobbyType == lobbyType.RANKED_TEAM.code
        }
    }

    private fun filterUnrankedMatches(matches : List<Match>) : List<Match> {
        return matches.filter {
            it.lobbyType == lobbyType.UNRANKED.code
        }
    }
}