package com.github.simohin.selfemployedacquiring.admin.api.controller

import com.github.simohin.selfemployedacquiring.admin.api.dto.RolesWrapperDto
import com.github.simohin.selfemployedacquiring.auth.service.UserDetailsServiceImpl
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/admin/users")
@PreAuthorize("hasRole('ADMIN')")
class AdminUsersController(
    private val userDetailsServiceImpl: UserDetailsServiceImpl
) {

    @GetMapping
    fun getUsers() = userDetailsServiceImpl.findAll()

    @PostMapping("{userId}/roles")
    fun addRoles(
        @RequestBody dto: RolesWrapperDto,
        @PathVariable userId: UUID
    ) = userDetailsServiceImpl.addRoles(userId, dto.roles)

    @DeleteMapping("{userId}/roles")
    fun deleteRoles(
        @RequestBody dto: RolesWrapperDto,
        @PathVariable userId: UUID
    ) = userDetailsServiceImpl.deleteRoles(userId, dto.roles)

}
