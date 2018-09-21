package com.jndm.dota2streak.Service.Rest

import com.jndm.dota2streak.Model.Match
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface MatchRestService {

    @GET("players/{account_id}/matches")
    fun getMatches(@Path("account_id") accountId: Long): Call<List<Match>>

}