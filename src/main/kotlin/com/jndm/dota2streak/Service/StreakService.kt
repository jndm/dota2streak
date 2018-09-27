package com.jndm.dota2streak.Service

import com.jndm.dota2streak.Model.Streak.StreakInformation
import org.springframework.stereotype.Service

@Service("streakService")
interface StreakService {
    fun getStreakInformation(accountId : Long) : StreakInformation?
}