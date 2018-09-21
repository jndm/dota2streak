package com.jndm.dota2streak.Model

import com.fasterxml.jackson.annotation.JsonProperty

data class Account(
  @JsonProperty("account_id")
  val accountId : Long,

  @JsonProperty("personaname")
  val name : String,

  @JsonProperty("avatarfull")
  val avatarUrl : String,

  @JsonProperty("last_match_time")
  val lastMatchTime : String?,

  @JsonProperty("similarity")
  val similarity : Float
)