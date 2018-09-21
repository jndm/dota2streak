package com.jndm.dota2streak.Service.Impl

import com.jndm.dota2streak.Model.Match
import com.jndm.dota2streak.Service.MatchService
import com.jndm.dota2streak.Service.Rest.MatchRestService
import org.springframework.stereotype.Service

@Service("matchService")
class MatchServiceImpl(private val matchRestService: MatchRestService) : MatchService {

    override fun getMatches(accountId: Long): List<Match>? {
        return matchRestService.getMatches(accountId).execute().body()
    }

}