package com.github.simohin.selfemployedacquiring.api.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api/ping")
class PingController {

    @GetMapping
    fun ping() = Mono.just(ResponseEntity("pong", HttpStatus.OK))

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    fun adminPing() = Mono.just(ResponseEntity("pong", HttpStatus.OK))
}
