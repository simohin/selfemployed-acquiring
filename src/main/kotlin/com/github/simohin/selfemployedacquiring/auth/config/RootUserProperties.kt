package com.github.simohin.selfemployedacquiring.auth.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.bind.ConstructorBinding
import org.springframework.boot.context.properties.bind.DefaultValue

@ConfigurationProperties(prefix = "app.root.user")
data class RootUserProperties @ConstructorBinding constructor(
    @DefaultValue("root")
    val login: String,
    @DefaultValue("password")
    val password: String
)
