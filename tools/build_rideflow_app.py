import os

app_dir = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio\.capture-rideflow'
os.makedirs(app_dir, exist_ok=True)

html_code = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1280, initial-scale=1.0">
  <title>RideFlow — Mobile App</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-canvas: #f8fafc;
      --bg-phone: #ffffff;
      --border-phone: #0f172a;
      --accent-green: #059669;
      --accent-green-light: #ecfdf5;
      --accent-blue: #2563eb;
      --accent-blue-light: #eff6ff;
      --accent-amber: #f59e0b;
      --text-dark: #0f172a;
      --text-muted: #64748b;
      --text-dim: #94a3b8;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; }
    body { background-color: var(--bg-canvas); color: var(--text-dark); width: 1280px; height: 800px; overflow: hidden; -webkit-font-smoothing: antialiased; display: grid; place-items: center; }

    /* View Sections */
    .view-section { display: none; width: 100%; height: 100%; }
    .view-section.active { display: flex; align-items: center; justify-content: center; gap: 40px; padding: 20px; }

    /* Mobile Phone Shell (Realistic iOS Frame) */
    .phone-shell { width: 390px; height: 720px; background: #ffffff; border-radius: 44px; border: 10px solid #0f172a; box-shadow: 0 25px 60px rgba(15,23,42,0.15), 0 4px 16px rgba(0,0,0,0.06); overflow: hidden; position: relative; display: flex; flex-direction: column; }
    .phone-notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 140px; height: 26px; background: #0f172a; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; z-index: 100; }
    .phone-header { background: #ffffff; color: #0f172a; padding: 32px 24px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 800; border-bottom: 1px solid #f1f5f9; }
    .phone-body { flex: 1; overflow-y: auto; display: flex; flex-direction: column; background: #f8fafc; }
    .phone-footer { background: #ffffff; border-top: 1px solid #e2e8f0; padding: 12px 28px 20px; display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: 11px; font-weight: 700; }
    .nav-tab { display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; }
    .nav-tab.active { color: var(--accent-green); font-weight: 800; }

    /* Buttons */
    .btn-primary { background: linear-gradient(135deg, #059669, #047857); color: #ffffff; font-weight: 800; padding: 16px 24px; border-radius: 14px; border: none; cursor: pointer; font-size: 15px; width: 100%; text-align: center; box-shadow: 0 4px 16px rgba(5,150,105,0.25); }
    .btn-blue { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff; font-weight: 800; padding: 16px 24px; border-radius: 14px; border: none; cursor: pointer; font-size: 15px; width: 100%; text-align: center; box-shadow: 0 4px 16px rgba(37,99,235,0.25); }
    .btn-secondary { background: #f1f5f9; color: #0f172a; border: 1px solid #e2e8f0; font-weight: 700; padding: 14px 20px; border-radius: 14px; cursor: pointer; font-size: 14px; width: 100%; text-align: center; }

    /* Interactive Map Component */
    .map-box { background: #e2e8f0; height: 320px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .road-h { position: absolute; width: 100%; height: 28px; background: #ffffff; top: 45%; transform: rotate(-8deg); border-top: 2px dashed #cbd5e1; border-bottom: 2px dashed #cbd5e1; }
    .road-v { position: absolute; width: 28px; height: 100%; background: #ffffff; left: 50%; transform: rotate(12deg); border-left: 2px dashed #cbd5e1; border-right: 2px dashed #cbd5e1; }
    .map-pin { position: absolute; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font-size: 20px; box-shadow: 0 6px 16px rgba(0,0,0,0.2); z-index: 10; }
    .pin-a { background: #059669; color: #fff; top: 38%; left: 24%; }
    .pin-b { background: #dc2626; color: #fff; top: 52%; left: 72%; }
    .car-marker { position: absolute; font-size: 28px; top: 44%; left: 45%; z-index: 12; filter: drop-shadow(0 6px 8px rgba(0,0,0,0.3)); }

    /* Admin Console Shell */
    .admin-shell { width: 1100px; height: 700px; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; box-shadow: 0 20px 50px rgba(0,0,0,0.06); padding: 32px; display: flex; flex-direction: column; gap: 24px; }
    .admin-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .admin-stat-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
    .admin-stat-num { font-size: 32px; font-weight: 800; color: #0f172a; margin: 8px 0 4px; letter-spacing: -0.5px; }

    /* Custom Tables */
    .clean-table { width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
    .clean-table th, .clean-table td { padding: 16px 24px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
    .clean-table th { background: #f8fafc; color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.8px; }

    /* Side Detail Panel */
    .side-panel { width: 340px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
    .side-title { font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
    .side-desc { font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 20px; }
    .badge-pill { display: inline-block; background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 800; margin-bottom: 12px; }
  </style>
</head>
<body>

  <!-- VIEW 01: PASSENGER SPLASH & ROLE SWITCH -->
  <div id="view-01" class="view-section active">
    <div class="phone-shell">
      <div class="phone-notch"></div>
      <div class="phone-header">
        <span>09:41</span>
        <span>⚡ 5G</span>
      </div>
      <div class="phone-body" style="background:#ffffff; padding:44px 28px; text-align:center; justify-content:space-between">
        <div>
          <div style="width:84px; height:84px; background:linear-gradient(135deg, #059669, #047857); border-radius:24px; margin:20px auto; display:grid; place-items:center; font-size:42px; box-shadow:0 12px 28px rgba(5,150,105,0.3)">🚕</div>
          <h1 style="font-size:32px; font-weight:800; color:#0f172a; margin-bottom:8px">RideFlow</h1>
          <p style="font-size:15px; color:#64748b; line-height:1.5">Fast, reliable, and fair rides for everyone.</p>
        </div>

        <div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:18px; padding:20px; margin-bottom:24px; text-align:left">
            <div style="font-size:12px; font-weight:800; color:#059669; text-transform:uppercase; letter-spacing:0.8px">Choose App Role</div>
            <div style="display:flex; flex-direction:column; gap:12px; margin-top:14px">
              <div style="background:#059669; color:#ffffff; padding:14px 18px; border-radius:12px; font-weight:800; font-size:15px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 4px 12px rgba(5,150,105,0.25)">
                <span>🙋‍♂️ Passenger</span>
                <span>✓ Selected</span>
              </div>
              <div style="background:#ffffff; border:1px solid #cbd5e1; color:#0f172a; padding:14px 18px; border-radius:12px; font-weight:700; font-size:15px">🚗 Driver Partner</div>
              <div style="background:#ffffff; border:1px solid #cbd5e1; color:#0f172a; padding:14px 18px; border-radius:12px; font-weight:700; font-size:15px">🛡️ Fleet Admin</div>
            </div>
          </div>
          <button class="btn-primary">Get Started &rarr;</button>
        </div>
      </div>
    </div>

    <div class="side-panel">
      <span class="badge-pill">SCREEN 01 / 12</span>
      <h3 class="side-title">Passenger Splash & Portal Selection</h3>
      <p class="side-desc">Clean onboarding flow allowing users to toggle between Passenger, Driver Partner, and Fleet Dispatcher.</p>
      <div style="border-top:1px solid #e2e8f0; padding-top:16px; font-size:13px; color:#64748b; font-weight:600">
        ✓ Biometric FaceID login<br/>
        ✓ Multi-role authorization<br/>
        ✓ Light modern design
      </div>
    </div>
  </div>

  <!-- VIEW 02: PASSENGER RIDE BOOKING & MAP -->
  <div id="view-02" class="view-section">
    <div class="phone-shell">
      <div class="phone-notch"></div>
      <div class="phone-header">
        <span>09:42</span>
        <span>📍 Blue Area, Islamabad</span>
      </div>
      <div class="phone-body">
        <div class="map-box">
          <div class="road-h"></div>
          <div class="road-v"></div>
          <div class="map-pin pin-a">📍</div>
          <div class="map-pin pin-b">🏁</div>
          <div class="car-marker">🚕</div>
        </div>
        <div style="padding:20px; flex:1; display:flex; flex-direction:column; justify-content:space-between; background:#ffffff">
          <div>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:14px; margin-bottom:16px">
              <div style="font-size:12px; color:#059669; font-weight:800; margin-bottom:2px">● PICKUP</div>
              <div style="font-size:14px; font-weight:800; color:#0f172a; margin-bottom:10px">Centaurus Mall, F-8, Islamabad</div>
              <div style="font-size:12px; color:#dc2626; font-weight:800; margin-bottom:2px">● DROPOFF</div>
              <div style="font-size:14px; font-weight:800; color:#0f172a">Islamabad International Airport (ISB)</div>
            </div>

            <div style="font-size:12px; font-weight:800; color:#64748b; text-transform:uppercase; margin-bottom:10px">Select Vehicle Type</div>
            <div style="display:flex; gap:10px; margin-bottom:16px">
              <div style="flex:1; border:2px solid #059669; background:#ecfdf5; border-radius:14px; padding:12px; text-align:center">
                <div style="font-size:24px">🚗</div>
                <div style="font-size:13px; font-weight:800">Economy</div>
                <div style="font-size:14px; font-weight:800; color:#059669">$14.50</div>
              </div>
              <div style="flex:1; border:1px solid #e2e8f0; background:#ffffff; border-radius:14px; padding:12px; text-align:center">
                <div style="font-size:24px">🚘</div>
                <div style="font-size:13px; font-weight:700">Comfort</div>
                <div style="font-size:14px; font-weight:700; color:#2563eb">$22.00</div>
              </div>
              <div style="flex:1; border:1px solid #e2e8f0; background:#ffffff; border-radius:14px; padding:12px; text-align:center">
                <div style="font-size:24px">🚐</div>
                <div style="font-size:13px; font-weight:700">Executive XL</div>
                <div style="font-size:14px; font-weight:700; color:#64748b">$35.00</div>
              </div>
            </div>
          </div>

          <button class="btn-primary">Confirm Ride ($14.50)</button>
        </div>
      </div>
      <div class="phone-footer">
        <div class="nav-tab active"><span>🏠</span><span>Ride</span></div>
        <div class="nav-tab"><span>📄</span><span>Activity</span></div>
        <div class="nav-tab"><span>👤</span><span>Account</span></div>
      </div>
    </div>

    <div class="side-panel">
      <span class="badge-pill">SCREEN 02 / 12</span>
      <h3 class="side-title">Interactive Booking & Fare Estimator</h3>
      <p class="side-desc">Real-time GPS route preview, estimated distance, fare comparison, and custom fare offer input.</p>
    </div>
  </div>

  <!-- VIEW 03: DRIVER MATCHING & ETA RADAR -->
  <div id="view-03" class="view-section">
    <div class="phone-shell">
      <div class="phone-notch"></div>
      <div class="phone-header">
        <span>09:43</span>
        <span>⚡ Driver Arriving in 3 Mins</span>
      </div>
      <div class="phone-body" style="background:#ffffff">
        <div class="map-box" style="height:280px">
          <div class="road-h"></div>
          <div class="road-v"></div>
          <div class="car-marker">🚕</div>
        </div>

        <div style="padding:20px; flex:1; display:flex; flex-direction:column; justify-content:space-between">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:18px; padding:18px">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px">
              <span style="font-size:12px; font-weight:800; color:#059669">MATCHED DRIVER</span>
              <span style="font-size:13px; font-weight:800; color:#059669">★ 4.95 (540 rides)</span>
            </div>
            <div style="display:flex; gap:16px; align-items:center">
              <div style="width:52px; height:52px; background:#0f172a; color:#fff; border-radius:50%; display:grid; place-items:center; font-size:26px">👤</div>
              <div>
                <h4 style="font-size:17px; font-weight:800; color:#0f172a">Tariq Mahmood</h4>
                <p style="font-size:14px; color:#475569">Toyota Prius Silver · <strong style="color:#0f172a">ICT-8849</strong></p>
              </div>
            </div>
          </div>

          <div style="display:flex; gap:12px">
            <button class="btn-blue" style="flex:1">💬 Chat</button>
            <button class="btn-primary" style="flex:1">📞 Call Driver</button>
          </div>
        </div>
      </div>
    </div>

    <div class="side-panel">
      <span class="badge-pill">SCREEN 03 / 12</span>
      <h3 class="side-title">Driver Matching & ETA Radar</h3>
      <p class="side-desc">Real-time driver dispatch notification, driver 4.95★ rating score, vehicle color & license plate verification.</p>
    </div>
  </div>

  <!-- VIEW 04: LIVE RIDE TRACKING & GPS -->
  <div id="view-04" class="view-section">
    <div class="phone-shell">
      <div class="phone-notch"></div>
      <div class="phone-header">
        <span>09:50</span>
        <span>📍 En Route to Airport</span>
      </div>
      <div class="phone-body" style="background:#ffffff">
        <div class="map-box" style="height:360px">
          <div class="road-h"></div>
          <div class="road-v"></div>
          <div class="car-marker" style="top:50%; left:58%">🚕</div>
        </div>

        <div style="padding:20px; flex:1; display:flex; flex-direction:column; justify-content:space-between">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px">
              <div>
                <div style="font-size:12px; font-weight:800; color:#64748b">ESTIMATED ARRIVAL</div>
                <div style="font-size:22px; font-weight:800; color:#0f172a">10:05 AM (15 mins)</div>
              </div>
              <div style="background:#fee2e2; border:1px solid #fca5a5; color:#dc2626; padding:8px 14px; border-radius:20px; font-size:12px; font-weight:800">🚨 SOS Safety</div>
            </div>

            <div style="background:#f1f5f9; border-radius:10px; height:10px; overflow:hidden; margin-bottom:14px">
              <div style="background:#059669; width:68%; height:100%"></div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; color:#475569">
            <span>Trip ID: #RF-8821</span>
            <span>Speed: 58 km/h</span>
          </div>
        </div>
      </div>
    </div>

    <div class="side-panel">
      <span class="badge-pill">SCREEN 04 / 12</span>
      <h3 class="side-title">Live Trip Telemetry & Emergency SOS</h3>
      <p class="side-desc">Live route tracking, speed monitoring, progress bar, and 1-tap Emergency SOS safety trigger.</p>
    </div>
  </div>

  <!-- VIEW 05: IN-APP DRIVER CHAT -->
  <div id="view-05" class="view-section">
    <div class="phone-shell">
      <div class="phone-notch"></div>
      <div class="phone-header">
        <span>09:44</span>
        <span>💬 Chat with Tariq</span>
      </div>
      <div class="phone-body" style="padding:20px; background:#f8fafc; justify-content:space-between">
        <div style="display:flex; flex-direction:column; gap:14px">
          <div style="background:#ffffff; border:1px solid #e2e8f0; color:#0f172a; padding:14px 18px; border-radius:18px 18px 18px 4px; max-width:82%; font-size:14px; line-height:1.4; box-shadow:0 2px 6px rgba(0,0,0,0.02)">
            Hello Tayyab! I am arriving at Centaurus Mall Main Entrance in 2 mins.
            <div style="font-size:11px; color:#94a3b8; margin-top:4px">09:44 AM · Delivered</div>
          </div>
          <div style="background:#059669; color:#ffffff; padding:14px 18px; border-radius:18px 18px 4px 18px; max-width:82%; align-self:flex-end; font-size:14px; line-height:1.4; box-shadow:0 4px 12px rgba(5,150,105,0.2)">
            Great! I am waiting right next to Gate 3 wearing a navy jacket.
            <div style="font-size:11px; color:rgba(255,255,255,0.8); margin-top:4px">09:45 AM · Read ✓✓</div>
          </div>
        </div>

        <div style="display:flex; gap:10px">
          <input type="text" value="I see your car coming!" style="flex:1; padding:14px; border-radius:24px; border:1px solid #cbd5e1; outline:none; font-size:14px" />
          <button class="btn-primary" style="width:auto; padding:14px 20px; border-radius:24px">Send</button>
        </div>
      </div>
    </div>

    <div class="side-panel">
      <span class="badge-pill">SCREEN 05 / 12</span>
      <h3 class="side-title">Real-Time In-App Passenger & Driver Chat</h3>
      <p class="side-desc">Instant messaging powered by Socket.IO with delivery timestamps and read receipts.</p>
    </div>
  </div>

  <!-- VIEW 06: RIDE PAYMENT & TIP -->
  <div id="view-06" class="view-section">
    <div class="phone-shell">
      <div class="phone-notch"></div>
      <div class="phone-header">
        <span>10:06</span>
        <span>🏁 Trip Completed</span>
      </div>
      <div class="phone-body" style="padding:24px; text-align:center; justify-content:space-between; background:#ffffff">
        <div>
          <div style="font-size:48px; margin-bottom:8px">🎉</div>
          <h2 style="font-size:24px; font-weight:800; color:#0f172a; margin-bottom:4px">Arrived at Destination!</h2>
          <p style="font-size:14px; color:#64748b; margin-bottom:20px">Thank you for riding with RideFlow.</p>

          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:18px; text-align:left; margin-bottom:20px">
            <div style="font-size:12px; font-weight:800; color:#64748b; text-transform:uppercase; margin-bottom:10px">RECEIPT BREAKDOWN</div>
            <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:6px"><span>Base Fare</span><strong>$10.00</strong></div>
            <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:6px"><span>Distance (14.2 km)</span><strong>$4.50</strong></div>
            <div style="display:flex; justify-content:space-between; font-size:15px; border-top:1px solid #e2e8f0; padding-top:10px; font-weight:800; color:#059669"><span>Total Paid via Stripe</span><span>$14.50 USD</span></div>
          </div>

          <div style="font-size:15px; font-weight:800; color:#0f172a; margin-bottom:10px">Rate Driver Tariq Mahmood</div>
          <div style="font-size:28px; color:#f59e0b; margin-bottom:16px">★★★★★</div>
        </div>

        <button class="btn-primary">Submit Rating</button>
      </div>
    </div>

    <div class="side-panel">
      <span class="badge-pill">SCREEN 06 / 12</span>
      <h3 class="side-title">Stripe Online Payment & Driver Rating</h3>
      <p class="side-desc">Digital payment receipt, automated wallet deduction, and 5-star experience review.</p>
    </div>
  </div>

  <!-- VIEW 07: DRIVER DISPATCH RADAR -->
  <div id="view-07" class="view-section">
    <div class="phone-shell">
      <div class="phone-notch"></div>
      <div class="phone-header">
        <span>09:42</span>
        <span>⚡ Driver Partner App</span>
      </div>
      <div class="phone-body" style="background:#ffffff; padding:24px; justify-content:space-between">
        <div style="text-align:center; margin-top:10px">
          <span style="background:#ecfdf5; border:1px solid #a7f3d0; color:#059669; padding:6px 16px; border-radius:20px; font-size:12px; font-weight:800">🔥 NEW RIDE DISPATCH REQUEST</span>
          <h1 style="font-size:38px; font-weight:800; color:#059669; margin:16px 0 6px">$14.50 Payout</h1>
          <p style="font-size:14px; color:#64748b">Pickup: 1.2 km away (4 mins drive)</p>
        </div>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:18px; padding:20px">
          <div style="font-size:12px; font-weight:800; color:#64748b; margin-bottom:8px">PASSENGER DETAILS</div>
          <div style="font-size:17px; font-weight:800; color:#0f172a; margin-bottom:4px">Tayyab Tufail (4.98★)</div>
          <div style="font-size:14px; color:#475569; margin-bottom:16px">Centaurus Mall &rarr; Airport</div>
          <button class="btn-primary">Accept Ride Request</button>
        </div>
      </div>
    </div>

    <div class="side-panel">
      <span class="badge-pill">SCREEN 07 / 12</span>
      <h3 class="side-title">Driver Partner Dispatch Pop-Up</h3>
      <p class="side-desc">Incoming ride request notification card with pickup distance, fare payout, and 1-tap accept control.</p>
    </div>
  </div>

  <!-- VIEW 08: DRIVER ACTIVE TRIP & NAVIGATION -->
  <div id="view-08" class="view-section">
    <div class="phone-shell">
      <div class="phone-notch"></div>
      <div class="phone-header">
        <span>09:46</span>
        <span>📍 Navigating to Passenger</span>
      </div>
      <div class="phone-body" style="background:#ffffff">
        <div class="map-box" style="height:380px">
          <div class="road-h"></div>
          <div class="road-v"></div>
          <div class="car-marker" style="top:45%; left:50%">🚕</div>
        </div>

        <div style="padding:20px; background:#f8fafc; flex:1; display:flex; flex-direction:column; justify-content:space-between">
          <div>
            <div style="font-size:12px; font-weight:800; color:#059669; margin-bottom:4px">NEXT TURN IN 200 METERS</div>
            <div style="font-size:20px; font-weight:800; color:#0f172a">Turn Right onto Jinnah Avenue</div>
          </div>

          <button class="btn-primary">Slide to Start Trip &rarr;</button>
        </div>
      </div>
    </div>

    <div class="side-panel">
      <span class="badge-pill">SCREEN 08 / 12</span>
      <h3 class="side-title">Driver Active Navigation</h3>
      <p class="side-desc">Turn-by-turn route map overlay, passenger pickup address, and trip start confirmation.</p>
    </div>
  </div>

  <!-- VIEW 09: DRIVER DAILY EARNINGS & PAYOUTS -->
  <div id="view-09" class="view-section">
    <div class="phone-shell">
      <div class="phone-notch"></div>
      <div class="phone-header">
        <span>22:00</span>
        <span>💼 Driver Wallet</span>
      </div>
      <div class="phone-body" style="padding:24px; justify-content:space-between; background:#ffffff">
        <div>
          <div style="background:linear-gradient(135deg, #059669, #047857); color:#ffffff; border-radius:20px; padding:24px; margin-bottom:20px; text-align:center; box-shadow:0 8px 24px rgba(5,150,105,0.25)">
            <div style="font-size:12px; opacity:0.9; font-weight:700">TODAY'S TOTAL EARNINGS</div>
            <div style="font-size:38px; font-weight:800; margin:6px 0">$184.50 USD</div>
            <div style="font-size:13px; opacity:0.9">12 Completed Trips · 6.5 Hours Online</div>
          </div>

          <div style="font-size:12px; font-weight:800; color:#64748b; text-transform:uppercase; margin-bottom:12px">COMPLETED TRIPS</div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:14px; margin-bottom:10px">
            <div style="display:flex; justify-content:space-between; font-weight:800; font-size:14px"><span>Centaurus &rarr; Airport</span><span style="color:#059669">+$14.50</span></div>
            <div style="font-size:12px; color:#64748b; margin-top:2px">09:42 AM · Paid via Stripe</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:14px">
            <div style="display:flex; justify-content:space-between; font-weight:800; font-size:14px"><span>F-6 Markaz &rarr; G-9 Plaza</span><span style="color:#059669">+$22.00</span></div>
            <div style="font-size:12px; color:#64748b; margin-top:2px">08:15 AM · Paid via Stripe</div>
          </div>
        </div>

        <button class="btn-primary">Instant Bank Cashout ($184.50)</button>
      </div>
    </div>

    <div class="side-panel">
      <span class="badge-pill">SCREEN 09 / 12</span>
      <h3 class="side-title">Driver Daily Earnings Wallet</h3>
      <p class="side-desc">Daily income summary ($184.50), completed trip logs, and 1-tap bank cashout.</p>
    </div>
  </div>

  <!-- VIEW 10: DRIVER ONBOARDING & LICENSE VERIFICATION -->
  <div id="view-10" class="view-section">
    <div class="phone-shell">
      <div class="phone-notch"></div>
      <div class="phone-header">
        <span>14:30</span>
        <span>📝 Driver Verification</span>
      </div>
      <div class="phone-body" style="padding:24px; justify-content:space-between; background:#ffffff">
        <div>
          <h3 style="font-size:20px; font-weight:800; color:#0f172a; margin-bottom:6px">Partner Verification</h3>
          <p style="font-size:14px; color:#64748b; margin-bottom:20px">Official identity and vehicle document status.</p>

          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:16px; margin-bottom:14px">
            <div style="font-size:14px; font-weight:800; color:#0f172a">📄 Driving License (CNIC / Permit)</div>
            <div style="font-size:13px; color:#059669; font-weight:800; margin-top:4px">✓ Verified & Approved</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:16px; margin-bottom:14px">
            <div style="font-size:14px; font-weight:800; color:#0f172a">🚘 Vehicle Permit (Toyota Prius)</div>
            <div style="font-size:13px; color:#059669; font-weight:800; margin-top:4px">✓ Verified & Approved</div>
          </div>
        </div>

        <button class="btn-primary">Submit Verification</button>
      </div>
    </div>

    <div class="side-panel">
      <span class="badge-pill">SCREEN 10 / 12</span>
      <h3 class="side-title">Driver Partner Document Audit</h3>
      <p class="side-desc">CNIC and driving license verification audit form with real-time approval status.</p>
    </div>
  </div>

  <!-- VIEW 11: ADMIN FLEET OPERATIONS TELEMETRY -->
  <div id="view-11" class="view-section">
    <div class="admin-shell">
      <div style="display:flex; justify-content:space-between; align-items:center">
        <div>
          <h2 style="font-size:24px; font-weight:800; color:#0f172a">Fleet Operations Command Center</h2>
          <p style="font-size:14px; color:#64748b">Real-time ride dispatch telemetry & gross revenue analytics.</p>
        </div>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; color:#059669; padding:8px 18px; border-radius:20px; font-weight:800; font-size:13px">⚡ 1,240 Drivers Active Right Now</div>
      </div>

      <div class="admin-stats-grid">
        <div class="admin-stat-card">
          <div style="font-size:13px; color:#64748b; font-weight:700">Gross Revenue Today</div>
          <div class="admin-stat-num">$48,920.00</div>
          <div style="font-size:12px; color:#059669; font-weight:800">▲ +22.4% vs yesterday</div>
        </div>
        <div class="admin-stat-card">
          <div style="font-size:13px; color:#64748b; font-weight:700">Active Rides</div>
          <div class="admin-stat-num">428</div>
          <div style="font-size:12px; color:#2563eb; font-weight:800">⚡ Live GPS tracking</div>
        </div>
        <div class="admin-stat-card">
          <div style="font-size:13px; color:#64748b; font-weight:700">Online Fleet Readiness</div>
          <div class="admin-stat-num">94.2%</div>
          <div style="font-size:12px; color:#059669; font-weight:800">▲ High availability</div>
        </div>
        <div class="admin-stat-card">
          <div style="font-size:13px; color:#64748b; font-weight:700">Average Driver ETA</div>
          <div class="admin-stat-num">3.2 Mins</div>
          <div style="font-size:12px; color:#f59e0b; font-weight:800">★ 4.94 Rating avg</div>
        </div>
      </div>

      <table class="clean-table">
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Passenger Name</th>
            <th>Matched Driver</th>
            <th>Route Details</th>
            <th>Fare ($)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#RF-2026-8801</td>
            <td>Tayyab Tufail</td>
            <td>Tariq Mahmood (Toyota Prius)</td>
            <td>Centaurus Mall &rarr; Airport</td>
            <td>$14.50</td>
            <td><span style="background:#ecfdf5; color:#059669; padding:4px 12px; border-radius:20px; font-weight:800; font-size:12px">In Transit</span></td>
          </tr>
          <tr>
            <td>#RF-2026-8802</td>
            <td>Usman Ali</td>
            <td>Zubair Ahmed (Honda Civic)</td>
            <td>F-6 Markaz &rarr; G-9 Plaza</td>
            <td>$22.00</td>
            <td><span style="background:#ecfdf5; color:#059669; padding:4px 12px; border-radius:20px; font-weight:800; font-size:12px">In Transit</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- VIEW 12: ADMIN DISPUTE & SAFETY COMMAND -->
  <div id="view-12" class="view-section">
    <div class="admin-shell">
      <div style="display:flex; justify-content:space-between; align-items:center">
        <div>
          <h2 style="font-size:24px; font-weight:800; color:#0f172a">Driver Partner Approvals & Safety Queue</h2>
          <p style="font-size:14px; color:#64748b">Identity verification queue and driver onboarding audit.</p>
        </div>
      </div>

      <table class="clean-table">
        <thead>
          <tr>
            <th>Driver Candidate</th>
            <th>Vehicle Model</th>
            <th>Document Verification</th>
            <th>Background Check</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Tariq Mahmood</strong></td>
            <td>Toyota Prius (Silver 2024)</td>
            <td><span style="color:#059669; font-weight:800">✓ License Verified</span></td>
            <td><span style="color:#059669; font-weight:800">Passed Clear</span></td>
            <td><button class="btn-primary" style="padding:8px 18px; font-size:13px; width:auto">Approve Partner</button></td>
          </tr>
          <tr>
            <td><strong>Zubair Ahmed</strong></td>
            <td>Honda Civic (Black 2023)</td>
            <td><span style="color:#059669; font-weight:800">✓ License Verified</span></td>
            <td><span style="color:#059669; font-weight:800">Passed Clear</span></td>
            <td><button class="btn-primary" style="padding:8px 18px; font-size:13px; width:auto">Approve Partner</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</body>
</html>
"""

target = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio\.capture-rideflow\index.html'
with open(target, 'w', encoding='utf-8') as f:
    f.write(html_code)

print('Wrote Light-Theme RideFlow HTML file to:', target)
