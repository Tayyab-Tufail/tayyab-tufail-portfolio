import os

app_dir = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio\.capture-nexamart'
os.makedirs(app_dir, exist_ok=True)

html_code = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1280, initial-scale=1.0">
  <title>NexaMart: MERN Stack E-Commerce Platform</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #0b0f17;
      --bg-card: #131b2e;
      --bg-card-hover: #1c2742;
      --border: #233152;
      --accent-emerald: #10b981;
      --accent-cyan: #06b6d4;
      --accent-purple: #8b5cf6;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --text-dim: #6b7280;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
    body { background-color: var(--bg-dark); color: var(--text-main); width: 1280px; min-height: 800px; overflow-x: hidden; }

    /* Top Navigation Bar */
    .navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 36px; background: #0f172a; border-bottom: 1px solid var(--border); }
    .brand-logo { display: flex; align-items: center; gap: 12px; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .brand-logo .icon { background: linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan)); width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; font-size: 20px; font-weight: 900; color: #0b0f17; }
    .brand-logo span { background: linear-gradient(135deg, #fff 40%, var(--text-muted)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .search-box { display: flex; align-items: center; background: #1e293b; border: 1px solid var(--border); border-radius: 8px; padding: 8px 16px; width: 450px; gap: 10px; }
    .search-box input { background: transparent; border: none; outline: none; color: #fff; width: 100%; font-size: 14px; }
    .nav-actions { display: flex; align-items: center; gap: 20px; font-size: 14px; color: var(--text-muted); }
    .badge-pill { background: var(--accent-emerald); color: #0b0f17; padding: 2px 8px; border-radius: 20px; font-weight: 700; font-size: 11px; }

    /* Main Container */
    .container { padding: 32px 36px; }

    /* View Sections */
    .view-section { display: none; }
    .view-section.active { display: block; }

    /* Storefront Hero */
    .hero-banner { background: linear-gradient(135deg, #064e3b 0%, #0f172a 60%, #1e1b4b 100%); border: 1px solid var(--border); border-radius: 16px; padding: 48px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: center; box-shadow: 0 20px 40px rgba(0,0,0,0.4); margin-bottom: 36px; position: relative; overflow: hidden; }
    .hero-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: var(--accent-emerald); padding: 6px 14px; border-radius: 30px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
    .hero-title { font-size: 42px; font-weight: 800; line-height: 1.15; letter-spacing: -1.5px; margin-bottom: 16px; }
    .hero-title span { color: var(--accent-emerald); }
    .hero-desc { color: var(--text-muted); font-size: 15px; line-height: 1.7; margin-bottom: 28px; }
    .btn-primary { background: linear-gradient(135deg, var(--accent-emerald), #059669); color: #0b0f17; font-weight: 800; padding: 12px 28px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; display: inline-flex; align-items: center; gap: 10px; }
    .btn-secondary { background: #1e293b; color: #fff; border: 1px solid var(--border); font-weight: 600; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; }

    /* Product Grid */
    .grid-title { font-size: 22px; font-weight: 800; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
    .product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .product-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 18px; position: relative; }
    .product-img { background: #0f172a; border-radius: 10px; height: 160px; display: grid; place-items: center; margin-bottom: 16px; font-size: 48px; }
    .product-cat { font-size: 11px; text-transform: uppercase; color: var(--accent-cyan); letter-spacing: 1px; font-weight: 700; margin-bottom: 6px; }
    .product-name { font-size: 15px; font-weight: 700; margin-bottom: 10px; line-height: 1.3; }
    .product-price { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
    .price-val { font-size: 18px; font-weight: 800; color: #fff; }
    .rating-star { color: #f59e0b; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 4px; }

    /* Sidebar Layout */
    .catalog-layout { display: grid; grid-template-columns: 260px 1fr; gap: 28px; }
    .filter-panel { background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 20px; height: fit-content; }
    .filter-group { margin-bottom: 24px; }
    .filter-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); font-weight: 700; margin-bottom: 14px; }
    .filter-option { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 14px; color: #d1d5db; }

    /* Tables & Admin */
    .admin-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 28px; }
    .stat-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
    .stat-val { font-size: 28px; font-weight: 800; margin: 8px 0 4px; }
    .stat-change { font-size: 12px; font-weight: 600; color: var(--accent-emerald); }
    .data-table { width: 100%; border-collapse: collapse; background: var(--bg-card); border-radius: 12px; overflow: hidden; border: 1px solid var(--border); }
    .data-table th, .data-table td { padding: 14px 20px; text-align: left; border-bottom: 1px solid var(--border); font-size: 13px; }
    .data-table th { background: #0f172a; color: var(--text-muted); font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }

    /* Status Badges */
    .status { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; display: inline-block; }
    .status-success { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
    .status-warning { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
    .status-info { background: rgba(6, 182, 212, 0.2); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.4); }

    /* Architecture Grid */
    .arch-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 24px; }
    .arch-card { background: #0f172a; border: 1px solid var(--border); border-radius: 14px; padding: 24px; }
    .arch-card h3 { color: var(--accent-cyan); font-size: 16px; margin-bottom: 12px; }
  </style>
</head>
<body>

  <!-- Top Navigation Bar -->
  <div class="navbar">
    <div class="brand-logo">
      <div class="icon">N</div>
      <span>NexaMart MERN</span>
    </div>
    <div class="search-box">
      <svg width="18" height="18" fill="none" stroke="#9ca3af" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      <input type="text" value="Search laptops, wireless audio, 4K monitors..." />
    </div>
    <div class="nav-actions">
      <span>Catalog</span>
      <span>Deals</span>
      <span>Orders</span>
      <div style="position:relative">Cart <span class="badge-pill">3</span></div>
      <div style="background:#1e293b; padding:6px 14px; border-radius:20px; border:1px solid var(--border); color:#fff; font-weight:600">⚡ Tayyab (Admin)</div>
    </div>
  </div>

  <div class="container">

    <!-- VIEW 01: STOREFRONT HERO -->
    <div id="view-01" class="view-section active">
      <div class="hero-banner">
        <div>
          <div class="hero-tag">🚀 Spring Tech Summit 2026</div>
          <h1 class="hero-title">Next-Gen MERN <span>E-Commerce Engine</span></h1>
          <p class="hero-desc">Powered by Node.js, Express, MongoDB Atlas, Redux Toolkit, and Stripe API. Experience sub-50ms query speeds with Redis caching and real-time order processing.</p>
          <div>
            <button class="btn-primary">Explore Catalog &rarr;</button>
            <button class="btn-secondary">System Architecture</button>
          </div>
        </div>
        <div style="background:#0f172a; border:1px solid var(--border); border-radius:14px; padding:24px; box-shadow:0 10px 30px rgba(0,0,0,0.5)">
          <div style="font-size:12px; color:var(--accent-emerald); font-weight:800; margin-bottom:8px; text-transform:uppercase">🔥 Featured Deal of the Day</div>
          <h3 style="font-size:20px; font-weight:800; margin-bottom:8px">Pro-Book M3 Max Ultra (32GB / 1TB SSD)</h3>
          <div style="font-size:24px; font-weight:800; color:#fff; margin-bottom:12px">$2,499.00 <span style="font-size:14px; color:var(--text-dim); text-decoration:line-through">$2,899.00</span></div>
          <div style="display:flex; gap:12px; margin-bottom:20px">
            <div style="background:#1e293b; padding:8px 12px; border-radius:6px; text-align:center"><strong style="font-size:16px">04</strong><div style="font-size:10px; color:var(--text-muted)">HOURS</div></div>
            <div style="background:#1e293b; padding:8px 12px; border-radius:6px; text-align:center"><strong style="font-size:16px">32</strong><div style="font-size:10px; color:var(--text-muted)">MINS</div></div>
            <div style="background:#1e293b; padding:8px 12px; border-radius:6px; text-align:center"><strong style="font-size:16px">45</strong><div style="font-size:10px; color:var(--text-muted)">SECS</div></div>
          </div>
          <button class="btn-primary" style="width:100%">Add to Cart & Checkout</button>
        </div>
      </div>

      <div class="grid-title">
        <span>Trending Hardware & Accessories</span>
        <span style="font-size:13px; color:var(--accent-cyan); font-weight:600; cursor:pointer">View All (48 Products) &rarr;</span>
      </div>

      <div class="product-grid">
        <div class="product-card">
          <div class="product-img">🎧</div>
          <div class="product-cat">AUDIO / WIRELESS</div>
          <div class="product-name">CyberSound ANC Wireless Headphones</div>
          <div class="rating-star">★ 4.9 (128 reviews)</div>
          <div class="product-price">
            <span class="price-val">$299.00</span>
            <button class="btn-primary" style="padding:6px 12px; font-size:12px">+ Add</button>
          </div>
        </div>
        <div class="product-card">
          <div class="product-img">🖥️</div>
          <div class="product-cat">GAMING / MONITORS</div>
          <div class="product-name">Quantum 34" Curved OLED 240Hz</div>
          <div class="rating-star">★ 5.0 (84 reviews)</div>
          <div class="product-price">
            <span class="price-val">$899.00</span>
            <button class="btn-primary" style="padding:6px 12px; font-size:12px">+ Add</button>
          </div>
        </div>
        <div class="product-card">
          <div class="product-img">⌨️</div>
          <div class="product-cat">PERIPHERALS</div>
          <div class="product-name">Mechanical RGB Custom Keyboard</div>
          <div class="rating-star">★ 4.8 (210 reviews)</div>
          <div class="product-price">
            <span class="price-val">$179.00</span>
            <button class="btn-primary" style="padding:6px 12px; font-size:12px">+ Add</button>
          </div>
        </div>
        <div class="product-card">
          <div class="product-img">⌚</div>
          <div class="product-cat">SMART WATCHES</div>
          <div class="product-name">Apex Pro Health & Fitness Tracker</div>
          <div class="rating-star">★ 4.7 (95 reviews)</div>
          <div class="product-price">
            <span class="price-val">$249.00</span>
            <button class="btn-primary" style="padding:6px 12px; font-size:12px">+ Add</button>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW 02: PRODUCT CATALOG & FILTER SEARCH -->
    <div id="view-02" class="view-section">
      <div style="font-size:24px; font-weight:800; margin-bottom:24px">Explore Hardware Catalog & Multi-Filter Search</div>
      <div class="catalog-layout">
        <div class="filter-panel">
          <div class="filter-group">
            <div class="filter-title">Categories</div>
            <div class="filter-option"><input type="checkbox" checked /> Laptops & Computers (24)</div>
            <div class="filter-option"><input type="checkbox" checked /> Audio & Headphones (18)</div>
            <div class="filter-option"><input type="checkbox" /> Monitors & Displays (12)</div>
            <div class="filter-option"><input type="checkbox" /> Smart Home & IoT (15)</div>
          </div>
          <div class="filter-group">
            <div class="filter-title">Price Range ($)</div>
            <input type="range" min="50" max="3000" value="1500" style="width:100%; accent-color:var(--accent-emerald)" />
            <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-muted); margin-top:6px">
              <span>$50</span><span>$1,500</span><span>$3,000</span>
            </div>
          </div>
          <button class="btn-primary" style="width:100%">Apply Filters</button>
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; background:var(--bg-card); padding:12px 20px; border-radius:10px; border:1px solid var(--border)">
            <span style="font-size:14px; color:var(--text-muted)">Showing <strong>1 - 6</strong> of 48 items matching filter</span>
            <div style="display:flex; gap:12px; align-items:center; font-size:13px">
              <span>Sort by:</span>
              <select style="background:#0f172a; color:#fff; border:1px solid var(--border); padding:6px 12px; border-radius:6px"><option>Highest Rated</option><option>Price: Low to High</option><option>Newest Arrivals</option></select>
            </div>
          </div>
          <div class="product-grid" style="grid-template-columns:repeat(3,1fr)">
            <div class="product-card"><div class="product-img">💻</div><div class="product-cat">LAPTOPS</div><div class="product-name">Blade Stealth 16 Gaming Laptop</div><div class="rating-star">★ 4.9 (45)</div><div class="product-price"><span class="price-val">$1,999.00</span><button class="btn-primary" style="padding:6px 12px">+ Cart</button></div></div>
            <div class="product-card"><div class="product-img">🎧</div><div class="product-cat">AUDIO</div><div class="product-name">Studio Monitor Headphones Pro</div><div class="rating-star">★ 4.8 (82)</div><div class="product-price"><span class="price-val">$349.00</span><button class="btn-primary" style="padding:6px 12px">+ Cart</button></div></div>
            <div class="product-card"><div class="product-img">🖥️</div><div class="product-cat">MONITORS</div><div class="product-name">UltraWide 49" Dual QHD Curved</div><div class="rating-star">★ 5.0 (31)</div><div class="product-price"><span class="price-val">$1,299.00</span><button class="btn-primary" style="padding:6px 12px">+ Cart</button></div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW 03: PRODUCT DETAIL PAGE & REVIEWS -->
    <div id="view-03" class="view-section">
      <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:16px; padding:36px; display:grid; grid-template-columns:1fr 1.1fr; gap:40px">
        <div>
          <div style="background:#0f172a; border-radius:12px; height:340px; display:grid; place-items:center; border:1px solid var(--border); font-size:96px">🎧</div>
          <div style="display:flex; gap:12px; margin-top:16px">
            <div style="background:#0f172a; border:2px solid var(--accent-emerald); border-radius:8px; width:70px; height:70px; display:grid; place-items:center; font-size:28px">🎧</div>
            <div style="background:#0f172a; border:1px solid var(--border); border-radius:8px; width:70px; height:70px; display:grid; place-items:center; font-size:28px">📦</div>
            <div style="background:#0f172a; border:1px solid var(--border); border-radius:8px; width:70px; height:70px; display:grid; place-items:center; font-size:28px">⚡</div>
          </div>
        </div>
        <div>
          <div style="font-size:12px; color:var(--accent-emerald); font-weight:700; text-transform:uppercase; margin-bottom:8px">In Stock · Ready to Ship</div>
          <h1 style="font-size:32px; font-weight:800; margin-bottom:12px">CyberSound Pro ANC Wireless Headphones</h1>
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px">
            <div class="rating-star" style="font-size:16px">★★★★★ 4.95</div>
            <span style="color:var(--text-muted); font-size:14px">(128 customer reviews)</span>
          </div>
          <div style="font-size:36px; font-weight:800; margin-bottom:20px">$299.00 <span style="font-size:16px; color:var(--text-dim); text-decoration:line-through">$349.00</span></div>
          <p style="color:var(--text-muted); line-height:1.7; font-size:14px; margin-bottom:24px">Active Noise Cancellation (ANC) with 40mm Titanium drivers, 45-hour battery life, spatial audio processing, and dual-device Bluetooth 5.3 connection.</p>
          <div style="display:flex; gap:16px">
            <button class="btn-primary" style="flex:1; padding:16px; font-size:16px">🛒 Add to Cart ($299.00)</button>
            <button class="btn-secondary" style="padding:16px; font-size:16px">❤️ Wishlist</button>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW 04: SHOPPING CART DRAWER -->
    <div id="view-04" class="view-section">
      <div style="display:grid; grid-template-columns:1fr 400px; gap:28px">
        <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:16px; padding:28px">
          <h2 style="font-size:22px; font-weight:800; margin-bottom:20px">Shopping Cart (2 items)</h2>
          <div style="display:flex; gap:20px; border-bottom:1px solid var(--border); padding-bottom:20px; margin-bottom:20px; align-items:center">
            <div style="background:#0f172a; width:80px; height:80px; border-radius:10px; display:grid; place-items:center; font-size:36px">🎧</div>
            <div style="flex:1">
              <h4 style="font-size:16px; font-weight:700">CyberSound Pro ANC Headphones</h4>
              <div style="font-size:13px; color:var(--text-muted)">Color: Space Black</div>
              <div style="font-size:16px; font-weight:800; margin-top:6px">$299.00</div>
            </div>
            <div style="display:flex; align-items:center; gap:12px; background:#0f172a; padding:6px 12px; border-radius:6px; border:1px solid var(--border)">
              <span>Qty: 1</span>
            </div>
          </div>
          <div style="display:flex; gap:20px; border-bottom:1px solid var(--border); padding-bottom:20px; align-items:center">
            <div style="background:#0f172a; width:80px; height:80px; border-radius:10px; display:grid; place-items:center; font-size:36px">⌨️</div>
            <div style="flex:1">
              <h4 style="font-size:16px; font-weight:700">Mechanical RGB Custom Keyboard</h4>
              <div style="font-size:13px; color:var(--text-muted)">Switch: Tactile Brown</div>
              <div style="font-size:16px; font-weight:800; margin-top:6px">$179.00</div>
            </div>
            <div style="display:flex; align-items:center; gap:12px; background:#0f172a; padding:6px 12px; border-radius:6px; border:1px solid var(--border)">
              <span>Qty: 2</span>
            </div>
          </div>
        </div>
        <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:16px; padding:28px">
          <h3 style="font-size:18px; font-weight:800; margin-bottom:20px">Order Summary</h3>
          <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:12px; color:var(--text-muted)">
            <span>Subtotal</span><span>$657.00</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:12px; color:var(--text-muted)">
            <span>Shipping</span><span style="color:var(--accent-emerald)">FREE</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:20px; font-weight:800; padding-top:16px; border-top:1px solid var(--border); margin-bottom:24px">
            <span>Total</span><span>$709.56</span>
          </div>
          <button class="btn-primary" style="width:100%; padding:14px; font-size:15px">Proceed to Checkout &rarr;</button>
        </div>
      </div>
    </div>

    <!-- VIEW 05: MULTI-STEP CHECKOUT & STRIPE GATEWAY -->
    <div id="view-05" class="view-section">
      <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:16px; padding:36px; max-width:900px; margin:auto">
        <div style="display:flex; justify-content:space-between; margin-bottom:32px; border-bottom:1px solid var(--border); padding-bottom:20px">
          <div style="font-weight:700; color:var(--accent-emerald)">✓ 1. Shipping Address</div>
          <div style="font-weight:700; color:var(--accent-cyan)">● 2. Payment Gateway (Stripe)</div>
          <div style="font-weight:700; color:var(--text-dim)">3. Order Confirmation</div>
        </div>
        <h2 style="font-size:22px; font-weight:800; margin-bottom:20px">Secure Stripe Card Payment</h2>
        <div style="background:#0f172a; border:1px solid var(--border); border-radius:12px; padding:24px; margin-bottom:24px">
          <label style="display:block; font-size:13px; color:var(--text-muted); margin-bottom:8px">Card Number</label>
          <input type="text" value="4242 •••• •••• 4242" style="width:100%; background:#1e293b; border:1px solid var(--border); padding:12px; border-radius:8px; color:#fff; font-size:16px; margin-bottom:16px" />
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px">
            <div>
              <label style="display:block; font-size:13px; color:var(--text-muted); margin-bottom:8px">Expiration</label>
              <input type="text" value="12 / 28" style="width:100%; background:#1e293b; border:1px solid var(--border); padding:12px; border-radius:8px; color:#fff; font-size:16px" />
            </div>
            <div>
              <label style="display:block; font-size:13px; color:var(--text-muted); margin-bottom:8px">CVC</label>
              <input type="text" value="•••" style="width:100%; background:#1e293b; border:1px solid var(--border); padding:12px; border-radius:8px; color:#fff; font-size:16px" />
            </div>
          </div>
        </div>
        <button class="btn-primary" style="width:100%; padding:16px; font-size:16px">🔒 Pay $709.56 with 256-Bit SSL Encryption</button>
      </div>
    </div>

    <!-- VIEW 06: ADMIN ANALYTICS & REVENUE DASHBOARD -->
    <div id="view-06" class="view-section">
      <div style="font-size:24px; font-weight:800; margin-bottom:24px">MERN Admin Analytics & Revenue Command Center</div>
      <div class="admin-stats">
        <div class="stat-card">
          <div style="font-size:13px; color:var(--text-muted)">Total Monthly Revenue</div>
          <div class="stat-val">$128,450.00</div>
          <div class="stat-change">▲ +18.4% vs last month</div>
        </div>
        <div class="stat-card">
          <div style="font-size:13px; color:var(--text-muted)">Completed Orders</div>
          <div class="stat-val">1,420</div>
          <div class="stat-change">▲ +12.1% this week</div>
        </div>
        <div class="stat-card">
          <div style="font-size:13px; color:var(--text-muted)">Active Customers</div>
          <div class="stat-val">8,940</div>
          <div class="stat-change">▲ +24.5% total user base</div>
        </div>
        <div class="stat-card">
          <div style="font-size:13px; color:var(--text-muted)">Redis Cache Hit Rate</div>
          <div class="stat-val">99.4%</div>
          <div class="stat-change" style="color:var(--accent-cyan)">⚡ Avg response 24ms</div>
        </div>
      </div>
      <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:16px; padding:28px">
        <h3 style="font-size:18px; font-weight:800; margin-bottom:20px">Live Sales Velocity (MongoDB Time-Series)</h3>
        <div style="height:220px; background:#0f172a; border-radius:12px; border:1px solid var(--border); display:flex; align-items:flex-end; gap:24px; padding:20px 40px">
          <div style="flex:1; background:var(--accent-emerald); height:40%; border-radius:6px 6px 0 0"></div>
          <div style="flex:1; background:var(--accent-emerald); height:55%; border-radius:6px 6px 0 0"></div>
          <div style="flex:1; background:var(--accent-emerald); height:70%; border-radius:6px 6px 0 0"></div>
          <div style="flex:1; background:var(--accent-emerald); height:60%; border-radius:6px 6px 0 0"></div>
          <div style="flex:1; background:var(--accent-emerald); height:85%; border-radius:6px 6px 0 0"></div>
          <div style="flex:1; background:var(--accent-emerald); height:100%; border-radius:6px 6px 0 0"></div>
        </div>
      </div>
    </div>

    <!-- VIEW 07: INVENTORY MANAGEMENT GRID -->
    <div id="view-07" class="view-section">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px">
        <h2 style="font-size:24px; font-weight:800">Product Inventory & Stock Management</h2>
        <button class="btn-primary">+ Add New Product</button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>SKU Code</th>
            <th>Stock Level</th>
            <th>Price ($)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>CyberSound Pro ANC Headphones</strong></td>
            <td>Audio</td>
            <td>SKU-8841-BLK</td>
            <td>142 units</td>
            <td>$299.00</td>
            <td><span class="status status-success">In Stock</span></td>
          </tr>
          <tr>
            <td><strong>Pro-Book M3 Max Ultra 16"</strong></td>
            <td>Laptops</td>
            <td>SKU-9920-MAC</td>
            <td>8 units</td>
            <td>$2,499.00</td>
            <td><span class="status status-warning">Low Stock</span></td>
          </tr>
          <tr>
            <td><strong>Quantum 34" Curved OLED 240Hz</strong></td>
            <td>Monitors</td>
            <td>SKU-3321-DISP</td>
            <td>56 units</td>
            <td>$899.00</td>
            <td><span class="status status-success">In Stock</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- VIEW 08: ORDER MANAGEMENT & FULFILLMENT -->
    <div id="view-08" class="view-section">
      <h2 style="font-size:24px; font-weight:800; margin-bottom:24px">Customer Orders & Fulfillment Pipeline</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date & Time</th>
            <th>Payment Status</th>
            <th>Total</th>
            <th>Fulfillment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#ORD-2026-9901</td>
            <td>Sarah Jenkins (sarah.j@gmail.com)</td>
            <td>Sep 21, 2026 - 02:14 AM</td>
            <td><span class="status status-success">Paid via Stripe</span></td>
            <td>$709.56</td>
            <td><span class="status status-info">Shipped (FedEx)</span></td>
          </tr>
          <tr>
            <td>#ORD-2026-9902</td>
            <td>Michael Chen (m.chen@tech.org)</td>
            <td>Sep 21, 2026 - 01:50 AM</td>
            <td><span class="status status-success">Paid via Stripe</span></td>
            <td>$2,499.00</td>
            <td><span class="status status-warning">Processing</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- VIEW 09: CUSTOMER WISHLIST & ACCOUNT -->
    <div id="view-09" class="view-section">
      <h2 style="font-size:24px; font-weight:800; margin-bottom:24px">Customer Account & Saved Wishlist</h2>
      <div class="product-grid" style="grid-template-columns:repeat(3,1fr)">
        <div class="product-card">
          <div class="product-img">⌨️</div>
          <div class="product-name">Mechanical RGB Custom Keyboard</div>
          <div class="product-price"><span class="price-val">$179.00</span><button class="btn-primary">Move to Cart</button></div>
        </div>
        <div class="product-card">
          <div class="product-img">🖥️</div>
          <div class="product-name">Quantum 34" Curved OLED</div>
          <div class="product-price"><span class="price-val">$899.00</span><button class="btn-primary">Move to Cart</button></div>
        </div>
      </div>
    </div>

    <!-- VIEW 10: FLASH SALES & DEALS COUNTDOWN -->
    <div id="view-10" class="view-section">
      <div style="background:linear-gradient(135deg, #7c3aed, #4c1d95); border-radius:16px; padding:48px; text-align:center; color:#fff">
        <h1 style="font-size:36px; font-weight:800; margin-bottom:12px">⚡ Flash Sales & Cyber Weekend Deals</h1>
        <p style="font-size:16px; opacity:0.9; margin-bottom:24px">Up to 50% Off Top Hardware & Accessories · Ends Midnight</p>
        <button class="btn-primary" style="background:#fff; color:#4c1d95">Shop All Flash Deals &rarr;</button>
      </div>
    </div>

    <!-- VIEW 11: REVIEWS & REPUTATION ENGINE -->
    <div id="view-11" class="view-section">
      <h2 style="font-size:24px; font-weight:800; margin-bottom:24px">Verified Customer Reviews & Feedback</h2>
      <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:16px; padding:28px; margin-bottom:20px">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
          <strong style="font-size:16px">Alex Rivera</strong>
          <span style="color:var(--accent-emerald); font-size:12px; font-weight:700">✓ Verified Buyer</span>
        </div>
        <div class="rating-star" style="margin-bottom:10px">★★★★★ Exceptional Sound Quality & Battery Life</div>
        <p style="color:var(--text-muted); font-size:14px; line-height:1.7">The ANC on these CyberSound headphones is incredible. Fast delivery with real-time tracking!</p>
      </div>
    </div>

    <!-- VIEW 12: MERN SYSTEM ARCHITECTURE BLUEPRINT -->
    <div id="view-12" class="view-section">
      <h2 style="font-size:24px; font-weight:800; margin-bottom:12px">MERN Stack System Architecture & Infrastructure</h2>
      <p style="color:var(--text-muted); margin-bottom:24px">Distributed microservices model with Node.js/Express RESTful APIs, MongoDB cluster, Redis session caching, and Stripe webhooks.</p>
      <div class="arch-grid">
        <div class="arch-card">
          <h3>1. Frontend (React 19 + Redux)</h3>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.7">Single Page Application with dynamic state management, Redux Toolkit, Tailwind CSS, and Stripe Elements integration.</p>
        </div>
        <div class="arch-card">
          <h3>2. Backend (Express + Node.js)</h3>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.7">RESTful API Gateway, JWT authentication, rate limiting, and Stripe Webhook event listeners.</p>
        </div>
        <div class="arch-card">
          <h3>3. Database (MongoDB + Redis)</h3>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.7">MongoDB Atlas cluster with indexing for product catalogs and Redis cache layer for high throughput.</p>
        </div>
      </div>
    </div>

  </div>

</body>
</html>
"""

target = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio\.capture-nexamart\index.html'
with open(target, 'w', encoding='utf-8') as f:
    f.write(html_code)

print('Wrote HTML file to:', target)
