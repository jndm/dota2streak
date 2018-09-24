package com.jndm.dota2streak.Controller

import com.jndm.dota2streak.Model.Match
import com.jndm.dota2streak.Model.Streak.Streak
import com.jndm.dota2streak.Model.Streak.StreakInformation
import com.jndm.dota2streak.Service.MatchService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class StreakController (private val matchService : MatchService) {
    enum class lobbyType(val code : Int) {
        UNRANKED(0),
        RANKED_SOLO(6),
        RANKED_TEAM(7)
    }

    @GetMapping("/matches")
    fun getSearchResult(@RequestParam(required = true)accountId : Long) : StreakInformation? {
        var allMatches = matchService.getMatches(accountId)?.sortedByDescending { it.startTime }

        if(allMatches == null || allMatches.isEmpty()) {
            return null
        }

        allMatches = allMatches.filter {
            it.lobbyType == lobbyType.UNRANKED.code ||
            it.lobbyType == lobbyType.RANKED_SOLO.code ||
            it.lobbyType == lobbyType.RANKED_TEAM.code
        }

        val rankedMatches = allMatches.filter {
                it.lobbyType == lobbyType.RANKED_SOLO.code ||
                it.lobbyType == lobbyType.RANKED_TEAM.code
        }

        val unrankedMatches = allMatches.filter {
            it.lobbyType == lobbyType.UNRANKED.code
        }

        val combinedStreak = countStreak(allMatches)
        val rankedStreak = countStreak(rankedMatches)
        val unrankedStreak = countStreak(unrankedMatches)

        return StreakInformation(combinedStreak, rankedStreak, unrankedStreak)
    }

    private fun countStreak(matches : List<Match>) : Streak? {
        if(matches == null || matches.isEmpty()) {
            return null
        }
        val win = matches.first().matchWon()
        var streakCount = 0
        run loop@{
            matches.forEach { match ->
                if ((win && match.matchWon()) || (!win && !match.matchWon())) {
                    streakCount++
                } else {
                    return@loop
                }
            }
        }
        return Streak(win, streakCount)
    }
}