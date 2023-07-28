package com.github.simohin.selfemployedacquiring.profile.api.controller

import com.github.simohin.selfemployedacquiring.auth.model.enum.toRoles
import com.github.simohin.selfemployedacquiring.auth.service.UserDetailsServiceImpl
import com.github.simohin.selfemployedacquiring.profile.api.dto.ProfileDto
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/profile")
@PreAuthorize("isAuthenticated()")
class ProfileController(
    private val userDetailsService: UserDetailsServiceImpl
) {

    @GetMapping
    fun get() = userDetailsService.getCurrentUserDetails()
        .map {
            ProfileDto(
                it.username,
                it.authorities.toRoles()
            )
        }
}
