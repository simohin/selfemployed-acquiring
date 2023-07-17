package com.github.simohin.selfemployedacquiring.merchant.dao.repository

import com.github.simohin.selfemployedacquiring.merchant.dao.document.Product
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import java.util.*

@Repository
interface ProductRepository : ReactiveMongoRepository<Product, UUID> {

    fun findMerchantsByMerchantId(merchantId: UUID): Flux<Product>
}
