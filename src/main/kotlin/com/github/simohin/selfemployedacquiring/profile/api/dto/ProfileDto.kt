package com.github.simohin.selfemployedacquiring.profile.api.dto

import com.github.simohin.selfemployedacquiring.auth.model.enum.UserRole

data class ProfileDto(
    val username: String,
    val roles: Collection<UserRole>
)
