package com.jndm.dota2streak.Service.Impl

import com.jndm.dota2streak.Model.Account
import com.jndm.dota2streak.Service.AccountService
import com.jndm.dota2streak.Service.Rest.AccountRestService
import org.springframework.stereotype.Service

@Service("accountService")
class AccountServiceImpl(private val accountRestService: AccountRestService) : AccountService {
    override fun getAccounts(param: String): List<Account>? {
        return accountRestService.getAccounts(param).execute().body()
    }

}