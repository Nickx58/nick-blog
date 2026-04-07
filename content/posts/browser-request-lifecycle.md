---
title: "The Full Browser Request Lifecycle: DNS to First Paint"
date: "2026-03-12"
description: "A deep dive into what actually happens when you hit Enter — from DNS resolution and TCP/TLS handshakes to the critical rendering path and when pixels finally appear on screen."
tags: ["system-design", "frontend", "performance"]
featured: true
published: true
---

Every frontend engineer types URLs into a browser dozens of times a day. But what actually happens between pressing Enter and seeing a page? This is one of the most common senior frontend interview questions — and most engineers can't answer it end-to-end.

Here's the complete picture.

## 1. DNS Resolution

Before any data moves, the browser needs to turn a domain name into an IP address.

1. **Browser cache** — checks if it already has a cached DNS record
2. **OS cache** — checks `/etc/hosts` and the OS-level DNS cache
3. **Router cache** — your local router may have it
4. **ISP recursive resolver** — queries upstream if none of the above hit
5. **Root nameservers → TLD → authoritative** — the full recursive lookup

The result is an IP address. This typically takes 20–120ms on a cold start, which is why DNS prefetching (`<link rel="dns-prefetch">`) meaningfully improves performance.

## 2. TCP Connection

With an IP in hand, the browser opens a TCP connection via the three-way handshake:

```
Client → SYN       → Server
Client ← SYN-ACK   ← Server
Client → ACK        → Server
```

This alone adds one round-trip time (RTT) of latency before a single byte of HTTP data moves. For a server 100ms away, that's 100ms gone.

**HTTP/2 and connection reuse** — modern browsers keep TCP connections alive and reuse them across requests, which is why connection pooling matters.

## 3. TLS Handshake (HTTPS)

If the site uses HTTPS (and it should), there's an additional handshake on top of TCP:

- **TLS 1.3** (modern): 1 RTT — the client sends supported cipher suites, server responds with its certificate and session keys in one round trip
- **TLS 1.2** (older): 2 RTTs

This is why TLS 1.3 adoption matters for performance — it cuts the handshake cost in half.

## 4. HTTP Request & Response

Now the browser sends the actual HTTP request:

```
GET / HTTP/2
Host: nikhilsharma.dev
Accept: text/html
Accept-Encoding: gzip, br
```

The server processes this and returns the HTML with headers including `Content-Type`, `Cache-Control`, and optionally `ETag` for caching.

**Time to First Byte (TTFB)** is measured here — how long before the first byte of the response arrives. Google considers under 800ms "good".

## 5. The Critical Rendering Path

This is where most frontend engineers drop the ball in interviews. Once HTML starts arriving:

### HTML Parsing → DOM

The browser parses HTML top-to-bottom, building the Document Object Model (DOM). It stops ("blocks") when it hits:

- A `<script>` without `async` or `defer`
- A `<link rel="stylesheet">` (because JS might read styles)

This is why `<script>` tags go at the bottom or use `defer`.

### CSS Parsing → CSSOM

Simultaneously (if CSS is already downloading), the browser builds the CSS Object Model — a tree of computed styles.

### Render Tree

DOM + CSSOM merge into the **Render Tree** — only visible elements, with their computed styles. `display: none` elements are excluded.

### Layout (Reflow)

The browser calculates the exact size and position of every element on the screen. This is expensive — changing the width of a parent can reflow hundreds of children.

### Paint

Pixels are drawn into layers. Text, colors, images, borders — all rasterized.

### Composite

Layers are composited together (often by the GPU) to produce the final frame on screen.

## Key Metrics

| Metric | What it measures           | Good threshold |
| ------ | -------------------------- | -------------- |
| TTFB   | Server responsiveness      | < 800ms        |
| FCP    | First Contentful Paint     | < 1.8s         |
| LCP    | Largest Contentful Paint   | < 2.5s         |
| CLS    | Layout shift               | < 0.1          |
| INP    | Interaction responsiveness | < 200ms        |

## The Interview Answer

When asked "what happens when you type a URL", cover these five layers:

1. **DNS** — domain to IP
2. **TCP** — connection establishment
3. **TLS** — encryption handshake
4. **HTTP** — request/response
5. **CRP** — HTML → DOM → Render Tree → Layout → Paint → Composite

Most engineers stop at step 4. Step 5 is what separates a frontend engineer from a general web developer.
