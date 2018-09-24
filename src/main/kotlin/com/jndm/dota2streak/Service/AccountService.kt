package com.jndm.dota2streak.Service

import com.jndm.dota2streak.Model.Account
import org.springframework.stereotype.Service

@Service("accountService")
interface AccountService {
    fun getAccounts(param : String) : List<Account>?
}