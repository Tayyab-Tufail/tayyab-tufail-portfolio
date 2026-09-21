import os
from PIL import Image, ImageDraw, ImageFont

out_dir = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio\website\public\images'
os.makedirs(out_dir, exist_ok=True)

# Helper function to create stylish Dark Theme E-Commerce UI screens
def create_ui_screen(title, subtitle, view_num, detail_lines, screen_type="grid"):
    w, h = 1280, 800
    img = Image.new('RGB', (w, h), color='#0b0f17')
    draw = ImageDraw.Draw(img)
    
    # Try loading fonts or fallback
    try:
        font_logo = ImageFont.truetype("arial.ttf", 22)
        font_title = ImageFont.truetype("arial.ttf", 26)
        font_sub = ImageFont.truetype("arial.ttf", 15)
        font_card = ImageFont.truetype("arial.ttf", 14)
        font_sm = ImageFont.truetype("arial.ttf", 12)
    except:
        font_logo = font_title = font_sub = font_card = font_sm = ImageFont.load_default()
        
    # Top Navbar (0f172a)
    draw.rectangle([0, 0, w, 70], fill='#0f172a', outline='#1e293b', width=1)
    
    # Logo Box
    draw.rectangle([36, 16, 72, 52], fill='#10b981')
    draw.text((47, 22), "N", fill='#0b0f17', font=font_logo)
    draw.text((84, 22), "NexaMart MERN Engine", fill='#ffffff', font=font_logo)
    
    # Search Bar
    draw.rectangle([450, 16, 850, 52], fill='#1e293b', outline='#334155', width=1)
    draw.text((466, 25), "Search laptops, wireless audio, 4K monitors...", fill='#9ca3af', font=font_sm)
    
    # Right Nav Badges
    draw.text((920, 26), "Storefront", fill='#9ca3af', font=font_sm)
    draw.text((1000, 26), "Deals", fill='#9ca3af', font=font_sm)
    draw.rectangle([1060, 18, 1240, 50], fill='#1e293b', outline='#10b981', width=1)
    draw.text((1072, 26), "⚡ Tayyab (Admin)", fill='#10b981', font=font_sm)
    
    # Subheader Tagline Banner
    draw.rectangle([36, 95, w - 36, 175], fill='#131b2e', outline='#233152', width=1)
    draw.rectangle([56, 110, 220, 132], fill='#064e3b', outline='#10b981', width=1)
    draw.text((66, 114), f"VIEW {view_num:02d} / 12 • MERN ENGINE", fill='#34d399', font=font_sm)
    draw.text((56, 138), title, fill='#ffffff', font=font_title)
    draw.text((56, 158), subtitle, fill='#9ca3af', font=font_sub)
    
    # Main Content Body Card Area
    body_top = 195
    if screen_type == "hero":
      # Hero Banner Box
      draw.rectangle([36, body_top, w - 36, 450], fill='#0f172a', outline='#10b981', width=2)
      draw.text((66, body_top + 30), "🚀 Spring Tech Summit 2026", fill='#10b981', font=font_sm)
      draw.text((66, body_top + 55), "Full-Stack MERN E-Commerce Architecture", fill='#ffffff', font=font_title)
      draw.text((66, body_top + 95), "Powered by MongoDB Atlas, Express.js REST APIs, React 19, Node.js microservices, and Redis caching.", fill='#9ca3af', font=font_sub)
      draw.rectangle([66, body_top + 145, 240, body_top + 185], fill='#10b981')
      draw.text((86, body_top + 155), "Explore Storefront", fill='#0b0f17', font=font_card)
      
      # 4 Product Cards Grid Below
      grid_top = 480
      draw.text((36, grid_top - 25), "Featured Products & Hardware Catalog", fill='#ffffff', font=font_sub)
      card_w = (w - 72 - 3 * 20) // 4
      for c in range(4):
        cx = 36 + c * (card_w + 20)
        draw.rectangle([cx, grid_top, cx + card_w, 750], fill='#131b2e', outline='#233152', width=1)
        draw.rectangle([cx + 12, grid_top + 12, cx + card_w - 12, grid_top + 130], fill='#0f172a')
        draw.text((cx + 20, grid_top + 60), ["🎧 Audio", "🖥️ Display", "⌨️ Keyboard", "⌚ Watch"][c], fill='#06b6d4', font=font_sub)
        draw.text((cx + 16, grid_top + 145), ["CyberSound Pro ANC", "Quantum 34 OLED", "RGB Mechanical", "Apex Pro Watch"][c], fill='#ffffff', font=font_card)
        draw.text((cx + 16, grid_top + 180), ["$299.00", "$899.00", "$179.00", "$249.00"][c], fill='#10b981', font=font_title)

    elif screen_type == "table":
      # Data Table Renders
      draw.rectangle([36, body_top, w - 36, 750], fill='#131b2e', outline='#233152', width=1)
      draw.rectangle([36, body_top, w - 36, body_top + 45], fill='#0f172a')
      draw.text((56, body_top + 14), "COL 1: ITEM NAME", fill='#9ca3af', font=font_sm)
      draw.text((320, body_top + 14), "COL 2: CATEGORY", fill='#9ca3af', font=font_sm)
      draw.text((540, body_top + 14), "COL 3: METRIC / STATUS", fill='#9ca3af', font=font_sm)
      draw.text((800, body_top + 14), "COL 4: AMOUNT ($)", fill='#9ca3af', font=font_sm)
      draw.text((1050, body_top + 14), "ACTION", fill='#9ca3af', font=font_sm)
      
      for r_idx, line_text in enumerate(detail_lines):
        ry = body_top + 60 + r_idx * 50
        draw.line([36, ry + 40, w - 36, ry + 40], fill='#1e293b', width=1)
        draw.text((56, ry + 10), line_text[0], fill='#ffffff', font=font_card)
        draw.text((320, ry + 10), line_text[1], fill='#06b6d4', font=font_card)
        draw.text((540, ry + 10), line_text[2], fill='#34d399', font=font_card)
        draw.text((800, ry + 10), line_text[3], fill='#f59e0b', font=font_card)
        draw.rectangle([1050, ry + 4, 1150, ry + 32], fill='#1e293b', outline='#334155', width=1)
        draw.text((1064, ry + 10), "Manage", fill='#ffffff', font=font_sm)

    else:
      # Grid / Detailed View
      draw.rectangle([36, body_top, w - 36, 750], fill='#131b2e', outline='#233152', width=1)
      for idx, line in enumerate(detail_lines):
        ly = body_top + 30 + idx * 42
        draw.text((66, ly), f"•  {line}", fill='#e5e7eb', font=font_sub)
        
    # Save Image
    fname = f'nexamart-ui-{view_num:02d}.png'
    fpath = os.path.join(out_dir, fname)
    img.save(fpath)
    print(f'Generated PIL screen {view_num:02d}: {fname} ({os.path.getsize(fpath)} bytes)')

