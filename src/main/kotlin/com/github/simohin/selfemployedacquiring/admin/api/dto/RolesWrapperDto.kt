package com.github.simohin.selfemployedacquiring.admin.api.dto

import com.github.simohin.selfemployedacquiring.auth.model.enum.UserRole

data class RolesWrapperDto(
    val roles: Collection<UserRole>
)
