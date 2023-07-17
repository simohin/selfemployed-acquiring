package com.github.simohin.selfemployedacquiring.auth.dao.repository

import com.github.simohin.selfemployedacquiring.auth.dao.document.UserDetailsImpl
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono
import java.util.*

@Repository
interface UserDetailsRepository : ReactiveMongoRepository<UserDetailsImpl, UUID> {

    fun findByUsername(username: String): Mono<UserDetailsImpl>
    fun existsByUsername(username: String): Mono<Boolean>
}
