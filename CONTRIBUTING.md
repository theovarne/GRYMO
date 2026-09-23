# Contributing

Thank you for helping make the mechanisms inspectable. Please open an issue before changing the v1 genome schema, draw order, fingerprint format, or mutation rules. A compatible change needs tests and documentation; a breaking deterministic change needs a new versioned specification and golden vectors.

1. Use Node.js 22.18+ and run `npm install`.
2. Run `npm test` and `npm run typecheck` before a pull request.
3. Add a fixed-seed test for any deterministic algorithm change.
4. Keep browser UI, wallet operations, AI model calls and market data outside `src/` core logic unless explicitly isolated as adapters.
5. Label unimplemented registry contract or voice work as proposals, not live features.

By contributing, you agree to the [Code of Conduct](CODE_OF_CONDUCT.md). Reuse/licensing terms are currently pending; see [LICENSE](LICENSE). Please do not submit third-party code or art without rights to do so.
