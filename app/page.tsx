"use client";

import React, { useEffect } from "react";

export default function Home() {
  return <StonkspilledLanding />;
}

function StonkspilledLanding() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      (cursor as HTMLElement).style.left = `${mx}px`;
      (cursor as HTMLElement).style.top = `${my}px`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      (ring as HTMLElement).style.left = `${rx}px`;
      (ring as HTMLElement).style.top = `${ry}px`;
      rafId = window.requestAnimationFrame(animateRing);
    };

    const enter = () => {
      (cursor as HTMLElement).style.width = "16px";
      (cursor as HTMLElement).style.height = "16px";
      (ring as HTMLElement).style.width = "52px";
      (ring as HTMLElement).style.height = "52px";
    };

    const leave = () => {
      (cursor as HTMLElement).style.width = "10px";
      (cursor as HTMLElement).style.height = "10px";
      (ring as HTMLElement).style.width = "36px";
      (ring as HTMLElement).style.height = "36px";
    };

    const hoverEls = Array.from(
      document.querySelectorAll("a, button, .market-card, .step, .feature"),
    );

    const nav = document.getElementById("nav");
    const onScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 60);
    };

    const reveals = Array.from(document.querySelectorAll(".reveal"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            window.setTimeout(
              () => entry.target.classList.add("visible"),
              i * 80,
            );
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    reveals.forEach((el) => obs.observe(el));

    const randomizeTickerValues = () => {
      const ups = document.querySelectorAll(".ticker-item .up");
      ups.forEach((el) => {
        const base = parseFloat(el.textContent || "0");
        const delta = (Math.random() - 0.5) * 0.3;
        const newVal = Math.max(0.01, base + delta);
        el.textContent = `${newVal >= 0 ? "+" : ""}${newVal.toFixed(2)}%`;
      });
    };

    const tickerInterval = window.setInterval(randomizeTickerValues, 4000);

    // Count-up stats (mobile + desktop)
    const countEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]"),
    );
    const animateCount = (el: HTMLElement) => {
      const target = Number(el.dataset.count || "0");
      if (!Number.isFinite(target) || target <= 0) return;
      const durationMs = 900;
      const start = performance.now();
      const from = 0;

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.round(from + (target - from) * eased);
        el.textContent = String(val);
        if (t < 1) window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    };

    const counted = new WeakSet<HTMLElement>();
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (counted.has(el)) return;
          counted.add(el);
          animateCount(el);
          countObs.unobserve(el);
        });
      },
      { threshold: 0.6 },
    );
    countEls.forEach((el) => countObs.observe(el));

    document.addEventListener("mousemove", onMouseMove);
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();
    animateRing();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
      countObs.disconnect();
      window.clearInterval(tickerInterval);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      <nav id="nav">
        <a href="#" className="logo">
          <svg
            className="logo-mark"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 8 L9.2 28 Q9 32 13 32 L25 32 Q29 32 28.8 28 L28 8 Z"
              fill="#0e1210"
              stroke="#00ffb3"
              strokeWidth="1.2"
            />
            <rect
              x="9"
              y="6"
              width="20"
              height="3.5"
              rx="1.5"
              fill="#141a16"
              stroke="#00ffb3"
              strokeWidth="0.8"
            />
            <path
              d="M28.5 14 Q34 14 34 19 Q34 24 28.5 24"
              fill="none"
              stroke="#00ffb3"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <polyline
              points="12,26 15,19 18,22 22,15 25,18 27,12"
              fill="none"
              stroke="#00ffb3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              clipPath="url(#cupClip)"
            />
            <ellipse
              cx="14"
              cy="34.5"
              rx="2"
              ry="1.2"
              fill="#00ffb3"
              opacity="0.7"
            />
            <ellipse
              cx="20"
              cy="35.5"
              rx="1.5"
              ry="1"
              fill="#00ffb3"
              opacity="0.5"
            />
            <ellipse
              cx="26"
              cy="34"
              rx="1.2"
              ry="0.8"
              fill="#00ffb3"
              opacity="0.4"
            />
            <defs>
              <clipPath id="cupClip">
                <path d="M10 8 L9.2 28 Q9 32 13 32 L25 32 Q29 32 28.8 28 L28 8 Z" />
              </clipPath>
            </defs>
          </svg>
          <span className="logo-text">
            STONKS<span>PILLED</span>
          </span>
        </a>

        <ul className="nav-links">
          <li>
            <a href="#how">How it works</a>
          </li>
          <li>
            <a href="#markets">Markets</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
        </ul>

        <a href="https://t.me/stonkspilledtradebot" className="nav-cta">
          Start Trading →
        </a>
      </nav>

      <section className="hero" id="hero">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="ticker-wrap">
          <div className="ticker">
            <div className="ticker-item">
              <span className="sym">TSLA</span>
              <span className="up">+4.21%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">XAU/USD</span>
              <span className="val">$2,341.50</span>
            </div>
            <div className="ticker-item">
              <span className="sym">SPX</span>
              <span className="up">+1.07%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">BTC/USD</span>
              <span className="up">+2.38%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">EUR/USD</span>
              <span className="dn">-0.14%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">NVDA</span>
              <span className="up">+6.83%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">CL/USD</span>
              <span className="dn">-1.22%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">NDX</span>
              <span className="up">+0.94%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">AAPL</span>
              <span className="up">+0.61%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">XAG/USD</span>
              <span className="up">+1.55%</span>
            </div>

            <div className="ticker-item">
              <span className="sym">TSLA</span>
              <span className="up">+4.21%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">XAU/USD</span>
              <span className="val">$2,341.50</span>
            </div>
            <div className="ticker-item">
              <span className="sym">SPX</span>
              <span className="up">+1.07%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">BTC/USD</span>
              <span className="up">+2.38%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">EUR/USD</span>
              <span className="dn">-0.14%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">NVDA</span>
              <span className="up">+6.83%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">CL/USD</span>
              <span className="dn">-1.22%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">NDX</span>
              <span className="up">+0.94%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">AAPL</span>
              <span className="up">+0.61%</span>
            </div>
            <div className="ticker-item">
              <span className="sym">XAG/USD</span>
              <span className="up">+1.55%</span>
            </div>
          </div>
        </div>

        <div className="hero-inner">
          <div className="hero-eyebrow">Telegram-native RWA perps</div>

          <h1 className="hero-h1">
            Wall Street
            <br />
            <span className="italic">spilled</span>
            <br />
            on-chain.
          </h1>

          <p className="hero-sub">
            Trade stocks, forex, gold, oil and crypto perpetuals directly inside
            Telegram. Just{" "}
            <strong style={{ color: "var(--text)" }}>type and trade.</strong>
          </p>

          {/* <div className="hero-actions">
            <a href="https://t.me/stonkspilledtradebot" className="btn-primary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.475c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.053-.332-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.875.746z" />
              </svg>
              Open in Telegram
            </a>
            <a href="#how" className="btn-secondary">
              See how it works ↓
            </a>
          </div> */}

          
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-label">Total Markets</div>
            <div className="stat-value">
              <span data-count="25">25</span>
              <span className="accent">+</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Max Leverage</div>
            <div className="stat-value">
              <span data-count="500">500</span>
              <span className="accent">×</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Settlement</div>
            <div className="stat-value">USDC</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Network</div>
            <div className="stat-value">
              ARBitrum<span className="accent">+</span>BASE
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Interface</div>
            <div className="stat-value">TELEGRAM</div>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="section-label reveal">How it works</div>
        <h2 className="section-h2 reveal">
          Four steps.
          <br />
          <em>That&apos;s it.</em>
        </h2>

        <div className="steps reveal">
          <div className="step">
            <div className="step-num">01</div>
            <div className="step-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18l-4-4h3V8h2v8h3l-4 4z" />
              </svg>
            </div>
            <div className="step-title">Open the bot</div>
            <div className="step-desc">
              Message <strong>@stonkspilledtradebot</strong> on Telegram. Your
              personal wallet is created instantly — no seed phrases, no
              extensions.
            </div>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <div className="step-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <div className="step-title">Deposit ETH</div>
            <div className="step-desc">
              Deposit <strong>USDC</strong> on Arbitrum or Base to trade, and keep a bit of{" "}
              <strong>ETH </strong> for gas. That&apos;s it.
            </div>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <div className="step-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
            <div className="step-title">Type to trade</div>
            <div className="step-desc">
              <strong>/trade TSLA long 100 20x </strong> — that&apos;s the entire
              interface. No charts to learn, no tabs to open.
            </div>
          </div>
          <div className="step">
            <div className="step-num">04</div>
            <div className="step-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M18 8h1a4 4 0 010 8h-1" />
                <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
            </div>
            <div className="step-title">Get alerts</div>
            <div className="step-desc">
              Liquidation warnings, PnL updates, and price alerts delivered as{" "}
              <strong>Telegram messages.</strong> No app-switching needed.
            </div>
          </div>
        </div>
      </section>

      <section className="markets-section" id="markets">
        <div className="section-label reveal">Markets</div>
        <h2 className="section-h2 reveal">
          Every asset.
          <br />
          <em>One chat.</em>
        </h2>

        <div className="markets-grid reveal">
          <div className="market-card">
            <div className="market-cat">Stock</div>
            <div className="market-name">Tesla</div>
            <div className="market-pair">TSLA/USD</div>
            <div className="market-lev">100×</div>
            <div className="market-arrow">↗</div>
          </div>
          <div className="market-card">
            <div className="market-cat">Stock</div>
            <div className="market-name">NVIDIA</div>
            <div className="market-pair">NVDA/USD</div>
            <div className="market-lev">100×</div>
            <div className="market-arrow">↗</div>
          </div>
          <div className="market-card">
            <div className="market-cat">Commodity</div>
            <div className="market-name">Gold</div>
            <div className="market-pair">XAU/USD</div>
            <div className="market-lev">500×</div>
            <div className="market-arrow">↗</div>
          </div>
          <div className="market-card">
            <div className="market-cat">Commodity</div>
            <div className="market-name">Crude Oil</div>
            <div className="market-pair">CL/USD</div>
            <div className="market-lev">200×</div>
            <div className="market-arrow">↗</div>
          </div>
          <div className="market-card">
            <div className="market-cat">Index</div>
            <div className="market-name">S&amp;P 500</div>
            <div className="market-pair">SPX/USD</div>
            <div className="market-lev">100×</div>
            <div className="market-arrow">↗</div>
          </div>
          <div className="market-card">
            <div className="market-cat">Forex</div>
            <div className="market-name">EUR/USD</div>
            <div className="market-pair">EURUSD</div>
            <div className="market-lev">500×</div>
            <div className="market-arrow">↗</div>
          </div>
          <div className="market-card">
            <div className="market-cat">Crypto</div>
            <div className="market-name">Bitcoin</div>
            <div className="market-pair">BTC/USD</div>
            <div className="market-lev">200×</div>
            <div className="market-arrow">↗</div>
          </div>
          <div className="market-card">
            <div className="market-cat">Stock</div>
            <div className="market-name">Apple</div>
            <div className="market-pair">AAPL/USD</div>
            <div className="market-lev">100×</div>
            <div className="market-arrow">↗</div>
          </div>
          <div className="market-card">
            <div className="market-cat">Index</div>
            <div className="market-name">NASDAQ</div>
            <div className="market-pair">NDX/USD</div>
            <div className="market-lev">100×</div>
            <div className="market-arrow">↗</div>
          </div>
          <div
            className="market-card"
            style={{ background: "var(--green-dark)", cursor: "pointer" }}
          >
            <div
              className="market-cat"
              style={{ color: "rgba(0,255,179,0.6)" }}
            >
              And more
            </div>
            <div className="market-name" style={{ color: "var(--green)" }}>
              25+ Markets
            </div>
            <div
              className="market-pair"
              style={{ color: "rgba(0,255,179,0.5)" }}
            >
              Stocks · Forex · Commodities
            </div>
            <div className="market-lev" style={{ color: "var(--green)" }}>
              →
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="section-label reveal">Features</div>
        <h2 className="section-h2 reveal">
          Built different.
          <br />
          <em>Actually.</em>
        </h2>

        <div className="features-grid reveal">
          <div className="feature feature-large">
            <div>
              <div className="feature-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </div>
              <div className="feature-title">The whole exchange. One command.</div>
              <div className="feature-desc">
                No apps to download. No wallets to configure. No bridge UIs to
                navigate.
                <br />
                <br />
                Your trading terminal lives inside{" "}
                <strong>the app you already have open.</strong> Every command is
                autocompleted by the bot.
              </div>
            </div>
            <div className="terminal">
              <div className="terminal-bar">
                <div className="terminal-dot" style={{ background: "#ff5f57" }} />
                <div className="terminal-dot" style={{ background: "#febc2e" }} />
                <div className="terminal-dot" style={{ background: "#28c840" }} />
                <span
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    color: "var(--muted)",
                    marginLeft: 8,
                  }}
                >
                  @stonkspilledtradebot
                </span>
              </div>
              <div className="terminal-body">
                <div>
                  <span className="cmd">you</span> &nbsp;/trade TSLA long 200 20x
                </div>
                <div className="dim">────────────────────</div>
                <div>
                  <span className="cmd">bot</span> &nbsp;⏳ Opening TSLA long
                  20×...
                </div>
                <div>&nbsp;</div>
                <div>
                  <span className="success">bot</span> &nbsp;🟢 Trade Opened!
                </div>
                <div>
                  <span className="dim">&nbsp;&nbsp;&nbsp;&nbsp; TSLA/USD LONG 20×</span>
                </div>
                <div>
                  <span className="dim">&nbsp;&nbsp;&nbsp;&nbsp; Entry: </span>
                  <span className="val">$187.42</span>
                </div>
                <div>
                  <span className="dim">&nbsp;&nbsp;&nbsp;&nbsp; Size: </span>
                  <span className="val">$4,000</span>
                </div>
                <div>
                  <span className="dim">&nbsp;&nbsp;&nbsp;&nbsp; Liq: </span>
                  <span className="err">$182.00</span>
                </div>
                <div>&nbsp;</div>
                <div>
                  <span className="cmd">you</span> &nbsp;/tp 1 195
                  <span className="blink">▌</span>
                </div>
              </div>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="feature-title">Non-custodial by default</div>
            <div className="feature-desc">
              Every user gets a unique encrypted wallet. Your USDC, your keys —
              the bot only executes what you command.{" "}
              <strong>Your funds are never pooled.</strong>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="feature-title">Market hours awareness</div>
            <div className="feature-desc">
              Stocks only trade during NYSE hours. The bot knows. It shows you{" "}
              <strong>countdowns to open</strong> and blocks trades when markets
              are closed — no silent failures.
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            </div>
            <div className="feature-title">Real-time PnL alerts</div>
            <div className="feature-desc">
              Liquidation warnings at 80% drawdown. Price alerts when your
              targets hit. All delivered as{" "}
              <strong>Telegram push notifications</strong> — no app open required.
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <div className="feature-title">Zero-fee perps on select pairs</div>
            <div className="feature-desc">
              BTC and ETH markets have <strong>zero opening fee</strong>, <strong>loss rebates</strong> if you trade against sentiment. A
              rare edge.
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div
          className="section-label reveal"
          style={{ justifyContent: "center" }}
        >
          Get stonkspilled
        </div>
        <h2 className="cta-h2 reveal">
          Ready to
          <br />
          <span className="green">get pilled?</span>
        </h2>
        <p className="cta-sub reveal">
          Start trading in 60 seconds. No KYC. No downloads. Just Telegram.
        </p>
        <div className="cta-actions reveal">
          <a
            href="https://t.me/stonkspilledtradebot"
            className="btn-primary"
            style={{ fontSize: 16, padding: "18px 40px" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.475c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.053-.332-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.875.746z" />
            </svg>
            Open @stonkspilledtradebot
          </a>
          <a href="https://x.com/stonkspilled" className="btn-secondary">
            Follow on X →
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-copy">
          © 2026 Stonkspilled.trade · Built on Arbitrum and Base
        </div>
        <div className="footer-links">
          <a href="https://x.com/stonkspilled">Twitter</a>
          <a href="https://t.me/stonkspilledtradebot">Telegram</a>
    </div>
      </footer>
    </>
  );
}
