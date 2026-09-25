# Security policy

GRYMO is an experimental local library, not a deployed lineage program or trading system. Never send funds to an identifier shown by this package.

No wallet, private key, signing secret, funded account or model API key is required. The environment example contains only a public RPC and empty Program ID / mint fields. Core does not load environment variables or call a network.

Display genome fingerprints are non-cryptographic. SHA-256 commitments bind canonical data but do not establish authorship or ownership. A derived PDA is only an address; it does not prove account existence, program deployment, valid ancestry or authorization. Before a program exists, review canonical serialization, record immutability, parent validation, generations, account size, ownership, canonical bumps and publication authorization. No security audit or production readiness is claimed.

Use GitHub private vulnerability reporting if enabled; otherwise contact the maintainer to arrange a private channel. Do not post exploit details, private keys, seed phrases, API keys or personal data in public issues. No SLA is published. Dependency scans are point-in-time checks, not security guarantees.
