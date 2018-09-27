package com.jndm.dota2streak.Controller

import com.jndm.dota2streak.Model.Streak.StreakInformation
import com.jndm.dota2streak.Service.StreakService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class StreakController (private val streakService : StreakService) {

    @GetMapping("/matches")
    fun getSearchResult(@RequestParam(required = true)accountId : Long) : StreakInformation? {
        return streakService.getStreakInformation(accountId)
    }
}