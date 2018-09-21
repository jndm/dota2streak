package com.jndm.dota2streak.Model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty

@JsonIgnoreProperties(ignoreUnknown = true)
data class Match (
    @JsonProperty("match_id")
    val matchId : Long,

    @JsonProperty("radiant_win")
    val radiantWin : Boolean,

    @JsonProperty("player_slot")
    val playerSlot : Int,

    @JsonProperty("lobby_type")
    val lobbyType : Int,

    @JsonProperty("start_time")
    val startTime : Long
) {
    // 0-127 are Radiant, 128-255 are Dire
    val MAX_RADIANT = 127
    val MIN_RADIANT = 0

    fun matchWon() : Boolean {
        return (isRadiant() && radiantWin) || (!isRadiant() && !radiantWin)
    }

    fun isRadiant(): Boolean {
        return when (playerSlot) {
            in MIN_RADIANT..MAX_RADIANT -> true
            else -> false
        }
    }
}

