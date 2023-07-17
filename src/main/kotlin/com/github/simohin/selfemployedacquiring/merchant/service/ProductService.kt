package com.github.simohin.selfemployedacquiring.merchant.service

import com.github.simohin.selfemployedacquiring.merchant.dao.repository.ProductRepository
import org.springframework.stereotype.Service

@Service
class ProductService(
    private val productRepository: ProductRepository
) {


}
