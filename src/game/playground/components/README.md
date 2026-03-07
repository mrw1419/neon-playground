# Rendering-Only Layer Code Review Checklist

This checklist enforces architectural purity for all projection layers (EntityLayer, EffectLayer, OverlayLayer, ControlPanel) in the playground game.

- No mutation of engine or content state (read-only access only)
- Only render visuals/components based on props/context
- No side effects or imperative logic
- Defensive checks for undefined/null data
- Use React.memo for performance optimization
- Document prop types and expected data shape
- Unique React keys for all mapped elements
- No legacy simulation/entity logic
- All state changes are UI-driven
- Reference PlaygroundScene_xOLD.tsx for patterns if needed

Reviewers and contributors must validate these items for every layer component to maintain architectural separation and onboarding clarity.
