package com.jndm.dota2streak.Model.Streak

data class StreakInformation (
    val combinedStreak : Streak?,
    val rankedStreak : Streak?,
    val unrankedStreak : Streak?,
    val highestWinStreak : Streak?,
    val highestLoseStreak : Streak?,
    val highestRankedWinStreak : Streak?,
    val highestRankedLoseStreak : Streak?,
    val highestUnrankedWinStreak : Streak?,
    val highestUnrankedLoseStreak : Streak?
)