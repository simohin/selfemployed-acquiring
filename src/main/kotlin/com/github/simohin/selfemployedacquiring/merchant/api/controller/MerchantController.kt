package com.github.simohin.selfemployedacquiring.merchant.api.controller

import com.github.simohin.selfemployedacquiring.merchant.api.dto.MerchantDto
import com.github.simohin.selfemployedacquiring.merchant.service.MerchantService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/merchants")
@PreAuthorize("hasAnyRole('MERCHANT')")
class MerchantController(
    private val merchantService: MerchantService
) {

    @GetMapping
    fun getLinkedMerchants() = merchantService.findLinkedMerchants()

    @PostMapping
    fun createMerchant(@RequestBody dto: MerchantDto) = merchantService.createMerchant(dto.name)
}