# Screen 1 to 12 definitions
screens = [
  ("Storefront Hero & Featured Collections", "Spring Tech Summit banner, deal countdown timer, and trending hardware catalog.", 1, [], "hero"),
  ("Product Catalog & Multi-Filter Search", "Category filters, price sliders, brand selectors, and sorting algorithms.", 2, [
    ["CyberSound ANC Headphones", "Audio", "In Stock (142)", "$299.00"],
    ["Pro-Book M3 Max 16-inch", "Laptops", "Low Stock (8)", "$2,499.00"],
    ["Quantum 34 OLED Curved", "Monitors", "In Stock (56)", "$899.00"],
    ["Mechanical Custom RGB Keyboard", "Peripherals", "In Stock (210)", "$179.00"],
    ["Apex Pro GPS Smart Watch", "Wearables", "In Stock (95)", "$249.00"],
    ["Thunderbolt 4 Dock 12-in-1", "Accessories", "In Stock (80)", "$229.00"],
  ], "table"),
  ("Product Detail Page & Interactive Gallery", "High-res image zoom, color variants, stock indicator, and customer reviews.", 3, [
    "Product Name: CyberSound Pro ANC Wireless Headphones",
    "Pricing: $299.00 USD (Save $50.00 during Spring Sale)",
    "Audio Drivers: 40mm Titanium Drivers with Active Noise Cancellation (ANC)",
    "Battery Life: 45 Hours playback with Fast Type-C Charge (10 min charge = 5 hours)",
    "Connectivity: Dual-Device Multipoint Bluetooth 5.3 & Low Latency 2.4GHz Dongle",
    "Customer Rating: ★★★★★ 4.95 out of 5 stars (128 verified customer reviews)",
    "Color Options: Space Black, Cyber Silver, Emerald Green"
  ], "grid"),
  ("Shopping Cart Drawer & Promo Estimator", "Cart item manager, quantity controls, coupon promo code input, and subtotal calculation.", 4, [
    ["CyberSound Pro ANC Headphones", "1 Unit", "Color: Space Black", "$299.00"],
    ["Mechanical Custom RGB Keyboard", "2 Units", "Switch: Tactile Brown", "$358.00"],
    ["Shipping Fee & Handling", "Standard", "FedEx Express Delivery", "FREE"],
    ["Estimated State Tax", "Taxes", "Calculated at checkout", "$52.56"],
    ["Cart Grand Total", "3 Items", "Ready for Checkout", "$709.56"]
  ], "table"),
  ("Multi-Step Checkout & Stripe Gateway", "Shipping address form, shipping method, and 256-bit SSL encrypted Stripe payment fields.", 5, [
    "Step 1: Shipping Address: Tayyab Tufail, Sector F-8, Islamabad, Pakistan",
    "Step 2: Shipping Option: FedEx Priority Express 2-Day ($0.00 Free Promo)",
    "Step 3: Payment Gateway: Stripe Elements 256-Bit SSL Encrypted Credit Card Form",
    "Test Card Verification: 4242 •••• •••• 4242 | Exp: 12/28 | CVC: 123",
    "Order Summary Total: $709.56 USD",
    "Order Confirmation: Automated email receipt sent via Nodemailer microservice."
  ], "grid"),
  ("Admin Analytics & Revenue Dashboard", "Real-time sales velocity graphs, monthly revenue KPIs, and Redis cache telemetry.", 6, [
    ["Total Monthly Revenue", "Financials", "▲ +18.4% vs last month", "$128,450.00"],
    ["Completed Orders", "Fulfillment", "▲ +12.1% this week", "1,420 Orders"],
    ["Active Customers", "User Base", "▲ +24.5% total registered", "8,940 Users"],
    ["Redis Cache Hit Ratio", "Performance", "⚡ Sub-25ms response rate", "99.4% Hit Rate"]
  ], "table"),
  ("Inventory Management & Stock Controls", "CRUD product grid, low stock alert badges, SKU tracking, and price updates.", 7, [
    ["CyberSound Pro ANC Headphones", "Audio", "SKU-8841-BLK", "142 Units (In Stock)"],
    ["Pro-Book M3 Max 16-inch", "Laptops", "SKU-9920-MAC", "8 Units (Low Stock)"],
    ["Quantum 34 OLED 240Hz", "Monitors", "SKU-3321-DISP", "56 Units (In Stock)"],
    ["Mechanical Custom Keyboard", "Peripherals", "SKU-1120-KEYS", "210 Units (In Stock)"],
    ["Apex Pro GPS Smart Watch", "Wearables", "SKU-5542-WCH", "95 Units (In Stock)"]
  ], "table"),
  ("Order Management & Fulfillment Pipeline", "Live order pipeline tracking, shipment updates, and invoice printing.", 8, [
    ["#ORD-2026-9901", "Sarah Jenkins", "Sep 21, 2026 - 02:14 AM", "Shipped (FedEx)"],
    ["#ORD-2026-9902", "Michael Chen", "Sep 21, 2026 - 01:50 AM", "Processing"],
    ["#ORD-2026-9903", "Tayyab Tufail", "Sep 20, 2026 - 11:30 PM", "Delivered"],
    ["#ORD-2026-9904", "Emma Watson", "Sep 20, 2026 - 09:15 PM", "Delivered"]
  ], "table"),
  ("Customer Account & Saved Wishlist", "Saved addresses, order history re-ordering, and bookmarked wishlist items.", 9, [
    "Customer Account: Tayyab Tufail (tayyabmalik1655@gmail.com)",
    "Account Status: Verified VIP Member (Active since 2024)",
    "Saved Shipping Address: Attock / Islamabad, Punjab, Pakistan",
    "Wishlist Item #1: Mechanical RGB Custom Keyboard ($179.00)",
    "Wishlist Item #2: Quantum 34 Curved OLED Monitor ($899.00)",
    "Order History: 14 completed purchases across electronics and hardware."
  ], "grid"),
  ("Flash Sales & Promotional Deals", "Countdown deal banners, discount badges, and limited-time offer carousels.", 10, [
    "Event: Spring Cyber Weekend Flash Deals",
    "Discount Rate: Up to 50% Off Top Hardware & Accessories",
    "Countdown Timer: 04 Hours : 32 Minutes : 45 Seconds Remaining",
    "Featured Deal #1: Pro-Book M3 Max Ultra: $2,499.00 (Save $400.00)",
    "Featured Deal #2: CyberSound Pro ANC: $299.00 (Save $50.00)",
    "Promo Code: 'MERN2026' applied at checkout for free express shipping."
  ], "grid"),
  ("Verified Customer Reviews & Feedback", "Rating distribution bar, verified buyer badges, and product feedback engine.", 11, [
    ["Alex Rivera", "Verified Buyer", "★★★★★ Exceptional ANC & Battery Life", "Helpful (34)"],
    ["David Miller", "Verified Buyer", "★★★★★ Crisp Audio & Fast Delivery", "Helpful (22)"],
    ["Sophia Wang", "Verified Buyer", "★★★★★ Outstanding Build Quality", "Helpful (18)"],
    ["James Taylor", "Verified Buyer", "★★★★☆ Great Value for Money", "Helpful (12)"]
  ], "table"),
  ("MERN System Architecture & Tech Blueprint", "Distributed microservices, Express API gateway, MongoDB cluster, and Redis cache.", 12, [
    "Frontend Layer: React 19 SPA, Redux Toolkit, Tailwind CSS, Stripe Elements",
    "Backend Gateway: Node.js, Express REST APIs, JWT Auth, Rate Limiting",
    "Database Infrastructure: MongoDB Atlas Cluster with time-series indexing",
    "Caching & Telemetry: Redis in-memory cache layer (99.4% hit rate)",
    "Payment Processing: Stripe API 256-bit SSL encrypted webhooks & checkout",
    "Containerization: Docker container orchestration & CI/CD deployment pipeline"
  ], "grid")
]

for title, sub, v_num, lines, s_type in screens:
    create_ui_screen(title, sub, v_num, lines, s_type)

print('Successfully generated all 12 NexaMart PIL screens!')
