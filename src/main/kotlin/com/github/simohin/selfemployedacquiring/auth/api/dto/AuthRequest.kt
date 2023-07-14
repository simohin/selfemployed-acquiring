package com.github.simohin.selfemployedacquiring.auth.api.dto

data class AuthRequest(
    val login: String,
    val password: String
)
