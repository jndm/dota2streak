package com.jndm.dota2streak.Controller

import com.jndm.dota2streak.Model.Account
import com.jndm.dota2streak.Service.AccountService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class AccountController(private val accountService: AccountService) {
    @GetMapping("/search")
    fun getSearchResult(@RequestParam(required = true)name : String) : Account? {
        return accountService.getAccounts(name)?.asSequence()?.sortedByDescending{ it.similarity }?.first()
    }
}