package com.github.simohin.selfemployedacquiring.auth.model.enum

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority

enum class UserRole {
    ROLE_USER,
    ROLE_MERCHANT,
    ROLE_ADMIN
}

fun UserRole.toAuthority() = SimpleGrantedAuthority(name)
fun Collection<UserRole>.toAuthorities(): MutableCollection<GrantedAuthority> =
    map { SimpleGrantedAuthority(it.name) }.toMutableSet()

fun Collection<GrantedAuthority>.toRoles() = map { UserRole.valueOf(it.authority) }.toMutableSet()
