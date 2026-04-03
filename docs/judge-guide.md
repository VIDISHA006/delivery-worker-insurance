# GigBuddy Judge Guide

## One-Line Thesis

GigBuddy is a multilingual disruption-relief product for delivery workers that converts verified city signals into payout decisions, then closes the loop with worker feedback and renewal credit.

## Why This Is Not A Generic Hackathon Insurance Demo

- The core workflow starts with city disruption detection, not a claim form.
- Payout creation depends on dual-signal validation rather than a single threshold.
- Workers contribute post-payout feedback that is stored and converted into renewal credit.
- The admin surface is an operations console with claim posture, runtime status, and trigger controls.

## What To Demo In Two Minutes

1. Sign in as Ravi Kumar with `9876543210` and OTP `1234`.
2. Show the worker dashboard and claims page to establish the live policy, prior payouts, and feedback-credit loop.
3. Switch to the admin portal and run a rainfall or flooding simulation.
4. Point out how the trigger creates claims, how fraud posture changes routing, and how the review queue stays visible.

## What Is Real In The Repo Today

- database-backed worker registration, login, policy, claim, payout, and admin flows
- multilingual worker interface in English, Hindi, and Kannada
- dual-signal trigger engine across rainfall, AQI, heat, curfew, and flooding
- post-payout feedback persistence plus renewal credit application on renewal
- readiness, health, metrics, rate limiting, and background jobs

## What Is Deliberately Honest

- OTP, KYC, payout, and carrier integrations use sandbox fallbacks unless credentials are configured
- pricing is calibrated from synthetic Bengaluru disruption profiles, not filed actuarial tables
- the product is deployable as a demo but not presented as a regulated production insurer stack

## What Evaluators Should Notice

- the product thesis is specific to delivery-worker disruption, not generic insurance language
- the worker flow is unusually legible for a hackathon build
- the system exposes decision posture instead of hiding behind "AI did it"
- the repo separates implemented behavior from future integrations clearly
