# Security policy

This is an experimental local library, not a deployed registry contract or trading system. Do not send funds to addresses claimed to be derived by this repository.

For a vulnerability, use GitHub's private vulnerability reporting / security advisory flow **if enabled for this repository**. If it is unavailable, contact the maintainer through their GitHub profile to arrange a private channel; do not post an exploit or secret in a public issue. We have not published an SLA or a dedicated security email address.

Do not include private keys, wallet seed phrases, API keys, or personal information in reports. Security-sensitive commitments will require a cryptographic design review before any on-chain deployment.

## Zero wallet requirements

No private key, wallet, signing secret or funded account is required for any default command. The environment example contains only a public RPC URL and an empty registry-address field; the core never reads it. Dependencies must be installed first, but generation and record calculations then work offline.

Genome fingerprints are non-cryptographic. Keccak record IDs are content commitments, not authenticated ancestry, ownership proofs, deployed addresses or financial instruments. Parent references are validated for format only. Future contracts require independent authorization/replay/ancestry review and tests before deployment. Chain ID and verifying-contract binding would be required for any signed message; the current content ID intentionally has neither.

No Solidity contract, registry, token contract, market feed or trading integration is deployed by this repository. Never send funds to a hash. Dependency audit results are time-specific and do not constitute a security guarantee.
