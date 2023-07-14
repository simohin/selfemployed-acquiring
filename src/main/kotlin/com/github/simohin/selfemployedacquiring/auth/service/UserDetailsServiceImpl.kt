package com.github.simohin.selfemployedacquiring.auth.service

import com.github.simohin.selfemployedacquiring.auth.config.RootUserProperties
import com.github.simohin.selfemployedacquiring.auth.dao.document.UserDetailsImpl
import com.github.simohin.selfemployedacquiring.auth.dao.repository.UserDetailsRepository
import com.github.simohin.selfemployedacquiring.auth.model.enum.UserRole
import com.github.simohin.selfemployedacquiring.auth.model.enum.toAuthorities
import com.github.simohin.selfemployedacquiring.auth.model.enum.toAuthority
import com.github.simohin.selfemployedacquiring.auth.model.enum.toRoles
import jakarta.annotation.PostConstruct
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Mono

@Service
class UserDetailsServiceImpl(
    private val userDetailsRepository: UserDetailsRepository,
    private val passwordEncoder: PasswordEncoder,
    private val rootUserProperties: RootUserProperties
) : ReactiveUserDetailsService {


    @PostConstruct
    fun init() {
        userDetailsRepository.findByUsername(rootUserProperties.login)
            .map { it as UserDetailsImpl }
            .doOnNext {
                if (!it.authorities.toRoles().contains(UserRole.ROLE_ADMIN)) {
                    it.authorities.add(UserRole.ROLE_ADMIN.toAuthority())
                }
            }
            .switchIfEmpty(
                Mono.just(
                    UserDetailsImpl(
                        rootUserProperties.login,
                        passwordEncoder.encode(rootUserProperties.password),
                        mutableSetOf(UserRole.ROLE_ADMIN).toAuthorities()
                    )
                )
            )
            .flatMap { userDetailsRepository.save(it) }
            .subscribe()
    }

    override fun findByUsername(username: String) = userDetailsRepository.findByUsername(username)
        .switchIfEmpty(Mono.error(NoSuchElementException("User $username not found")))

    @Transactional
    fun create(username: String, password: String) = userDetailsRepository.existsByUsername(username)
        .filter { !it }
        .map {
            UserDetailsImpl(
                username,
                passwordEncoder.encode(password),
                mutableSetOf(UserRole.ROLE_USER).toAuthorities()
            )
        }
        .flatMap { userDetailsRepository.save(it) }
        .switchIfEmpty(Mono.error(IllegalArgumentException("User $username already exists")))
}
