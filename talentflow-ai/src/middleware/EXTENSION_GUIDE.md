# Middleware Extension Guide

## Adding New Middleware

To add a new middleware handler (e.g., rate limiting, logging, header validation):

1. Create a new handler file in `src/middleware/handlers/`:

```typescript
// src/middleware/handlers/my-new-handler.ts
import { NextRequest, NextResponse } from "next/server";
import { MiddlewareResult } from "../types";

export function createMyNewHandler(): (request: NextRequest) => MiddlewareResult {
  return function (request: NextRequest): MiddlewareResult {
    // Your logic here
    
    return {
      response: NextResponse.next(),
      handled: false, // false = continue to next handler
    };
  };
}
```

2. Export it from `src/middleware/handlers/index.ts`:

```typescript
export { createMyNewHandler } from "./my-new-handler";
```

3. Add it to the middleware chain in `src/middleware.ts`:

```typescript
import { createMyNewHandler } from "./handlers";

const middlewareHandlers = [
  createRouteProtectionHandler(),
  createAuthRedirectHandler(),
  createMyNewHandler(), // Add your new handler here
];
```

## Handler Pattern

- Return `{ handled: true }` to stop the chain and return that response
- Return `{ handled: false }` to continue to the next handler
- Handlers execute in order (top to bottom)

## Examples

### Rate Limiting

```typescript
export function createRateLimitHandler(): (request: NextRequest) => MiddlewareResult {
  return function (request: NextRequest): MiddlewareResult {
    const ip = request.ip;
    // Check rate limit logic
    
    if (isRateLimited(ip)) {
      return {
        response: NextResponse.json({ error: "Rate limited" }, { status: 429 }),
        handled: true,
      };
    }
    
    return { response: NextResponse.next(), handled: false };
  };
}
```

### Logging

```typescript
export function createLoggingHandler(): (request: NextRequest) => MiddlewareResult {
  return function (request: NextRequest): MiddlewareResult {
    console.log(`${request.method} ${request.nextUrl.pathname}`);
    return { response: NextResponse.next(), handled: false };
  };
}
```
