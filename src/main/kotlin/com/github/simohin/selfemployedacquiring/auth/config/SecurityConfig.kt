package com.github.simohin.selfemployedacquiring.auth.config

import com.github.simohin.selfemployedacquiring.auth.config.filter.JwtAuthenticationFilter
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.SecurityWebFiltersOrder
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.logout.CookieClearingLogoutHandler
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository
import org.springframework.web.cors.CorsConfiguration

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity(useAuthorizationManager = true)
@EnableConfigurationProperties(RootUserProperties::class)
class SecurityConfig {

    @Bean
    fun chain(http: ServerHttpSecurity, filter: JwtAuthenticationFilter): SecurityWebFilterChain = http
        .csrf { it.disable() }
        .cors {
            it.configurationSource {
                CorsConfiguration()
                    .applyPermitDefaultValues()
                    .apply {
                        addAllowedMethod(HttpMethod.DELETE)
                        addAllowedMethod(HttpMethod.PUT)
                    }
            }
        }
        .httpBasic { it.disable() }
        .formLogin { it.disable() }
        .authorizeExchange {
            it.pathMatchers("/api/**").authenticated()
            it.anyExchange().permitAll()
        }
        .addFilterAt(filter, SecurityWebFiltersOrder.AUTHENTICATION)
        .build()

    @Bean
    fun authManager(userDetailsService: ReactiveUserDetailsService, passwordEncoder: PasswordEncoder) =
        UserDetailsRepositoryReactiveAuthenticationManager(userDetailsService)
            .apply { setPasswordEncoder(passwordEncoder) }

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder()
}
