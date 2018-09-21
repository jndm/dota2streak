package com.jndm.dota2streak.Config

import com.jndm.dota2streak.Service.Rest.AccountRestService
import com.jndm.dota2streak.Service.Rest.MatchRestService
import okhttp3.OkHttpClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import retrofit2.Retrofit
import retrofit2.converter.jackson.JacksonConverterFactory
import java.util.concurrent.TimeUnit

@Configuration
class ApplicationConfig {
    val BASE_URL : String = "https://api.opendota.com/api/"
    val TIMEOUT : Int = 180

    @Bean
    fun accountRestService(): AccountRestService {
        val retrofit = buildRetrofit()
        return retrofit.create(AccountRestService::class.java)
    }

    @Bean
    fun matchRestService(): MatchRestService {
        val retrofit = buildRetrofit()
        return retrofit.create(MatchRestService::class.java)
    }

    private fun buildRetrofit(): Retrofit {
        val httpClient = buildHttpClient(TIMEOUT)
        return Retrofit.Builder()
                .client(httpClient)
                .baseUrl(BASE_URL)
                .addConverterFactory(JacksonConverterFactory.create())
                .build()
    }

    private fun buildHttpClient(timeout: Int): OkHttpClient {
        return OkHttpClient.Builder()
                .readTimeout(timeout.toLong(), TimeUnit.SECONDS)
                .writeTimeout(timeout.toLong(), TimeUnit.SECONDS)
                .connectTimeout(timeout.toLong(), TimeUnit.SECONDS)
                .build()
    }
}