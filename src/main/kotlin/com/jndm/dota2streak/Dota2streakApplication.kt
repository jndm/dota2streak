package com.jndm.dota2streak

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching

@SpringBootApplication
@EnableCaching
class Dota2streakApplication

fun main(args: Array<String>) {
    runApplication<Dota2streakApplication>(*args)
}
