package com.jndm.dota2streak.Controller

import com.jndm.dota2streak.Model.Account
import com.jndm.dota2streak.Service.AccountService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class AccountController(private val accountService: AccountService) {
    @GetMapping("/search-by-name")
    fun getSearchResultByName(@RequestParam(required = true)name : String) : Account? {
        return null
        /*
        var accounts = accountService.getAccounts(name)

        accounts = accounts
                ?.asSequence()
                ?.sortedWith(compareByDescending(nullsFirst<Float>()) {it.similarity})
                ?.toList()

        return accounts?.first()
        */
    }

    @GetMapping("/search-by-id")
    fun getSearchResultById(@RequestParam(required = true)accountId : String) : Account? {
        val accounts = accountService.getAccounts(accountId)
        return accounts?.firstOrNull { it.similarity == 0.0f }
    }
}