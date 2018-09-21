package com.jndm.dota2streak.Service

import com.jndm.dota2streak.Model.Account
import com.jndm.dota2streak.Model.Match
import org.springframework.stereotype.Service

@Service("matchService")
interface MatchService {
    fun getMatches(accountId : Long) : List<Match>?
}