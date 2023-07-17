package com.github.simohin.selfemployedacquiring.merchant.service

import com.github.simohin.selfemployedacquiring.auth.service.UserDetailsServiceImpl
import com.github.simohin.selfemployedacquiring.merchant.dao.document.Merchant
import com.github.simohin.selfemployedacquiring.merchant.dao.repository.MerchantRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class MerchantService(
    private val merchantRepository: MerchantRepository,
    private val userDetailsService: UserDetailsServiceImpl
) {

    fun createMerchant(name: String) = userDetailsService.getCurrentUserDetails()
        .map {
            Merchant(
                UUID.randomUUID(),
                name,
                setOf(it.id)
            )
        }.flatMap(merchantRepository::save)


    fun findLinkedMerchants() = userDetailsService.getCurrentUserDetails()
        .flux()
        .flatMap { merchantRepository.findMerchantsByOwnersContaining(it.id) }

    fun findMerchants() = merchantRepository.findAll()

}
