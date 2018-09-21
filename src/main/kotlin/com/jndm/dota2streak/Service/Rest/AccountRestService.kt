package com.jndm.dota2streak.Service.Rest

import com.jndm.dota2streak.Model.Account
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Query

interface AccountRestService {

    @GET("search")
    fun getAccounts(@Query("q") username: String): Call<List<Account>>

}