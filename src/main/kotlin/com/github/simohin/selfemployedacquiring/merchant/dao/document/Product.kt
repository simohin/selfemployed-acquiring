package com.github.simohin.selfemployedacquiring.merchant.dao.document

import com.github.simohin.selfemployedacquiring.merchant.model.enum.ProductType
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document(collection = "products")
data class Product(
    @Id
    val id: UUID,
    val name: String,
    val description: String,
    val type: ProductType,
    val merchantId: UUID
)
