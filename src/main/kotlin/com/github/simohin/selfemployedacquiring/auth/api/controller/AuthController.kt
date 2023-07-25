package com.github.simohin.selfemployedacquiring.auth.api.controller

import com.github.simohin.selfemployedacquiring.auth.BEARER_HEADER_PREFIX
import com.github.simohin.selfemployedacquiring.auth.api.dto.AuthRequest
import com.github.simohin.selfemployedacquiring.auth.api.dto.AuthResponse
import com.github.simohin.selfemployedacquiring.auth.api.dto.RegisterResponse
import com.github.simohin.selfemployedacquiring.auth.service.JwtProvider
import com.github.simohin.selfemployedacquiring.auth.service.UserDetailsServiceImpl
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.WebSession
import reactor.core.publisher.Mono
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter


@RestController
@RequestMapping("/auth")
class AuthController(
    private val jwtProvider: JwtProvider,
    private val authManager: ReactiveAuthenticationManager,
    private val userDetailsService: UserDetailsServiceImpl
) {

    @PostMapping("/tokens")
    fun login(@RequestBody authRequest: Mono<AuthRequest>) = authRequest
        .map { it.login to it.password }
        .authorize()

    @DeleteMapping
    fun logout(session: WebSession) = session.invalidate()
        .then(Mono.fromCallable {
            val headers = HttpHeaders()
            headers[HttpHeaders.SET_COOKIE] =
                "JSESSIONID=;path=/;Secure;HttpOnly;Expires=${LocalDateTime.MIN.format(DateTimeFormatter.ISO_DATE_TIME)}"
            ResponseEntity("Logged out", headers, HttpStatus.OK)
        })

    @PostMapping("/users")
    fun register(@RequestBody authRequest: Mono<AuthRequest>) = authRequest.flatMap {
        userDetailsService.create(it.login, it.password)
    }.map {
        ResponseEntity(RegisterResponse(it.id), HttpStatus.CREATED)
    }

    private fun Mono<Pair<String, String>>.authorize() = flatMap {
        val username = it.first
        val password = it.second
        authManager.authenticate(UsernamePasswordAuthenticationToken(username, password))
            .map { auth -> jwtProvider.create(auth) }
    }
        .map {
            val headers = HttpHeaders()
            headers[HttpHeaders.AUTHORIZATION] = BEARER_HEADER_PREFIX + it
            ResponseEntity(AuthResponse(it), headers, HttpStatus.OK)
        }

}
