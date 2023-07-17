package com.github.simohin.selfemployedacquiring.auth.service

import com.github.simohin.selfemployedacquiring.auth.config.RootUserProperties
import com.github.simohin.selfemployedacquiring.auth.dao.document.UserDetailsImpl
import com.github.simohin.selfemployedacquiring.auth.dao.repository.UserDetailsRepository
import com.github.simohin.selfemployedacquiring.auth.model.enum.UserRole
import com.github.simohin.selfemployedacquiring.auth.model.enum.toAuthorities
import com.github.simohin.selfemployedacquiring.auth.model.enum.toAuthority
import com.github.simohin.selfemployedacquiring.auth.model.enum.toRoles
import com.github.simohin.selfemployedacquiring.util.LogProvider
import jakarta.annotation.PostConstruct
import org.springframework.security.core.context.ReactiveSecurityContextHolder
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Mono
import java.util.*

@Service
class UserDetailsServiceImpl(
    private val userDetailsRepository: UserDetailsRepository,
    private val passwordEncoder: PasswordEncoder,
    private val rootUserProperties: RootUserProperties,
) : ReactiveUserDetailsService {

    companion object : LogProvider()

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
            ).flatMap { userDetailsRepository.save(it) }
            .doOnNext { log.debug("${rootUserProperties.login} user created") }
            .then()
            .subscribe()
    }

    override fun findByUsername(username: String) = userDetailsRepository.findByUsername(username)
        .switchIfEmpty(Mono.error(NoSuchElementException("User $username not found")))
        .map { it as UserDetails }

    fun getCurrentUserDetails() = getAuthorizedUserDetails()
        .flatMap { findByUsername(it.username) }
        .map { it as UserDetailsImpl }

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

    fun findAll() = userDetailsRepository.findAll()

    fun addRoles(userId: UUID, roles: Collection<UserRole>) = userDetailsRepository.findById(userId)
        .map {
            it.authorities.addAll(roles.toAuthorities())
            it
        }.flatMap {
            userDetailsRepository.save(it)
        }.then()

    fun deleteRoles(userId: UUID, roles: Collection<UserRole>) = userDetailsRepository.findById(userId)
        .map {
            it.authorities.removeAll(roles.toAuthorities().toSet())
            it
        }.flatMap {
            userDetailsRepository.save(it)
        }.then()

    private fun getAuthorizedUserDetails(): Mono<UserDetails> = ReactiveSecurityContextHolder.getContext()
        .map(SecurityContext::getAuthentication)
        .map { it.principal as UserDetails }
}
