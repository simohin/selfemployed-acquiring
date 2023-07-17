package com.github.simohin.selfemployedacquiring.merchant.dao.repository

import com.github.simohin.selfemployedacquiring.merchant.dao.document.Merchant
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import java.util.*

@Repository
interface MerchantRepository : ReactiveMongoRepository<Merchant, UUID> {

    fun findMerchantsByOwnersContaining(ownerId: UUID): Flux<Merchant>
}
