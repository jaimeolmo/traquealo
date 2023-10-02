# Traquealo Development

## Clerk Setup

Environment variables needed:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=sk_test_••••••••••••••••••••••••••••••••••
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

Webhook

A webhook is needed to create an entry in the cosmosDb User document. The only property needed is user_id.

Ngrok

To test the Clerk webhook, use Ngrok.
