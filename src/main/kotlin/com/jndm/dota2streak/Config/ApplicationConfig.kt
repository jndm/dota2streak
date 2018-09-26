package com.jndm.dota2streak.Config

import com.jndm.dota2streak.Service.Rest.AccountRestService
import com.jndm.dota2streak.Service.Rest.MatchRestService
import okhttp3.OkHttpClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource
import org.springframework.core.env.Environment
import retrofit2.Retrofit
import retrofit2.converter.jackson.JacksonConverterFactory
import java.util.concurrent.TimeUnit

@Configuration
@PropertySource("classpath:application.properties")
class ApplicationConfig (private val env : Environment){
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
        val timeout = Integer.parseInt(env.getProperty("remote.api.timeout"))
        val baseurl = env.getProperty("remote.api.baseurl")
        val httpClient = buildHttpClient(timeout)
        return Retrofit.Builder()
                .client(httpClient)
                .baseUrl(baseurl!!)
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