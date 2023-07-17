package com.github.simohin.selfemployedacquiring.merchant.dao.document

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document(collection = "merchants")
data class Merchant(
    @Id
    val id: UUID,
    val name: String,
    val owners: Collection<UUID>
)
