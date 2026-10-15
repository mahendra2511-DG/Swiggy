const M_KPIS = [
  {
    "name": "Total Orders",
    "desc": "KPI sheet #1. The base count every rate on both dashboards divides by. Orders has exactly one row per OrderID (1–10,000), so COUNT and DISTINCTCOUNT agree here.",
    "definition": "The number of orders placed in the period.",
    "formula": "COUNT(Orders.OrderID)",
    "table": "Orders",
    "cat": "Sales & Customers",
    "prio": "P1"
  },
  {
    "name": "Total Revenue",
    "desc": "KPI sheet #2. Gross order value before discounts, summed over all 10,000 orders, cancelled ones included (the KPI sheet does not exclude them; cancelled orders carry ₹21,55,604 of it). State that choice on the dashboard.",
    "definition": "The total value of all orders before discounts.",
    "formula": "SUM(Orders.[Total Amount])",
    "table": "Orders",
    "cat": "Sales & Customers",
    "prio": "P1"
  },
  {
    "name": "Net Revenue",
    "desc": "Supporting KPI. What customers actually paid after discounts. The source header is spelled 'Fina lAmount Paid' (space in the wrong place); rename it to Final Amount Paid when you load it.",
    "definition": "The total amount actually paid by customers after discounts.",
    "formula": "SUM(Orders.[Final Amount Paid])",
    "table": "Orders",
    "cat": "Sales & Customers",
    "prio": "P1"
  },
  {
    "name": "Discount %",
    "desc": "Supporting KPI. Discount given as a share of gross revenue. 99.8% of orders carry a discount but only 12% use a coupon, so discounts are not coupon-driven in this data.",
    "definition": "Total discount as a percentage of gross revenue.",
    "formula": "SUM(Orders.[Discount Applied]) / SUM(Orders.[Total Amount]) × 100",
    "table": "Orders",
    "cat": "Sales & Customers",
    "prio": "P2"
  },
  {
    "name": "Average Order Value (AOV)",
    "desc": "KPI sheet #3. Gross revenue per order. The net version (Final Amount Paid ÷ orders) is ₹803.88; label which one your card shows.",
    "definition": "The average amount spent per order.",
    "formula": "Total Revenue / Total Orders",
    "table": "Orders",
    "cat": "Sales & Customers",
    "prio": "P1"
  },
  {
    "name": "Total Customers",
    "desc": "KPI sheet #4. Customers who placed at least one order: 6,329. The Customers table has 10,000 registered customers, but 3,671 of them never ordered, so they don't belong in this denominator.",
    "definition": "The number of distinct customers who placed at least one order.",
    "formula": "COUNT(DISTINCT Orders.[Customer ID])",
    "table": "Orders",
    "cat": "Sales & Customers",
    "prio": "P1"
  },
  {
    "name": "Repeat Customers %",
    "desc": "KPI sheet #5. The sheet's DAX filters Orders[OrderID] > 1, which keeps almost every row and returns 100%. The correct logic counts orders per customer first: 2,641 of 6,329 customers ordered more than once.",
    "definition": "The share of ordering customers who placed more than one order.",
    "formula": "COUNT(customers with COUNT(orders) > 1) / Total Customers × 100",
    "table": "Orders",
    "cat": "Sales & Customers",
    "prio": "P1"
  },
  {
    "name": "Revenue per Customer",
    "desc": "KPI sheet #12. Gross revenue divided by ordering customers (6,329). Dividing by all 10,000 registered customers gives ₹1,043.32, which only matches AOV by coincidence of the counts.",
    "definition": "The average gross revenue generated per ordering customer.",
    "formula": "Total Revenue / Total Customers",
    "table": "Orders",
    "cat": "Sales & Customers",
    "prio": "P2"
  },
  {
    "name": "Customer Lifetime Value (CLV)",
    "desc": "KPI sheet #15, using the sheet's own formula: AOV × Repeat Customers % × average orders per customer (1.58). With the sheet's broken 100% repeat measure it would read ₹1,648.48.",
    "definition": "A simple estimate of the value a customer brings over their ordering life.",
    "formula": "AOV × Repeat Customers % × (Total Orders / Total Customers)",
    "table": "Orders",
    "cat": "Sales & Customers",
    "prio": "P2"
  },
  {
    "name": "Top Performing Restaurants",
    "desc": "KPI sheet #7. Rank restaurants by revenue. Show the RestaurantID next to the name: the name suffix often names the wrong city or cuisine, and only 15 base names are reused across 500 restaurants.",
    "definition": "Restaurants ranked by total order revenue.",
    "formula": "SUM(Orders.[Total Amount]) GROUP BY Restaurant ID, TOP 10",
    "table": "Orders, Restaurant",
    "cat": "Sales & Customers",
    "prio": "P2"
  },
  {
    "name": "Top Food Categories",
    "desc": "KPI sheet #14. There is no order-items table, so no order can be tied to a menu item. Joining Orders to Menu on Restaurant ID explodes to 200,199 rows. Report menu items per category and flag the gap.",
    "definition": "Food categories ranked by how many menu items they have (orders by category cannot be computed from this data).",
    "formula": "COUNT(Menu.[MenuItem ID]) GROUP BY Menu.Category",
    "table": "Menu",
    "cat": "Sales & Customers",
    "prio": "P3"
  },
  {
    "name": "Coupon Usage %",
    "desc": "Supporting KPI. 1,200 orders carry a CouponCode; 8,800 are blank. 364 coupon orders (30.33%) fall outside the coupon's ValidFrom–ValidTo window, worth a QA note.",
    "definition": "The share of orders that used a coupon code.",
    "formula": "COUNT(Orders.CouponCode NOT NULL) / Total Orders × 100",
    "table": "Orders, Coupons",
    "cat": "Sales & Customers",
    "prio": "P3"
  },
  {
    "name": "Payment Success %",
    "desc": "Supporting KPI. From the Payments table: 8,980 Success, 530 Pending, 296 Failed, 194 Refunded. Join Payments to Orders on Payment ID, not on the text OrderID.",
    "definition": "The share of payments that completed successfully.",
    "formula": "COUNT(Payments.PaymentStatus = 'Success') / COUNT(Payments.PaymentID) × 100",
    "table": "Payments",
    "cat": "Sales & Customers",
    "prio": "P2"
  },
  {
    "name": "Delivery Efficiency (On-Time %)",
    "desc": "KPI sheet #6. The sheet filters Delivery Status = \"Delivered\", a value that does not exist (only On Time / Late / Cancelled), so it returns 0%. Use \"On Time\": 3,388 of 10,000 deliveries. Excluding cancelled deliveries gives 50.37%; say which denominator you used.",
    "definition": "The share of deliveries that arrived on time.",
    "formula": "COUNT(Delivery.[Delivery Status] = 'On Time') / COUNT(Delivery.[Delivery ID]) × 100",
    "table": "Delivery",
    "cat": "Delivery & Operations",
    "prio": "P1"
  },
  {
    "name": "Late Delivery %",
    "desc": "Supporting KPI. 3,338 deliveries are Late, almost exactly as many as On Time (3,388) and Cancelled (3,274). The three-way split is the main delivery story.",
    "definition": "The share of deliveries that arrived late.",
    "formula": "COUNT(Delivery.[Delivery Status] = 'Late') / COUNT(Delivery.[Delivery ID]) × 100",
    "table": "Delivery",
    "cat": "Delivery & Operations",
    "prio": "P2"
  },
  {
    "name": "Order Cancellation Rate",
    "desc": "KPI sheet #8, on Orders.Status (2,078 Cancelled). The second column, Order Status, has only 105 Cancelled (1.05%), and the two columns agree on just 16.64% of rows. Use Status, as the KPI sheet does, and document it.",
    "definition": "The share of orders that were cancelled.",
    "formula": "COUNT(Orders.Status = 'Cancelled') / Total Orders × 100",
    "table": "Orders",
    "cat": "Delivery & Operations",
    "prio": "P1"
  },
  {
    "name": "Customer Satisfaction Score",
    "desc": "KPI sheet #9. Average Delivery Feedback Rating. A rating of 0 means 'not rated' and appears on exactly the 3,274 cancelled deliveries; keeping the zeros drags the score to 2.00.",
    "definition": "The average delivery feedback rating (1–5) from customers who rated.",
    "formula": "AVG(Delivery.[Delivery Feedback Rating]) WHERE rating > 0",
    "table": "Delivery",
    "cat": "Delivery & Operations",
    "prio": "P1"
  },
  {
    "name": "Average Delivery Time",
    "desc": "KPI sheet #11. The sheet points at Delivery[DeliveryTimeInMinutes], but that column lives in Orders as 'Delivery Time (mins)' (15–59 mins). Don't compute it from the Delivery timestamps: Actual Delivery Time is before Pickup Time on 49.83% of rows.",
    "definition": "The average time taken to deliver an order, in minutes.",
    "formula": "AVG(Orders.[Delivery Time (mins)])",
    "table": "Orders",
    "cat": "Delivery & Operations",
    "prio": "P1"
  },
  {
    "name": "Active Delivery Agents",
    "desc": "KPI sheet #10. Agents who appear on at least one delivery. The DeliveryAgent master has 10,000 agents, but only IDs 1–1,000 ever deliver, 10 orders each on average.",
    "definition": "The number of distinct delivery agents who made at least one delivery.",
    "formula": "COUNT(DISTINCT Delivery.[Delivery Agent ID])",
    "table": "Delivery, DeliveryAgent",
    "cat": "Delivery & Operations",
    "prio": "P2"
  },
  {
    "name": "Peak Order Hours",
    "desc": "KPI sheet #13. Order Date has no time of day and there is no OrderHour column, so this KPI can't be built from Orders. The only hour in the data is Delivery.Pickup Time, which is flat at 363–477 pickups per hour. Show it, labelled as pickup hour, and say the limitation out loud.",
    "definition": "The hours of the day with the most activity (here: pickups, because order time is not recorded).",
    "formula": "COUNT(Delivery.[Delivery ID]) GROUP BY HOUR(Delivery.[Pickup Time])",
    "table": "Delivery",
    "cat": "Delivery & Operations",
    "prio": "P3"
  },
  {
    "name": "Average Order Rating",
    "desc": "Supporting KPI. Average of Ratings.Rating (4,500 rated orders, 45% coverage). Restaurant.Average Rating is a different, master-data number (3.72); don't mix the two on one card.",
    "definition": "The average 1–5 rating customers gave to the orders they rated.",
    "formula": "AVG(Ratings.Rating)",
    "table": "Ratings",
    "cat": "Delivery & Operations",
    "prio": "P3"
  }
];

const M_KPI_CATS = ["All", "Sales & Customers", "Delivery & Operations"];

const M_STATS = [
  { "num": "10,000", "lbl": "Orders (28 Mar 2024 – 28 Mar 2025)" },
  { "num": "6,329", "lbl": "Customers who ordered" },
  { "num": "500", "lbl": "Restaurants · 5 cities" },
  { "num": "12", "lbl": "Tables (Orders as the hub)" },
  { "num": "21", "lbl": "KPIs across 2 dashboards" }
];

const M_TABLES = [
  { name: "Orders", type: "Fact (hub)", rows: "10,000", pk: "OrderID", fk: "Customer ID, Restaurant ID, Payment ID, CouponCode", center: true,
    desc: "One row per order: date, gross amount, discount, amount paid, two status columns, payment method, order source, delivery time in minutes and an optional coupon. Every sales KPI and most delivery KPIs start here." },
  { name: "Delivery", type: "Fact", rows: "10,000", pk: "Delivery ID", fk: "Order ID → Orders, Delivery Agent ID → DeliveryAgent",
    desc: "One delivery per order (1:1 on Order ID): agent, pickup / expected / actual timestamps, delivery status (On Time, Late, Cancelled) and a 0–5 feedback rating." },
  { name: "Payments", type: "Fact", rows: "10,000", pk: "PaymentID", fk: "PaymentID ← Orders.Payment ID; OrderID is text 'ORD1000'",
    desc: "One payment per order: amount, method, status and date. Its OrderID is text with an offset of 999 (ORD1000 = order 1), so join on Payment ID instead." },
  { name: "Ratings", type: "Fact", rows: "4,500", pk: "RatingID", fk: "OrderID (text, −999) → Orders, CustomerID, RestaurantID",
    desc: "Ratings and short reviews for 45% of orders. Same 'ORDn' text key with a 999 offset as Payments." },
  { name: "Login Audit", type: "Fact (events)", rows: "10,000", pk: "Login Audit ID", fk: "CustomerID → Customers",
    desc: "App / web login sessions with login method. Half the sessions log out before they log in, so use it for counts, not for durations." },
  { name: "Customers", type: "Dimension", rows: "10,000", pk: "Customer ID", fk: "—",
    desc: "Registered customers: gender, food preference, loyalty points, membership tier, login method. Only 6,329 of them ever ordered." },
  { name: "CustomerAddress", type: "Dimension", rows: "10,000", pk: "Customer Address ID", fk: "Customer ID → Customers (many per customer)",
    desc: "Saved Home / Work addresses with city and pincode. 6,299 customers have 1–7 addresses; 3,701 have none." },
  { name: "Restaurant", type: "Dimension", rows: "500", pk: "RestaurantID", fk: "—",
    desc: "500 restaurants across 5 NCR cities and 5 cuisines, with master rating, review count, delivery fee and estimated delivery time. Use Location and Cuisine Type, not the name suffix." },
  { name: "Menu", type: "Dimension", rows: "10,000", pk: "MenuItem ID", fk: "Restaurant ID → Restaurant",
    desc: "Menu items per restaurant with category, price, calories and preparation time. Linked to restaurants only: no table says which items an order contained." },
  { name: "OperatingHours", type: "Dimension", rows: "500", pk: "RestaurantID", fk: "RestaurantID → Restaurant (1:1)",
    desc: "Open and close time per restaurant. CloseTime '00:00' means midnight, and Is24Hours is False for all 500." },
  { name: "DeliveryAgent", type: "Dimension", rows: "10,000", pk: "Delivery AgentID", fk: "—",
    desc: "Agent master with vehicle type (Bike, Scooter, Bicycle) and rating. Only agents 1–1,000 appear in Delivery." },
  { name: "Coupons", type: "Dimension", rows: "5", pk: "CouponCode", fk: "CouponCode ← Orders.CouponCode",
    desc: "The 5 coupon codes with stated discount %, validity window and max use." }
];

const M_RELATIONSHIPS = [
  "Orders → Customers  (Customer ID, Many:1)",
  "Orders → Restaurant  (Restaurant ID, Many:1)",
  "Orders → Coupons  (CouponCode, Many:1 — 8,800 orders have no coupon)",
  "Delivery → Orders  (Order ID = OrderID, 1:1)",
  "Delivery → DeliveryAgent  (Delivery Agent ID = Delivery AgentID, Many:1)",
  "Payments → Orders  (PaymentID = Orders.Payment ID, 1:1 — the clean key; the text OrderID needs −999)",
  "Ratings → Orders  (Order Key = number in 'ORDn' − 999, 1:1 for the 4,500 rated orders)",
  "Menu → Restaurant  (Restaurant ID, Many:1 — no link from Menu to Orders)",
  "OperatingHours → Restaurant  (RestaurantID, 1:1)",
  "CustomerAddress → Customers  (Customer ID, Many:1 — up to 7 per customer)",
  "Login Audit → Customers  (CustomerID, Many:1)",
  "Ratings → Restaurant / Customers  (keep these inactive in Power BI; the path through Orders already exists)"
];

const M_LOAD_ORDER = [
  "1. Dimensions first: customers, restaurant, delivery_agent, coupons — each with a clean primary key.",
  "2. Restaurant children: menu and operating_hours (both point to restaurant_id). Customer children: customer_address and login_audit.",
  "3. orders — after customers, restaurant and coupons exist. Rename the 'Fina lAmount Paid' header to final_amount_paid and keep couponcode NULL-able.",
  "4. delivery and payments (1 row per order), then ratings. Add an integer order key to payments and ratings: CAST(SUBSTRING(orderid, 4) AS UNSIGNED) − 999.",
  "5. Re-validate row counts: orders, delivery, payments, customers, menu, delivery_agent, customer_address, login_audit = 10,000 each; ratings 4,500; restaurant 500; operating_hours 500; coupons 5."
];

const M_NULL_NOTES = [
  "Orders.CouponCode is blank on 8,800 of 10,000 orders. That's 'no coupon used', not missing data; count it as 'No coupon' in visuals.",
  "Customers.Anniversary is blank on 5,016 rows, and 276 filled anniversaries fall before the customer's date of birth. Don't build any KPI on it.",
  "Delivery Feedback Rating = 0 on 3,274 rows, exactly the deliveries with Delivery Status = 'Cancelled'. Treat 0 as 'not rated' (NULL) before averaging.",
  "Order Date is a date with no time of day. There is no OrderHour column anywhere, so 'Peak Order Hours' can only be approximated with Delivery.Pickup Time.",
  "Payments.OrderID and Ratings.OrderID are text ('ORD1000'). ORDn = Orders.OrderID n − 999. Payments also carries PaymentID, which matches Orders.Payment ID on 100% of rows.",
  "Restaurant 500 has no orders and no menu items, so it shows up blank in any restaurant visual that starts from the Restaurant table."
];

const M_CALC_FIELDS = [
  "Order Key (Payments, Ratings) — CAST(SUBSTRING(OrderID, 4) AS UNSIGNED) − 999; turns 'ORD1000' into OrderID 1.",
  "Is Cancelled — CASE WHEN Status = 'Cancelled' THEN 1 ELSE 0 END on Orders; sum it for cancellations, average it for the rate.",
  "Is On Time — CASE WHEN Delivery Status = 'On Time' THEN 1 ELSE 0 END on Delivery.",
  "Feedback (rated only) — NULLIF(Delivery Feedback Rating, 0), so averages skip the cancelled, unrated deliveries.",
  "Customer Order Count — orders per Customer ID (a FIXED LOD in Tableau, a summarised table or SUMX in Power BI); > 1 flags a repeat customer.",
  "Order Month — DATE_FORMAT(Order Date, '%Y-%m'). Note March 2024 has only 4 days (28–31 Mar) and March 2025 runs to the 28th.",
  "Status Mismatch — Status <> Order Status; flags the 83% of orders where the two status columns disagree.",
  "Pickup Hour — HOUR(Pickup Time), the only hour-of-day field in the data."
];

const M_TABLEAU_CALC_FIELDS = [
  { name: "Customer Order Count", desc: "A FIXED Level-of-Detail calc that counts each customer's orders regardless of what's on the view. The building block for repeat customers and order-frequency bands.", formula: "{ FIXED [Customer ID] : COUNTD([OrderID]) }" },
  { name: "Repeat Customers %", desc: "Customers with more than one order ÷ all ordering customers. Returns 41.73% at the top level; compare it with the KPI sheet's OrderID > 1 logic, which returns 100%.", formula: "COUNTD(IF [Customer Order Count] > 1 THEN [Customer ID] END)\n/ COUNTD([Customer ID])" },
  { name: "On-Time %", desc: "Share of deliveries with Delivery Status = \"On Time\" (there is no \"Delivered\" value in this column). Put Delivery ID in the denominator so a filter on status doesn't change it unexpectedly.", formula: "SUM(IF [Delivery Status] = \"On Time\" THEN 1 ELSE 0 END)\n/ COUNT([Delivery ID])" },
  { name: "Cancellation %", desc: "Cancelled orders ÷ all orders, on Orders.Status (the column the KPI sheet uses).", formula: "SUM(IF [Status] = \"Cancelled\" THEN 1 ELSE 0 END)\n/ COUNTD([OrderID])" },
  { name: "CSS (rated only)", desc: "Average delivery feedback that ignores the 0s. An IF without ELSE returns NULL, and AVG skips NULLs.", formula: "AVG(IF [Delivery Feedback Rating] > 0\n    THEN [Delivery Feedback Rating] END)" },
  { name: "Order Key", desc: "Converts the text OrderID in Payments / Ratings ('ORD1000') into the matching Orders.OrderID (1). Use it as the relationship field for Ratings.", formula: "INT(MID([OrderID (Ratings)], 4)) - 999" },
  { name: "CLV", desc: "The KPI sheet's CLV formula as one calc: AOV × Repeat Customers % × orders per customer. Should read ₹687.89 overall.", formula: "(SUM([Total Amount]) / COUNTD([OrderID]))\n* [Repeat Customers %]\n* (COUNTD([OrderID]) / COUNTD([Customer ID]))" },
  { name: "Pickup Hour", desc: "Hour of day from Delivery.Pickup Time, the only time-of-day field in the data. Label any chart built on it 'pickup hour', not 'order hour'.", formula: "DATEPART('hour', [Pickup Time])" }
];

const M_JOIN_GUIDE = [
  ["FACT", "Orders", "OrderID", "Customer ID, Restaurant ID, Payment ID, CouponCode", "Customers, Restaurant, Coupons; Delivery, Payments, Ratings (1:1)", "1 row per order — 10,000 rows"],
  ["FACT", "Delivery", "Delivery ID", "Order ID, Delivery Agent ID", "Orders (1:1), DeliveryAgent (Many:1)", "1 row per order's delivery — 10,000 rows"],
  ["FACT", "Payments", "PaymentID", "OrderID (text, −999), CustomerID", "Orders via Payment ID (1:1)", "1 row per payment — 10,000 rows"],
  ["FACT", "Ratings", "RatingID", "OrderID (text, −999), CustomerID, RestaurantID", "Orders via Order Key (1:1)", "1 row per rated order — 4,500 rows"],
  ["FACT", "Login Audit", "Login Audit ID", "CustomerID", "Customers (Many:1)", "1 row per login session — 10,000 rows"],
  ["DIM", "Customers", "Customer ID", "—", "Orders, CustomerAddress, Login Audit (1:Many)", "1 row per registered customer — 10,000 rows"],
  ["DIM", "CustomerAddress", "Customer Address ID", "Customer ID", "Customers (Many:1)", "1 row per saved address — 10,000 rows"],
  ["DIM", "Restaurant", "RestaurantID", "—", "Orders, Menu, OperatingHours (1:Many / 1:1)", "1 row per restaurant — 500 rows"],
  ["DIM", "Menu", "MenuItem ID", "Restaurant ID", "Restaurant (Many:1)", "1 row per menu item — 10,000 rows"],
  ["DIM", "OperatingHours", "RestaurantID", "RestaurantID", "Restaurant (1:1)", "1 row per restaurant — 500 rows"],
  ["DIM", "DeliveryAgent", "Delivery AgentID", "—", "Delivery (1:Many)", "1 row per agent — 10,000 rows"],
  ["DIM", "Coupons", "CouponCode", "—", "Orders (1:Many)", "1 row per coupon — 5 rows"]
];

const M_JOIN_PATHS = [
  ["Orders by customer", "orders.customer_id = customers.customer_id"],
  ["Orders by city / cuisine", "orders.restaurant_id = restaurant.restaurantid"],
  ["Delivery for each order", "delivery.order_id = orders.orderid"],
  ["Agent and vehicle for each delivery", "delivery.delivery_agent_id = delivery_agent.delivery_agentid"],
  ["Payment for each order (clean key)", "payments.paymentid = orders.payment_id"],
  ["Payment by text OrderID (offset)", "CAST(SUBSTRING(payments.orderid, 4) AS UNSIGNED) - 999 = orders.orderid"],
  ["Rating for each order", "CAST(SUBSTRING(ratings.orderid, 4) AS UNSIGNED) - 999 = orders.orderid"],
  ["Coupon details", "orders.couponcode = coupons.couponcode"],
  ["Menu of a restaurant (not of an order)", "menu.restaurant_id = restaurant.restaurantid"],
  ["Restaurant opening hours", "operating_hours.restaurantid = restaurant.restaurantid"],
  ["Customer's saved addresses", "customer_address.customer_id = customers.customer_id"],
  ["Customer's login sessions", "login_audit.customerid = customers.customer_id"]
];

const M_GLOBAL_FILTERS = [
  ["Order Date (month)", "Orders.Order Date"],
  ["City", "Restaurant.Location (via Orders.Restaurant ID)"],
  ["Cuisine", "Restaurant.Cuisine Type"],
  ["Order Source", "Orders.Order Source (App / Web)"],
  ["Payment Method", "Orders.Payment Method"],
  ["Order Status", "Orders.Status"],
  ["Membership", "Customers.MembershipStatus"],
  ["Vehicle Type", "DeliveryAgent.Vehicle Type (delivery pages)"],
  ["Coupon used", "Orders.CouponCode IS NOT NULL"]
];

const M_DASHBOARDS = [
  ["1", "Sales & Customers Dashboard", "Business Head, Marketing, Restaurant Partnerships", "Total Orders, Total Revenue, Net Revenue, AOV, Total Customers, Repeat Customers %, Revenue per Customer, CLV, Discount %, Coupon Usage %", "KPI cards, line (orders & revenue by month), bar (revenue by city and cuisine), donut (customers by number of orders), Top 10 restaurants table"],
  ["1.1", "Drill-through: Restaurant Detail", "Restaurant Partnerships, City Managers", "Revenue, orders, AOV, cancellation %, avg order rating for the selected restaurant", "Right-click a restaurant or city → monthly revenue line, order status split, menu items by category, reviews table"],
  ["2", "Delivery & Operations Dashboard", "Operations Head, Delivery Fleet Managers, Customer Support", "Delivery Efficiency (On-Time %), Late Delivery %, Order Cancellation Rate, Average Delivery Time, Customer Satisfaction Score, Active Delivery Agents, Payment Success %", "KPI cards, donut (delivery status), bar (on-time % by vehicle and city), line (cancellation % by month), pickup-hour column chart"],
  ["2.1", "Drill-through: Agent & City Operations", "Fleet Managers, City Operations", "On-time %, late %, avg delivery time, CSS for the selected city or vehicle type", "Right-click a city or vehicle type → agent table (orders, on-time %, rating), status vs delivery status matrix, feedback distribution"]
];

const M_DATA_DICTIONARY = [
  { table: "Orders (16 columns)", rows: "10,000 rows", cols: [
    ["OrderID", "Integer", "Order identifier — PK (1–10,000)", "Payments / Ratings store it as text 'ORD' + (OrderID + 999)"],
    ["Customer ID", "Integer", "FK → Customers", "6,329 distinct customers"],
    ["Restaurant ID", "Integer", "FK → Restaurant", "499 distinct restaurants (restaurant 500 has no orders)"],
    ["Order Date", "Date", "Date the order was placed", "28-Mar-2024 → 28-Mar-2025; no time of day"],
    ["Total Amount", "Integer (₹)", "Gross order value before discount", "₹100 – ₹1,999; source of Total Revenue"],
    ["Discount Applied", "Integer (₹)", "Discount on the order", "₹0 – ₹499; greater than Total Amount on 892 orders"],
    ["Fina lAmount Paid", "Integer (₹)", "Amount paid after discount", "Header typo: rename to Final Amount Paid. ₹0 on 898 orders; equals Total − Discount on 91.08% of rows"],
    ["Status", "Text", "Placed / Preparing / Out for Delivery / Delivered / Cancelled", "The status the KPI sheet uses (2,078 Cancelled)"],
    ["Payment Method", "Text", "Credit Card / Debit Card / UPI / Cash on Delivery", "Disagrees with Payments.PaymentMethod on most rows"],
    ["Order Source", "Text", "App / Web", "Web 5,027 · App 4,973"],
    ["Created Date", "Date", "Record created date", "System field — earlier than Order Date; don't use for trends"],
    ["Modified Date", "Date", "Record modified date", "System field"],
    ["Order Status", "Text", "A second status: 8 values incl. Confirmed, Ready, Returned", "Agrees with Status on only 16.64% of rows (105 Cancelled)"],
    ["Payment ID", "Text", "Payment reference, e.g. PAY100001", "Clean 1:1 key to Payments.PaymentID"],
    ["Delivery Time (mins)", "Integer", "Minutes taken to deliver", "15–59 mins; source for Average Delivery Time"],
    ["CouponCode", "Text", "Coupon used, if any", "Blank on 8,800 orders; FK → Coupons"]
  ]},
  { table: "Delivery (10 columns)", rows: "10,000 rows", cols: [
    ["Delivery ID", "Integer", "Delivery identifier — PK", "—"],
    ["Order ID", "Integer", "FK → Orders.OrderID", "Exactly one delivery per order"],
    ["Delivery Agent ID", "Integer", "FK → DeliveryAgent", "Only IDs 1–1,000 occur"],
    ["Pickup Time", "Datetime", "When the agent picked up the order", "The only hour-of-day field in the data"],
    ["Expected Delivery Time", "Datetime", "Promised delivery time", "Unreliable: often months away from pickup"],
    ["Actual Delivery Time", "Datetime", "Actual delivery time", "Before Pickup Time on 49.83% of rows — don't subtract timestamps"],
    ["Delivery Status", "Text", "On Time / Late / Cancelled", "No 'Delivered' value: 3,388 / 3,338 / 3,274"],
    ["Delivery Feedback Rating", "Integer", "Customer feedback 0–5", "0 = not rated, exactly the 3,274 cancelled deliveries"],
    ["CreatedDate", "Date", "Record created date", "System field"],
    ["ModifiedDate", "Date", "Record modified date", "System field"]
  ]},
  { table: "Payments (7 columns)", rows: "10,000 rows", cols: [
    ["PaymentID", "Text", "Payment identifier — PK", "Matches Orders.Payment ID on all 10,000 rows"],
    ["OrderID", "Text", "Order reference 'ORD1000' …", "ORDn = Orders.OrderID n − 999; joining the text to the integer gives 0 matches"],
    ["CustomerID", "Integer", "Customer who paid", "Matches Orders.Customer ID once the offset is applied"],
    ["Amount", "Integer (₹)", "Amount paid", "Equals Orders.Final Amount Paid"],
    ["PaymentMethod", "Text", "UPI / Card / NetBanking / Wallet / Cash", "A different list from Orders.Payment Method"],
    ["PaymentStatus", "Text", "Success / Pending / Failed / Refunded", "8,980 Success"],
    ["PaymentDate", "Date", "Payment date", "Before the order date on 16.96% of orders"]
  ]},
  { table: "Ratings (7 columns)", rows: "4,500 rows", cols: [
    ["RatingID", "Text", "Rating identifier — PK, e.g. RAT206252", "—"],
    ["OrderID", "Text", "Order reference 'ORDn'", "Same −999 offset as Payments"],
    ["CustomerID", "Integer", "Customer who rated", "—"],
    ["RestaurantID", "Integer", "Restaurant rated", "Matches the order's Restaurant ID"],
    ["Rating", "Integer", "Order rating 1–5", "Average 3.02; nearly flat across 1–5"],
    ["Review", "Text", "Short review text", "11 fixed phrases; 'Food was cold' (868) and 'Too slow' (846) lead"],
    ["CreatedDate", "Date", "Date of the rating", "Runs to Sep 2025, after the last order"]
  ]},
  { table: "Login Audit (5 columns)", rows: "10,000 rows", cols: [
    ["Login Audit ID", "Integer", "Session identifier — PK", "—"],
    ["CustomerID", "Integer", "FK → Customers", "6,351 distinct customers"],
    ["Login Time", "Datetime", "Session start", "—"],
    ["Logout Time", "Datetime", "Session end", "Before Login Time on 50.07% of rows"],
    ["Login Method", "Text", "Google / Email / Facebook", "—"]
  ]},
  { table: "Customers (14 columns)", rows: "10,000 rows", cols: [
    ["Customer ID", "Integer", "Customer identifier — PK", "Only 6,329 of 10,000 placed an order"],
    ["Name", "Text", "Customer name", "Personal data: don't show on dashboards"],
    ["Mobile", "Number", "Mobile number", "6 to 12 digits; store as text"],
    ["Email", "Text", "Email address", "46 duplicate emails"],
    ["LoginByUsing", "Text", "Google / Email / Facebook", "—"],
    ["Gender", "Text", "Male / Female / Other", "Almost exactly one third each"],
    ["DOB", "Date", "Date of birth", "—"],
    ["Anniversary", "Date", "Anniversary date", "Blank on 5,016 rows; before DOB on 276"],
    ["Preferences", "Text", "Veg / Non-Veg / Vegan", "—"],
    ["LoyaltyPoints", "Integer", "Loyalty points balance", "—"],
    ["MembershipStatus", "Text", "Regular / Gold / Platinum", "—"],
    ["LastOrderDate", "Date", "Stored last order date", "Matches the real last order in Orders for only 0.16% of customers"],
    ["CreatedDate", "Date", "Registration date", "—"],
    ["ModifiedDate", "Date", "Record modified date", "System field"]
  ]},
  { table: "CustomerAddress (6 columns)", rows: "10,000 rows", cols: [
    ["Customer Address ID", "Integer", "Address identifier — PK", "—"],
    ["Customer ID", "Integer", "FK → Customers", "6,299 customers; up to 7 addresses each"],
    ["Address", "Text", "Street address", "Free text; the city in the text often differs from City"],
    ["City", "Text", "Delhi / Noida / Gurgaon / Faridabad / Ghaziabad", "Customer's saved city, not the order's city"],
    ["Pincode", "Integer", "Postal code", "—"],
    ["Address Type", "Text", "Home / Work", "—"]
  ]},
  { table: "Restaurant (10 columns)", rows: "500 rows", cols: [
    ["RestaurantID", "Integer", "Restaurant identifier — PK", "—"],
    ["Location", "Text", "City: Noida / Faridabad / Gurgaon / Delhi / Ghaziabad", "The real city field for every city visual"],
    ["Cuisine Type", "Text", "Italian / Indian / Chinese / Fast Food / Mexican", "The real cuisine field"],
    ["Average Rating", "Decimal", "Master rating of the restaurant", "Average 3.72 — not the same as the Ratings table (3.02)"],
    ["Total Reviews", "Integer", "Review count on the listing", "—"],
    ["Created Date", "Date", "Listing created date", "—"],
    ["Modified Date", "Date", "Listing modified date", "—"],
    ["Restaurant Name ", "Text", "Display name, e.g. 'Biryani House - Mexican (3)'", "Trailing space in the header; suffix doesn't match Location in 81.6% of rows"],
    ["Delivery Fee", "Decimal (₹)", "Delivery fee charged", "—"],
    ["Estimated Delivery Time (mins)", "Integer", "Listed delivery estimate", "Average 39.66 mins"]
  ]},
  { table: "Menu (10 columns)", rows: "10,000 rows", cols: [
    ["MenuItem ID", "Integer", "Menu item identifier — PK", "—"],
    ["Restaurant ID", "Integer", "FK → Restaurant", "499 restaurants have menu items"],
    ["Item Name", "Text", "Item name", "182 distinct placeholder names"],
    ["Category", "Text", "Main Course / Dessert / Beverage / Starter", "Main Course 2,559 · Dessert 2,549 · Beverage 2,452 · Starter 2,440"],
    ["Price", "Integer (₹)", "Item price", "₹50 – ₹999"],
    ["Calories", "Integer", "Calories", "—"],
    ["Ingredients", "Text", "Main ingredients", "4 distinct values"],
    ["Preparation Time", "Integer", "Minutes to prepare", "—"],
    ["Created Date", "Date", "Record created date", "—"],
    ["Modified Date", "Date", "Record modified date", "—"]
  ]},
  { table: "OperatingHours (4 columns)", rows: "500 rows", cols: [
    ["RestaurantID", "Integer", "PK and FK → Restaurant (1:1)", "—"],
    ["OpenTime", "Text (HH:MM)", "Opening time", "08:00 – 11:00"],
    ["CloseTime", "Text (HH:MM)", "Closing time", "'00:00' on 134 restaurants means midnight and sorts before OpenTime"],
    ["Is24Hours", "Boolean", "Open 24 hours", "False for all 500"]
  ]},
  { table: "DeliveryAgent (5 columns)", rows: "10,000 rows", cols: [
    ["Delivery AgentID", "Integer", "Agent identifier — PK", "Only 1–1,000 appear in Delivery"],
    ["Name", "Text", "Agent name", "Personal data: show the ID on dashboards"],
    ["Mobile", "Number", "Mobile number", "Store as text"],
    ["Vehicle Type", "Text", "Bike / Scooter / Bicycle", "—"],
    ["Ratings", "Decimal", "Agent rating", "Master value, average 3.75"]
  ]},
  { table: "Coupons (6 columns)", rows: "5 rows", cols: [
    ["CouponCode", "Text", "Coupon code — PK", "NEW50, SAVE20, FREESHIP, BIRYANI10, MOMO5"],
    ["Description", "Text", "Promo description", "'<code> promo'"],
    ["DiscountPercent", "Integer", "Stated discount %", "Doesn't match the discount actually applied on coupon orders"],
    ["ValidFrom", "Date", "Start of validity", "—"],
    ["ValidTo", "Date", "End of validity", "364 coupon orders fall outside the window"],
    ["MaxUse", "Integer", "Maximum uses", "—"]
  ]}
];

const M_CHART_COLORS = ["#FC8019", "#1E3A5F", "#DC2626", "#5B6472", "#0F766E", "#F59E0B"];

const M_DASH_MOCKS = [
  {
    title: "Sales & Customers Dashboard",
    sub: "All 10,000 orders, 28 Mar 2024 – 28 Mar 2025 · gross revenue = Total Amount",
    kpis: [
      { v: "₹1.04 Cr", l: "Total Revenue" },
      { v: "10,000", l: "Total Orders" },
      { v: "₹1,043.32", l: "AOV" },
      { v: "41.73%", l: "Repeat Customers" }
    ],
    donuts: [
      { title: "Customers by number of orders (6,329)", data: [["1 order", 3688], ["2 orders", 1825], ["3 orders", 638], ["4+ orders", 178]] }
    ],
    bars: [
      { title: "Revenue by city (₹ lakh)", data: [["Noida", 22.53], ["Faridabad", 21.83], ["Gurgaon", 20.7], ["Delhi", 19.98], ["Ghaziabad", 19.29]] }
    ]
  },
  {
    title: "Delivery & Operations Dashboard",
    sub: "10,000 deliveries · On Time, Late and Cancelled each take about a third",
    kpis: [
      { v: "33.88%", l: "On-Time Deliveries" },
      { v: "20.78%", l: "Order Cancellation Rate" },
      { v: "37.18 mins", l: "Avg Delivery Time" },
      { v: "2.97 / 5", l: "Customer Satisfaction" }
    ],
    donuts: [
      { title: "Delivery status (10,000)", data: [["On Time", 3388], ["Late", 3338], ["Cancelled", 3274]] }
    ],
    bars: [
      { title: "On-time % by vehicle type", data: [["Scooter", 34.81], ["Bike", 33.62], ["Bicycle", 33.04]] }
    ]
  }
];

const M_SQL_BLOCKS = [
  { title: "Row counts — verify the load", desc: "Every table should match the Dataset page before you build anything.", sql: "USE swiggy_db;\nSELECT 'orders' t, COUNT(*) FROM orders           -- 10,000\nUNION ALL SELECT 'delivery', COUNT(*) FROM delivery   -- 10,000\nUNION ALL SELECT 'payments', COUNT(*) FROM payments   -- 10,000\nUNION ALL SELECT 'ratings', COUNT(*) FROM ratings     -- 4,500\nUNION ALL SELECT 'restaurant', COUNT(*) FROM restaurant; -- 500" },
  { title: "Revenue, net revenue and AOV", desc: "Gross revenue uses total_amount; net uses final_amount_paid.", sql: "SELECT COUNT(*)                         AS total_orders,   -- 10,000\n       SUM(total_amount)                AS total_revenue,  -- 10,433,244\n       SUM(final_amount_paid)           AS net_revenue,    -- 8,038,789\n       ROUND(SUM(total_amount) / COUNT(*), 2) AS aov       -- 1043.32\nFROM orders;" },
  { title: "Repeat Customers % — the correct way", desc: "Count orders per customer first, then count customers with more than one.", sql: "SELECT COUNT(*)                                   AS total_customers,  -- 6,329\n       SUM(n > 1)                                 AS repeat_customers, -- 2,641\n       ROUND(SUM(n > 1) / COUNT(*) * 100, 2)      AS repeat_pct        -- 41.73\nFROM (SELECT customer_id, COUNT(*) AS n FROM orders GROUP BY customer_id) c;" },
  { title: "Delivery Efficiency — 'On Time', not 'Delivered'", desc: "Run the second query to see why the KPI sheet's filter returns 0.", sql: "SELECT ROUND(AVG(delivery_status = 'On Time') * 100, 2) AS on_time_pct   -- 33.88\nFROM delivery;\n\nSELECT delivery_status, COUNT(*) FROM delivery GROUP BY delivery_status;\n-- On Time 3,388 · Late 3,338 · Cancelled 3,274 (no 'Delivered')" },
  { title: "Cancellation rate on both status columns", desc: "The two columns tell different stories; the KPI sheet uses status.", sql: "SELECT ROUND(AVG(status = 'Cancelled') * 100, 2)       AS cancel_pct_status,       -- 20.78\n       ROUND(AVG(order_status = 'Cancelled') * 100, 2) AS cancel_pct_order_status, -- 1.05\n       SUM(status = order_status)                      AS rows_that_agree          -- 1,664\nFROM orders;" },
  { title: "Top 10 restaurants by revenue", desc: "Group by ID and show the real city and cuisine next to the name.", sql: "SELECT r.restaurantid, r.restaurant_name, r.location, r.cuisine_type,\n       SUM(o.total_amount) AS revenue\nFROM orders o\nJOIN restaurant r ON r.restaurantid = o.restaurant_id\nGROUP BY r.restaurantid, r.restaurant_name, r.location, r.cuisine_type\nORDER BY revenue DESC\nLIMIT 10;   -- #92 Urban Tadka (Gurgaon, Indian) 35,503 first" }
];

const M_PROBLEM_STATEMENT = [
  { icon: "1", ok: false, h: "Order, Delivery and Payment Data in Separate Systems", p: "Orders, deliveries, payments, ratings and customer records sit in 12 separate exports with different keys, so nobody can follow one order from checkout to doorstep to rating." },
  { icon: "2", ok: false, h: "No Agreed Definitions", p: "Two order-status columns disagree, payment methods are recorded two ways, and the KPI sheet's own formulas return 0% on-time and 100% repeat customers. Every team can quote a different number." },
  { icon: "3", ok: false, h: "Delivery Performance Is a Blind Spot", p: "Only a third of deliveries are on time, a fifth of orders are cancelled, and satisfaction sits under 3 out of 5, but there is no view that shows where and for whom it goes wrong." },
  { icon: "4", ok: false, h: "No KPI-Driven Dashboards", p: "Sales, operations and restaurant teams need one governed set of KPIs in Tableau and Power BI, reconciled to SQL, instead of numbers pulled by hand for each review." }
];

const M_TOOLS = [
  { logo: "assets/excel-logo.jpg", name: "Excel", role: "Phase 1 · Profile & prep the data", desc: "Profile the 12 sheets, note each table's key and grain, document the data-quality issues (two status columns, the 'ORD' text keys, discount above order value, header typos) and build a first pivot dashboard before touching SQL." },
  { logo: "assets/mysql-logo.png", name: "SQL Database", role: "Phase 2 · Database setup", desc: "Load all 12 tables into MySQL schema swiggy_db with primary and foreign keys, add the integer order key to payments and ratings, and verify every row count." },
  { logo: "assets/tableau-logo.jpg", name: "Tableau", role: "Phase 3 · Connect & build", desc: "Connect Tableau to swiggy_db and build the Sales & Customers and Delivery & Operations dashboards with filters, drill-through pages and tooltips, using LOD calcs for repeat customers." },
  { logo: "assets/powerbi-logo.png", name: "Power BI", role: "Phase 3-4 · Data modeling & DAX", desc: "Model Orders as the hub with Delivery, Payments and Ratings 1:1 and the dimensions around it, then write DAX measures for all 21 KPIs, fixing the KPI sheet's repeat-customer and on-time formulas." },
  { logo: "assets/sia-avatar.png", name: "AI / Insights", role: "Phase 4 (optional) · Ask the database a question", desc: "An optional natural-language layer on the same database — Power BI Q&A or a small chatbot wired to your KPI queries — so an operations manager can type \"what was our cancellation rate in Noida last month?\" and get an answer from the governed numbers." },
  { logo: "assets/mysql-logo.png", name: "QA / SQL", role: "Phase 5 · Reconcile SQL to dashboard", desc: "Run SQL against swiggy_db — totals, rates, top-N lists — and reconcile every KPI against Power BI and Tableau within ±0.1% before sign-off." }
];

const M_DOMAIN_WHAT = "Food-delivery analytics follows an order through its whole life: the customer places it in the app or on the web, a restaurant prepares it, a delivery agent picks it up and drops it off, the customer pays and maybe rates it. Each step writes to a different table. Joining those tables into one model lets the business answer the questions that matter: how much we sell and to whom, how many customers come back, how often deliveries are on time, why orders get cancelled, and how satisfied customers are.";

const M_DOMAIN_WHERE = [
  "Food-delivery and quick-commerce platforms — order volume, revenue, AOV and repeat-customer tracking across cities and cuisines.",
  "Delivery operations — on-time %, late %, cancellations and delivery time by city, agent and vehicle type.",
  "Restaurant partnerships — top restaurants by revenue, ratings and cancellations to decide whom to promote or coach.",
  "Marketing and growth — coupon usage, discount cost, membership tiers and customer lifetime value."
];

const M_DOMAIN_DATA_TYPES = [
  "Order records", "Delivery & agent records", "Payment records", "Ratings & reviews",
  "Customer & address records", "Restaurant & menu records", "Coupon & discount records", "Login / session records"
];

const M_FLOW = [
  { t: "Data Preparation (Excel)", d: "Use the provided data to create an initial dashboard, perform basic cleaning and transformation, and identify the KPIs and visualization requirements." },
  { t: "SQL Integration (Database Setup)", d: "Load the cleaned files into a SQL database under a well-structured schema, normalize where needed, and establish primary/foreign key relationships for referential integrity." },
  { t: "BI Tool Connection (Data Modeling)", d: "Connect the database to Tableau and Power BI, build a comprehensive data model with the necessary joins, and optimize it with indexing/aggregation where required." },
  { t: "Dashboard Development", d: "Design interactive dashboards in Tableau and Power BI with filters, drill-throughs and tooltips, incorporating trend analysis where it adds insight." },
  { t: "Quality Assurance (QA & Validation)", d: "Compare database records against dashboard visuals, test calculations and relationships end to end, and validate against the business requirements." }
];

const M_TIMELINE = [
  { d: "Week 1", t: "Kickoff", task: "Project kick-off meeting" },
  { d: "Week 2", t: "Excel", task: "Implementation of KPIs using Excel" },
  { d: "Week 3", t: "Tableau/SQL", task: "Implementation of KPIs using Tableau / SQL / QA" },
  { d: "Week 4", t: "Power BI", task: "Implementation of KPIs using Power BI / SQL / QA" },
  { d: "Week 5", t: "Wrap-up", task: "Final presentation of the project" }
];

const M_RULES = [
  { icon: "⚠", ok: false, h: "Attendance is mandatory", p: "Missing more than two meetings results in removal from the project. Join every meeting under the same name you registered with — an unrecognized name gets marked absent." },
  { icon: "⚠", ok: false, h: "Attendance alone isn't enough", p: "Merely attending meetings without making active contributions will also lead to removal — active involvement with your group is essential for continued participation." },
  { icon: "✓", ok: true, h: "Flag non-contributing teammates early", p: "If a team member isn't contributing, it's mandatory to inform management regularly — by call, WhatsApp, email, or during the weekly review meeting." },
  { icon: "✓", ok: true, h: "Contribute across every tool", p: "You're expected to contribute to Excel, Tableau, SQL, Power BI and the final PPT presentation. Failure to contribute to even a single tool may result in removal." },
  { icon: "✓", ok: true, h: "Weekly review presentations", p: "Each group must present its project progress during weekly review meetings — consistent updates and well-prepared presentations are expected from all teams." }
];

const M_FOCUS_AREAS = [
  { n: "01", h: "Active Contribution", p: "Each team member should actively participate and engage with the team, not just observe the build." },
  { n: "02", h: "Timely Completion of Tasks", p: "Ensure that all assigned work is completed within the given deadlines." },
  { n: "03", h: "Clear Communication", p: "Say what you're blocked on before the deadline, not after." },
  { n: "04", h: "Active Listening", p: "Actually absorb teammates' updates in review meetings — you'll be asked about their work too." },
  { n: "05", h: "Sharing Insights", p: "Provide your own insights and suggestions to improve the overall quality of the work." },
  { n: "06", h: "Collaboration Over Competition", p: "Work as a team, focusing on collective success rather than individual achievements." },
  { n: "07", h: "Recognizing Contributions", p: "Acknowledge and appreciate the efforts of your teammates to boost motivation and morale." },
  { n: "08", h: "Daily Team Connectivity", p: "A short daily check-in catches blockers before they become a missed deadline." }
];

const M_SOCIAL = {
  linkedin: "https://www.linkedin.com/in/mahendra-singh-%F0%9F%87%AE%F0%9F%87%B3%F0%9F%9A%80%E2%9D%84%EF%B8%8F-%F0%9F%90%8D-%F0%9F%A6%84-83699485/",
  medium: "https://medium.com/@mahendraa1188",
  youtube: "https://www.youtube.com/channel/UC2q-vZWSlQpiGiMcSLUqnIg",
  instagram: ""
};

const M_CRACKANALYTICS_URL = "https://www.crackanalytics.com/";

const M_DOCUMENTS = [];

const M_SOFTWARE_LINKS = [
  { name: "MySQL Community Server — free download", desc: "Official installer from Oracle/MySQL", icon: "🗄️", type: "link", href: "https://dev.mysql.com/downloads/mysql/" },
  { name: "Tableau Desktop — free download", desc: "Official installer from Tableau (free trial / Public edition)", icon: "📈", type: "link", href: "https://www.tableau.com/products/desktop-free/download" },
  { name: "Power BI Desktop — free download", desc: "Official installer from Microsoft", icon: "⚡", type: "link", href: "https://www.microsoft.com/en-us/download/details.aspx?id=58494" }
];

const M_QA_CATS = ["Explain This Project", "SQL", "Power BI & DAX", "Tableau", "Data Modeling", "Food Delivery Domain", "General & HR", "Rapid Fire"];

const M_QA = [
  { cat: "Explain This Project", q: "Explain this project to me — what did you actually build?", a: "Tell it as a story: (1) the data — a food-delivery business case on Swiggy with 12 tables: 10,000 orders from 28 Mar 2024 to 28 Mar 2025, deliveries, payments, 4,500 ratings, 10,000 customers, 500 restaurants in 5 NCR cities; (2) the architecture — Excel profiling → MySQL (swiggy_db) with Orders as the hub → Power BI and Tableau; (3) the challenge — the KPI sheet's own formulas were wrong (0% on-time, 100% repeat customers) and two status columns disagreed, and how you fixed them; (4) the outcome — a Sales & Customers dashboard and a Delivery & Operations dashboard with drill-through pages, 21 KPIs reconciled to SQL within ±0.1%. Keep it under two minutes.", signal: "Almost always the first question — tests structure and communication before anything technical." },
  { cat: "Explain This Project", q: "What was the trickiest data-quality issue in this dataset, and how did you handle it?", a: "Pick one and go deep. Good choice: the Repeat Customers formula in the KPI sheet filters Orders[OrderID] > 1, which keeps every order except the first and returns 100%. The question is about customers, so you count orders per customer first and then count customers with more than one: 2,641 of 6,329 = 41.73%. Mention you found it because 100% repeat is not believable for a delivery app.", signal: "Tests whether you found and can explain a specific issue — not a generic 'we cleaned the data' answer." },
  { cat: "Explain This Project", q: "What was the business problem this project was solving?", a: "Orders, deliveries, payments and ratings lived in separate exports with mismatched keys, so the business had no single view of sales, repeat customers or delivery performance, and the KPI document itself gave wrong numbers. The two dashboards give sales and operations one reconciled set of KPIs: revenue and customers on one side, on-time %, cancellations and satisfaction on the other.", signal: "Tests whether you can state the 'why', not just the tool stack." },
  { cat: "Explain This Project", q: "Walk me through the KPI you're most proud of building.", a: "Delivery Efficiency is a good one. The KPI sheet filters Delivery Status = \"Delivered\", but the column only has On Time (3,388), Late (3,338) and Cancelled (3,274), so the measure returns 0. Fixed, it is 33.88% of all deliveries, or 50.37% if you exclude cancelled deliveries. Explain why you show 33.88% as the headline and 50.37% in the tooltip: the denominator is a business decision, and you made it visible.", signal: "Tests depth: denominators and definitions, not just syntax." },
  { cat: "SQL", q: "Write a query for Repeat Customers %.", a: "SELECT ROUND(SUM(n > 1) / COUNT(*) * 100, 2) AS repeat_pct FROM (SELECT customer_id, COUNT(*) AS n FROM orders GROUP BY customer_id) c; — returns 41.73. The subquery fixes the grain at one row per customer before you count.", signal: "Tests grain thinking — aggregating to the right level before computing a rate." },
  { cat: "SQL", q: "How do you join Payments to Orders when Payments.OrderID is text like 'ORD1000'?", a: "Best: use the clean key, payments.paymentid = orders.payment_id (matches all 10,000 rows). If you must use the text OrderID: CAST(SUBSTRING(p.orderid, 4) AS UNSIGNED) - 999 = o.orderid. Joining the text directly gives 0 matches, and stripping 'ORD' without subtracting 999 joins 9,001 rows to the WRONG orders — the customer IDs match on 0% of them.", signal: "Tests whether you validate a join instead of trusting that it ran without errors." },
  { cat: "SQL", q: "How would you check whether the two order-status columns agree?", a: "SELECT status, order_status, COUNT(*) FROM orders GROUP BY status, order_status; and SELECT SUM(status = order_status) FROM orders; — they agree on only 1,664 rows (16.64%). Status has 2,078 Cancelled; Order Status has 105. You pick Status because the KPI sheet uses it, and you write that decision down.", signal: "Tests profiling instinct: cross-tab two fields that claim to mean the same thing." },
  { cat: "SQL", q: "Why can't you answer 'Top Food Categories by orders' with SQL here?", a: "There is no order-items table, so no order is linked to a menu item. Joining orders to menu on restaurant_id gives 200,199 rows: every order multiplied by every item on that restaurant's menu. The honest answer is menu items per category (Main Course 2,559, Dessert 2,549, Beverage 2,452, Starter 2,440) plus a note that an order-items table is needed.", signal: "Tests whether you spot a fan-out join and say 'the data can't answer this' instead of reporting a wrong number." },
  { cat: "Power BI & DAX", q: "What's wrong with the KPI sheet's Repeat Customers DAX, and how do you fix it?", a: "It is CALCULATE(DISTINCTCOUNT(Orders[CustomerID]), FILTER(Orders, Orders[OrderID] > 1)) / [Total Customers]. The filter is on the order ID, not on how many orders a customer has, so it returns 100%. Fix: VAR t = ADDCOLUMNS(VALUES(Orders[Customer ID]), \"@n\", CALCULATE(COUNTROWS(Orders))) RETURN DIVIDE(COUNTROWS(FILTER(t, [@n] > 1)), COUNTROWS(t)) — 41.73%.", signal: "Tests that you read a formula critically instead of copying it." },
  { cat: "Power BI & DAX", q: "How do you calculate Customer Satisfaction Score so the zeros don't distort it?", a: "CSS = CALCULATE(AVERAGE(Delivery[Delivery Feedback Rating]), Delivery[Delivery Feedback Rating] > 0) — 2.97. The 3,274 zeros are exactly the cancelled deliveries, which were never rated; leaving them in gives 2.00.", signal: "Tests whether you know that a 0 can mean 'missing', not 'bad'." },
  { cat: "Power BI & DAX", q: "Why use DIVIDE() instead of the / operator for Order Cancellation Rate?", a: "DIVIDE() returns BLANK instead of an error when the denominator is zero, which happens as soon as a slicer selects a restaurant, month or city with no orders. The KPI sheet already uses DIVIDE(…, 0); keep that pattern for every rate.", signal: "Tests a DAX best practice tied to real slicer behaviour." },
  { cat: "Tableau", q: "How would you build Repeat Customers % in Tableau?", a: "A FIXED LOD: {FIXED [Customer ID] : COUNTD([OrderID])} gives orders per customer regardless of the view. Then COUNTD(IF [Customer Order Count] > 1 THEN [Customer ID] END) / COUNTD([Customer ID]) = 41.73%. Without the LOD, a city filter would recount orders inside the view and change who counts as repeat.", signal: "Tests LOD expressions, the Tableau feature interviewers ask about most." },
  { cat: "Tableau", q: "How would you set up the drill-through from the Sales dashboard to a restaurant page?", a: "Build a Restaurant Detail dashboard filtered on RestaurantID, then add a Filter dashboard action on the Top 10 restaurants table (run on select or menu) that targets it. Pass RestaurantID, not the name, because names repeat (15 base names across 500 restaurants) and their suffixes name the wrong city.", signal: "Tests dashboard actions plus a data-aware choice of the key to pass." },
  { cat: "Data Modeling", q: "Why is Orders the hub of this model?", a: "Every other fact table hangs off an order: Delivery is 1:1 on Order ID, Payments 1:1 on Payment ID, Ratings 1:1 for the 4,500 rated orders. Customers, Restaurant and Coupons describe the order. Menu, OperatingHours, CustomerAddress and Login Audit hang off Restaurant or Customers, not Orders.", signal: "Tests whether you can justify the model from the grain of each table." },
  { cat: "Data Modeling", q: "Ratings has CustomerID and RestaurantID as well as OrderID. Which relationships do you make active?", a: "Ratings → Orders through the integer Order Key, active. Ratings → Restaurant and Ratings → Customers inactive (or not created), because Orders already connects to both; two active paths make the model ambiguous and Power BI will refuse or pick one silently. Use USERELATIONSHIP if a measure really needs the direct path.", signal: "Tests understanding of ambiguous paths in a star-ish model." },
  { cat: "Data Modeling", q: "Which city field do you use for 'revenue by city'?", a: "Restaurant.Location through Orders.Restaurant ID — it's the city where the order was fulfilled. CustomerAddress.City is a customer's saved address (many per customer, none for 3,701 customers) and the restaurant name suffix is wrong 81.6% of the time.", signal: "Tests choosing the right attribute when three columns look like 'city'." },
  { cat: "Food Delivery Domain", q: "On-time is 33.88% but late is only 33.38%. Where is the rest?", a: "Cancelled deliveries: 3,274 (32.74%). On Time, Late and Cancelled split the 10,000 deliveries into near-equal thirds. If you take cancelled deliveries out of the denominator, on-time becomes 50.37% of completed deliveries. Both are valid; label which one you show.", signal: "Tests whether you understand what a percentage is a percentage of." },
  { cat: "Food Delivery Domain", q: "What does CLV mean here, and what are its limits?", a: "The KPI sheet defines it as AOV × Repeat Customers % × orders per customer = ₹1,043.32 × 41.73% × 1.58 = ₹687.89. It's a simple one-year proxy: no margin, no retention curve, no discounting. Say so, and mention that Revenue per Customer (₹1,648.48) is the plain 'average spend per customer' number.", signal: "Tests whether you can explain a formula and its limits honestly." },
  { cat: "Food Delivery Domain", q: "Why isn't Peak Order Hours on your dashboard as an order-time chart?", a: "Orders.Order Date has no time of day and there is no OrderHour column. The only hour in the data is Delivery.Pickup Time, and pickups are flat across the day (363 to 477 per hour). I show it labelled as pickup hour and recommend capturing order timestamps.", signal: "Tests honesty about what the data can and can't support." },
  { cat: "General & HR", q: "How do you handle a teammate who isn't contributing?", a: "This project's rules require flagging it to management early — by call, WhatsApp, email or in the weekly review — rather than quietly doing their part. A good answer describes that escalation path plus the direct conversation you'd have with the teammate first.", signal: "A standard behavioural question this project's participation policy gives you a real answer to." },
  { cat: "General & HR", q: "Tell me about a time the requirement document itself was wrong.", a: "Use the KPI sheet: three formulas give misleading results on this data (on-time filters a status that doesn't exist, repeat customers filters OrderID > 1, average delivery time points at a column in the wrong table). Describe how you proved each with a query, proposed a fix, and documented the change instead of silently overriding it.", signal: "Tests whether you push back on a spec with evidence and keep stakeholders informed." },
  { cat: "Rapid Fire", q: "What is the hub fact table?", a: "Orders (10,000 rows, PK OrderID).", signal: "Quick recall check." },
  { cat: "Rapid Fire", q: "How many customers placed an order?", a: "6,329 of 10,000 registered.", signal: "Quick recall check." },
  { cat: "Rapid Fire", q: "What is the AOV?", a: "₹1,043.32 gross (₹803.88 on amount actually paid).", signal: "Quick recall check." },
  { cat: "Rapid Fire", q: "Which status column does the cancellation KPI use?", a: "Orders.Status — 2,078 cancelled, 20.78%.", signal: "Quick recall check." },
  { cat: "Rapid Fire", q: "What offset links 'ORD1000' to an order?", a: "Subtract 999: ORD1000 is OrderID 1.", signal: "Quick recall check." }
];

const M_GLOSSARY = [
  { t: "AOV", d: "Average Order Value — revenue ÷ number of orders. ₹1,043.32 on gross Total Amount here." },
  { t: "Cancellation rate", d: "Cancelled orders ÷ all orders. 20.78% on Orders.Status in this project." },
  { t: "CLV", d: "Customer Lifetime Value — here defined by the KPI sheet as AOV × Repeat Customers % × orders per customer (₹687.89)." },
  { t: "CSS", d: "Customer Satisfaction Score — the average delivery feedback rating, excluding the 0 = 'not rated' rows (2.97 / 5)." },
  { t: "DAX", d: "Data Analysis Expressions — the formula language used in Power BI for measures and calculated columns." },
  { t: "Dimension table", d: "A table of descriptive attributes (Customers, Restaurant, DeliveryAgent) used to filter and group the facts." },
  { t: "Drill-through", d: "A dashboard page that opens filtered to the item you clicked, e.g. one restaurant or one city." },
  { t: "Fact table", d: "A table of events with measures and keys — Orders, Delivery, Payments, Ratings, Login Audit." },
  { t: "Fan-out", d: "When a join multiplies rows because the key isn't unique on one side — Orders ⋈ Menu on Restaurant ID gives 200,199 rows from 10,000 orders." },
  { t: "Grain", d: "What one row of a table represents. Orders: one order. Delivery: one delivery per order. CustomerAddress: one saved address." },
  { t: "KPI", d: "Key Performance Indicator — a measurable value that shows how well the business meets a goal." },
  { t: "LOD expression", d: "Tableau Level-of-Detail calc ({FIXED …}) that computes at a set grain regardless of the view — used here for orders per customer." },
  { t: "Net revenue", d: "What customers actually paid after discounts: SUM(Final Amount Paid) = ₹80,38,789." },
  { t: "On-time %", d: "Deliveries with status 'On Time' ÷ all deliveries (33.88%), or ÷ non-cancelled deliveries (50.37%)." },
  { t: "Primary key (PK)", d: "The column that uniquely identifies each row in a table." },
  { t: "Foreign key (FK)", d: "A column that points to the primary key of another table and creates the relationship." },
  { t: "Repeat customer", d: "A customer with more than one order. 2,641 of 6,329 ordering customers (41.73%)." },
  { t: "Star schema", d: "A model with a central fact table surrounded by dimension tables. This project is star-ish: Orders is the hub, with three 1:1 fact tables beside it." }
];

const M_TIPS = [
  { n: "01", h: "Tell the project as a story, not a feature list", p: "Data and scale → model → the problem you hit → the business outcome, in that order. Interviewers remember stories, not tool lists." },
  { n: "02", h: "Have one broken formula ready", p: "The KPI sheet's 0% on-time or 100% repeat-customer formula is worth more in an interview than 'we cleaned the data'. Show the wrong number, why it's wrong, and the fix." },
  { n: "03", h: "Know the denominator of every rate", p: "On-time over all deliveries or only completed ones? Customers who ordered or everyone registered? Ratings with or without zeros? That is the most-tested pattern in this project." },
  { n: "04", h: "Explain your own contribution specifically", p: "Name the dashboard page, SQL query or DAX measure that was yours — not a vague 'I worked on the dashboard'." },
  { n: "05", h: "Say what the data can't answer", p: "No order time, no order items: Peak Order Hours and Top Food Categories by orders can't be computed directly. Saying so clearly earns more trust than a made-up chart." },
  { n: "06", h: "Reconcile before you present, not during", p: "If your SQL total and your dashboard total don't match within ±0.1%, find out why before the review meeting, not while someone's looking at your screen." },
  { n: "07", h: "Use real numbers in your answers", p: "\"One in five orders is cancelled and only a third of deliveries are on time\" lands better than \"delivery performance needs improvement\"." },
  { n: "08", h: "Don't over-read flat results", p: "Cancellation % by city only ranges from 19.00% to 22.24%. Say it's broadly flat rather than inventing a 'problem city'." }
];

const M_TIP_CALLOUT = "Cracking a data analyst or BI interview isn't about reciting definitions — it's about showing how you think, communicate and handle messy data: a KPI formula that returns 0%, two status columns that disagree, a join key with a hidden offset. Every question in the Interview Prep tab is really testing one of those things.";

const M_LEARNING_LINKS = [
  { title: "Tableau LOD Expressions", desc: "Tableau's own guide to FIXED, INCLUDE and EXCLUDE — the technique behind orders per customer and Repeat Customers % in this project.", url: "https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_lod.htm", source: "Tableau" },
  { title: "Tableau — Free Training Videos", desc: "Tableau's own on-demand video library, organized into beginner-friendly learning paths — connecting to data, building your first viz, and dashboards.", url: "https://www.tableau.com/learn/training", source: "Tableau" },
  { title: "Tableau Public Gallery", desc: "Browse real, published dashboards for design and layout inspiration before you build your own Sales or Delivery dashboard.", url: "https://public.tableau.com/en-us/s/", source: "Tableau" },
  { title: "Power BI Learning Paths (Microsoft Learn)", desc: "Microsoft's free, structured, hands-on modules for Power BI — data modeling, DAX measures, and report building, with in-browser labs.", url: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", source: "Microsoft" },
  { title: "Star Schema Design Guidance", desc: "Official Power BI documentation on star-schema modeling — the shape of this project's model, with Orders as the hub.", url: "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema", source: "Microsoft" },
  { title: "MySQL Official Documentation", desc: "The official MySQL manual — installation, SQL statements, and administration, straight from Oracle/MySQL.", url: "https://dev.mysql.com/doc/", source: "MySQL" },
  { title: "Free SQL Tutorial — Joins & Aggregations (Mode)", desc: "A free, interactive SQL tutorial covering the joins and GROUP BY logic this project's KPI and QA queries depend on.", url: "https://mode.com/sql-tutorial/", source: "Mode Analytics" },
  { title: "Excel Training (Microsoft Learn catalog)", desc: "Microsoft's own free Excel training catalog — pivot tables and data prep, the Phase 1 tool in this project's workflow.", url: "https://learn.microsoft.com/en-us/training/browse/?products=excel", source: "Microsoft" }
];

/* ---------------- KEY INSIGHTS & RECOMMENDATIONS ---------------- */
const M_KEY_INSIGHTS = [
  { insight: "Only 33.88% of deliveries are on time; Late (33.38%) and Cancelled (32.74%) take the other two thirds in almost equal parts.", recommendation: "Make on-time % the headline operations KPI with a target, and show it both over all deliveries and over completed ones (50.37%) so cancellations can't hide inside it." },
  { insight: "One in five orders is cancelled (20.78%, 2,078 orders), and cancelled orders still carry ₹21,55,604 of gross order value.", recommendation: "Report revenue both with and without cancelled orders, and drill cancellations by restaurant to find partners with repeated cancellations." },
  { insight: "41.73% of ordering customers came back at least once, but 3,688 of 6,329 ordered only once and 3,671 registered customers never ordered.", recommendation: "Target first-order customers with a second-order offer, and run an activation campaign for registered customers with no orders." },
  { insight: "Satisfaction is low: CSS is 2.97 / 5, the average order rating is 3.02, and the two most common reviews are 'Food was cold' (868) and 'Too slow' (846).", recommendation: "Link ratings to delivery status and delivery time on the operations dashboard; the complaints point at delivery, not food quality." },
  { insight: "Discounts cost 24.08% of gross revenue and appear on 99.8% of orders, while only 12% of orders use a coupon.", recommendation: "Ask where non-coupon discounts come from and track discount % by city and membership tier before adding more coupons." },
  { insight: "Revenue is spread evenly: Noida leads with ₹22.53 lakh and Ghaziabad trails with ₹19.29 lakh; the top 10 restaurants together hold only 3.27% of revenue.", recommendation: "There is no single city or restaurant to fix. Focus on operations-wide levers (on-time delivery, cancellations) rather than a city-specific plan." }
];

/* ---------------- RESUME BULLET POINTS ---------------- */
const M_RESUME_BULLETS = [
  "Built Sales & Customers and Delivery & Operations dashboards in Power BI and Tableau on 10,000 food-delivery orders across 12 tables, tracking 21 KPIs including AOV (₹1,043), repeat customers (41.7%) and on-time delivery (33.9%).",
  "Designed a MySQL model with Orders as the hub and fixed three faulty KPI formulas from the requirement sheet (0% on-time, 100% repeat customers, delivery time from the wrong table), reconciling all KPIs between SQL and both BI tools within ±0.1%.",
  "Found and documented 10+ data-quality issues — a 999 offset in text order keys, two conflicting status columns, discounts larger than the order value — and turned them into a QA checklist used by the team."
];

/* ---------------- 2-MINUTE ELEVATOR PITCH ---------------- */
const M_ELEVATOR_PITCH = "I built an end-to-end food-delivery analytics project using Swiggy as the business case: 12 tables covering 10,000 orders over one year, with deliveries, payments, ratings, customers, restaurants, menus and delivery agents. I profiled the data in Excel, loaded it into a MySQL schema with Orders as the hub, and built two dashboards in both Power BI and Tableau: a Sales & Customers dashboard and a Delivery & Operations dashboard, each with a drill-through page. The interesting part was the requirement sheet itself. Its on-time formula filtered a status called 'Delivered' that doesn't exist, so it returned zero, and its repeat-customer formula filtered order IDs instead of counting orders per customer, so it returned 100%. I proved both with SQL and fixed them: on-time is 33.88% and repeat customers are 41.73%. I also found that payment and rating keys were text with a 999 offset, which would have silently joined every payment to the wrong order. The main business finding is that delivery, not demand, is the problem: a fifth of orders are cancelled, only a third of deliveries are on time, and the most common reviews are 'Food was cold' and 'Too slow'. Every KPI reconciles to SQL within a tenth of a percent.";

/* ---------------- PROJECT-SPECIFIC FAQ ---------------- */
const M_PROJECT_FAQ = [
  { q: "What if the interviewer isn't technical — how much detail should I give?", a: "Lead with the business framing (a delivery business with no single view of sales, repeat customers or delivery performance) and the outcome (two dashboards, three faulty KPI formulas fixed). Only go into SQL, DAX or Tableau specifics if they ask a follow-up." },
  { q: "What if I only worked on one part of this project (e.g. just Power BI, not the SQL)?", a: "Say so plainly and describe your part in depth — a specific, detailed answer about the piece you own is far stronger than a vague answer implying you did all of it." },
  { q: "Is this Swiggy's real data?", a: "No. Swiggy is the business case; the dataset is synthetic practice data. Say that clearly if asked — it doesn't weaken the project, because the modeling, KPI and data-quality work is the same as on real data." },
  { q: "What if they ask what you'd do differently with more time?", a: "Ask for the two missing pieces: an order-items table (to answer top food categories by orders) and an order timestamp (to answer peak order hours). Then add delivery-time targets per city and a cancellation-reason field." },
  { q: "What if they push on why you used two BI tools instead of one?", a: "This capstone requires KPI parity across Power BI and Tableau as a reconciliation exercise — say that directly, and note that in a real job you'd usually use the organisation's standard tool." },
  { q: "What if you freeze or forget a specific number mid-answer?", a: "Give the direction you're sure of (\"about a third of deliveries are on time, about a fifth of orders are cancelled\") rather than guessing a precise figure. A confident approximate answer beats a wrong exact one." }
];

/* ============================================================
   Swiggy Data Analytics Capstone — Capstone, Practice & Interview Prep Hub
   Numbers come from swg-data.js (window.SWG), generated from
   Swiggy_DA_Project_Data.xlsx (12 sheets, Orders as the hub).
   Original project content lives in 00-orig.js (M_ constants).
   ============================================================ */
const SWG = window.SWG || {};
const A = SWG.A || {};
const fmtN = (n) => Number(n).toLocaleString("en-IN");
const fmtUS = (n) => Number(n).toLocaleString("en-US");
const f1 = (n) => (Math.round(n * 10) / 10).toFixed(1);
const f2 = (n) => Number(n).toFixed(2);
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
const inr2 = (n) => "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const lakh = (n) => "₹" + (Number(n) / 1e5).toFixed(2) + " lakh";
const CERTIVA_URL = "https://www.certiva.co.in/";
const CRACKANALYTICS_URL = M_CRACKANALYTICS_URL;
const SWG_WRONG = SWG.wrong || {};

/* ---------------- KPIs (15 from the KPI sheet + supporting KPIs) ---------------- */
const KPI_Q = {
  "Total Orders": "How many orders did customers place this year?",
  "Total Revenue": "What is the total value of everything ordered?",
  "Net Revenue": "How much did customers actually pay after discounts?",
  "Discount %": "How much of our gross order value do we give away as discount?",
  "Average Order Value (AOV)": "How much does a typical order bring in?",
  "Total Customers": "How many people actually ordered from us?",
  "Repeat Customers %": "How many customers come back for a second order?",
  "Revenue per Customer": "What is one ordering customer worth to us this year?",
  "Customer Lifetime Value (CLV)": "What long-term value do we expect from a customer?",
  "Top Performing Restaurants": "Which restaurant partners bring in the most revenue?",
  "Top Food Categories": "Which food categories matter most?",
  "Coupon Usage %": "How often do customers use a coupon?",
  "Payment Success %": "How many payments go through on the first try?",
  "Delivery Efficiency (On-Time %)": "How often do we deliver on time?",
  "Late Delivery %": "How often are we late?",
  "Order Cancellation Rate": "What share of orders gets cancelled?",
  "Customer Satisfaction Score": "How happy are customers with the delivery?",
  "Average Delivery Time": "How long does a delivery take on average?",
  "Active Delivery Agents": "How many agents are actually delivering?",
  "Peak Order Hours": "When in the day are we busiest?",
  "Average Order Rating": "How do customers rate their orders?",
};
const KPI_DAX = {
  "Total Orders": "Total Orders = COUNTROWS ( Orders )",
  "Total Revenue": "Total Revenue = SUM ( Orders[Total Amount] )",
  "Net Revenue": "Net Revenue = SUM ( Orders[Final Amount Paid] )   -- header renamed from 'Fina lAmount Paid' in Power Query",
  "Discount %": "Discount % = DIVIDE ( SUM ( Orders[Discount Applied] ), [Total Revenue] )",
  "Average Order Value (AOV)": "AOV = DIVIDE ( [Total Revenue], [Total Orders] )",
  "Total Customers": "Total Customers = DISTINCTCOUNT ( Orders[Customer ID] )",
  "Repeat Customers %": "Repeat Customers % =\nVAR CustOrders = ADDCOLUMNS ( VALUES ( Orders[Customer ID] ), \"@Orders\", CALCULATE ( COUNTROWS ( Orders ) ) )\nRETURN DIVIDE ( COUNTROWS ( FILTER ( CustOrders, [@Orders] > 1 ) ), COUNTROWS ( CustOrders ) )",
  "Revenue per Customer": "Revenue per Customer = DIVIDE ( [Total Revenue], [Total Customers] )",
  "Customer Lifetime Value (CLV)": "CLV = [AOV] * [Repeat Customers %] * DIVIDE ( [Total Orders], [Total Customers] )",
  "Top Performing Restaurants": "Table visual: Restaurant[RestaurantID], Restaurant[Location], Restaurant[Cuisine Type] + [Total Revenue]; Top N filter = 10 by [Total Revenue] on RestaurantID",
  "Top Food Categories": "Menu Items = COUNTROWS ( Menu )   -- by Menu[Category]; there is no order-items table, so orders by category can't be measured",
  "Coupon Usage %": "Coupon Usage % = DIVIDE ( CALCULATE ( [Total Orders], NOT ISBLANK ( Orders[CouponCode] ) ), [Total Orders] )",
  "Payment Success %": "Payment Success % = DIVIDE ( CALCULATE ( COUNTROWS ( Payments ), Payments[PaymentStatus] = \"Success\" ), COUNTROWS ( Payments ) )",
  "Delivery Efficiency (On-Time %)": "On-Time % = DIVIDE ( CALCULATE ( COUNTROWS ( Delivery ), Delivery[Delivery Status] = \"On Time\" ), COUNTROWS ( Delivery ), 0 )",
  "Late Delivery %": "Late % = DIVIDE ( CALCULATE ( COUNTROWS ( Delivery ), Delivery[Delivery Status] = \"Late\" ), COUNTROWS ( Delivery ), 0 )",
  "Order Cancellation Rate": "Order Cancellation % = DIVIDE ( CALCULATE ( [Total Orders], Orders[Status] = \"Cancelled\" ), [Total Orders], 0 )",
  "Customer Satisfaction Score": "CSS = CALCULATE ( AVERAGE ( Delivery[Delivery Feedback Rating] ), Delivery[Delivery Feedback Rating] > 0 )",
  "Average Delivery Time": "Avg Delivery Time = AVERAGE ( Orders[Delivery Time (mins)] )",
  "Active Delivery Agents": "Active Agents = DISTINCTCOUNT ( Delivery[Delivery Agent ID] )",
  "Peak Order Hours": "Pickup Hour = HOUR ( Delivery[Pickup Time] )   -- calculated column; then COUNTROWS ( Delivery ) by Pickup Hour",
  "Average Order Rating": "Avg Order Rating = AVERAGE ( Ratings[Rating] )",
};
const KPI_TIER = {};
const KPI_WRONG = {
  "Repeat Customers %": `${f2(SWG_WRONG.repeat !== undefined ? SWG_WRONG.repeat : 100)}% with the KPI sheet's FILTER(Orders, Orders[OrderID] > 1): it filters order IDs, not customers with more than one order`,
  "Delivery Efficiency (On-Time %)": `${f2(SWG_WRONG.ontime_delivered || 0)}% with the KPI sheet's Delivery Status = "Delivered" (that value doesn't exist); ${f2(A.ontime_ex || 50.37)}% if you exclude cancelled deliveries`,
  "Customer Satisfaction Score": `${f2(SWG_WRONG.css0 || 2.0)} if the 0 = 'not rated' rows (the ${fmtUS(A.fb0 || 3274)} cancelled deliveries) are averaged in`,
  "Total Customers": `${fmtUS(SWG_WRONG.cust_registered || 10000)} if you count the Customers table: ${fmtUS(A.never_ordered || 3671)} registered customers never ordered`,
  "Revenue per Customer": `${inr2(SWG_WRONG.rpc_registered || 1043.32)} if you divide by all ${fmtUS(SWG_WRONG.cust_registered || 10000)} registered customers`,
  "Customer Lifetime Value (CLV)": `${inr2(SWG_WRONG.clv_sheet || 1648.48)} if you plug in the KPI sheet's broken 100% repeat measure`,
  "Order Cancellation Rate": `${f2(SWG_WRONG.cancel_os || 1.05)}% if you use the other column, Order Status (only ${fmtUS(A.cancel_os_n || 105)} Cancelled)`,
  "Average Delivery Time": `${fmtUS(Math.round(SWG_WRONG.ts_avg_mins || 2556.35))} mins if you subtract Pickup Time from Actual Delivery Time; the KPI sheet's Delivery[DeliveryTimeInMinutes] doesn't exist`,
  "Top Food Categories": `${fmtUS(SWG_WRONG.om_rows || 200199)} rows if you join Orders to Menu on Restaurant ID and count orders by category`,
  "Peak Order Hours": "Can't be built from Orders: the KPI sheet's Orders[OrderHour] doesn't exist and Order Date has no time",
};
const KPIS = M_KPIS.map((k, i) => ({
  id: "k" + (i + 1), name: k.name, cat: k.cat, q: KPI_Q[k.name] || k.definition, desc: k.desc, plain: k.definition,
  formula: k.formula, dax: KPI_DAX[k.name] || "", table: k.table, v25: (SWG.kv || {})[k.name] || "—", wrong: KPI_WRONG[k.name] || "",
  prio: KPI_TIER[k.name] || k.prio, dir: /Cancellation|Late|Discount|Delivery Time/.test(k.name) ? "lower is better" : "higher is better",
}));
const KPI_CATS = M_KPI_CATS;

/* ---------------- STATS (hero strip) ---------------- */
const STATS = [
  { num: fmtUS(A.orders || 10000), lbl: "Orders, Mar 2024 – Mar 2025" },
  { num: fmtUS(A.cust || 6329), lbl: "Customers who ordered" },
  { num: "12", lbl: "Tables · Orders as the hub" },
  { num: KPIS.filter(k => k.prio === "P1").length + " → " + KPIS.length, lbl: "Must-know P1 KPIs → full list" },
  { num: f2(A.ontime || 33.88) + "%", lbl: "Deliveries on time" },
];

/* ---------------- LEARNING JOURNEY ---------------- */
const JOURNEY = [
  { id: "j1", t: "Understand the Business Problem", d: "Read the problem statement, the two dashboard requirements and the 8 business questions. Write down, in one line, what the business head and the operations head each want to decide.", go: "problem", track: "business" },
  { id: "j2", t: "Explore the Dataset", d: "Open all 12 sheets. Note each table's grain, row count and keys. Spot the two status columns, the 'ORD' text keys and the header typos before you calculate anything.", go: "dataset", track: "business" },
  { id: "j3", t: "Build the Data Model", d: "Load the dimensions first, then Orders, then Delivery, Payments and Ratings. Create the relationships exactly as in the join guide, with Orders as the hub.", go: "model", track: "model" },
  { id: "j4", t: "Clean & Validate the Data", d: "Run the data-quality checks: the 999 offset, status disagreement, discount above order value, zero ratings, unreliable timestamps. Document what you fix and what you only flag.", go: "quality", track: "model" },
  { id: "j5", t: "Write SQL Queries", d: "Load into MySQL schema swiggy_db, add the integer order key to payments and ratings, then run the exploration and KPI queries in the SQL Lab.", go: "sql", track: "sql" },
  { id: "j6", t: "Create KPIs", d: "Implement the P1 KPIs first: orders, revenue, net revenue, AOV, customers, repeat %, on-time %, cancellation %, CSS, delivery time. Fix the KPI sheet's broken formulas, then do the rest.", go: "kpis", track: "kpi" },
  { id: "j7", t: "Build the Tableau Dashboard", d: "Connect Tableau to MySQL and build the Sales & Customers and Delivery & Operations dashboards with filters, tooltips and drill-through pages.", go: "dashboards", track: "tableau" },
  { id: "j8", t: "Build the Power BI Dashboard", d: "Same two dashboards in Power BI: DAX measures, a date table marked on Order Date, and drill-through pages for restaurant and city.", go: "dashboards", track: "powerbi" },
  { id: "j9", t: "Perform QA", d: "Reconcile every KPI between SQL, Tableau and Power BI within ±0.1%. Fill in the reconciliation table and sign off the checklist.", go: "qa", track: "qa" },
  { id: "j10", t: "Present Your Business Insights", d: "Turn the numbers into 5 insights and 5 recommendations, rehearse the 90-second pitch, and update your resume and LinkedIn.", go: "analysis", track: "career" },
];

/* ---------------- DELIVERABLES ---------------- */
const DELIVERABLES = [
  { id: "d1", t: "Business Requirement Document", d: "Problem, stakeholders, requirements, KPI list, wireframes for both dashboards and their drill-through pages.", where: "Problem & Business Questions", track: "business" },
  { id: "d2", t: "Data Dictionary", d: "Every table and column with type, meaning, key role and known issues.", where: "Data Dictionary", track: "model" },
  { id: "d3", t: "Data Model", d: "Orders as the hub, Delivery / Payments / Ratings 1:1, dimensions around it, with keys and cardinality.", where: "Data Model", track: "model" },
  { id: "d4", t: "SQL Queries", d: "Schema script for swiggy_db, row-count checks, exploration and KPI queries, saved as a .sql file.", where: "SQL Lab", track: "sql" },
  { id: "d5", t: "KPI Definitions", d: `Business question, formula and DAX for all ${M_KPIS.length} KPIs, with the corrected KPI-sheet formulas.`, where: "KPI Library", track: "kpi" },
  { id: "d6", t: "Excel Analysis", d: "First-pass KPI dashboard with COUNTIFS / SUMIFS formulas and pivots.", where: "Excel Analysis", track: "excel" },
  { id: "d7", t: "Tableau Dashboard", d: "Sales & Customers + Delivery & Operations with drill-through pages, published to Tableau Public (.twbx).", where: "Dashboard Gallery", track: "tableau" },
  { id: "d8", t: "Power BI Dashboard", d: "Same two dashboards in Power BI (.pbix) with the DAX measures and drill-through pages.", where: "Dashboard Gallery", track: "powerbi" },
  { id: "d9", t: "QA Validation", d: "Reconciliation sheet: SQL vs Tableau vs Power BI for every P1 KPI, plus the data-quality log.", where: "QA & Reconciliation", track: "qa" },
  { id: "d10", t: "Business Insights", d: "5 insights + 5 recommendations backed by numbers.", where: "Business Analysis", track: "career" },
  { id: "d11", t: "Project Presentation", d: "10–12 slide deck: problem → data → model → KPIs → dashboards → insights.", where: "90-sec Project Pitch", track: "career" },
  { id: "d12", t: "Resume Project Description", d: "Copy-ready project block and 3 tailored bullets.", where: "Resume, LinkedIn & Portfolio", track: "career" },
];

/* ---------------- BEFORE vs AFTER ---------------- */
const BEFORE_AFTER = {
  before: ["Orders, deliveries, payments and ratings in 12 separate exports", "Payments and ratings keyed by text IDs with a hidden 999 offset", "Two order-status columns that disagree on 83% of orders", "KPI sheet formulas returning 0% on-time and 100% repeat customers", "No view of where cancellations and late deliveries happen", "Every team quoting a different revenue or customer number"],
  after: ["MySQL model with Orders as the hub (12 tables)", "Validated joins and a documented data-quality log", `Standard definitions for ${M_KPIS.length} KPIs`, "Power BI & Tableau dashboards with drill-through", "Business insights → decisions"],
};

/* ---------------- PROBLEM STATEMENT (original) ---------------- */
const PROBLEM_STATEMENT = M_PROBLEM_STATEMENT;
const REQUIREMENTS = [
  ["R1", "Sales & Customers Dashboard", "Business Head, Marketing", "Orders, gross and net revenue, AOV, discount %, trend by month, revenue by city and cuisine", "P1"],
  ["R2", "Customer behaviour view", "Marketing, Growth", "Total customers, repeat customers %, revenue per customer, CLV, customers by number of orders, membership tier", "P1"],
  ["R3", "Delivery & Operations Dashboard", "Operations Head, Fleet Managers", "On-time %, late %, cancellation rate, average delivery time, CSS, active agents", "P1"],
  ["R4", "Restaurant drill-through", "Restaurant Partnerships", "Top 10 restaurants by revenue (by RestaurantID), with orders, AOV, cancellation % and average rating for the selected restaurant", "P1"],
  ["R5", "City / vehicle drill-through", "City Operations", "On-time %, delivery time and CSS by city and vehicle type, agent-level table", "P2"],
  ["R6", "Payments & promotions view", "Finance, Marketing", "Payment success %, payment method split, coupon usage %, discount cost", "P2"],
  ["R7", "Global filters", "All users", "Order month, city, cuisine, order source, payment method, status, membership on every page", "P1"],
  ["R8", "Data governance", "QA reviewer", "Documented status choice (Orders.Status), corrected KPI formulas, every KPI reconciled to SQL within ±0.1%", "P1"],
];

/* ---------------- BUSINESS QUESTIONS ---------------- */
function bq() {
  const tr = A.top_rest || [92, "Urban Tadka - Indian (92)", "Gurgaon", "Indian", 35503];
  const tc = A.top_city || ["Noida", 2253210], lc = A.low_city || ["Ghaziabad", 1928742];
  return [
    { q: "Are we delivering on time?", data: "Delivery (Delivery Status), DeliveryAgent (Vehicle Type), Restaurant (Location)", kpi: "Delivery Efficiency (On-Time %), Late Delivery %",
      analysis: "Count deliveries by Delivery Status ('On Time', not 'Delivered'), then split by city and vehicle type. Show the rate over all deliveries and over completed ones.",
      insight: `Only ${f2(A.ontime)}% of deliveries are on time; ${f2(A.late)}% are late and ${f2(A.dcancel)}% cancelled, almost a three-way split. Excluding cancelled deliveries, on-time is ${f2(A.ontime_ex)}%. By vehicle the range is narrow: Scooter ${f2(((SWG.vehicle_ontime || [])[0] || [0, 34.81])[1])}%, Bicycle ${f2(((SWG.vehicle_ontime || [])[2] || [0, 33.04])[1])}%.`,
      rec: "Set an on-time target and track it weekly on the operations dashboard. Because no city or vehicle stands out, look at process causes (dispatch, promised times) rather than one fleet segment." },
    { q: "Why are so many orders cancelled?", data: "Orders (Status, Order Status, Order Source), Restaurant (Location, Cuisine Type)", kpi: "Order Cancellation Rate",
      analysis: "Cancellation % on Orders.Status by city, cuisine, order source and month. Cross-tab Status against Order Status and against Delivery Status.",
      insight: `${f2(A.cancel)}% of orders (${fmtUS(A.cancel_n)}) are cancelled on Status, but only ${f2(A.cancel_os)}% on Order Status, and the two columns agree on ${f2(A.status_agree_pct)}% of rows. By city the rate only moves between ${f2(((SWG.cancel_city || []).slice(-1)[0] || [0, 19.0])[1])}% and ${f2(((SWG.cancel_city || [])[0] || [0, 22.24])[1])}%, so no segment explains it.`,
      rec: "Ask the business which status column is the system of record and add a cancellation-reason field. Until then, report on Status (as the KPI sheet does) and footnote the mismatch." },
    { q: "How many customers come back?", data: "Orders (Customer ID), Customers", kpi: "Total Customers, Repeat Customers %, Revenue per Customer, CLV",
      analysis: "Count orders per customer first, then count customers with more than one order. Compare with the 10,000 registered customers.",
      insight: `${fmtUS(A.rep)} of ${fmtUS(A.cust)} ordering customers (${f2(A.repp)}%) ordered more than once; ${fmtUS(A.one_time)} ordered only once and ${fmtUS(A.never_ordered)} registered customers never ordered. The KPI sheet's formula would have shown 100%.`,
      rec: "Run a second-order offer for one-time customers and an activation push for registered customers with no orders; track Repeat Customers % monthly." },
    { q: "How satisfied are customers, and what do they complain about?", data: "Delivery (Delivery Feedback Rating), Ratings (Rating, Review)", kpi: "Customer Satisfaction Score, Average Order Rating",
      analysis: "Average feedback excluding 0 = not rated; average Ratings.Rating; count reviews by text.",
      insight: `CSS is ${f2(A.css)} / 5 (${f2(A.css0)} if the zeros are kept) and the average order rating is ${f2(A.order_rating)}. The most frequent reviews are 'Food was cold' (${fmtUS(((SWG.review_counts || [])[0] || [0, 868])[1])}) and 'Too slow' (${fmtUS(((SWG.review_counts || [])[1] || [0, 846])[1])}).`,
      rec: "Treat satisfaction as a delivery problem first: put review themes next to on-time % on the operations dashboard and follow up on 'cold' and 'slow' complaints by city." },
    { q: "Where does our revenue come from?", data: "Orders (Total Amount), Restaurant (Location, Cuisine Type)", kpi: "Total Revenue, AOV, Top Performing Restaurants",
      analysis: "Revenue by city, cuisine and restaurant (grouped by RestaurantID). Check how concentrated the top 10 is.",
      insight: `Total revenue is ${inr(A.rev)} (${inr(A.net)} net). ${tc[0]} leads with ${lakh(tc[1])} and ${lc[0]} is lowest at ${lakh(lc[1])}; ${(A.top_cuisine || ["Italian"])[0]} is the top cuisine. The top restaurant, #${tr[0]} in ${tr[2]}, made ${inr(tr[4])}, and the top 10 together hold only ${f2(A.top10_share)}% of revenue.`,
      rec: "Revenue is spread evenly across cities and partners, so growth plans should be platform-wide (retention, delivery quality) rather than built around a few restaurants." },
    { q: "How much do discounts and coupons cost us?", data: "Orders (Discount Applied, Final Amount Paid, CouponCode), Coupons", kpi: "Discount %, Coupon Usage %, Net Revenue",
      analysis: "Total discount ÷ gross revenue; share of orders with a coupon; coupon orders outside the validity window; orders where discount exceeds the order value.",
      insight: `Discounts equal ${f2(A.disc_pct)}% of gross revenue and appear on ${f2(A.disc_any_pct)}% of orders, but only ${f2(A.coupon_pct)}% of orders use a coupon. On ${fmtUS(A.disc_gt_total)} orders the discount is larger than the order, and ${fmtUS(A.zero_paid)} orders paid ₹0.`,
      rec: "Find out where non-coupon discounts are configured, cap discounts at the order value, and review the 30% of coupon orders placed outside the coupon's validity dates." },
    { q: "Do payments go through?", data: "Payments (PaymentStatus, PaymentMethod), Orders (Payment ID)", kpi: "Payment Success %",
      analysis: "Payment status split; payment method from Payments vs from Orders, joined on Payment ID.",
      insight: `${f2(A.pay_success)}% of payments succeed (${fmtUS(A.pay_success_n)} of 10,000); the rest are Pending, Failed or Refunded. The payment method in Payments matches the one in Orders on only ${f2(A.pm_agree_pct)}% of orders.`,
      rec: "Pick one payment-method source for reporting (Payments, the transaction record) and ask the data owners why Orders records a different method." },
    { q: "When are we busiest, and which categories sell?", data: "Delivery (Pickup Time), Menu (Category)", kpi: "Peak Order Hours, Top Food Categories",
      analysis: "Pickups by hour of day (the only time-of-day field); menu items by category. Check whether Orders can be linked to Menu.",
      insight: `Orders have no time of day, so peak order hours can't be measured. Pickups are flat from ${fmtUS((A.low_hour || [10, 363])[1])} to ${fmtUS((A.peak_hour || [16, 477])[1])} per hour. Orders can't be linked to menu items either: Orders ⋈ Menu gives ${fmtUS(A.om_rows)} rows.`,
      rec: "Ask engineering to add an order timestamp and an order-items table. Until then, show pickup hour and menu mix, clearly labelled." },
  ];
}

/* ---------------- TOOLS / DOMAIN / FLOW / TIMELINE / RULES (original) ---------------- */
const TOOLS = M_TOOLS;
const DOMAIN_WHAT = M_DOMAIN_WHAT;
const DOMAIN_WHERE = M_DOMAIN_WHERE;
const DOMAIN_DATA_TYPES = M_DOMAIN_DATA_TYPES;
const FLOW = M_FLOW;
const TIMELINE = M_TIMELINE;
const RULES = M_RULES;
const FOCUS_AREAS = M_FOCUS_AREAS;
const SOCIAL = M_SOCIAL;

/* ---------------- SETUP (no downloads: data comes from the ExcelR assignment team) ---------------- */
const SETUP_STEPS = [
  { i: "📥", t: "Get the dataset", d: "The ExcelR assignment team sends Swiggy_DA_Project_Data.xlsx (12 sheets) and the KPI documents to your group." },
  { i: "🗄️", t: "Import into MySQL", d: "Create schema swiggy_db and load the dimensions first, then orders, delivery, payments and ratings. Rename 'Fina lAmount Paid' to final_amount_paid and trim the 'Restaurant Name ' header." },
  { i: "✅", t: "Verify the load", d: "Row counts must match the Dataset page exactly: 10,000 orders, deliveries, payments and customers; 4,500 ratings; 500 restaurants; 5 coupons." },
  { i: "📊", t: "Connect BI tools", d: "Point Tableau and Power BI at swiggy_db, not at the Excel file, so all three tools read the same data." },
];
const SOFTWARE_LINKS = M_SOFTWARE_LINKS;
const DOCUMENTS = M_DOCUMENTS;

/* ---------------- DATASET PAGE ---------------- */
const COVERAGE_TEXT = `One year of orders: ${A.date_from || "2024-03-28"} → ${A.date_to || "2025-03-28"} (March 2024 has only 4 days, so it looks small on monthly charts). 12 tables: ${fmtUS(A.orders || 10000)} orders with one delivery and one payment each, ${fmtUS(A.ratings || 4500)} ratings, ${fmtUS(A.reg || 10000)} registered customers (${fmtUS(A.cust || 6329)} of them ordered), ${fmtUS(A.restaurants || 500)} restaurants in 5 NCR cities (Noida, Faridabad, Gurgaon, Delhi, Ghaziabad) and 5 cuisines, ${fmtUS(A.menu_items || 10000)} menu items, ${fmtUS(A.agents_master || 10000)} delivery agents (${fmtUS(A.agents || 1000)} active) and 5 coupons. Amounts are in ₹. Training project: Swiggy is used as the business case; the dataset is synthetic practice data, not Swiggy's real data, and this site is not affiliated with Swiggy.`;
const STORY = [
  ["Whole year", "Delivery three-way split", "On Time, Late and Cancelled each take about a third of deliveries", "Delivery donut, on-time by city / vehicle"],
  ["Whole year", "One in five cancelled", `${f2(A.cancel || 20.78)}% of orders cancelled on Status; flat across cities and cuisines`, "Cancellation % by city, cuisine, month"],
  ["Whole year", "Low satisfaction", `CSS ${f2(A.css || 2.97)} / 5; 'Food was cold' and 'Too slow' are the top reviews`, "Feedback distribution, review table"],
  ["Dec 24, Feb–Mar 25", "Cancellation creeps up", "Monthly cancellation rises above 23% in Dec 2024, Feb 2025 and Mar 2025", "Cancellation % by month"],
  ["Every month", "Discounts everywhere", `Discounts = ${f2(A.disc_pct || 24.08)}% of gross revenue, on nearly every order`, "Gross vs net revenue trend"],
];

/* ---------------- DATA MODEL ---------------- */
const TABLE_TYPES = { "Orders": "Fact (hub)", "Delivery": "Fact", "Payments": "Fact", "Ratings": "Fact", "Login Audit": "Fact (events)",
  "Customers": "Dimension", "CustomerAddress": "Dimension", "Restaurant": "Dimension", "Menu": "Dimension", "OperatingHours": "Dimension",
  "DeliveryAgent": "Dimension", "Coupons": "Dimension" };
const TABLE_PK = { "Orders": "OrderID", "Delivery": "Delivery ID", "Payments": "PaymentID", "Ratings": "RatingID", "Login Audit": "Login Audit ID",
  "Customers": "Customer ID", "CustomerAddress": "Customer Address ID", "Restaurant": "RestaurantID", "Menu": "MenuItem ID", "OperatingHours": "RestaurantID",
  "DeliveryAgent": "Delivery AgentID", "Coupons": "CouponCode" };
const TABLE_FK = { "Orders": "Customer ID, Restaurant ID, Payment ID, CouponCode", "Delivery": "Order ID → Orders, Delivery Agent ID → DeliveryAgent",
  "Payments": "PaymentID ← Orders.Payment ID (OrderID text −999)", "Ratings": "OrderID text −999 → Orders; CustomerID; RestaurantID",
  "Login Audit": "CustomerID → Customers", "CustomerAddress": "Customer ID → Customers", "Menu": "Restaurant ID → Restaurant",
  "OperatingHours": "RestaurantID → Restaurant (1:1)" };
const TABLE_GRAIN = { "Orders": "1 row per order", "Delivery": "1 row per order's delivery", "Payments": "1 row per order's payment", "Ratings": "1 row per rated order",
  "Login Audit": "1 row per login session", "Customers": "1 row per registered customer", "CustomerAddress": "1 row per saved address", "Restaurant": "1 row per restaurant",
  "Menu": "1 row per menu item", "OperatingHours": "1 row per restaurant", "DeliveryAgent": "1 row per agent", "Coupons": "1 row per coupon code" };
const TABLE_DATE = { "Orders": "Order Date (no time of day)", "Delivery": "Pickup / Expected / Actual Delivery Time", "Payments": "PaymentDate", "Ratings": "CreatedDate",
  "Login Audit": "Login Time, Logout Time", "Customers": "DOB, Anniversary, LastOrderDate, CreatedDate" };
const TABLE_PURPOSE = {
  "Orders": ["Every order with amount, discount, amount paid, status, payment method, source, delivery minutes and coupon.", "It's the hub: every sales KPI is a count, sum or ratio over this table, and every other fact table joins to it."],
  "Delivery": ["One delivery per order with agent, timestamps, delivery status and feedback rating.", "Source of on-time %, late %, CSS and active agents. Use its status, not the timestamps, which are unreliable."],
  "Payments": ["One payment per order with method, status and date.", "Needed for payment success %. Join on Payment ID; the text OrderID has a 999 offset."],
  "Ratings": ["Rating (1–5) and short review for 45% of orders.", "The only voice-of-customer data: review themes explain the low satisfaction score."],
  "Login Audit": ["Login sessions per customer with method.", "Lets you count engaged customers; durations can't be trusted because logout is often before login."],
  "Customers": ["Registered customers with gender, preference, loyalty points and membership.", "Segments revenue by membership or preference. It also shows that 3,671 registered customers never ordered."],
  "CustomerAddress": ["Saved Home / Work addresses with city and pincode.", "Useful for customer geography only; use Restaurant.Location for order city."],
  "Restaurant": ["The 500 restaurant partners with city, cuisine, master rating and delivery estimates.", "Gives every order its city and cuisine. Rank by RestaurantID, because names repeat and their suffixes are wrong."],
  "Menu": ["Menu items per restaurant with category, price and preparation time.", "Describes what restaurants sell; it can't say what an order contained."],
  "OperatingHours": ["Opening and closing time per restaurant.", "Context for restaurant pages; remember '00:00' means midnight."],
  "DeliveryAgent": ["Agent master with vehicle type and rating.", "Splits delivery KPIs by vehicle; only 1,000 of 10,000 agents are active."],
  "Coupons": ["The 5 coupon codes with stated discount and validity.", "Explains coupon orders; its discount % doesn't match the discount actually given."],
};
const RELATIONSHIPS = M_RELATIONSHIPS;
const LOAD_ORDER = M_LOAD_ORDER;
const CALC_FIELDS = M_CALC_FIELDS;
const GOTCHAS = [
  { t: "The Swiggy_Final_View in the Column Mapping document joins Menu", d: "That view joins Menu ON o.RestaurantID = m.RestaurantID. Menu has about 20 items per restaurant and no order link, so the view returns 200,199 rows for 10,000 orders and every SUM(TotalAmount) on it is inflated about 20 times. Build the view without Menu (or aggregate Menu per restaurant first) and keep the order grain." },
  { t: "The KPI sheet's repeat-customer formula returns 100%", d: `FILTER(Orders, Orders[OrderID] > 1) filters order IDs, so every customer qualifies. Count orders per customer first: ${fmtUS(A.rep || 2641)} of ${fmtUS(A.cust || 6329)} customers = ${f2(A.repp || 41.73)}%.` },
  { t: "\"Delivered\" doesn't exist in Delivery Status", d: `The values are On Time (${fmtUS(A.ontime_n || 3388)}), Late (${fmtUS(A.late_n || 3338)}) and Cancelled (${fmtUS(A.dcancel_n || 3274)}). Filtering "Delivered" returns 0%. Use "On Time": ${f2(A.ontime || 33.88)}%.` },
  { t: "Two status columns, two answers", d: `Orders.Status has ${fmtUS(A.cancel_n || 2078)} Cancelled; Orders.Order Status has ${fmtUS(A.cancel_os_n || 105)}. They agree on only ${f2(A.status_agree_pct || 16.64)}% of rows, and Status contradicts Delivery Status too (${fmtUS(A.delivered_dcancel || 656)} 'Delivered' orders have a Cancelled delivery). Use Status and document it.` },
  { t: "'ORD1000' is order 1, not order 1000", d: `Payments.OrderID and Ratings.OrderID are text with a 999 offset. Text-to-integer joins give 0 matches; stripping 'ORD' without −999 joins ${fmtUS(A.nooffset_rows || 9001)} rows to the wrong orders. Join Payments on Payment ID.` },
  { t: "Zero means 'not rated'", d: `Delivery Feedback Rating = 0 on exactly the ${fmtUS(A.fb0 || 3274)} cancelled deliveries. Averaging them in gives ${f2(A.css0 || 2.0)}; excluding them gives ${f2(A.css || 2.97)}.` },
  { t: "Customers ≠ registered customers", d: `The Customers table has ${fmtUS(A.reg || 10000)} rows, but only ${fmtUS(A.cust || 6329)} ordered. Total Customers, Revenue per Customer and Repeat % all use the ordering customers.` },
  { t: "Orders ⋈ Menu is a fan-out", d: `Menu links to restaurants, not orders. Joining on Restaurant ID gives ${fmtUS(A.om_rows || 200199)} rows from 10,000 orders and inflates every sum. There's no order-items table.` },
  { t: "Don't do maths on the timestamps", d: `Actual Delivery Time is before Pickup Time on ${f2(A.act_before_pick_pct || 49.83)}% of deliveries and Logout is before Login on ${f2(A.logout_before_login_pct || 50.07)}% of sessions. Use Orders.Delivery Time (mins) for delivery time.` },
  { t: "Discount can exceed the order", d: `On ${fmtUS(A.disc_gt_total || 892)} orders Discount Applied > Total Amount; Final Amount Paid is floored at ₹0 (${fmtUS(A.zero_paid || 898)} orders). Final = Total − Discount on only ${f2(A.final_ok_pct || 91.08)}% of rows, so never recompute net revenue; sum Final Amount Paid.` },
  { t: "Header typos break formulas", d: "'Fina lAmount Paid' has the space in the wrong place and 'Restaurant Name ' ends with a space. Rename both on load so DAX, SQL and Tableau fields don't silently fail." },
];
const GLOBAL_FILTERS = M_GLOBAL_FILTERS;
const DASHBOARDS = M_DASHBOARDS;

/* ---------------- DATA QUALITY ---------------- */
const NULL_NOTES = M_NULL_NOTES.concat([
  `Restaurant Name suffixes ('Biryani House - Mexican (3)') name a different city or cuisine than the row's Location / Cuisine Type: ${f2(A.name_no_city_pct || 81.6)}% of names don't contain their own city, and only ${A.rest_name_bases || 15} base names exist across 500 restaurants. Group by RestaurantID and use Location / Cuisine Type.`,
  `Payments.PaymentMethod (UPI / Card / NetBanking / Wallet / Cash) and Orders.Payment Method (Credit Card / Debit Card / UPI / Cash on Delivery) agree on only ${f2(A.pm_agree_pct || 25.79)}% of orders even after mapping the card types. Pick one source and say which.`,
  `${f2(A.coupon_out_pct || 30.33)}% of coupon orders (${fmtUS(A.coupon_out_n || 364)}) fall outside the coupon's ValidFrom–ValidTo window, and Coupons.DiscountPercent doesn't match the discount actually applied. ${f2(A.disc_no_coupon_pct || 87.8)}% of all orders carry a discount without any coupon.`,
  `Customers.LastOrderDate matches the real last order in Orders for only ${f2(A.lastorder_match_pct || 0.16)}% of customers; PaymentDate is before Order Date on ${f2(A.paydate_before_order_pct || 16.96)}% of orders. Derive dates from Orders, not from these fields.`,
  `Mobile numbers have ${(A.mobile_len || [6, 12])[0]}–${(A.mobile_len || [6, 12])[1]} digits and there are ${fmtUS(A.dup_emails || 46)} duplicate emails, so contact fields can't identify a customer. Customer ID is the only reliable key.`,
  `Only ${fmtUS(A.agents || 1000)} of ${fmtUS(A.agents_master || 10000)} agents in DeliveryAgent appear in Delivery (IDs 1–1,000), and ${fmtUS(A.cust_no_addr || 3701)} customers have no saved address while others have up to ${A.max_addr || 7}.`,
  `OperatingHours.CloseTime is '00:00' for ${fmtUS(A.close_midnight || 134)} restaurants. That's midnight; compared as text it sorts before OpenTime and makes the restaurant look closed all day.`,
]);
const DQ_RULES = [
  ["Row counts", "COUNT(*) per table matches the Dataset page (orders 10,000; ratings 4,500; restaurant 500; coupons 5)", "All 12 tables", "Critical"],
  ["Join-key check", "payments and ratings join to orders through Payment ID / order key − 999; 100% match, customer IDs agree", "payments, ratings, orders", "Critical"],
  ["Status definition", "Cancellation uses orders.status; document the 16.64% agreement with order_status", "orders", "Critical"],
  ["Delivery status values", "Only On Time / Late / Cancelled exist; no KPI filters 'Delivered'", "delivery", "Critical"],
  ["Primary key uniqueness", "No duplicate orderid, paymentid, restaurantid, customer_id, delivery_agentid…", "All tables", "Critical"],
  ["Referential integrity", "Every orders.customer_id / restaurant_id / couponcode finds its dimension row", "orders", "High"],
  ["Amount logic", "final_amount_paid ≤ total_amount; flag discount_applied > total_amount (892 rows)", "orders", "High"],
  ["Zero-rating rule", "delivery_feedback_rating = 0 treated as NULL in every average", "delivery", "High"],
  ["Timestamp sanity", "Flag actual_delivery_time < pickup_time and logout_time < login_time; don't compute durations", "delivery, login_audit", "Medium"],
  ["Coupon validity", "Coupon orders with order_date outside validfrom–validto flagged (364 rows)", "orders, coupons", "Medium"],
];

/* ---------------- INTERVIEW TRAPS ---------------- */
const INTERVIEW_TRAPS = [
  ["Repeat customers = customers with OrderID > 1", "Count orders per customer, then customers with > 1: 41.73%, not 100%"],
  ["On-time = Delivery Status 'Delivered'", "The value is 'On Time': 33.88% (50.37% excl. cancelled)"],
  ["Total Customers = rows in Customers", "Customers who ordered: 6,329, not 10,000"],
  ["Join 'ORD1000' to OrderID 1000", "ORDn = OrderID n − 999, or join on Payment ID"],
  ["Average the feedback rating as is", "0 = not rated: exclude it (2.97, not 2.00)"],
  ["Order Status and Status mean the same", "They agree on 16.64% of rows: pick one and document it"],
  ["Top categories = Orders joined to Menu", "No order-items table: the join fans out to 200,199 rows"],
  ["Delivery time = Actual − Pickup", "Timestamps are inconsistent: use Delivery Time (mins)"],
];
const PRESENTATION = [
  ["01", "Business Problem", "30 sec", "Order, delivery and payment data in separate exports; no agreed KPIs."],
  ["02", "Dataset", "30 sec", "12 tables, 10,000 orders over one year, 6,329 customers, 500 restaurants in 5 cities."],
  ["03", "Data Model", "45 sec", "Orders as the hub; the 999 offset and the two status columns, and how you handled them."],
  ["04", "KPIs", "45 sec", "The P1 KPIs and the three KPI-sheet formulas you corrected (repeat %, on-time %, delivery time)."],
  ["05", "Dashboards", "90 sec", "Walk through Sales & Customers and Delivery & Operations, including one drill-through."],
  ["06", "Insights", "45 sec", "33.88% on time, 20.78% cancelled, CSS 2.97, 41.73% repeat customers, discounts at 24% of revenue."],
  ["07", "Recommendations", "30 sec", "On-time target, cancellation reasons, second-order offers, discount review, order timestamps and order items."],
];

/* ---------------- SQL LAB ---------------- */
const SQL_BLOCKS = [
  { cat: "Setup", title: "1 · Create the schema (MySQL)", desc: "One database, 12 tables, snake_case names. Payments and Ratings keep their order ID as text ('ORD1000'), exactly as delivered, so you can see the offset trap later.",
    sql: "CREATE DATABASE swiggy_db;\nUSE swiggy_db;\n\nCREATE TABLE customers (\n  customer_id INT PRIMARY KEY, loginbyusing VARCHAR(20), gender VARCHAR(10), preferences VARCHAR(20),\n  loyaltypoints INT, membershipstatus VARCHAR(20), lastorderdate DATE\n);\nCREATE TABLE restaurant (\n  restaurantid INT PRIMARY KEY, location VARCHAR(30), cuisine_type VARCHAR(30), average_rating DECIMAL(3,1),\n  total_reviews INT, restaurant_name VARCHAR(80), delivery_fee DECIMAL(8,2), estimated_delivery_time_mins INT\n);\nCREATE TABLE coupons (\n  couponcode VARCHAR(20) PRIMARY KEY, description VARCHAR(60), discountpercent INT,\n  validfrom DATE, validto DATE, maxuse INT\n);\nCREATE TABLE delivery_agent (delivery_agentid INT PRIMARY KEY, vehicle_type VARCHAR(20), ratings DECIMAL(3,1));\n\nCREATE TABLE orders (\n  orderid INT PRIMARY KEY, customer_id INT, restaurant_id INT, order_date DATE,\n  total_amount INT, discount_applied INT, final_amount_paid INT,      -- source header is 'Fina lAmount Paid'\n  status VARCHAR(20), payment_method VARCHAR(20), order_source VARCHAR(10), order_status VARCHAR(20),\n  payment_id VARCHAR(12), delivery_time_mins INT, couponcode VARCHAR(20) NULL,\n  FOREIGN KEY (customer_id)   REFERENCES customers(customer_id),\n  FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurantid),\n  FOREIGN KEY (couponcode)    REFERENCES coupons(couponcode)\n);\nCREATE TABLE delivery (\n  delivery_id INT PRIMARY KEY, order_id INT, delivery_agent_id INT,\n  pickup_time DATETIME, expected_delivery_time DATETIME, actual_delivery_time DATETIME,\n  delivery_status VARCHAR(20), delivery_feedback_rating INT,          -- 0 = not rated\n  FOREIGN KEY (order_id) REFERENCES orders(orderid),\n  FOREIGN KEY (delivery_agent_id) REFERENCES delivery_agent(delivery_agentid)\n);\nCREATE TABLE payments (\n  paymentid VARCHAR(12) PRIMARY KEY, orderid VARCHAR(10),             -- 'ORD1000' = orders.orderid 1\n  customerid INT, amount INT, paymentmethod VARCHAR(20), paymentstatus VARCHAR(20), paymentdate DATE\n);\nCREATE TABLE ratings (\n  ratingid VARCHAR(12) PRIMARY KEY, orderid VARCHAR(10), customerid INT, restaurantid INT,\n  rating INT, review VARCHAR(60), createddate DATE\n);\nCREATE TABLE menu (\n  menuitem_id INT PRIMARY KEY, restaurant_id INT, item_name VARCHAR(60), category VARCHAR(20),\n  price INT, calories INT, ingredients VARCHAR(120), preparation_time INT,\n  FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurantid)\n);\n-- customer_address, login_audit and operating_hours follow the same pattern:\n-- customer_address(customer_address_id, customer_id, city, address_type)\n-- login_audit(login_audit_id, customerid, login_time, logout_time, login_method)\n-- operating_hours(restaurantid, opentime, closetime, is24hours)" },
  { cat: "Setup", title: "2 · Load the CSVs (MySQL LOAD DATA)", desc: "Map columns by position, skip the Created/Modified dates with @dummy variables and turn the blank coupon into NULL. Load parents (customers, restaurant, coupons, agents) before orders.",
    sql: "SET GLOBAL local_infile = 1;\n\nLOAD DATA LOCAL INFILE 'Orders.csv' INTO TABLE orders\nFIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"'\nLINES TERMINATED BY '\\n'\nIGNORE 1 LINES\n(orderid, customer_id, restaurant_id, @order_date, total_amount, discount_applied,\n final_amount_paid, status, payment_method, order_source, @created, @modified,\n order_status, payment_id, delivery_time_mins, @coupon)\nSET order_date = STR_TO_DATE(@order_date, '%Y-%m-%d'),\n    couponcode = NULLIF(TRIM(@coupon), '');\n\n-- Payments: keep OrderID as text. Never let MySQL convert 'ORD1000' to a number.\nLOAD DATA LOCAL INFILE 'Payments.csv' INTO TABLE payments\nFIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"'\nIGNORE 1 LINES\n(paymentid, orderid, customerid, amount, paymentmethod, paymentstatus, paymentdate);\n\n-- Delivery: Feedback Rating 0 is loaded as 0 here; treat it as 'not rated' in every KPI.\n-- Repeat for the other tables, then run block 3." },
  { cat: "Setup", title: "3 · Verify the load: row counts", desc: "Every count must match the Dataset page before you build anything.",
    sql: "SELECT 'orders' AS t, COUNT(*) AS n_rows FROM orders            -- 10,000\nUNION ALL SELECT 'delivery', COUNT(*) FROM delivery                 -- 10,000\nUNION ALL SELECT 'payments', COUNT(*) FROM payments                 -- 10,000\nUNION ALL SELECT 'ratings', COUNT(*) FROM ratings                   -- 4,500\nUNION ALL SELECT 'customers', COUNT(*) FROM customers               -- 10,000\nUNION ALL SELECT 'restaurant', COUNT(*) FROM restaurant             -- 500\nUNION ALL SELECT 'menu', COUNT(*) FROM menu                         -- 10,000\nUNION ALL SELECT 'delivery_agent', COUNT(*) FROM delivery_agent     -- 10,000\nUNION ALL SELECT 'customer_address', COUNT(*) FROM customer_address -- 10,000\nUNION ALL SELECT 'login_audit', COUNT(*) FROM login_audit           -- 10,000\nUNION ALL SELECT 'operating_hours', COUNT(*) FROM operating_hours   -- 500\nUNION ALL SELECT 'coupons', COUNT(*) FROM coupons;                  -- 5" },
  { cat: "Setup", title: "4 · One reporting view on the clean keys", desc: "Orders is the hub. Join delivery on order_id, payments on payment_id (not the ORD text) and turn feedback 0 into NULL once, so no KPI can get it wrong.",
    sql: "DROP VIEW IF EXISTS vw_orders;\nCREATE VIEW vw_orders AS\nSELECT o.*,\n       r.location, r.cuisine_type, r.restaurant_name,\n       d.delivery_agent_id, d.delivery_status,\n       NULLIF(d.delivery_feedback_rating, 0) AS feedback_rating,   -- 0 = not rated\n       p.paymentstatus, p.paymentmethod AS payments_method\nFROM orders o\nJOIN restaurant r ON r.restaurantid = o.restaurant_id\nJOIN delivery   d ON d.order_id     = o.orderid\nJOIN payments   p ON p.paymentid    = o.payment_id;\n\nSELECT COUNT(*) FROM vw_orders;   -- must be 10,000 (no row lost, none duplicated)" },

  { cat: "Exploration", title: "5 · Two status columns: which one says 'cancelled'?", desc: "orders.status and orders.order_status describe the same order and agree on only 16.64% of rows. Pick status (the KPI sheet uses it) and say why.",
    sql: "SELECT SUM(status = 'Cancelled')        AS cancelled_by_status,        -- 2,078\n       SUM(order_status = 'Cancelled')  AS cancelled_by_order_status,  -- 105\n       SUM(status = order_status)       AS rows_that_agree,            -- 1,664\n       ROUND(SUM(status = order_status) * 100.0 / COUNT(*), 2) AS agree_pct   -- 16.64\nFROM orders;\n\nSELECT status, order_status, COUNT(*) AS orders\nFROM orders\nGROUP BY status, order_status\nORDER BY status, orders DESC;   -- e.g. 664 orders are 'Cancelled' in status but 'Delivered' in order_status" },
  { cat: "Exploration", title: "6 · orders.status vs delivery.delivery_status", desc: "An order marked Delivered should not have a cancelled delivery. Here it does, which is why delivery KPIs come from the delivery table and order KPIs from orders.",
    sql: "SELECT o.status, d.delivery_status, COUNT(*) AS orders\nFROM orders o\nJOIN delivery d ON d.order_id = o.orderid\nGROUP BY o.status, d.delivery_status\nORDER BY o.status, d.delivery_status;\n-- Delivered: Cancelled 656 · Late 648 · On Time 641 (the split is the same for every status)" },
  { cat: "Exploration", title: "7 · The ORD-offset join trap (payments and ratings)", desc: "payments.orderid is text 'ORD1000' and ORDn = orders.orderid n − 999. Three ways to join; only two are right.",
    sql: "-- (a) text to int: nothing matches\nSELECT COUNT(*) FROM orders o JOIN payments p ON p.orderid = o.orderid;   -- 0\n\n-- (b) strip 'ORD' but forget the offset: 9,001 rows match the WRONG order\nSELECT COUNT(*) AS matched,                                   -- 9,001\n       SUM(p.customerid = o.customer_id) AS same_customer     -- 0\nFROM orders o\nJOIN payments p ON CAST(SUBSTR(p.orderid, 4) AS UNSIGNED) = o.orderid;\n\n-- (c) correct: subtract 999, or better, use the payment_id key\nSELECT COUNT(*) AS matched,                                   -- 10,000\n       SUM(p.customerid = o.customer_id) AS same_customer,    -- 10,000\n       SUM(p.amount = o.final_amount_paid) AS same_amount     -- 10,000\nFROM orders o\nJOIN payments p ON p.paymentid = o.payment_id;\n\nSELECT COUNT(*) FROM orders o\nJOIN ratings r ON CAST(SUBSTR(r.orderid, 4) AS UNSIGNED) - 999 = o.orderid;   -- 4,500 (every rating finds its order)" },
  { cat: "Exploration", title: "8 · Orders ⋈ Menu: the row explosion", desc: "There is no order-items table. Joining orders to menu on restaurant gives every order every dish of its restaurant, so 'top food categories by orders' can't be computed. Count menu items instead and flag the gap.",
    sql: "SELECT COUNT(*) AS joined_rows                  -- 200,199 (from 10,000 orders)\nFROM orders o\nJOIN menu m ON m.restaurant_id = o.restaurant_id;\n\n-- What you CAN say: the menu mix\nSELECT category, COUNT(*) AS menu_items, ROUND(AVG(price), 2) AS avg_price\nFROM menu\nGROUP BY category\nORDER BY menu_items DESC;   -- Main Course 2,559 · Dessert 2,549 · Beverage 2,452 · Starter 2,440" },
  { cat: "Exploration", title: "9 · Feedback rating 0 means 'not rated'", desc: "Every 0 belongs to a cancelled delivery. Averaging them in drags satisfaction from 2.97 down to 2.00.",
    sql: "SELECT delivery_feedback_rating, COUNT(*) AS deliveries\nFROM delivery\nGROUP BY delivery_feedback_rating\nORDER BY delivery_feedback_rating;   -- 0 = 3,274 · 1 = 1,414 · 2 = 1,335 · 3 = 1,334 · 4 = 1,295 · 5 = 1,348\n\nSELECT SUM(delivery_feedback_rating = 0)                              AS zero_ratings,      -- 3,274\n       SUM(delivery_feedback_rating = 0 AND delivery_status = 'Cancelled') AS zero_and_cancelled -- 3,274\nFROM delivery;" },
  { cat: "Exploration", title: "10 · Discount bigger than the bill", desc: "On 892 orders the discount is larger than the order value, so final_amount_paid is floored at 0. Know this before you explain the gap between gross and net revenue.",
    sql: "SELECT SUM(discount_applied > total_amount) AS discount_exceeds_total,   -- 892\n       SUM(final_amount_paid = 0)          AS paid_zero,                  -- 898\n       ROUND(SUM(final_amount_paid = total_amount - discount_applied) * 100.0 / COUNT(*), 2) AS simple_rule_pct,   -- 91.08\n       SUM(final_amount_paid <> CASE WHEN total_amount > discount_applied\n                                     THEN total_amount - discount_applied ELSE 0 END) AS floored_rule_breaks  -- 0\nFROM orders;\n-- Gross ₹1,04,33,244 − discount ₹25,12,811 = ₹79,20,433, but net is ₹80,38,789:\n-- the ₹1,18,356 of 'extra' discount was never applied because the bill can't go below 0." },
  { cat: "Exploration", title: "11 · Coupons: usage and validity", desc: "Only 12% of orders carry a coupon, yet almost every order has a discount. And 30.3% of coupon orders fall outside the coupon's valid dates.",
    sql: "SELECT COUNT(couponcode) AS coupon_orders,                                 -- 1,200\n       ROUND(COUNT(couponcode) * 100.0 / COUNT(*), 2) AS coupon_usage_pct,     -- 12.00\n       ROUND(SUM(discount_applied > 0 AND couponcode IS NULL) * 100.0 / COUNT(*), 1) AS discount_without_coupon_pct   -- 87.8\nFROM orders;\n\nSELECT o.couponcode, c.discountpercent,\n       COUNT(*) AS orders,\n       SUM(o.order_date NOT BETWEEN c.validfrom AND c.validto) AS outside_validity,\n       ROUND(SUM(o.discount_applied) * 100.0 / SUM(o.total_amount), 2) AS actual_discount_pct\nFROM orders o\nJOIN coupons c ON c.couponcode = o.couponcode\nGROUP BY o.couponcode, c.discountpercent\nORDER BY orders DESC;   -- SAVE20 254 orders: coupon says 20%, actual 25.40%. 364 of 1,200 outside validity" },
  { cat: "Exploration", title: "12 · Timestamps you can't trust", desc: "Half the deliveries arrive before they were picked up. Use orders.delivery_time_mins for delivery time, not timestamp maths.",
    sql: "SELECT ROUND(SUM(actual_delivery_time < pickup_time) * 100.0 / COUNT(*), 1) AS arrived_before_pickup_pct   -- 49.8\nFROM delivery;\n\nSELECT ROUND(SUM(logout_time < login_time) * 100.0 / COUNT(*), 1) AS logout_before_login_pct   -- 50.1\nFROM login_audit;\n\nSELECT ROUND(SUM(p.paymentdate < o.order_date) * 100.0 / COUNT(*), 1) AS paid_before_ordered_pct   -- 17.0\nFROM orders o\nJOIN payments p ON p.paymentid = o.payment_id;" },
  { cat: "Exploration", title: "13 · Payment method: two sources disagree", desc: "orders.payment_method (Credit Card / Debit Card / UPI / Cash on Delivery) and payments.paymentmethod (UPI / Card / NetBanking / Wallet / Cash) rarely match. Choose one source per visual and label it.",
    sql: "SELECT o.payment_method, p.paymentmethod, COUNT(*) AS orders\nFROM orders o\nJOIN payments p ON p.paymentid = o.payment_id\nGROUP BY o.payment_method, p.paymentmethod\nORDER BY o.payment_method, orders DESC;\n\nSELECT SUM( (o.payment_method = 'UPI' AND p.paymentmethod = 'UPI')\n         OR (o.payment_method IN ('Credit Card','Debit Card') AND p.paymentmethod = 'Card')\n         OR (o.payment_method = 'Cash on Delivery' AND p.paymentmethod = 'Cash') ) AS consistent_rows   -- 2,579 of 10,000\nFROM orders o\nJOIN payments p ON p.paymentid = o.payment_id;" },

  { cat: "KPI", title: "14 · Total Orders, Revenue, Discount and AOV", desc: "Revenue = SUM(total_amount). Net revenue (what customers actually paid) is shown next to it, never instead of it.",
    sql: "SELECT COUNT(*)                         AS total_orders,     -- 10,000\n       SUM(total_amount)                AS total_revenue,    -- 10,433,244 (₹1,04,33,244)\n       SUM(discount_applied)            AS total_discount,   -- 2,512,811\n       SUM(final_amount_paid)           AS net_revenue,      -- 8,038,789\n       ROUND(SUM(total_amount) * 1.0 / COUNT(*), 2)       AS aov,       -- 1,043.32\n       ROUND(SUM(final_amount_paid) * 1.0 / COUNT(*), 2)  AS aov_net,   -- 803.88\n       ROUND(SUM(discount_applied) * 100.0 / SUM(total_amount), 2) AS discount_pct_of_gross   -- 24.08\nFROM orders;" },
  { cat: "KPI", title: "15 · Total Customers and Repeat Customer %", desc: "Customers who ordered (6,329), not the 10,000 registered. Repeat = customers with more than one order. The KPI sheet's OrderID > 1 filter returns a meaningless 100%.",
    sql: "WITH c AS (\n  SELECT customer_id, COUNT(*) AS n_orders\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT COUNT(*)                        AS total_customers,     -- 6,329\n       SUM(n_orders > 1)               AS repeat_customers,    -- 2,641\n       ROUND(SUM(n_orders > 1) * 100.0 / COUNT(*), 2) AS repeat_pct,   -- 41.73\n       MAX(n_orders)                   AS max_orders           -- 7\nFROM c;\n\n-- The wrong version from the KPI sheet: it filters order IDs, not customers\nSELECT ROUND(COUNT(DISTINCT customer_id) * 100.0 / (SELECT COUNT(DISTINCT customer_id) FROM orders), 2) AS wrong_repeat_pct   -- 100.00\nFROM orders\nWHERE orderid > 1;" },
  { cat: "KPI", title: "16 · Delivery Efficiency, Avg Delivery Time, Active Agents", desc: "The KPI sheet filters delivery_status = 'Delivered', a value that doesn't exist (it returns 0). Use 'On Time', and show both denominators.",
    sql: "SELECT SUM(delivery_status = 'Delivered') AS delivered_rows,   -- 0 (the KPI-sheet trap)\n       ROUND(SUM(delivery_status = 'On Time') * 100.0 / COUNT(*), 2) AS on_time_pct,                  -- 33.88 (headline)\n       ROUND(SUM(delivery_status = 'On Time') * 100.0\n             / SUM(delivery_status <> 'Cancelled'), 2)               AS on_time_pct_excl_cancelled,   -- 50.37\n       ROUND(SUM(delivery_status = 'Late') * 100.0 / COUNT(*), 2)      AS late_pct,                   -- 33.38\n       COUNT(DISTINCT delivery_agent_id)                              AS active_agents               -- 1,000 (of 10,000 in the master)\nFROM delivery;\n\nSELECT ROUND(AVG(delivery_time_mins), 2) AS avg_delivery_mins,   -- 37.18\n       MIN(delivery_time_mins) AS fastest,                        -- 15\n       MAX(delivery_time_mins) AS slowest                         -- 59\nFROM orders;" },
  { cat: "KPI", title: "17 · Order Cancellation Rate", desc: "Same KPI, two columns, two answers. The site uses orders.status (20.78%) and mentions the other in the QA log.",
    sql: "SELECT ROUND(SUM(status = 'Cancelled') * 100.0 / COUNT(*), 2)       AS cancel_pct_status,         -- 20.78\n       ROUND(SUM(order_status = 'Cancelled') * 100.0 / COUNT(*), 2) AS cancel_pct_order_status    -- 1.05\nFROM orders;" },
  { cat: "KPI", title: "18 · Customer Satisfaction Score (CSS)", desc: "Average delivery feedback with the 0s (not rated) removed. Don't mix it with the Ratings table or the restaurant master rating: three sources, three numbers.",
    sql: "SELECT ROUND(AVG(NULLIF(delivery_feedback_rating, 0)), 2) AS css,            -- 2.97 (official)\n       ROUND(AVG(delivery_feedback_rating), 2)            AS css_with_zeros  -- 2.00 (wrong)\nFROM delivery;\n\nSELECT ROUND(AVG(rating), 2) AS avg_order_rating,                              -- 3.02 (4,500 rated orders)\n       ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM orders), 1) AS coverage_pct   -- 45.0\nFROM ratings;\n\nSELECT ROUND(AVG(average_rating), 2) AS avg_restaurant_rating                  -- 3.72 (master value)\nFROM restaurant;" },
  { cat: "KPI", title: "19 · Revenue per Customer and Customer Lifetime Value", desc: "CLV follows the KPI sheet: AOV × repeat rate × orders per customer. State the formula whenever you quote the number.",
    sql: "WITH c AS (\n  SELECT customer_id, COUNT(*) AS n_orders, SUM(total_amount) AS revenue\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT ROUND(SUM(revenue) * 1.0 / COUNT(*), 2)  AS revenue_per_customer,   -- 1,648.48\n       ROUND(SUM(n_orders) * 1.0 / COUNT(*), 2) AS orders_per_customer,    -- 1.58\n       ROUND( (SUM(revenue) * 1.0 / SUM(n_orders))           -- AOV 1,043.32\n            * (SUM(n_orders > 1) * 1.0 / COUNT(*))           -- repeat rate 0.4173\n            * (SUM(n_orders) * 1.0 / COUNT(*)), 2) AS clv    -- 687.89\nFROM c;" },
  { cat: "KPI", title: "20 · Payment success rate", desc: "Join on payment_id. 89.8% of payments succeed; failed, pending and refunded payments are still inside net revenue.",
    sql: "SELECT paymentstatus, COUNT(*) AS payments, SUM(amount) AS amount\nFROM payments\nGROUP BY paymentstatus\nORDER BY payments DESC;   -- Success 8,980 · Pending 530 · Failed 296 · Refunded 194\n\nSELECT ROUND(SUM(paymentstatus = 'Success') * 100.0 / COUNT(*), 2) AS success_pct,   -- 89.80\n       SUM(CASE WHEN paymentstatus = 'Success' THEN amount ELSE 0 END) AS collected  -- 7,193,763\nFROM payments;" },

  { cat: "Breakdown", title: "21 · Revenue, cancellations and delivery time by city", desc: "City comes from the restaurant's Location column. Don't parse the restaurant name: its suffix is the cuisine for 408 of 500 restaurants.",
    sql: "SELECT r.location,\n       COUNT(*)                     AS orders,\n       SUM(o.total_amount)          AS revenue,\n       ROUND(SUM(o.total_amount) * 100.0 / (SELECT SUM(total_amount) FROM orders), 1) AS revenue_share_pct,\n       ROUND(SUM(o.status = 'Cancelled') * 100.0 / COUNT(*), 2) AS cancel_pct,\n       ROUND(AVG(o.delivery_time_mins), 2) AS avg_delivery_mins\nFROM orders o\nJOIN restaurant r ON r.restaurantid = o.restaurant_id\nGROUP BY r.location\nORDER BY revenue DESC;\n-- Noida 2,253,210 (21.6%, cancel 22.24%) · Faridabad 2,183,029 · Gurgaon 2,069,834 · Delhi 1,998,429 · Ghaziabad 1,928,742" },
  { cat: "Breakdown", title: "22 · Revenue by cuisine, per restaurant", desc: "Italian leads on total revenue, but only because it has the most restaurants. Divide by restaurant count before you call a winner.",
    sql: "SELECT r.cuisine_type,\n       COUNT(DISTINCT r.restaurantid) AS restaurants,\n       SUM(o.total_amount)            AS revenue,\n       ROUND(SUM(o.total_amount) * 1.0 / COUNT(DISTINCT r.restaurantid), 0) AS revenue_per_restaurant\nFROM orders o\nJOIN restaurant r ON r.restaurantid = o.restaurant_id\nGROUP BY r.cuisine_type\nORDER BY revenue DESC;\n-- Italian 2,424,330 (114 restaurants, 21,266 each) · Indian 2,369,335 · Chinese 2,002,166 · Fast Food 1,912,240 · Mexican 1,725,173 (80, 21,565 each)" },
  { cat: "Breakdown", title: "23 · Top 10 restaurants by revenue (window function)", desc: "Group by restaurant ID, not by name: names repeat across outlets.",
    sql: "WITH t AS (\n  SELECT r.restaurantid, r.restaurant_name, r.location, r.cuisine_type,\n         COUNT(*) AS orders, SUM(o.total_amount) AS revenue,\n         RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS rk\n  FROM orders o\n  JOIN restaurant r ON r.restaurantid = o.restaurant_id\n  GROUP BY r.restaurantid, r.restaurant_name, r.location, r.cuisine_type\n)\nSELECT * FROM t WHERE rk <= 10 ORDER BY rk;\n-- #1 Urban Tadka - Indian (92), Gurgaon: 32 orders, 35,503 · #2 The Dosa Den - Mexican (235): 35,397" },
  { cat: "Breakdown", title: "24 · Monthly orders and revenue", desc: "The data runs 28-Mar-2024 to 28-Mar-2025, so both March months are partial. Flag them on the trend line.",
    sql: "SELECT SUBSTR(order_date, 1, 7) AS month,     -- DATE_FORMAT(order_date, '%Y-%m') also works in MySQL\n       COUNT(*)            AS orders,\n       SUM(total_amount)   AS revenue\nFROM orders\nGROUP BY SUBSTR(order_date, 1, 7)\nORDER BY month;\n-- 2024-03 86 (4 days only) · peak 2024-10: 873 orders, 928,629 · 2025-03 751 (28 days)" },
  { cat: "Breakdown", title: "25 · 'Peak order hours': what the data can and can't say", desc: "order_date has no time of day. The only hour available is delivery pickup time, and it's flat. Report the weekday pattern and say the hour KPI needs order timestamps.",
    sql: "SELECT COUNT(*) AS orders_with_a_time FROM orders\nWHERE LENGTH(order_date) > 10;   -- 0: order_date is a date only\n\nSELECT SUBSTR(pickup_time, 12, 2) AS pickup_hour, COUNT(*) AS deliveries   -- HOUR(pickup_time) in MySQL\nFROM delivery\nGROUP BY SUBSTR(pickup_time, 12, 2)\nORDER BY deliveries DESC;   -- 16:00 477 (highest) … 10:00 363 (lowest): about 400–440 every hour" },
  { cat: "Breakdown", title: "26 · On-time % by delivery vehicle", desc: "Agent vehicle comes from delivery_agent. The spread is under 2 points, so vehicle type is not the lever.",
    sql: "SELECT a.vehicle_type,\n       COUNT(*) AS deliveries,\n       ROUND(SUM(d.delivery_status = 'On Time') * 100.0 / COUNT(*), 2) AS on_time_pct\nFROM delivery d\nJOIN delivery_agent a ON a.delivery_agentid = d.delivery_agent_id\nGROUP BY a.vehicle_type\nORDER BY on_time_pct DESC;   -- Scooter 34.81 · Bike 33.62 · Bicycle 33.04" },
  { cat: "Breakdown", title: "27 · Review text vs star rating", desc: "The two complaints about speed and temperature are 38.1% of all reviews. But some review texts don't match their stars, so read text and rating together.",
    sql: "SELECT review, COUNT(*) AS reviews, ROUND(AVG(rating), 2) AS avg_rating\nFROM ratings\nGROUP BY review\nORDER BY reviews DESC;\n-- Food was cold 868 (2.28) · Too slow 846 (2.25) · Not good 572 (1.51) · Portion was small 295 (4.02!) · Not up to the mark 263 (4.02!)" },
];

const QA_SQL = [
  { title: "QA 1 · Referential integrity (all should return 0)", desc: "Orphans silently drop out of joined visuals.",
    sql: "SELECT COUNT(*) FROM orders o LEFT JOIN customers c ON c.customer_id = o.customer_id\nWHERE c.customer_id IS NULL;                                         -- 0\nSELECT COUNT(*) FROM orders o LEFT JOIN restaurant r ON r.restaurantid = o.restaurant_id\nWHERE r.restaurantid IS NULL;                                        -- 0\nSELECT COUNT(*) FROM orders o LEFT JOIN delivery d ON d.order_id = o.orderid\nWHERE d.order_id IS NULL;                                            -- 0\nSELECT COUNT(*) FROM orders o LEFT JOIN payments p ON p.paymentid = o.payment_id\nWHERE p.paymentid IS NULL;                                           -- 0\nSELECT COUNT(*) FROM delivery d LEFT JOIN delivery_agent a ON a.delivery_agentid = d.delivery_agent_id\nWHERE a.delivery_agentid IS NULL;                                    -- 0" },
  { title: "QA 2 · Grain checks: one row per order", desc: "Delivery, payments and ratings must each have at most one row per order, or every join double-counts revenue.",
    sql: "SELECT COUNT(*) FROM (SELECT orderid FROM orders GROUP BY orderid HAVING COUNT(*) > 1) x;       -- 0\nSELECT COUNT(*) FROM (SELECT order_id FROM delivery GROUP BY order_id HAVING COUNT(*) > 1) x;   -- 0\nSELECT COUNT(*) FROM (SELECT payment_id FROM orders GROUP BY payment_id HAVING COUNT(*) > 1) x; -- 0\nSELECT COUNT(*) FROM (SELECT orderid FROM ratings GROUP BY orderid HAVING COUNT(*) > 1) x;      -- 0" },
  { title: "QA 3 · Final amount rule holds on every row", desc: "final_amount_paid = total − discount, floored at 0. If this returns 0 you can trust net revenue.",
    sql: "SELECT SUM(final_amount_paid <> CASE WHEN total_amount > discount_applied\n                                     THEN total_amount - discount_applied ELSE 0 END) AS rule_breaks   -- 0\nFROM orders;" },
  { title: "QA 4 · Payments reconcile to orders", desc: "Payment amount must equal the order's final amount when joined on payment_id.",
    sql: "SELECT SUM(amount) FROM payments;                      -- 8,038,789\nSELECT SUM(final_amount_paid) FROM orders;             -- 8,038,789\n\nSELECT SUM(p.amount <> o.final_amount_paid) AS mismatches,      -- 0\n       SUM(p.customerid <> o.customer_id)   AS wrong_customer   -- 0\nFROM orders o JOIN payments p ON p.paymentid = o.payment_id;" },
  { title: "QA 5 · Reconciliation totals for the review meeting", desc: "Compare with your Excel, Tableau and Power BI cards, number for number.",
    sql: "SELECT (SELECT COUNT(*) FROM orders)                                         AS total_orders,    -- 10,000\n       (SELECT SUM(total_amount) FROM orders)                                AS revenue,         -- 10,433,244\n       (SELECT COUNT(DISTINCT customer_id) FROM orders)                      AS customers,       -- 6,329\n       (SELECT ROUND(AVG(total_amount), 2) FROM orders)                      AS aov,             -- 1,043.32\n       (SELECT ROUND(SUM(status = 'Cancelled') * 100.0 / COUNT(*), 2) FROM orders)          AS cancel_pct,   -- 20.78\n       (SELECT ROUND(SUM(delivery_status = 'On Time') * 100.0 / COUNT(*), 2) FROM delivery) AS on_time_pct,  -- 33.88\n       (SELECT ROUND(AVG(NULLIF(delivery_feedback_rating, 0)), 2) FROM delivery)            AS css,          -- 2.97\n       (SELECT ROUND(AVG(delivery_time_mins), 2) FROM orders)                AS avg_delivery_mins;          -- 37.18" },
];

const QA_CHECKLIST = [
  { id: "q1", t: "Row counts match", d: "All 12 tables match the Dataset page (orders 10,000, ratings 4,500, restaurant 500, coupons 5)." },
  { id: "q2", t: "Customers = 6,329", d: "Total Customers counts distinct customers in Orders, not the 10,000 registered." },
  { id: "q3", t: "Joins use the clean keys", d: "Payments on Payment ID; Ratings on ORD text minus 999. Revenue doesn't change after any join." },
  { id: "q4", t: "Feedback 0s excluded", d: "CSS shows 2.97, not 2.00. The 3,274 zeros are the cancelled deliveries." },
  { id: "q5", t: "Status columns labelled", d: "Cancellation % says it uses Orders.Status (20.78%); delivery KPIs use Delivery Status." },
  { id: "q6", t: "Repeat % and On-Time % fixed", d: "Repeat Customer % = 41.73% and On-Time % = 33.88%, not the KPI sheet's 100% and 0%." },
  { id: "q7", t: "No menu explosion", d: "No visual joins Orders to Menu; category charts count menu items and say so." },
  { id: "q8", t: "Definitions documented", d: "Each KPI card links back to its KPI Library definition and states its source column." },
];

/* ---------------- EXCEL ---------------- */
const EXCEL_TASKS = [
  ["Total orders", "=COUNTA(Orders[OrderID])", "10,000", "Starter ✓"],
  ["Total revenue", "=SUM(Orders[Total Amount])", "₹1,04,33,244", "Starter ✓"],
  ["Average order value", "=SUM(Orders[Total Amount]) / COUNTA(Orders[OrderID])", "₹1,043.32", "Starter ✓"],
  ["Total customers (ordered)", "=COUNTA(UNIQUE(Orders[Customer ID]))", "6,329", "Starter ✓"],
  ["Cancellation %", "=COUNTIFS(Orders[Status],\"Cancelled\") / COUNTA(Orders[OrderID])", "20.78%", "Starter ✓"],
  ["On-time delivery %", "=COUNTIFS(Delivery[Delivery Status],\"On Time\") / COUNTA(Delivery[Delivery ID])", "33.88%", "Your task"],
  ["Customer satisfaction (excl. 0)", "=AVERAGEIFS(Delivery[Delivery Feedback Rating], Delivery[Delivery Feedback Rating], \">0\")", "2.97", "Your task"],
  ["Repeat customers", "Unique list of Customer ID → =COUNTIFS(Orders[Customer ID], A2) → =COUNTIF(B:B, \">1\")", "2,641 (41.73%)", "Your task"],
  ["City on each order", "=XLOOKUP([@[Restaurant ID]], Restaurant[RestaurantID], Restaurant[Location]) then SUMIFS by city", "Noida ₹22,53,210", "Your task"],
  ["Payment status on each order", "=XLOOKUP([@[Payment ID]], Payments[PaymentID], Payments[PaymentStatus])", "8,980 Success", "Your task"],
  ["Order month", "=TEXT([@[Order Date]], \"yyyy-mm\")", "2024-10 = peak (873 orders)", "Your task"],
];
const PIVOTS = [
  { n: "01", h: "Revenue and orders by city", p: "Add a Location column to Orders with XLOOKUP on Restaurant ID. Rows: Location · Values: Sum of Total Amount, Count of OrderID, % of grand total. Noida leads with 21.6%; all five cities sit between 18.5% and 21.6%." },
  { n: "02", h: "Status vs Order Status", p: "Rows: Status · Columns: Order Status · Values: Count of OrderID. Only the diagonal should be filled; in this data the diagonal holds just 1,664 of 10,000 orders. Use this pivot to explain why you picked one column." },
  { n: "03", h: "Delivery status by vehicle type", p: "Add Vehicle Type to Delivery with XLOOKUP on Delivery Agent ID. Rows: Vehicle Type · Columns: Delivery Status · Values: Count, shown as % of row total. Scooter 34.81% on time, Bicycle 33.04%: a small spread." },
  { n: "04", h: "Monthly orders and revenue", p: "Rows: Order Date grouped by Years and Months · Values: Count of OrderID and Sum of Total Amount. October 2024 peaks (873 orders); March 2024 has only 4 days of data and March 2025 stops on the 28th." },
  { n: "05", h: "Review text vs rating", p: "Ratings sheet. Rows: Review · Values: Count of RatingID and Average of Rating. 'Food was cold' and 'Too slow' lead (868 and 846), while 'Portion was small' averages 4.02 stars: the text and the score don't always agree." },
];

/* ---------------- DASHBOARD GALLERY ---------------- */
function galleryPages() {
  return [
    { n: "01", t: "Sales & Revenue Overview", q: "How much are we selling, and where does the money come from?", ins: "₹1,04,33,244 gross revenue from 10,000 orders (AOV ₹1,043.32); customers paid ₹80,38,789 after ₹25,12,811 of discounts (24.08% of gross).", iq: "Why is gross revenue minus discount not equal to net revenue?", aud: "Business Head · Finance · City Managers", keys: ["Total Orders", "Total Revenue", "AOV", "Net Revenue"],
      desc: "Excel and Tableau main page: the headline sales numbers, the monthly trend and the city and cuisine split.",
      mock: { title: "Sales & Revenue Overview", sub: "Orders ⋈ Restaurant · 28-Mar-2024 to 28-Mar-2025",
        kpis: [{ v: "10,000", l: "Total orders" }, { v: "₹10.43M", l: "Total revenue" }, { v: "₹1,043.32", l: "AOV" }, { v: "₹8.04M", l: "Net revenue (paid)" }, { v: "24.08%", l: "Discount % of gross" }, { v: "12.00%", l: "Coupon usage" }],
        donuts: [{ title: "Revenue by cuisine (₹)", data: [["Italian", 2424330], ["Indian", 2369335], ["Chinese", 2002166], ["Fast Food", 1912240], ["Mexican", 1725173]] }],
        bars: [{ title: "Revenue by city (₹)", data: [["Noida", 2253210], ["Faridabad", 2183029], ["Gurgaon", 2069834], ["Delhi", 1998429], ["Ghaziabad", 1928742]] },
               { title: "Orders by month (Mar 2024 and Mar 2025 are partial)", data: [["2024-03", 86], ["2024-04", 827], ["2024-05", 817], ["2024-06", 818], ["2024-07", 866], ["2024-08", 831], ["2024-09", 821], ["2024-10", 873], ["2024-11", 835], ["2024-12", 845], ["2025-01", 872], ["2025-02", 758], ["2025-03", 751]] },
               { title: "Orders by source", data: [["Web", 5027], ["App", 4973]] }] },
      build: { tableau: ["Relationship Orders → Restaurant on Restaurant ID; Location and Cuisine Type come from Restaurant", "AOV = SUM([Total Amount]) / COUNTD([OrderID])", "Annotate the two partial March months on the trend line"],
               powerbi: ["Rename 'Fina lAmount Paid' to Final Amount Paid in Power Query", "Measures: Total Revenue = SUM(Orders[Total Amount]); AOV = DIVIDE([Total Revenue], [Total Orders])", "Date table marked as date table; month axis sorted by year-month"] } },
    { n: "02", t: "Customers & Loyalty", q: "How many customers do we have, and do they come back?", ins: "6,329 of 10,000 registered customers ordered; 2,641 ordered more than once (41.73%). Revenue per customer ₹1,648.48, CLV ₹687.89.", iq: "Why is Total Customers 6,329 and not 10,000?", aud: "Marketing · CRM / Loyalty team", keys: ["Total Customers", "Repeat %", "Revenue per Customer", "CLV"],
      desc: "Power BI page: the customer base, repeat behaviour and the value of a customer.",
      mock: { title: "Customers & Loyalty", sub: "Orders ⋈ Customers",
        kpis: [{ v: "6,329", l: "Customers who ordered" }, { v: "41.73%", l: "Repeat customers" }, { v: "1.58", l: "Orders per customer" }, { v: "₹1,648.48", l: "Revenue per customer" }, { v: "₹687.89", l: "CLV (KPI-sheet formula)" }],
        donuts: [{ title: "Revenue by membership (₹)", data: [["Platinum", 3562163], ["Gold", 3450295], ["Regular", 3420786]] }],
        bars: [{ title: "Customers by number of orders", data: [["1 order", 3688], ["2 orders", 1825], ["3 orders", 638], ["4 orders", 147], ["5+ orders", 31]] },
               { title: "Revenue per customer by membership (₹)", data: [["Gold", 1655.61], ["Regular", 1651.76], ["Platinum", 1638.53]] }] },
      build: { tableau: ["Repeat flag: { FIXED [Customer ID] : COUNTD([OrderID]) } > 1", "Histogram of orders per customer from the same LOD", "Membership from Customers via relationship on Customer ID"],
               powerbi: ["Total Customers = DISTINCTCOUNT(Orders[Customer ID])", "Repeat Customers = COUNTROWS(FILTER(VALUES(Orders[Customer ID]), CALCULATE(COUNTROWS(Orders)) > 1))", "CLV = [AOV] * [Repeat Customer %] * DIVIDE([Total Orders], [Total Customers])"] } },
    { n: "03", t: "Delivery & Operations", q: "Are we delivering on time, and how often do orders fail?", ins: "33.88% of deliveries are on time (50.37% if cancelled deliveries are left out); 20.78% of orders are cancelled; average delivery time 37.18 mins with 1,000 active agents.", iq: "Why does the KPI sheet's Delivery Efficiency formula return 0?", aud: "Operations Head · Fleet Managers", keys: ["On-Time %", "Cancellation %", "Avg Delivery Time", "Active Agents"],
      desc: "Tableau and Power BI drill page: delivery outcomes, cancellations and the delivery fleet.",
      mock: { title: "Delivery & Operations", sub: "Delivery ⋈ Orders ⋈ DeliveryAgent",
        kpis: [{ v: "33.88%", l: "On-time deliveries" }, { v: "20.78%", l: "Order cancellation" }, { v: "37.18 min", l: "Avg delivery time" }, { v: "1,000", l: "Active delivery agents" }, { v: "2.97", l: "CSS (feedback, excl. 0)" }],
        donuts: [{ title: "Delivery status", data: [["On Time", 3388], ["Late", 3338], ["Cancelled", 3274]] }],
        bars: [{ title: "Cancellation % by city", data: [["Noida", 22.24], ["Gurgaon", 21.55], ["Ghaziabad", 21.09], ["Delhi", 20.01], ["Faridabad", 19.0]], suffix: "%" },
               { title: "On-time % by vehicle", data: [["Scooter", 34.81], ["Bike", 33.62], ["Bicycle", 33.04]], suffix: "%" },
               { title: "Avg delivery time by city (mins)", data: [["Faridabad", 37.4], ["Noida", 37.36], ["Delhi", 37.23], ["Gurgaon", 37.07], ["Ghaziabad", 36.8]] }] },
      build: { tableau: ["On-Time % = SUM(IF [Delivery Status] = 'On Time' THEN 1 ELSE 0 END) / COUNT([Delivery ID])", "Parameter to switch the denominator: all deliveries vs excl. cancelled", "Delivery time from Orders[Delivery Time (mins)], not timestamp differences"],
               powerbi: ["On-Time % = DIVIDE(CALCULATE(COUNTROWS(Delivery), Delivery[Delivery Status] = \"On Time\"), COUNTROWS(Delivery))", "Active Agents = DISTINCTCOUNT(Delivery[Delivery Agent ID])", "Tooltip on Cancellation % naming the source column (Orders.Status)"] } },
    { n: "04", t: "Restaurants, Menu & Ratings", q: "Which restaurants and cuisines perform, and what do customers say?", ins: "Top restaurant: Urban Tadka - Indian (92) in Gurgaon at ₹35,503. Only 45% of orders are rated (avg 3.02); 'Food was cold' and 'Too slow' are 38.1% of reviews.", iq: "Why can't you chart top food categories by orders?", aud: "Restaurant Partnerships · Category Managers", keys: ["Top Restaurants", "Top Food Categories", "Ratings", "Reviews"],
      desc: "Final-presentation page: restaurant ranking, menu mix and the voice of the customer.",
      mock: { title: "Restaurants, Menu & Ratings", sub: "Restaurant · Menu · Ratings",
        kpis: [{ v: "499", l: "Restaurants with orders" }, { v: "3.72", l: "Avg restaurant rating (master)" }, { v: "3.02", l: "Avg order rating" }, { v: "45.0%", l: "Orders rated" }],
        donuts: [{ title: "Menu items by category", data: [["Main Course", 2559], ["Dessert", 2549], ["Beverage", 2452], ["Starter", 2440]] }],
        bars: [{ title: "Top 5 restaurants by revenue (₹)", data: [["Urban Tadka - Indian (92)", 35503], ["The Dosa Den - Mexican (235)", 35397], ["Noodle Nest - Italian (419)", 35047], ["Curry Point - Mexican (431)", 34855], ["Masala Street - Chinese (328)", 33961]] },
               { title: "Top reviews (count)", data: [["Food was cold", 868], ["Too slow", 846], ["Not good", 572], ["Portion was small", 295], ["Excellent!", 286]] },
               { title: "Star rating distribution", data: [["1 star", 885], ["2 stars", 887], ["3 stars", 877], ["4 stars", 942], ["5 stars", 909]] }] },
      build: { tableau: ["Top N parameter on the restaurant bar; group by RestaurantID, show the name as a label", "Menu category chart from Menu alone (no join to Orders)", "Ratings joined to Orders with INT(MID([OrderID], 4)) − 999"],
               powerbi: ["In Power Query add Order Key = Number.FromText(Text.Middle([OrderID], 3)) − 999 to Ratings", "RANKX for the top-10 restaurant table", "Card showing rating coverage next to every rating visual"] } },
  ];
}

/* ---------------- ASSIGNMENTS ---------------- */
function assignments() {
  return [
    { id: "a1", tool: "Data Exploration · Excel or SQL", track: "business", t: "How many customers actually placed an order?",
      task: ["Open the Orders sheet.", "Count DISTINCT Customer ID values.", "Compare with the 10,000 rows in Customers."],
      type: "num", ans: 6329, tol: 0, unit: "customers", hint: "COUNT(*) on Customers gives 10,000 registered accounts. The KPI needs customers who ordered.",
      sol: "SELECT COUNT(DISTINCT customer_id) FROM orders;   -- 6,329\n-- 3,671 registered customers never placed an order" },
    { id: "a2", tool: "SQL", track: "sql", t: "What is the total revenue (sum of Total Amount)?",
      task: ["Use the orders table.", "SUM(total_amount) over all 10,000 orders.", "Enter the number without commas."],
      type: "num", ans: 10433244, tol: 0, unit: "₹", hint: "Gross revenue, before discounts. Net revenue (final_amount_paid) is a different KPI.",
      sol: "SELECT SUM(total_amount) FROM orders;   -- 10,433,244 (₹1,04,33,244)\nSELECT SUM(final_amount_paid) FROM orders;   -- 8,038,789 net" },
    { id: "a3", tool: "SQL", track: "kpi", t: "What is the Repeat Customer %? (two decimals)",
      task: ["Count orders per customer.", "Repeat customers = customers with more than one order.", "Divide by all customers who ordered."],
      type: "num", ans: 41.73, tol: 0.01, unit: "%", hint: "If you got 100%, you filtered OrderID > 1 like the KPI sheet. Group by customer instead.",
      sol: "WITH c AS (SELECT customer_id, COUNT(*) n FROM orders GROUP BY customer_id)\nSELECT ROUND(SUM(n > 1) * 100.0 / COUNT(*), 2) FROM c;   -- 41.73 (2,641 of 6,329)\n\n-- DAX\nRepeat Customer % = DIVIDE(COUNTROWS(FILTER(VALUES(Orders[Customer ID]), CALCULATE(COUNTROWS(Orders)) > 1)), DISTINCTCOUNT(Orders[Customer ID]))" },
    { id: "a4", tool: "SQL", track: "sql", t: "Which CUISINE brings the most total revenue?",
      task: ["Join orders to restaurant on restaurant_id = restaurantid.", "SUM(total_amount) by cuisine_type.", "Pick the highest."],
      type: "select", options: ["Indian", "Italian", "Chinese", "Fast Food", "Mexican"], ans: "Italian",
      hint: "It's tied with Indian for the most restaurants (114 each).",
      sol: "SELECT r.cuisine_type, SUM(o.total_amount) AS revenue\nFROM orders o JOIN restaurant r ON r.restaurantid = o.restaurant_id\nGROUP BY r.cuisine_type ORDER BY revenue DESC;\n-- Italian 2,424,330 · Indian 2,369,335 · Chinese 2,002,166 · Fast Food 1,912,240 · Mexican 1,725,173\n-- Per restaurant, Mexican is highest (21,565): always check the count behind a total." },
    { id: "a5", tool: "Excel", track: "excel", t: "What is the total revenue from restaurants located in Noida?",
      task: ["Add a Location column to Orders with XLOOKUP on Restaurant ID.", "SUMIFS Total Amount where Location = \"Noida\".", "Enter the number without commas."],
      type: "num", ans: 2253210, tol: 0, unit: "₹", hint: "Use the Location column of Restaurant, not the city written inside the restaurant name.",
      sol: "=XLOOKUP([@[Restaurant ID]], Restaurant[RestaurantID], Restaurant[Location])\n=SUMIFS(Orders[Total Amount], Orders[Location], \"Noida\")\n→ 2,253,210 (21.6% of revenue)" },
    { id: "a6", tool: "Tableau", track: "tableau", t: "Build an orders-by-month bar chart. Which month has the most orders?",
      task: ["Columns: MONTH(Order Date) with year · Rows: COUNTD(OrderID).", "Note the two partial March months.", "Read off the tallest bar."],
      type: "select", options: ["Apr 2024", "Jul 2024", "Oct 2024", "Dec 2024", "Jan 2025", "Mar 2025"], ans: "Oct 2024",
      hint: "It beats January 2025 by just one order.",
      sol: "Peak month: Oct 2024 with 873 orders (₹9,28,629). Jan 2025 is second with 872.\nTableau: Order Date → Columns as continuous month, COUNTD(OrderID) → Rows; annotate Mar 2024 (86 orders, 4 days) and Mar 2025 (751, 28 days)." },
    { id: "a7", tool: "Power BI", track: "powerbi", t: "Write the On-Time Delivery % measure. What does it return?",
      task: ["Denominator: all 10,000 deliveries.", "Numerator: Delivery Status = \"On Time\".", "Show it on a card with two decimals."],
      type: "num", ans: 33.88, tol: 0.02, unit: "%", hint: "If you get 0, you copied the KPI sheet's filter on \"Delivered\", a value that doesn't exist in Delivery Status.",
      sol: "On-Time Delivery % =\nDIVIDE (\n    CALCULATE ( COUNTROWS ( Delivery ), Delivery[Delivery Status] = \"On Time\" ),\n    COUNTROWS ( Delivery )\n)   -- 33.88%  (3,388 ÷ 10,000)\n\n-- Excluding cancelled deliveries: 3,388 ÷ 6,726 = 50.37%. Show it in the tooltip." },
    { id: "a8", tool: "SQL · KPI", track: "kpi", t: "What is the Customer Satisfaction Score? (two decimals)",
      task: ["Use delivery.delivery_feedback_rating.", "Exclude the 0 ratings (not rated).", "Average the rest."],
      type: "num", ans: 2.97, tol: 0.01, unit: "/5", hint: "AVG over all rows gives 2.00 because 3,274 rows are 0.",
      sol: "SELECT ROUND(AVG(NULLIF(delivery_feedback_rating, 0)), 2) FROM delivery;   -- 2.97\n-- The 3,274 zeros are exactly the cancelled deliveries." },
    { id: "a9", tool: "QA", track: "qa", t: "Join payments to orders correctly. How many payments are 'Success'?",
      task: ["Join on orders.payment_id = payments.paymentid.", "Count rows with paymentstatus = 'Success'.", "Check the join keeps all 10,000 orders."],
      type: "num", ans: 8980, tol: 0, unit: "payments", hint: "Joining payments.orderid ('ORD1000') to orders.orderid returns 0 rows.",
      sol: "SELECT COUNT(*) FROM orders o JOIN payments p ON p.paymentid = o.payment_id\nWHERE p.paymentstatus = 'Success';   -- 8,980 (89.80%)\n-- Alternative key: CAST(SUBSTR(p.orderid, 4) AS UNSIGNED) - 999 = o.orderid" },
    { id: "a10", tool: "Data Model", track: "model", t: "How many rows does Orders ⋈ Menu on Restaurant ID return?",
      task: ["Join orders to menu on restaurant_id.", "Count the rows.", "Explain why this join can't give 'top food categories by orders'."],
      type: "num", ans: 200199, tol: 0, unit: "rows", hint: "Each restaurant has about 20 menu items, and the join pairs every order with all of them.",
      sol: "SELECT COUNT(*) FROM orders o JOIN menu m ON m.restaurant_id = o.restaurant_id;   -- 200,199\nThere is no order-items table, so we don't know which dishes an order contained. Count menu items by category instead (Main Course 2,559 …) and list the missing table as a data gap." },
    { id: "a11", tool: "Data Quality", track: "model", t: "On how many orders is the discount larger than the order value?",
      task: ["Compare discount_applied with total_amount.", "Count rows where discount is bigger.", "Check what final_amount_paid shows on those rows."],
      type: "num", ans: 892, tol: 0, unit: "orders", hint: "Those orders pay ₹0; together with 6 orders where discount equals the bill, 898 orders pay nothing.",
      sol: "SELECT COUNT(*) FROM orders WHERE discount_applied > total_amount;   -- 892\nfinal_amount_paid is floored at 0 on these rows, which is why gross − discount (₹79,20,433) ≠ net revenue (₹80,38,789)." },
    { id: "a12", tool: "Business Analysis", track: "career", t: "Which CITY has the highest order cancellation rate?",
      task: ["Join orders to restaurant for Location.", "Cancellation % = Status 'Cancelled' ÷ orders, per city.", "Pick the highest, then write one recommendation."],
      type: "select", options: ["Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad"], ans: "Noida", hint: "It's also the city with the most revenue.",
      sol: "Noida (22.24% cancelled). Lowest: Faridabad (19.00%).\nRecommendation: Noida carries 21.6% of revenue, so each point of cancellation there costs the most. Break Noida cancellations down by restaurant and payment method before acting; the city spread is only about 3 points." },
  ];
}

/* ---------------- ANALYST THINKING LAB ---------------- */
const LAB = [
  { t: "\"Every customer is a repeat customer\"", scn: "A teammate's Power BI card shows Repeat Customers = 100%. They built it exactly as the KPI sheet says: customers with OrderID > 1. Marketing wants to cut the loyalty budget because 'everyone comes back anyway'.",
    opts: [["Approve the budget cut", "weak"], ["Check what the filter actually counts and rebuild it per customer", "best"], ["Refresh the dataset", "weak"], ["Compare with last quarter", "ok"]],
    exp: ["OrderID > 1 filters orders, not customers: every customer has some order with an ID above 1, so the result is always 100%.", "Count orders per customer: 2,641 of 6,329 customers ordered more than once = 41.73%.", "3,688 customers ordered exactly once. That is the loyalty opportunity, not a reason to cut the budget."] },
  { t: "Delivery efficiency shows 0%", scn: "The Delivery Efficiency card in the new dashboard reads 0%. The operations head asks whether every delivery failed last year.",
    opts: [["Tell ops there's a data outage", "weak"], ["List the distinct Delivery Status values and check the filter", "best"], ["Hide the card", "weak"], ["Rebuild the data source", "ok"]],
    exp: ["The KPI sheet filters Delivery Status = 'Delivered', but the column only holds On Time (3,388), Late (3,338) and Cancelled (3,274).", "On Time ÷ all deliveries = 33.88%; ÷ deliveries not cancelled = 50.37%.", "Fix the filter, show both denominators, and note the change in the KPI Library."] },
  { t: "\"Customers hate us: satisfaction is 2.0\"", scn: "The CSS card shows 2.00 out of 5. The CEO wants an urgent service-quality review across all cities.",
    opts: [["Start the review", "weak"], ["Check the rating distribution for 0s and what they mean", "best"], ["Switch to the restaurant master rating (3.72)", "weak"], ["Survey customers", "ok"]],
    exp: ["3,274 deliveries have feedback 0, and all of them are cancelled deliveries: 0 means 'not rated'.", "Excluding them, CSS = 2.97. Still mediocre, but not a collapse.", "Don't swap in the restaurant master rating (3.72) or the Ratings table (3.02): they are different sources measuring different things."] },
  { t: "Payments revenue doesn't match", scn: "A student joins Payments to Orders on OrderID and gets 0 rows. Another strips 'ORD' and gets 9,001 rows with revenue that 'looks fine'. Which one do you present?",
    opts: [["The 9,001-row version", "weak"], ["Check whether the joined rows are the same customer and amount", "best"], ["Drop Payments from the model", "weak"], ["Use a fuzzy match", "weak"]],
    exp: ["Stripping 'ORD' without subtracting 999 pairs each payment with the wrong order: 0 of the 9,001 rows share a customer.", "Join on Payment ID (or ORD number − 999): all 10,000 rows match on customer and amount.", "A join that returns rows is not the same as a join that is right. Always test it on a column both tables share."] },
  { t: "Top food categories by orders", scn: "The KPI sheet asks for top food categories. A student's chart shows Main Course with 51,202 orders, from a dataset of 10,000 orders.",
    opts: [["Present it with a footnote", "weak"], ["Explain the Orders-to-Menu explosion and report menu mix instead", "best"], ["Divide every bar by 20", "weak"], ["Drop the KPI silently", "ok"]],
    exp: ["Orders ⋈ Menu on Restaurant ID returns 200,199 rows: each order is paired with every dish its restaurant sells.", "There is no order-items table, so dish-level demand is unknown.", "Show menu items by category (Main Course 2,559, Dessert 2,549, Beverage 2,452, Starter 2,440) and list order-item data as the gap."] },
  { t: "Which cancellation rate goes in the deck?", scn: "Your Excel says 20.78% cancelled; a teammate's Tableau sheet says 1.05%. The presentation is tomorrow.",
    opts: [["Use the lower one", "weak"], ["Find which column each uses and pick one, with a reason", "best"], ["Average them", "weak"], ["Show both without comment", "ok"]],
    exp: ["Orders has two status columns: Status (2,078 cancelled) and Order Status (105 cancelled).", "They agree on only 16.64% of orders, so they can't both be the truth.", "Use Status (the KPI sheet's column), state it on the card, and log the conflict in the QA sheet."] },
  { t: "\"Bicycle riders are slowing us down\"", scn: "Fleet ops wants to replace bicycle agents with scooters because 'bicycles are always late'.",
    opts: [["Approve the switch", "weak"], ["Compare on-time % by vehicle and the size of the gap", "best"], ["Survey the riders", "ok"], ["Check rider ratings", "ok"]],
    exp: ["On-time %: Scooter 34.81%, Bike 33.62%, Bicycle 33.04%.", "A 1.8-point spread across 10,000 deliveries is too small to justify replacing a fleet.", "Look at the bigger levers: a third of deliveries are cancelled and another third are late across every vehicle type."] },
  { t: "Late deliveries aren't slower", scn: "You plot average delivery time by Delivery Status: On Time 37.30 mins, Late 37.14 mins. Your manager asks how a late order can be faster.",
    opts: [["Say late orders are faster", "weak"], ["Explain that the status and the minutes come from different sources and don't agree", "best"], ["Remove the chart", "ok"], ["Recalculate from timestamps", "weak"]],
    exp: ["Delivery Status lives in Delivery; Delivery Time (mins) lives in Orders. In this data they are not linked: every status averages about 37 minutes.", "Timestamps can't fix it: actual delivery is before pickup on 49.8% of deliveries.", "Report average delivery time (37.18 mins) and on-time % as separate KPIs and note the inconsistency."] },
  { t: "Peak order hours", scn: "The marketing team wants the 'Peak Order Hours' chart so they can time push notifications.",
    opts: [["Plot pickup hour and call it order hour", "weak"], ["Check whether Order Date has a time, and say what's possible", "best"], ["Assume lunch and dinner peaks", "weak"], ["Use the login audit times", "ok"]],
    exp: ["Order Date has no time of day, so the order hour is unknown.", "Pickup Time has hours, but every hour has about 400–440 pickups (16:00 is highest at 477), and pickup isn't when the customer ordered.", "Offer what the data supports (Saturday is the busiest weekday, 1,470 orders) and ask for order timestamps."] },
  { t: "Noida needs a cancellation task force", scn: "Noida has the highest cancellation rate (22.24%). The city manager wants to penalise Noida restaurants.",
    opts: [["Start penalties", "weak"], ["Compare the city spread and drill into restaurants and payment methods first", "best"], ["Ignore it", "weak"], ["Compare with Faridabad", "ok"]],
    exp: ["City cancellation rates run from 19.00% (Faridabad) to 22.24% (Noida): a 3-point spread.", "Noida is also the biggest city (21.6% of revenue), so the absolute loss is largest there, which is worth acting on.", "Drill to restaurant level, rank by rate with a minimum order count, and target the outliers instead of the whole city."] },
  { t: "Coupons drive our discounts?", scn: "Finance says coupons cost ₹25 lakh in discounts and wants to stop all coupons.",
    opts: [["Stop all coupons", "weak"], ["Check how much discount comes from coupon orders vs non-coupon orders", "best"], ["Cut coupon percentages", "ok"], ["Keep only FREESHIP", "weak"]],
    exp: ["Only 1,200 orders (12%) carry a coupon, yet 87.8% of all orders have a discount without one.", "So most of the ₹25,12,811 of discount is not coupon-driven: stopping coupons won't remove it.", "Also flag that 364 coupon orders (30.3%) fall outside the coupon's valid dates and the actual discount % doesn't match the coupon's stated %."] },
  { t: "Filtering restaurants by the city in their name", scn: "A city manager filters restaurants whose name contains 'Noida' and finds far fewer restaurants and much less revenue than your Noida dashboard shows.",
    opts: [["Use the name, it's what customers see", "weak"], ["Check what the name suffix actually holds and use the Location column", "best"], ["Clean all 500 names by hand", "ok"], ["Drop the restaurant name", "weak"]],
    exp: ["The suffix after ' - ' is the cuisine for 408 restaurants ('Biryani House - Mexican (3)') and the city for only 92, so 81.6% of names don't contain their own Location.", "Location and Cuisine Type are the governed attributes; the name is a display label.", "Group by RestaurantID, label with the name, and explain the naming pattern in the data dictionary."] },
];

/* ---------------- INTERVIEW QUESTIONS ---------------- */
const QA_CATS = ["Explain This Project", "SQL", "Power BI & DAX", "Tableau", "Data Modeling", "Food Delivery Domain", "Scenario-Based", "General & HR", "Rapid Fire"];
const QA = M_QA.slice();
// any category used in M_QA but missing above goes in before "Rapid Fire"
QA.forEach(q => { if (!QA_CATS.includes(q.cat)) QA_CATS.splice(QA_CATS.indexOf("Rapid Fire"), 0, q.cat); });
QA.push(
  { cat: "Explain This Project", q: "What was your most important insight?", a: "That two of the official KPI formulas were wrong, and fixing them changed the story. The KPI sheet's Repeat Customers formula (OrderID &gt; 1) returns 100%; counted per customer it's 41.73% (2,641 of 6,329). Its Delivery Efficiency formula filters a status that doesn't exist and returns 0; the real on-time rate is 33.88%. So the business message went from 'everyone comes back, nothing gets delivered' to 'six in ten customers order once, and a third of deliveries are cancelled': two clear, fixable problems.", signal: "Tests whether you validate given definitions instead of copying them." },
  { cat: "Explain This Project", q: "What would you improve with two more weeks?", a: "1) Ask for an order-items table so 'top food categories' can be measured by orders, not menu counts. 2) Get order timestamps so Peak Order Hours is possible. 3) Agree one status column with the business and retire the other. 4) A scheduled refresh with automated QA checks (orders = 10,000, payments reconcile to net revenue, no feedback 0s in CSS).", signal: "Shows product thinking and honesty about the data's limits." },
  { cat: "SQL", q: "How do you join Payments to Orders when Payments.OrderID is text like 'ORD1000'?", a: "Use the clean key: <code>JOIN payments p ON p.paymentid = o.payment_id</code> (10,000 of 10,000 match on customer and amount). If you must use the ORD text, strip the prefix and subtract the offset: <code>CAST(SUBSTR(p.orderid, 4) AS UNSIGNED) - 999 = o.orderid</code>. Stripping without the offset matches 9,001 rows, all to the wrong order (0 share a customer).", signal: "Tests join validation, not just join syntax." },
  { cat: "SQL", q: "Write the Repeat Customer % query.", a: "<code>WITH c AS (SELECT customer_id, COUNT(*) n FROM orders GROUP BY customer_id)<br>SELECT ROUND(SUM(n &gt; 1) * 100.0 / COUNT(*), 2) FROM c;</code> → 41.73%. The grain of the question is the customer, so group by customer first. Filtering OrderID &gt; 1 (the KPI sheet's version) gives 100%.", signal: "Tests matching the query grain to the business question." },
  { cat: "Power BI & DAX", q: "Write the Customer Satisfaction Score measure so the 0 ratings don't count.", a: "<code>CSS = CALCULATE(AVERAGE(Delivery[Delivery Feedback Rating]), Delivery[Delivery Feedback Rating] &gt; 0)</code> → 2.97. A plain AVERAGE gives 2.00 because 3,274 deliveries have 0, and all of them are cancelled deliveries, i.e. not rated. Or replace 0 with null in Power Query so every visual is safe.", signal: "Tests treating placeholder values as missing data." },
  { cat: "Tableau", q: "How would you flag repeat customers in Tableau?", a: "A FIXED LOD: <code>{ FIXED [Customer ID] : COUNTD([OrderID]) } &gt; 1</code>. Repeat Customer % = COUNTD of customers where the flag is true ÷ COUNTD([Customer ID]) = 41.73%. The LOD ignores the view's filters except context filters, so put date filters in context if repeat % should change with the period.", signal: "Tests LOD expressions and filter order." },
  { cat: "Data Modeling", q: "What is the grain of the Orders table, and which tables can join to it safely?", a: "One row per order (10,000). Delivery and Payments are 1:1 with orders (join on Order ID and Payment ID), Ratings is 0-or-1 per order (4,500 rated), and Customers, Restaurant and Coupons are dimensions. Menu is linked only to Restaurant, so joining it to Orders multiplies rows (200,199) and must never feed an order measure.", signal: "Tests grain and relationship cardinality." },
  { cat: "Food Delivery Domain", q: "What is the difference between gross revenue, net revenue and GMV in food delivery?", a: "GMV is the total value of orders placed on the platform. Gross revenue in this project = SUM(Total Amount) = ₹1,04,33,244. Net revenue = what customers paid after discounts = ₹80,38,789. A real platform's own revenue is smaller still (commission plus delivery fees), which this dataset doesn't contain, so say which one your card shows.", signal: "Domain vocabulary plus precision about definitions." },
  { cat: "Food Delivery Domain", q: "Which delivery KPIs matter most to a food-delivery operations team?", a: "On-time %, average delivery time, cancellation rate, and rider utilisation. In this project: 33.88% on time (50.37% excluding cancelled deliveries), 37.18 minutes average, 20.78% of orders cancelled, 1,000 active agents out of 10,000 in the master. I'd add rider-level orders per day and late-minutes if timestamps were reliable.", signal: "Tests linking KPIs to the people who act on them." },
  { cat: "Scenario-Based", q: "The KPI sheet says Delivery Efficiency = Delivered ÷ Total. Your card shows 0%. What do you do?", a: "List the distinct values of Delivery Status first: On Time 3,388, Late 3,338, Cancelled 3,274. 'Delivered' doesn't exist in this column, so the formula can only return 0. Rebuild it on 'On Time' (33.88%), show the excl.-cancelled version (50.37%) in the tooltip, and document the change so the KPI owner signs it off.", signal: "Tests checking data values before trusting a formula." },
  { cat: "Scenario-Based", q: "Gross revenue minus discount doesn't equal net revenue. Is the data broken?", a: "No. ₹1,04,33,244 − ₹25,12,811 = ₹79,20,433, but net is ₹80,38,789. On 892 orders the discount is bigger than the bill, and Final Amount Paid is floored at 0, so ₹1,18,356 of discount was never applied. The rule final = MAX(total − discount, 0) holds on every row. I'd show 'effective discount' next to the 'applied discount'.", signal: "Tests reconciling numbers instead of assuming an error." },
  { cat: "Scenario-Based", q: "Marketing wants the top food categories by orders. How do you respond?", a: "Explain that there is no order-items table: Menu links only to Restaurant. Joining Orders to Menu on Restaurant ID explodes 10,000 orders to 200,199 rows, so any 'orders by category' number is fake. I'd show the menu mix (Main Course 2,559 items, Dessert 2,549, Beverage 2,452, Starter 2,440) and ask for order-line data.", signal: "Tests saying no with an alternative." },
  { cat: "Scenario-Based", q: "Your Excel shows 6,329 customers, Power BI shows 10,000. Which is right?", a: "Both count something real. 10,000 is every registered account in Customers; 6,329 is distinct customers in Orders. For Total Customers, Revenue per Customer and Repeat %, the KPI is customers who ordered: 6,329. The 3,671 who never ordered are a separate activation metric.", signal: "Tests choosing the right denominator." },
  { cat: "Scenario-Based", q: "Only 45% of orders have a rating. Can you still report average rating?", a: "Yes, with the coverage next to it: 3.02 average from 4,500 rated orders (45.0%). Raters are self-selected, so I wouldn't compare cities on small samples, and I'd never mix this with the restaurant master's Average Rating (3.72), which is a different source.", signal: "Tests sample-size and source awareness." },
  { cat: "General & HR", q: "Tell me about a time you challenged a requirement.", a: "In my capstone the KPI sheet defined Repeat Customers as orders with OrderID &gt; 1. I showed the team it always returns 100%, proposed customers with more than one order (41.73%), and got the trainer to agree before we built the dashboard. I kept the original formula in the QA log so the change was traceable.", signal: "Behavioural; shows respectful challenge with evidence." },
  { cat: "Rapid Fire", q: "What is the Average Order Value?", a: "₹1,043.32 (₹1,04,33,244 ÷ 10,000 orders). Net AOV after discounts is ₹803.88.", signal: "Quick recall check." },
  { cat: "Rapid Fire", q: "How many delivery agents are active?", a: "1,000 (agent IDs 1–1000 appear in Delivery), out of 10,000 in the DeliveryAgent master.", signal: "Quick recall check." },
);

const GLOSSARY = M_GLOSSARY.concat([
  { t: "AOV (Average Order Value)", d: "Total revenue ÷ total orders. ₹1,043.32 in this project (₹803.88 on net revenue)." },
  { t: "Gross vs net revenue", d: "Gross = SUM(Total Amount) = ₹1,04,33,244. Net = SUM(Final Amount Paid) = ₹80,38,789, after discounts." },
  { t: "Repeat Customer %", d: "Customers with more than one order ÷ customers who ordered. 41.73% (2,641 of 6,329)." },
  { t: "On-Time Delivery %", d: "Deliveries with status 'On Time' ÷ all deliveries = 33.88% (50.37% if cancelled deliveries are excluded)." },
  { t: "Customer Satisfaction Score (CSS)", d: "Average Delivery Feedback Rating excluding the 0s (not rated) = 2.97 out of 5." },
  { t: "Customer Lifetime Value (CLV)", d: "Here: AOV × repeat rate × orders per customer = ₹687.89, as the KPI sheet defines it. Real CLV models also use margin and retention over time." },
  { t: "ORD offset", d: "Payments and Ratings store order IDs as text 'ORDn' where n − 999 = Orders.OrderID. Join on Payment ID or subtract 999." },
  { t: "Row explosion (fan-out)", d: "A join on a non-unique key that multiplies rows, e.g. Orders ⋈ Menu on Restaurant ID: 10,000 orders become 200,199 rows." },
  { t: "Placeholder value", d: "A value that means 'missing', like Delivery Feedback Rating = 0. Convert to NULL before averaging." },
  { t: "Rating coverage", d: "Share of orders that have a rating: 4,500 ÷ 10,000 = 45%. Always show it next to an average rating." },
  { t: "GMV (Gross Merchandise Value)", d: "Total value of orders placed on a marketplace before discounts, refunds and commissions." },
  { t: "Active delivery agent", d: "An agent who appears on at least one delivery: 1,000 of the 10,000 in the master." },
  { t: "Minimum-volume threshold", d: "A rule like 'only restaurants with 20+ orders' before ranking by a rate, so tiny samples can't top the list by chance." },
]);

const TIPS = M_TIPS.concat([
  { n: "09", h: "Test the KPI sheet before you build it", p: "Two official formulas here return 100% and 0%. Saying \"I checked the definitions against the data first\" is one of the strongest things you can say in an interview." },
]);
const TIP_CALLOUT = M_TIP_CALLOUT;
const WEAK_STRONG = [
  { q: "How did you calculate Repeat Customer %?", weak: "I used the formula from the KPI sheet: customers with OrderID greater than 1.", strong: "I counted orders per customer and took customers with more than one order: 2,641 of 6,329, so 41.73%. The KPI sheet's OrderID > 1 filter returns 100% because it filters orders, not customers, so I documented the change and got it signed off." },
  { q: "What's your customer satisfaction score?", weak: "It's 2.0 out of 5.", strong: "2.97 out of 5 from delivery feedback. 3,274 deliveries have a 0, and they're exactly the cancelled deliveries, so 0 means 'not rated' and I excluded them. Keeping them gives 2.00. The Ratings table (3.02, 45% coverage) and the restaurant master (3.72) are separate sources, so I don't mix them." },
  { q: "How did you join payments to orders?", weak: "On OrderID, after removing the 'ORD' prefix.", strong: "On Payment ID, which matches all 10,000 orders on customer and amount. Payments.OrderID is 'ORDn' with an offset: ORD1000 is order 1. Just removing the prefix matches 9,001 rows to the wrong order, which I proved by checking that none of them share a customer." },
];

/* ---------------- 90-SEC PITCH ---------------- */
const PITCH_FLOW = [
  { t: "Business Problem", d: "Orders, deliveries, payments and ratings in separate sheets; no shared view of sales, delivery or customer loyalty.", s: "~10 s", key: ["problem", "separate", "silo", "visibility"] },
  { t: "Data Sources", d: "12 tables: 10,000 orders, 6,329 customers who ordered, 500 restaurants, 1,000 active agents, Mar 2024 – Mar 2025.", s: "~10 s", key: ["12 tables", "10,000", "10000", "orders"] },
  { t: "Data Cleaning", d: "ORD-offset join, two status columns, feedback 0s, discount above bill, menu explosion.", s: "~10 s", key: ["offset", "status", "clean", "quality"] },
  { t: "Data Model", d: "Orders as the hub fact; Delivery 1:1, Payments on Payment ID, Customers, Restaurant, Menu, Ratings around it.", s: "~10 s", key: ["model", "hub", "fact", "relationship"] },
  { t: "KPIs", d: "15 KPIs: revenue, AOV, repeat %, on-time %, cancellation %, CSS, CLV…", s: "~10 s", key: ["kpi", "aov", "repeat", "on-time"] },
  { t: "Dashboard", d: "Excel, Tableau and Power BI dashboards, reconciled to SQL.", s: "~10 s", key: ["dashboard", "power bi", "tableau", "excel"] },
  { t: "Insights", d: "41.73% repeat, 33.88% on time, 20.78% cancelled; two KPI-sheet formulas were wrong.", s: "~15 s", key: ["insight", "41.73", "33.88", "20.78"] },
  { t: "Business Impact", d: "Second-order campaign, cancellation drill-down by restaurant, order-items data request.", s: "~15 s", key: ["recommend", "impact", "campaign", "cancel"] },
];
const ELEVATOR_PITCH = `I analysed a year of Swiggy-style food-delivery data, from March 2024 to March 2025, as my Data Analyst capstone: 12 tables covering 10,000 orders, 6,329 customers who ordered, 500 restaurants in five NCR cities and 1,000 active delivery agents. Orders were the hub, with deliveries, payments, ratings, customers and restaurants around them. Before building anything I tested the KPI sheet against the data. Two formulas were wrong: Repeat Customers returned 100% and Delivery Efficiency returned 0. The real figures are 41.73% and 33.88%. I also found that payments and ratings carry an order-ID offset of 999, the two order-status columns agree on only one order in six, and feedback 0 means 'not rated'. I built the 15 KPIs in Excel, MySQL, Tableau and Power BI and reconciled them: revenue ₹1.04 crore, AOV ₹1,043, customer satisfaction 2.97, 37-minute average delivery, 20.78% cancellations. My recommendations: a second-order campaign, because six in ten customers order only once; a restaurant-level drill-down on cancellations, starting with Noida; and an order-items table so food categories can be measured properly.`;
const PROJECT_FAQ = M_PROJECT_FAQ;

/* ---------------- CAREER ---------------- */
const RESUME_PROJECT = {
  title: "Food Delivery Sales & Operations Analytics — Swiggy Data Analytics Capstone",
  tools: "Tools: SQL (MySQL) | Excel | Tableau | Power BI | DAX",
  bullets: [
    "Analysed a 12-table food-delivery dataset (10,000 orders, 6,329 ordering customers, 500 restaurants, 1,000 active delivery agents) covering Mar 2024 – Mar 2025",
    "Modelled Orders as the hub fact with Delivery, Payments, Ratings, Customers, Restaurant and Menu, fixing an order-ID offset of 999 in Payments and Ratings",
    "Built 15 KPIs including revenue (₹1.04 crore), AOV (₹1,043.32), repeat customer %, on-time delivery %, cancellation rate, CSS and CLV",
    "Corrected two KPI-sheet formulas that returned 100% (repeat customers) and 0% (delivery efficiency); real values 41.73% and 33.88%",
    "Developed Sales, Customer, Delivery and Restaurant dashboards in Excel, Tableau and Power BI, reconciled to SQL",
    "Recommended a second-order campaign, a restaurant-level cancellation review and an order-items data request",
  ],
};
const RESUME_BULLETS = [
  "Built Sales, Delivery and Customer dashboards in Excel, Tableau and Power BI over 10,000 food-delivery orders, reconciling 15 KPIs (₹1.04 crore revenue, AOV ₹1,043.32) to SQL.",
  "Found that two official KPI formulas returned 100% and 0%; rebuilt them per customer and on the correct status value, giving 41.73% repeat customers and 33.88% on-time delivery.",
  "Detected an order-ID offset of 999 between Orders and Payments/Ratings that silently matched 9,001 payments to the wrong order, and re-keyed the model on Payment ID.",
];
const LINKEDIN_POST = "Just wrapped up my Swiggy Data Analytics capstone 🛵\n\nThe problem: orders, deliveries, payments and ratings sat in separate sheets, so nobody had one view of sales, delivery performance or loyalty.\n\nWhat I built:\n📊 A 12-table model with Orders as the hub (10,000 orders, 6,329 customers, 500 restaurants)\n🧮 15 KPIs: revenue, AOV, repeat %, on-time %, cancellation %, CSS, CLV\n📈 Dashboards in Excel, Tableau and Power BI, reconciled with SQL\n\nBiggest lesson: test the KPI definitions before you build them. Two official formulas returned 100% and 0%. The real numbers were 41.73% repeat customers and 33.88% on-time delivery.\n\nThanks to Mahendra Singh for the guidance!\n\n#DataAnalytics #DataAnalyst #PowerBI #Tableau #SQL #Excel";
const PORTFOLIO = [
  { n: "01", h: "Publish to Tableau Public", p: "Upload the .twbx with a clear title, a one-line description, KPI definitions in tooltips, and the note that the data is synthetic practice data." },
  { n: "02", h: "Record a 2-minute walkthrough", p: "Screen-record the dashboards while giving your 90-second pitch. Post it on LinkedIn." },
  { n: "03", h: "GitHub repo", p: "SQL scripts (schema, load, KPIs, QA), the data dictionary, KPI definitions and screenshots, with a clear README. No raw data files." },
  { n: "04", h: "Write a Medium post", p: "\"The KPI formula that always returns 100%\" or \"The ORD-offset join that matched the wrong orders\" make great short write-ups." },
  { n: "05", h: "Add it to LinkedIn Featured", p: "Pin the Tableau Public link and the walkthrough video." },
  { n: "06", h: "Prepare the deck", p: "10–12 slides: problem, data, model, KPIs, dashboard screenshots, 3 insights, 3 recommendations, QA approach and data gaps." },
];

/* ---------------- LEARN MORE ---------------- */
const LEARNING_LINKS = [
  { title: "90-Day AI Learning", desc: "After this project, start your AI journey: a 90-day, week-by-week AI engineer learning plan with a project every week.", url: "https://90daysailearning.vercel.app/", source: "AI Learning" },
  { title: "Data Analyst Roadmap (roadmap.sh)", desc: "A step-by-step visual roadmap of every skill a data analyst needs, from Excel and SQL to statistics and BI tools. Use it to plan what to learn after this project.", url: "https://roadmap.sh/data-analyst", source: "roadmap.sh" },
].concat(M_LEARNING_LINKS);

/* ---------------- CHAT config ---------------- */
const SYNONYMS = {
  "revenue": ["total amount", "sales", "gmv"], "sales": ["revenue", "total amount"], "aov": ["average order value"], "net": ["final amount paid", "discount"],
  "repeat": ["repeat customer", "loyalty", "retention"], "loyalty": ["repeat", "membership"], "retention": ["repeat"], "customers": ["6,329", "customer"],
  "ontime": ["on time", "delivery efficiency"], "delivery": ["on time", "late", "delivery status"], "late": ["on time", "delivery status"],
  "cancel": ["cancellation", "cancelled", "status"], "cancellation": ["cancelled", "status"], "css": ["satisfaction", "feedback"], "satisfaction": ["css", "feedback", "rating"],
  "rating": ["ratings", "feedback", "review"], "clv": ["lifetime value"], "ltv": ["clv", "lifetime value"], "agents": ["delivery agent", "rider"], "rider": ["delivery agent"],
  "payment": ["payments", "payment id"], "ord": ["offset", "payment id"], "offset": ["ord", "999"], "menu": ["category", "explosion"], "category": ["menu"],
  "coupon": ["coupons", "discount"], "discount": ["coupon", "final amount paid"], "peak": ["hour", "pickup"],
  "dax": ["measure", "power bi"], "sql": ["query", "select"], "join": ["relationship", "grain"], "trap": ["gotcha", "mistake"], "mistake": ["gotcha", "trap"],
};
const INTENT_RULES = [
  { re: /repeat|100\s*%/i, title: "Write the Repeat Customer % query." },
  { re: /\bord\b|offset|payments? join|join payments/i, title: "How do you join Payments to Orders when Payments.OrderID is text like 'ORD1000'?" },
  { re: /delivery efficiency|delivered.*0|on.?time.*0/i, title: "The KPI sheet says Delivery Efficiency = Delivered ÷ Total. Your card shows 0%. What do you do?" },
  { re: /\bcss\b|satisfaction|feedback 0|zero rating/i, title: "Write the Customer Satisfaction Score measure so the 0 ratings don't count." },
  { re: /food categor|menu|explosion|200,?199/i, title: "Marketing wants the top food categories by orders. How do you respond?" },
  { re: /net revenue|discount.*(bill|total)|gross.*net/i, title: "Gross revenue minus discount doesn't equal net revenue. Is the data broken?" },
  { re: /6,?329|10,?000 customers|total customers/i, title: "Your Excel shows 6,329 customers, Power BI shows 10,000. Which is right?" },
  { re: /\bclv\b|lifetime/i, title: "Customer Lifetime Value (CLV)" },
  { re: /\baov\b|average order value/i, title: "What is the Average Order Value?" },
];
const CHAT_POPULAR = ["Why is Repeat % 100%?", "How do I join Payments to Orders?", "Why does Delivery Efficiency show 0?", "CSS formula", "Top food categories?", "Give me a scenario question"];
const QUICK_REPLY_POOL = ["Why is Repeat % 100%?", "How do I join Payments to Orders?", "Why does Delivery Efficiency show 0?", "CSS formula", "Top food categories?", "What is AOV?",
  "Gross vs net revenue", "6,329 or 10,000 customers?", "What is CLV?", "Give me a scenario question"];

/* ============================================================
   Food-delivery / e-commerce analytics interview questions +
   common food-delivery dashboard types. Answers are written for
   students with examples from this project's Swiggy dataset.
   Reference links are general documentation pages.
   ============================================================ */
const SRC = {
  divide: ["Microsoft Learn: DIVIDE function (DAX)", "https://learn.microsoft.com/en-us/dax/divide-function-dax"],
  star: ["Microsoft Learn: Understand star schema and the importance for Power BI", "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"],
  lod: ["Tableau Help: Create Level of Detail Expressions in Tableau", "https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_lod.htm"],
  win: ["MySQL Reference Manual: Window Functions", "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"],
  clv: ["Wikipedia: Customer lifetime value", "https://en.wikipedia.org/wiki/Customer_lifetime_value"],
  cohort: ["Wikipedia: Cohort analysis", "https://en.wikipedia.org/wiki/Cohort_analysis"],
  churn: ["Wikipedia: Churn rate", "https://en.wikipedia.org/wiki/Churn_rate"],
  ab: ["Wikipedia: A/B testing", "https://en.wikipedia.org/wiki/A/B_testing"],
  simpson: ["Wikipedia: Simpson's paradox", "https://en.wikipedia.org/wiki/Simpson%27s_paradox"],
  star_method: ["Wikipedia: Situation, task, action, result (STAR method)", "https://en.wikipedia.org/wiki/Situation,_task,_action,_result"],
};
const WEB_QA_CATS = ["Food Delivery & E-commerce KPIs", "Customer & Retention Analytics", "Delivery & Operations Analytics", "Marketplace Data & BI", "Behavioral (Data Analyst)"];
const WEB_QA = [
  // ---------- Food Delivery & E-commerce KPIs ----------
  { cat: "Food Delivery & E-commerce KPIs", q: "What KPIs would you track for a food-delivery business?", a: "Group them by the question each answers. Demand: orders, GMV / revenue, AOV. Customers: active customers, repeat %, CLV. Delivery: on-time %, average delivery time, cancellation rate. Experience: rating, CSS, complaint themes. Money: discount % of gross, payment success. Then say which ones your data supports: in this project all 15 KPI-sheet measures are computable except Peak Order Hours (no order time) and Top Food Categories by orders (no order-items table).", signal: "Tests organising KPIs by business question and knowing the data's limits." },
  { cat: "Food Delivery & E-commerce KPIs", q: "How do you calculate Average Order Value, and what can distort it?", a: "AOV = revenue ÷ orders. Here ₹1,04,33,244 ÷ 10,000 = ₹1,043.32 on gross, ₹803.88 on what customers paid. Distortions: mixing gross and net, including cancelled orders (2,078 cancelled orders still carry ₹21,55,604 of Total Amount here), and averaging per-restaurant AOVs instead of dividing totals. Always state which revenue and which orders.", signal: "Tests definition precision." },
  { cat: "Food Delivery & E-commerce KPIs", s: "divide", q: "Why should rate KPIs be a ratio of sums, not an average of ratios?", a: "An average of per-city or per-restaurant percentages gives a restaurant with 9 orders the same weight as one with 32. Compute SUM(numerator) ÷ SUM(denominator) at whatever level the visual shows. In DAX use DIVIDE([Cancelled Orders], [Total Orders]) so it also handles a zero denominator safely.", signal: "The classic average-of-ratios trap." },
  { cat: "Food Delivery & E-commerce KPIs", q: "Gross revenue, net revenue, GMV and platform revenue: what's the difference?", a: "GMV = value of all orders placed. Gross revenue in this dataset = SUM(Total Amount) = ₹1,04,33,244. Net = SUM(Final Amount Paid) = ₹80,38,789 after ₹25,12,811 of discounts. Platform revenue (commission + delivery fee − incentives) needs commission data this dataset doesn't have. Label every revenue card with which one it is.", signal: "Tests business vocabulary." },
  { cat: "Food Delivery & E-commerce KPIs", q: "How would you measure whether discounts are worth it?", a: "Compare like with like: AOV, repeat rate and margin for discounted vs non-discounted orders, ideally with a holdout group. Here it's hard: 9,980 of 10,000 orders have some discount, coupon orders (1,200) have an AOV of ₹1,048.21 vs ₹1,042.66 without, and 30.3% of coupon orders fall outside the coupon's valid dates. I'd say the data can't prove discount ROI and suggest a controlled test.", signal: "Tests causal caution." },
  { cat: "Food Delivery & E-commerce KPIs", q: "What is Customer Lifetime Value and how would you calculate it?", s: "clv", a: "The value a customer brings over the relationship. A simple version: AOV × purchase frequency × expected lifetime, ideally on margin. This project's KPI sheet uses AOV × repeat rate × orders per customer = ₹1,043.32 × 0.4173 × 1.58 = ₹687.89. Revenue per customer (₹1,648.48) is a simpler, observed number. Say which formula you used.", signal: "Tests knowing that CLV has several definitions." },
  { cat: "Food Delivery & E-commerce KPIs", q: "Which KPI would you put first on an executive dashboard for a food-delivery platform?", a: "Orders and revenue for scale, then the two health signals that cost the most: cancellation rate (20.78% here) and repeat customer % (41.73%). Six cards maximum, each with its comparison period, and a link to the definition.", signal: "Tests prioritisation." },

  // ---------- Customer & Retention Analytics ----------
  { cat: "Customer & Retention Analytics", q: "How do you define a repeat customer?", a: "A customer with more than one order in the period. Group by customer first: 2,641 of 6,329 ordering customers = 41.73%. Common mistakes: filtering order IDs (this project's KPI sheet does OrderID &gt; 1 and gets 100%) or dividing by all 10,000 registered customers.", signal: "Tests grain thinking." },
  { cat: "Customer & Retention Analytics", s: "cohort", q: "What is cohort analysis and how would you apply it here?", a: "Group customers by the month of their first order and track how many order again. In this data the April 2024 cohort (795 new customers) has 64.3% repeat, while the February 2025 cohort has 8.5%. That gap is mostly time: later cohorts have had fewer months to reorder. So compare cohorts at the same age (e.g. reorder within 60 days), not on the overall flag.", signal: "Tests cohort logic and right-censoring." },
  { cat: "Customer & Retention Analytics", s: "churn", q: "How would you define churn for a food-delivery app?", a: "There's no contract, so churn is inactivity: no order in N days, where N comes from the data. Here the average gap between a customer's first and second order is 112.6 days, so a 30-day rule would call most customers churned. I'd pick N from the gap distribution and validate it with the business.", signal: "Tests choosing a definition from data." },
  { cat: "Customer & Retention Analytics", q: "Do premium members spend more?", a: "Check per customer, not totals. Platinum members bring the most revenue (₹35,62,163) only because there are more of them; revenue per customer is flat: Gold ₹1,655.61, Regular ₹1,651.76, Platinum ₹1,638.53. In this data membership tier doesn't change spend, which is itself an insight for the loyalty team.", signal: "Tests normalising before comparing." },
  { cat: "Customer & Retention Analytics", q: "Registered customers vs active customers: which do you report?", a: "Both, clearly labelled. 10,000 are registered; 6,329 placed an order. KPIs like revenue per customer and repeat % use the 6,329. The 3,671 who never ordered are an activation opportunity, a different funnel.", signal: "Tests denominator choice." },
  { cat: "Customer & Retention Analytics", q: "How would you segment customers for a marketing campaign?", a: "Start with behaviour: one-time (3,688), two orders (1,825), three or more (816). Add recency and value (an RFM view). The biggest, cheapest win is usually the one-time group: a second-order offer. Demographic columns like gender or veg preference show almost no difference in this data, so they're weak segments.", signal: "Tests turning analysis into action." },
  { cat: "Customer & Retention Analytics", s: "ab", q: "How would you test whether a second-order coupon works?", a: "Randomly split one-time customers into a test group (gets the coupon) and a control group (doesn't), fix the success metric up front (second order within 30 days), run long enough for a meaningful sample, and compare. Without a control you can't separate the coupon's effect from customers who'd have ordered anyway.", signal: "Tests experiment design basics." },

  // ---------- Delivery & Operations Analytics ----------
  { cat: "Delivery & Operations Analytics", q: "How do you measure on-time delivery?", a: "On-time deliveries ÷ deliveries, with the denominator stated. Here: 3,388 ÷ 10,000 = 33.88%, or 3,388 ÷ 6,726 completed deliveries = 50.37%. The KPI sheet's version filters 'Delivered', a status that doesn't exist in this column, and returns 0, so always list the column's distinct values first.", signal: "Tests denominators and checking values." },
  { cat: "Delivery & Operations Analytics", q: "Why might average delivery time be misleading?", a: "Averages hide the tail: a 37-minute average can include many 55-minute orders. Show the distribution or the share over a threshold. Also check the source: here timestamps put actual delivery before pickup on 49.8% of deliveries, so we use Orders[Delivery Time (mins)] (15–59 mins, average 37.18), and it doesn't differ between On Time (37.30) and Late (37.14) deliveries, so the two fields don't agree.", signal: "Tests distribution thinking and source checking." },
  { cat: "Delivery & Operations Analytics", q: "How would you analyse delivery partner (rider) performance?", a: "Per rider: deliveries, on-time %, cancellation %, rating, with a minimum-volume rule before ranking. Here 1,000 agents do all 10,000 deliveries (about 10 each, max 23), so samples per rider are small; compare vehicle groups first (Scooter 34.81% on time, Bike 33.62%, Bicycle 33.04%) and treat rider-level ranks as coaching input.", signal: "Tests fairness and sample size." },
  { cat: "Delivery & Operations Analytics", q: "Cancellations went up. How do you find the cause?", a: "Split the rate by every available dimension and look for where it concentrates: city (Noida 22.24% vs Faridabad 19.00%), restaurant, payment method (UPI 21.55% vs Credit Card 19.98%), source (App 20.65%, Web 20.91%), time. If every split sits near the overall 20.78%, the cause isn't in these columns and you need reason codes.", signal: "Tests structured root-cause analysis." },
  { cat: "Delivery & Operations Analytics", q: "What would you need to calculate peak order hours?", a: "An order timestamp. In this dataset Order Date is a date only, so the honest answer is 'not computable'. Pickup Time has hours but is flat (about 400–440 pickups per hour) and isn't when the customer ordered. What we can show is the weekday pattern: Saturday 1,470 orders, Monday 1,374.", signal: "Tests saying what data can't do." },
  { cat: "Delivery & Operations Analytics", s: "simpson", q: "Can a city look better overall but worse in every segment?", a: "Yes, that's Simpson's paradox: if one city has a bigger share of an easy segment, its overall rate can beat a city that's better in every segment. Before comparing cities on on-time % or cancellations, check the mix (cuisine, restaurant, vehicle) behind each rate.", signal: "Tests awareness of mix effects." },
  { cat: "Delivery & Operations Analytics", q: "Order status says 'Delivered' but delivery status says 'Cancelled'. What do you do?", a: "Quantify it first: 656 orders here are Delivered in Orders.Status and Cancelled in Delivery. Then pick a system of record per KPI (Orders.Status for cancellation rate, Delivery Status for on-time %), document the rule, and raise the conflict with the data owner instead of silently 'fixing' rows.", signal: "Tests data governance habits." },

  // ---------- Marketplace Data & BI ----------
  { cat: "Marketplace Data & BI", s: "star", q: "How would you model a food-delivery dataset for Power BI?", a: "Orders as the central fact (one row per order), with Customers, Restaurant, a Date table and Coupons as dimensions. Delivery and Payments are 1:1 with orders, so they can join on Order ID and Payment ID. Ratings are optional per order (4,500 of 10,000). Menu links only to Restaurant, so it must not filter order measures, or you get a fan-out.", signal: "Tests star-schema design and grain." },
  { cat: "Marketplace Data & BI", q: "What is a fan-out and how do you spot it?", a: "A join on a non-unique key that multiplies rows. Orders ⋈ Menu on Restaurant ID turns 10,000 orders into 200,199 rows, so SUM(revenue) explodes. Spot it by comparing row counts and a control total (revenue) before and after every join.", signal: "Tests join validation." },
  { cat: "Marketplace Data & BI", q: "Two tables store the order ID differently. How do you join them?", a: "Find a reliable key first. Payments here stores 'ORD1000' for order 1. Orders has Payment ID, which matches Payments.PaymentID on all 10,000 rows, so use that. If you must use the text ID, strip the prefix and subtract the offset (999), then prove it by checking customer and amount match.", signal: "Tests key design." },
  { cat: "Marketplace Data & BI", s: "lod", q: "When would you use a Tableau LOD expression in this kind of project?", a: "Whenever the KPI's grain differs from the view's. Repeat flag: { FIXED [Customer ID] : COUNTD([OrderID]) } &gt; 1. First-order month for cohorts: { FIXED [Customer ID] : MIN([Order Date]) }. Remember FIXED ignores normal dimension filters, so put period filters in context if they should apply.", signal: "Tests LOD use cases and filter order." },
  { cat: "Marketplace Data & BI", s: "win", q: "How would you rank restaurants within each city in SQL?", a: "<code>RANK() OVER (PARTITION BY r.location ORDER BY SUM(o.total_amount) DESC)</code> inside a grouped query, then filter rank ≤ 5 in an outer query. Group by RestaurantID, not name, and add a minimum order count before ranking by any rate.", signal: "Tests window functions." },
  { cat: "Marketplace Data & BI", q: "How do you handle placeholder values like a rating of 0?", a: "Check what they mean before treating them as data. Here every Delivery Feedback Rating of 0 (3,274) belongs to a cancelled delivery, so 0 means 'not rated'. Convert to NULL in Power Query or use NULLIF in SQL: CSS becomes 2.97 instead of 2.00.", signal: "Tests data-cleaning judgement." },
  { cat: "Marketplace Data & BI", q: "How would you reconcile a dashboard with SQL?", a: "Pick control totals (orders 10,000, revenue ₹1,04,33,244, customers 6,329, on-time 33.88%, CSS 2.97) and compare each tool to the SQL answer key at the same filters. If they differ, check relationships, filter direction, blanks and placeholder values in that order.", signal: "Tests QA discipline." },

  // ---------- Behavioral (Data Analyst) ----------
  { cat: "Behavioral (Data Analyst)", s: "star_method", q: "Tell me about a time you found an error in requirements.", a: "Use STAR. Situation: the KPI sheet for our capstone. Task: build 15 KPIs. Action: I tested each formula on the data first and found Repeat Customers returned 100% and Delivery Efficiency returned 0; I proposed corrected definitions with the numbers. Result: the trainer approved 41.73% and 33.88%, and the change was logged.", signal: "Behavioural; evidence-based challenge." },
  { cat: "Behavioral (Data Analyst)", q: "How do you explain a data limitation to a non-technical stakeholder?", a: "Lead with what they can still decide. 'We can't see which dishes were in each order, so I can't rank food categories by sales. What I can show is the menu mix, and if we get order-line data next month, this chart becomes possible.' Short, honest, with a next step.", signal: "Tests communication." },
  { cat: "Behavioral (Data Analyst)", q: "Your manager wants a number today, but you haven't validated it. What do you do?", a: "Give it with a clear label and a time for the checked version: 'Provisional: 20.78% cancellation from Orders.Status; Order Status gives 1.05%, I'm confirming which the business uses and will update by 3 pm.' Never present an unchecked number as final.", signal: "Tests integrity under pressure." },
  { cat: "Behavioral (Data Analyst)", q: "Describe working in a team on a project with weekly presentations.", a: "Our batch presented every week (Excel, then Tableau, then Power BI, then the final). We split KPIs by owner, kept one shared answer key so every tool showed the same numbers, and reviewed each other's measures before each presentation. Say honestly that it was a capstone and what you personally built.", signal: "Behavioural; ownership and honesty." },
  { cat: "Behavioral (Data Analyst)", q: "Tell me about a time your analysis changed a recommendation.", a: "In the capstone, the first draft recommended a city-wide cancellation drive for Noida. After comparing all five cities (19.00% to 22.24%) the spread was small, so the recommendation became a restaurant-level drill-down inside Noida, the city with the most revenue at stake.", signal: "Tests whether you follow evidence." },
];
WEB_QA.forEach(x => { x.src = SRC[x.s]; });
QA_CATS.push(...WEB_QA_CATS);
QA.push(...WEB_QA);
const QA_REFERENCES = Object.values(SRC);

/* ---------------- Sample dashboards (no reference image shipped yet) ---------------- */
const SAMPLE_IMAGE_DASHBOARDS = [];

/* ---------------- 12 common food-delivery dashboards ---------------- */
const VIDI_DASHBOARDS = [
  { name: "Executive Business Summary", tool: "Power BI / Tableau", tag: "One page that tells leadership how the business is doing",
    context: "Replaces separate weekly exports from sales, operations and customer teams.",
    what: "Headline orders, revenue, customers, delivery and satisfaction for the selected period, with change vs the previous period.",
    question: "Are we growing, are customers coming back, and are we delivering?",
    who: "Business head, city heads, leadership",
    kpis: ["Total orders", "Total revenue", "AOV", "Repeat customer %", "On-time %", "Cancellation %"],
    visuals: ["KPI cards with vs-last-period arrows", "Monthly orders and revenue line", "Revenue by city bar", "Delivery status donut"],
    filters: "Date, city, cuisine, order source",
    build: ["Orders as the fact; Restaurant for city and cuisine; Delivery for status", "Date table built from Order Date", "Max 6 cards + 4 visuals on one page"],
    proxima: "10,000 orders, ₹1,04,33,244 revenue, AOV ₹1,043.32, 41.73% repeat, 33.88% on time, 20.78% cancelled.", page: "01 Sales & Revenue Overview" },
  { name: "Sales & Revenue Trend", tool: "Power BI", tag: "How much did we sell, when and where?",
    context: "Used by finance and city teams to track revenue against targets.",
    what: "Gross and net revenue, discount and AOV by month, city, cuisine and order source.",
    question: "Which months, cities and cuisines drive revenue, and how much do discounts take away?",
    who: "Finance, city managers, category managers",
    kpis: ["Gross revenue", "Net revenue", "Discount % of gross", "AOV", "Revenue by city / cuisine"],
    visuals: ["Monthly revenue line with partial months flagged", "Gross → discount → net waterfall", "Revenue by city and cuisine bars"],
    filters: "Month, city, cuisine, order source, payment method",
    build: ["Gross = SUM(Orders[Total Amount]); Net = SUM(Orders[Final Amount Paid])", "Location and Cuisine Type from Restaurant", "Note that the waterfall won't close: ₹1,18,356 of discount exceeded the bill and was floored at 0"],
    proxima: "Oct 2024 is the peak month (873 orders, ₹9,28,629); Noida brings 21.6% of revenue; discounts are 24.08% of gross.", page: "01 Sales & Revenue Overview" },
  { name: "Order Funnel & Cancellations", tool: "Power BI / Tableau", tag: "Where do orders fail?",
    context: "Operations and product teams use it to cut cancellations, the most expensive failure in food delivery.",
    what: "Order status mix, cancellation rate over time and by city, restaurant, payment method and source.",
    question: "How many orders are cancelled, and where is it concentrated?",
    who: "Operations head, restaurant partnerships, product",
    kpis: ["Cancellation %", "Cancelled orders", "Revenue at risk", "Cancellation % by city / restaurant"],
    visuals: ["Status funnel or stacked bar", "Cancellation % by city with overall reference line", "Top restaurants by cancellation rate (min. order count)"],
    filters: "Date, city, restaurant, payment method, source",
    build: ["Use Orders.Status (the KPI sheet's column) and label it", "Show the Status × Order Status matrix once, in a QA tooltip", "Real reason codes would be needed for a true funnel"],
    proxima: "2,078 cancelled orders (20.78%), ₹21,55,604 of order value; Noida 22.24% vs Faridabad 19.00%.", page: "03 Delivery & Operations" },
  { name: "Delivery Performance (SLA)", tool: "Tableau", tag: "Are we on time?",
    context: "The core operations view in any delivery business, reviewed daily.",
    what: "On-time, late and cancelled deliveries, average delivery time and its distribution, by city and time.",
    question: "What share of deliveries meet the promise, and where do they miss it?",
    who: "Operations head, city ops managers",
    kpis: ["On-time %", "Late %", "Delivery cancelled %", "Avg delivery time", "Share over threshold"],
    visuals: ["Delivery status donut", "Histogram of delivery minutes", "On-time % by city", "Parameter to switch denominator (all vs completed)"],
    filters: "Date, city, vehicle type",
    build: ["On-Time % from Delivery[Delivery Status] = 'On Time'", "Delivery minutes from Orders[Delivery Time (mins)]; timestamps are unreliable", "Restaurant estimated time from Restaurant for promise vs actual"],
    proxima: "33.88% on time (50.37% excl. cancelled), avg 37.18 mins; 42.8% of orders take longer than their restaurant's estimated time.", page: "03 Delivery & Operations" },
  { name: "Delivery Partner (Fleet) Dashboard", tool: "Power BI", tag: "How is the rider fleet performing?",
    context: "Fleet managers use it to plan riders per zone and to coach riders.",
    what: "Active riders, deliveries per rider, on-time % and rating by vehicle type and rider.",
    question: "Do we have the right riders and vehicles, and who needs support?",
    who: "Fleet managers, city ops",
    kpis: ["Active delivery agents", "Deliveries per agent", "On-time % by vehicle", "Agent rating"],
    visuals: ["Vehicle mix donut", "On-time % by vehicle bar", "Scatter: deliveries vs on-time % per agent"],
    filters: "City, vehicle type, date",
    build: ["Active Agents = DISTINCTCOUNT(Delivery[Delivery Agent ID])", "Join Delivery to DeliveryAgent on agent ID for vehicle type", "Minimum deliveries per agent before ranking"],
    proxima: "1,000 active agents of 10,000 in the master, about 10 deliveries each (max 23); Scooter 34.81% on time, Bicycle 33.04%.", page: "03 Delivery & Operations" },
  { name: "Customer Retention & Cohorts", tool: "Tableau", tag: "Do new customers come back?",
    context: "Growth and CRM teams use cohort grids to judge whether acquisition is bringing lasting customers.",
    what: "Customers by first-order month and the share who ordered again, plus repeat % and orders per customer.",
    question: "Which cohorts retain, and how fast do customers reorder?",
    who: "Growth, CRM, marketing",
    kpis: ["Total customers (ordered)", "Repeat customer %", "Orders per customer", "Cohort repeat %", "Days to second order"],
    visuals: ["Cohort heat grid", "Customers by number of orders histogram", "Days-to-second-order distribution"],
    filters: "First-order month, city, membership",
    build: ["First-order month: { FIXED [Customer ID] : MIN([Order Date]) }", "Repeat flag: { FIXED [Customer ID] : COUNTD([OrderID]) } > 1", "Compare cohorts at the same age to avoid right-censoring"],
    proxima: "41.73% repeat; the Apr 2024 cohort reached 64.3% vs 8.5% for Feb 2025; average 112.6 days to the second order.", page: "02 Customers & Loyalty" },
  { name: "Customer Value & Segmentation", tool: "Power BI", tag: "Who are our valuable customers?",
    context: "Used to target loyalty and win-back campaigns.",
    what: "Revenue per customer, CLV and segments by order count, membership and preference.",
    question: "Which segments are worth investing in?",
    who: "Marketing, loyalty team",
    kpis: ["Revenue per customer", "CLV", "Segment size", "Revenue per customer by membership"],
    visuals: ["RFM-style segment matrix", "Revenue per customer by membership bar", "Top customers table"],
    filters: "Membership, gender, preference, city",
    build: ["Revenue per Customer = DIVIDE([Total Revenue], DISTINCTCOUNT(Orders[Customer ID]))", "CLV per the KPI sheet: AOV × repeat rate × orders per customer", "Customers table on Customer ID; ignore LastOrderDate (matches the real last order only 0.16% of the time)"],
    proxima: "Revenue per customer ₹1,648.48, CLV ₹687.89; per customer, Gold ₹1,655.61 vs Platinum ₹1,638.53: membership doesn't change spend.", page: "02 Customers & Loyalty" },
  { name: "Restaurant Partner Performance", tool: "Power BI / Tableau", tag: "Which restaurants perform, and which need help?",
    context: "Partnership managers review it with restaurant owners.",
    what: "Revenue, orders, AOV, cancellations and ratings per restaurant, with ranking inside each city and cuisine.",
    question: "Who are the top and bottom partners, and why?",
    who: "Restaurant partnerships, city managers",
    kpis: ["Revenue per restaurant", "Orders", "Cancellation %", "Avg rating", "Rank in city"],
    visuals: ["Top 10 table with RANKX", "Scatter: orders vs rating", "Revenue per restaurant by cuisine"],
    filters: "City, cuisine, rating band",
    build: ["Group by RestaurantID, label with the name (names repeat; the suffix is mostly cuisine)", "Minimum order count before ranking by rate", "Restaurant master rating and Ratings-table average shown separately"],
    proxima: "Urban Tadka - Indian (92), Gurgaon is #1 at ₹35,503; per restaurant, Mexican (₹21,565) out-earns Italian (₹21,266).", page: "04 Restaurants, Menu & Ratings" },
  { name: "Menu & Category Mix", tool: "Tableau", tag: "What do restaurants sell, and at what price?",
    context: "Category managers use it to spot gaps in the menu and price points.",
    what: "Menu items, average price, calories and preparation time by category and cuisine.",
    question: "Is the menu balanced, and where are price gaps?",
    who: "Category managers, restaurant partnerships",
    kpis: ["Menu items by category", "Avg price", "Avg preparation time", "Items per restaurant"],
    visuals: ["Category bar", "Price box plot by category", "Items per restaurant histogram"],
    filters: "Category, cuisine, city",
    build: ["Menu with Restaurant only, never joined to Orders (200,199-row fan-out)", "Category sales by orders needs an order-items table this data doesn't have", "Label the page 'menu mix', not 'sales mix'"],
    proxima: "Main Course 2,559 items (avg ₹531.61), Dessert 2,549, Beverage 2,452, Starter 2,440; about 20 items per restaurant.", page: "04 Restaurants, Menu & Ratings" },
  { name: "Ratings & Reviews (Voice of Customer)", tool: "Power BI", tag: "What are customers telling us?",
    context: "Customer-experience teams track complaint themes and score trends.",
    what: "Rating distribution, coverage, review themes and rating vs delivery outcome.",
    question: "What do customers complain about most, and is it getting better?",
    who: "Customer experience, operations, restaurant partnerships",
    kpis: ["Avg rating", "Rating coverage %", "CSS (delivery feedback)", "Share of complaint reviews"],
    visuals: ["Star distribution bar", "Top review texts", "Rating by delivery status", "Coverage card next to every average"],
    filters: "City, cuisine, restaurant, month",
    build: ["Ratings → Orders with ORD number − 999", "CSS from Delivery feedback excluding 0s", "Never blend Ratings (3.02), CSS (2.97) and restaurant master rating (3.72)"],
    proxima: "45% of orders rated, avg 3.02; 'Food was cold' (868) and 'Too slow' (846) are 38.1% of reviews.", page: "04 Restaurants, Menu & Ratings" },
  { name: "Discounts & Coupon Effectiveness", tool: "Power BI / Tableau", tag: "What do discounts cost, and do they work?",
    context: "Marketing and finance review promo spend every month.",
    what: "Discount value and %, coupon usage, coupon validity breaches and AOV with and without coupons.",
    question: "How much are we giving away, and is it bringing extra orders?",
    who: "Marketing, finance",
    kpis: ["Total discount", "Discount % of gross", "Coupon usage %", "Orders outside coupon validity", "AOV with / without coupon"],
    visuals: ["Discount trend", "Coupon usage bar", "Coupon stated % vs actual % table"],
    filters: "Coupon code, month, city",
    build: ["Coupons joined on CouponCode; validity check Order Date between ValidFrom and ValidTo", "Discount without coupon shown as its own bucket", "A/B test design needed to prove effect"],
    proxima: "₹25,12,811 discount (24.08% of gross); 1,200 coupon orders (12%), 364 outside validity; 87.8% of orders are discounted without a coupon.", page: "01 Sales & Revenue Overview" },
  { name: "Payments & Reconciliation", tool: "Power BI", tag: "Did we collect the money?",
    context: "Finance uses it to reconcile orders to payments and chase failed or pending ones.",
    what: "Payment status mix, collected vs billed amount, and method mix from the payments system.",
    question: "How much of net revenue is actually collected, and what's stuck?",
    who: "Finance, payments operations",
    kpis: ["Payment success %", "Collected amount", "Pending / failed / refunded amount", "Orders vs payments difference"],
    visuals: ["Status donut", "Collected vs billed card pair", "Payment method bar (labelled with its source table)"],
    filters: "Month, payment method, status",
    build: ["Join on Orders[Payment ID] = Payments[PaymentID] (100% match)", "Use one payment-method source per visual; the two disagree on most orders", "Reconcile SUM(Payments[Amount]) to net revenue"],
    proxima: "89.80% success; ₹71,93,763 collected of ₹80,38,789; Pending ₹4,42,840, Failed ₹2,44,088, Refunded ₹1,58,098.", page: "Extension idea" },
];

/* ============================================================
   Helpers
   ============================================================ */
const CHART_COLORS = ["#1677D2", "#F59E0B", "#22C3EE", "#7C3AED", "#16A34A", "#DC2626", "#5B6472", "#0EA5E9"];
function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60); }
function copyText(text, btn, label) {
  const done = () => { if (btn) { const o = label || btn.textContent; btn.textContent = "✓ Copied"; setTimeout(() => { btn.textContent = o; }, 1500); } };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  else fallbackCopy(text, done);
}
function fallbackCopy(text, cb) {
  const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove(); if (cb) cb();
}

/* ---------------- Storage (never throws) ---------------- */
const STORE_KEY = "swiggy_da_state_v1";
let __memState = null;
function loadState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
  if (!s) s = __memState;
  s = s || {};
  ["journey", "deliv", "assign", "lab", "qa", "qachk", "recon", "pitch"].forEach(k => { if (!s[k]) s[k] = {}; });
  return s;
}
function saveState(s) { __memState = s; try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) {} }
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

/* ---------------- Charts (native SVG / CSS) ---------------- */
function svgDonut(data, size) {
  size = size || 120;
  const total = data.reduce((s, d) => s + Math.abs(d[1]), 0);
  const r = size / 2 - 10, cx = size / 2, cy = size / 2, C = 2 * Math.PI * r;
  let off = 0, circles = "";
  data.forEach((d, i) => {
    const dash = total ? (Math.abs(d[1]) / total) * C : 0;
    circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${CHART_COLORS[i % CHART_COLORS.length]}" stroke-width="16" stroke-dasharray="${dash} ${C - dash}" stroke-dashoffset="${-off}" transform="rotate(-90 ${cx} ${cy})"/>`;
    off += dash;
  });
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img">${circles}</svg>`;
}
function renderDonutBlock(chart) {
  const data = chart.data || [];
  const total = data.reduce((s, d) => s + d[1], 0);
  const legend = data.map((d, i) => `<div class="li"><span class="sw" style="background:${CHART_COLORS[i % CHART_COLORS.length]}"></span>${esc(d[0])}: ${Number(d[1]).toLocaleString("en-IN")} (${total ? ((d[1] / total) * 100).toFixed(1) : "0.0"}%)</div>`).join("");
  return `<div class="mock-chart"><div class="ct">${esc(chart.title)}</div><div class="donut-wrap">${svgDonut(data)}<div class="mock-legend">${legend}</div></div></div>`;
}
function renderBarBlock(chart, opts) {
  const data = chart.data || [];
  const max = Math.max(...data.map(d => Math.abs(d[1])), 0);
  const suffix = chart.suffix || "", prefix = chart.prefix || "";
  const base = opts && opts.base;
  const rows = data.map((d, i) => {
    const pct = max ? (Math.abs(d[1]) / max) * 100 : 0;
    const color = base !== undefined ? (d[1] > base * 1.15 ? "#DC2626" : d[1] < base * 0.85 ? "#16A34A" : "#1677D2") : (d[1] < 0 ? "#DC2626" : CHART_COLORS[i % CHART_COLORS.length]);
    const extra = d[2] !== undefined ? ` <span style="color:var(--ink-muted);font-size:10.5px;">n=${d[2]}</span>` : "";
    return `<div class="bar-row"><div class="lab">${esc(d[0])}</div><div class="track"><div class="fill" style="width:${pct}%;background:${color}"></div></div><div class="val">${prefix}${Number(d[1]).toLocaleString("en-IN")}${suffix}${extra}</div></div>`;
  }).join("");
  return `<div class="mock-chart"><div class="ct">${esc(chart.title)}</div>${rows}</div>`;
}
function renderDashMock(d) {
  const kpis = d.kpis.map(k => `<div class="mock-kpi"><div class="v">${k.v}</div><div class="l">${esc(k.l)}</div></div>`).join("");
  const donuts = (d.donuts || []).map(c => renderDonutBlock(c)).join("");
  const bars = (d.bars || []).map(c => renderBarBlock(c)).join("");
  return `<div class="card dash-mock"><div class="mock-head"><h4>${esc(d.title)}</h4><p>${esc(d.sub)}</p></div><div class="mock-kpis">${kpis}</div><div class="mock-charts">${donuts}${bars}</div></div>`;
}

/* ============================================================
   Progress engine
   ============================================================ */
const TRACKS = [
  { id: "business", name: "Business Understanding" }, { id: "model", name: "Data Model & Quality" }, { id: "sql", name: "SQL" },
  { id: "kpi", name: "KPIs" }, { id: "excel", name: "Excel" }, { id: "tableau", name: "Tableau" }, { id: "powerbi", name: "Power BI" },
  { id: "qa", name: "QA" }, { id: "interview", name: "Interview" }, { id: "career", name: "Insights & Career" },
];
function trackScores() {
  const s = loadState();
  const sc = {}; TRACKS.forEach(t => sc[t.id] = [0, 0]);
  JOURNEY.forEach(j => { sc[j.track][1]++; if (s.journey[j.id]) sc[j.track][0]++; });
  DELIVERABLES.forEach(d => { sc[d.track][1]++; if (s.deliv[d.id]) sc[d.track][0]++; });
  assignments().forEach(a => { sc[a.track][1]++; if (s.assign[a.id] && s.assign[a.id].ok) sc[a.track][0]++; });
  const qaDone = QA.filter(q => s.qa[q.cat + "::" + q.q]).length;
  sc.interview[1] += 6; sc.interview[0] += 6 * (QA.length ? qaDone / QA.length : 0);
  sc.interview[1] += 1; if (s.pitch.practiced) sc.interview[0] += 1;
  const labDone = Object.keys(s.lab).length;
  sc.interview[1] += 3; sc.interview[0] += 3 * Math.min(1, labDone / LAB.length);
  const chk = QA_CHECKLIST.filter(c => s.qachk[c.id]).length;
  sc.qa[1] += 3; sc.qa[0] += 3 * (chk / QA_CHECKLIST.length);
  const out = TRACKS.map(t => ({ ...t, pct: sc[t.id][1] ? Math.round((sc[t.id][0] / sc[t.id][1]) * 100) : 0 }));
  const overall = Math.round(out.reduce((a, t) => a + t.pct, 0) / out.length);
  return { tracks: out, overall, qaDone, labDone };
}
function refreshProgress() {
  const { tracks, overall, qaDone } = trackScores();
  const fill = document.getElementById("sidebar-progress-fill"), cap = document.getElementById("sidebar-progress-caption");
  if (fill) fill.style.width = overall + "%";
  if (cap) cap.textContent = `${overall}% project complete · ${qaDone}/${QA.length} interview Qs`;
  const hp = document.getElementById("home-progress");
  if (hp) {
    const top = tracks.slice().sort((a, b) => b.pct - a.pct);
    hp.innerHTML = `<h4>Your Progress</h4><div class="big">${overall}%</div><div class="sub">overall project completion</div>
      <div class="track-list">${tracks.slice(0, 5).map(trackRow).join("")}</div>
      <button class="btn-outline" style="margin-top:14px;padding:8px 14px;" data-goto="progress">See full progress →</button>`;
    hp.querySelector("[data-goto]").addEventListener("click", () => switchView("progress"));
  }
  try { renderCertificate(); } catch (e) {}
  const po = document.getElementById("progress-overall");
  if (po) po.innerHTML = `<h4>Overall Progress</h4><div class="big">${overall}%</div><div class="sub">Average of the ten skill tracks below</div>`;
  const tl = document.getElementById("track-list");
  if (tl) tl.innerHTML = tracks.map(trackRow).join("");
  const todo = document.getElementById("progress-todo");
  if (todo) {
    const s = loadState();
    const openJ = JOURNEY.filter(j => !s.journey[j.id]);
    const openD = DELIVERABLES.filter(d => !s.deliv[d.id]);
    const openA = assignments().filter(a => !(s.assign[a.id] && s.assign[a.id].ok));
    const li = (arr, f) => arr.length ? arr.map(f).join("") : `<div style="padding:4px 0;">✓ All done</div>`;
    todo.innerHTML = `<h5 style="margin:0 0 6px;font-size:13px;color:var(--ink);">Journey steps (${openJ.length} open)</h5>${li(openJ.slice(0, 5), j => `<div style="padding:3px 0;">• <a href="#" data-go="${j.go}">${esc(j.t)}</a></div>`)}
      <h5 style="margin:14px 0 6px;font-size:13px;color:var(--ink);">Deliverables (${openD.length} open)</h5>${li(openD.slice(0, 6), d => `<div style="padding:3px 0;">• ${esc(d.t)}</div>`)}
      <h5 style="margin:14px 0 6px;font-size:13px;color:var(--ink);">Assignments (${openA.length} open)</h5>${li(openA.slice(0, 6), a => `<div style="padding:3px 0;">• ${esc(a.t)}</div>`)}`;
    todo.querySelectorAll("[data-go]").forEach(a => a.addEventListener("click", (e) => { e.preventDefault(); switchView(a.dataset.go); }));
  }
}
function trackRow(t) {
  return `<div class="track-row ${t.pct >= 100 ? "complete" : ""}"><div class="tl">${esc(t.name)}</div><div class="tb"><div class="tf" style="width:${t.pct}%"></div></div><div class="tv">${t.pct}%</div></div>`;
}

/* ============================================================
   Home
   ============================================================ */
function renderStats() {
  const wrap = document.getElementById("stat-strip");
  wrap.innerHTML = STATS.map(s => `<div class="stat"><div class="num">${s.num}</div><div class="lbl">${esc(s.lbl)}</div></div>`).join("");
}
function renderJourney() {
  const wrap = document.getElementById("journey"); const s = loadState();
  wrap.innerHTML = JOURNEY.map((j, i) => `
    ${i ? '<div class="journey-arrow">↓</div>' : ""}
    <div class="journey-step ${s.journey[j.id] ? "done" : ""}">
      <div class="jn">${String(i + 1).padStart(2, "0")}</div>
      <div><h4>${esc(j.t)}</h4><p>${esc(j.d)}</p></div>
      <div class="journey-actions">
        <button class="check-pill ${s.journey[j.id] ? "on" : ""}" data-j="${j.id}">${s.journey[j.id] ? "✓ Done" : "Mark done"}</button>
        <button class="start-btn" data-go="${j.go}">Start →</button>
      </div>
    </div>`).join("");
  wrap.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => switchView(b.dataset.go)));
  wrap.querySelectorAll("[data-j]").forEach(b => b.addEventListener("click", () => {
    const st = loadState(); st.journey[b.dataset.j] = !st.journey[b.dataset.j]; saveState(st); renderJourney(); refreshProgress();
  }));
}
function renderChecklist(containerId, items, bucket) {
  const wrap = document.getElementById(containerId); if (!wrap) return;
  const s = loadState();
  wrap.innerHTML = items.map(d => `
    <div class="deliv-item ${s[bucket][d.id] ? "on" : ""}" data-id="${d.id}" role="checkbox" aria-checked="${!!s[bucket][d.id]}" tabindex="0">
      <div class="box">${s[bucket][d.id] ? "✓" : ""}</div>
      <div><h4>${esc(d.t)}</h4><p>${esc(d.d)}</p>${d.where ? `<div class="where">→ ${esc(d.where)}</div>` : ""}</div>
    </div>`).join("");
  wrap.querySelectorAll(".deliv-item").forEach(it => {
    const toggle = () => { const st = loadState(); st[bucket][it.dataset.id] = !st[bucket][it.dataset.id]; saveState(st); renderChecklist(containerId, items, bucket); refreshProgress(); };
    it.addEventListener("click", toggle);
    it.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); } });
  });
}
function renderBeforeAfter() {
  const html = `
    <div class="ba-col ba-before"><h4>❌ Before analytics</h4><ul>${BEFORE_AFTER.before.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="ba-mid">→</div>
    <div class="ba-col ba-after"><h4>✅ After analytics</h4><div class="ba-flow">${BEFORE_AFTER.after.map((x, i) => `${i ? '<div class="dn">↓</div>' : ""}<div class="node">${esc(x)}</div>`).join("")}</div></div>`;
  ["before-after", "before-after-2"].forEach(id => { const w = document.getElementById(id); if (w) w.innerHTML = html; });
}
function renderTools() {
  const wrap = document.getElementById("tool-grid");
  TOOLS.forEach((t, i) => {
    wrap.appendChild(el("div", "card tool-card", `<img class="tool-logo" src="${t.logo}" alt="${t.name} logo"><h4>${t.name}</h4><div class="role">${t.role}</div><p>${t.desc}</p>`));
    if (i < TOOLS.length - 1) wrap.appendChild(el("div", "tool-arrow", "→"));
  });
}
function renderDomainPrimer() {
  document.getElementById("domain-what").textContent = DOMAIN_WHAT;
  document.getElementById("domain-where").innerHTML = DOMAIN_WHERE.map(x => `<div style="padding:5px 0;">• ${esc(x)}</div>`).join("");
  document.getElementById("domain-data").innerHTML = DOMAIN_DATA_TYPES.map(x => `<span>${esc(x)}</span>`).join("");
}
function renderResourceCards(items, containerId) {
  const wrap = document.getElementById(containerId); if (!wrap) return;
  wrap.innerHTML = "";
  items.forEach(d => {
    const action = d.type === "download"
      ? `<a class="doc-download" href="${d.href}" download="${d.filename}" title="Download ${d.name}">⬇</a>`
      : `<a class="doc-download" href="${d.href}" target="_blank" rel="noopener" title="Open ${d.name}">↗</a>`;
    wrap.appendChild(el("div", "card doc-card", `<div class="doc-icon">${d.icon}</div><div class="doc-info"><h4>${esc(d.name)}</h4><p>${esc(d.desc)}</p></div>${action}`));
  });
}
function renderDocuments() {
  renderResourceCards(SOFTWARE_LINKS, "software-grid");
  renderResourceCards(DOCUMENTS, "doc-grid");
  renderResourceCards(DOCUMENTS, "doc-grid-2");
  const ss = document.getElementById("setup-steps");
  if (ss) ss.innerHTML = SETUP_STEPS.map((s, i) => `<div class="card setup-step"><div class="si">${s.i}</div><div class="sn">STEP ${i + 1}</div><h4>${esc(s.t)}</h4><p>${esc(s.d)}</p></div>`).join("");
}
function renderFlow() {
  document.getElementById("flow-grid").innerHTML = FLOW.map((f, i) => `<div class="flow-step"><div class="idx">${String(i + 1).padStart(2, "0")}</div><h4>${esc(f.t)}</h4><p>${esc(f.d)}</p></div>`).join("");
}
function renderTimeline() {
  document.getElementById("timeline").innerHTML = TIMELINE.map(r => `<div class="timeline-row"><div class="d">${r.d}</div><div class="t">${r.t}</div><div>${esc(r.task)}</div></div>`).join("");
}

/* ============================================================
   Business problem
   ============================================================ */
function renderProblem() {
  const pg = document.getElementById("problem-grid");
  pg.innerHTML = PROBLEM_STATEMENT.map(r => `<div class="card rule-card"><div class="head"><div class="icon-badge">${r.icon}</div><h4>${esc(r.h)}</h4></div><p>${esc(r.p)}</p></div>`).join("");
  const list = document.getElementById("bq-list");
  list.innerHTML = bq().map((b, i) => `
    <div class="bq-item ${i === 0 ? "open" : ""}">
      <div class="bq-head"><span class="bqn">Q${i + 1}</span><h4>${esc(b.q)}</h4><span class="chev">⌄</span></div>
      <div class="bq-body"><div class="chain">
        <div class="chain-step"><div class="cl">Question</div><p>${esc(b.q)}</p></div>
        <div class="chain-step"><div class="cl">Data</div><p>${esc(b.data)}</p></div>
        <div class="chain-step"><div class="cl">KPI</div><p>${esc(b.kpi)}</p></div>
        <div class="chain-step"><div class="cl">Analysis</div><p>${esc(b.analysis)}</p></div>
        <div class="chain-step"><div class="cl">Insight</div><p>${esc(b.insight)}</p></div>
        <div class="chain-step rec"><div class="cl">Recommendation</div><p>${esc(b.rec)}</p></div>
      </div></div>
    </div>`).join("");
  list.querySelectorAll(".bq-head").forEach(h => h.addEventListener("click", () => h.parentElement.classList.toggle("open")));
  document.getElementById("req-table").innerHTML = `<thead><tr><th>Req</th><th>Page / Area</th><th>Stakeholder</th><th>What it must answer</th><th>Priority</th></tr></thead>
    <tbody>${REQUIREMENTS.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
}
function renderRules() {
  document.getElementById("rule-grid").innerHTML = RULES.map(r => `<div class="card rule-card ${r.ok ? "ok" : ""}"><div class="head"><div class="icon-badge">${r.icon}</div><h4>${esc(r.h)}</h4></div><p>${esc(r.p)}</p></div>`).join("");
  document.getElementById("focus-grid").innerHTML = FOCUS_AREAS.map(f => `<div class="card tip-card"><h4 style="margin-top:0;">${esc(f.h)}</h4><p>${esc(f.p)}</p></div>`).join("");
}

/* ============================================================
   Data pages
   ============================================================ */
function renderDataset() {
  document.getElementById("coverage-text").textContent = COVERAGE_TEXT;
  const rows = SWG.rows || {};
  document.getElementById("ds-grid").innerHTML = Object.keys(TABLE_TYPES).map(t => {
    const ty = TABLE_TYPES[t]; const cls = ty.startsWith("Fact") ? "fact" : "dim";
    const pu = TABLE_PURPOSE[t] || ["", ""];
    return `<div class="card ds-card ${cls}"><div class="k">${esc(ty)}</div><h4>${t}</h4><div class="rows">${Number(rows[t] || 0).toLocaleString("en-IN")} rows${t === "Orders" ? " (hub)" : ""}</div>
      <dl class="ds-meta"><dt>Grain</dt><dd>${esc(TABLE_GRAIN[t])}</dd><dt>PK</dt><dd><code>${TABLE_PK[t]}</code></dd><dt>FK</dt><dd>${esc(TABLE_FK[t] || "—")}</dd><dt>Date</dt><dd>${esc(TABLE_DATE[t] || "—")}</dd><dt>Purpose</dt><dd>${esc(pu[0])}</dd></dl>
      <details class="ds-why"><summary>Why does this table exist?</summary><p>${esc(pu[1])}</p></details></div>`;
  }).join("");
  document.getElementById("story-table").innerHTML = `<thead><tr><th>When</th><th>Event</th><th>What happened</th><th>Where you'll see it</th></tr></thead>
    <tbody>${STORY.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
}
function renderModel() {
  const rows = SWG.rows || {};
  document.getElementById("schema-grid").innerHTML = Object.keys(TABLE_TYPES).map(t => {
    const ty = TABLE_TYPES[t]; const isFact = ty.startsWith("Fact");
    return `<div class="table-node ${isFact ? "fact" : ""} ${t === "Orders" ? "center" : ""}"><div class="hd"><span>${t}</span><span>${Number(rows[t] || 0).toLocaleString("en-IN")}</span></div>
      <div class="bd"><div><span class="pk">${TABLE_PK[t]}</span> · PK</div><div>FK: ${TABLE_FK[t] || "—"}</div><div style="margin-top:4px;opacity:.85;">${ty}</div></div></div>`;
  }).join("");
  const rel = document.getElementById("rel-list");
  rel.innerHTML = `<h4 style="font-size:15px;margin-bottom:6px;">Relationships</h4>` + RELATIONSHIPS.map(r => `<div class="r"><span class="card-arrow">↳</span><span>${esc(r)}</span></div>`).join("");
  document.getElementById("load-order").innerHTML = LOAD_ORDER.map(x => `<div style="padding:5px 0;">${esc(x)}</div>`).join("");
  document.getElementById("calc-fields").innerHTML = CALC_FIELDS.map(x => `<div style="padding:5px 0;">• ${esc(x)}</div>`).join("");
  document.getElementById("gotchas-list").innerHTML = GOTCHAS.map(g => `<div class="gotcha-card"><div class="gotcha-title">⚠️ ${esc(g.t)}</div><div class="gotcha-desc">${esc(g.d)}</div></div>`).join("");
  document.getElementById("global-filters").innerHTML = GLOBAL_FILTERS.map(([n, src]) =>
    `<div style="display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-top:1px solid var(--line-soft);"><span style="font-weight:600;color:var(--ink);">${esc(n)}</span><span style="font-family:var(--mono);font-size:12px;">${esc(src)}</span></div>`).join("");
  document.getElementById("join-guide-table").innerHTML = `<thead><tr><th>Type</th><th>Table</th><th>Primary Key</th><th>Foreign Keys</th><th>Grain</th><th>Rows</th></tr></thead>
    <tbody>${Object.keys(TABLE_TYPES).map(t => `<tr><td>${esc(TABLE_TYPES[t])}</td><td><code>${t}</code></td><td>${TABLE_PK[t]}</td><td>${TABLE_FK[t] || "—"}</td><td>${esc(TABLE_GRAIN[t])}</td><td class="num">${Number(rows[t] || 0).toLocaleString("en-IN")}</td></tr>`).join("")}</tbody>`;
  document.getElementById("dash-table").innerHTML = `<thead><tr><th>#</th><th>Page</th><th>Audience</th><th>Primary KPIs</th><th>Key visuals</th></tr></thead>
    <tbody>${DASHBOARDS.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
  const tc = document.getElementById("tableau-calc-table");
  if (tc) tc.innerHTML = `<thead><tr><th>Calculated field</th><th>What it's for</th><th>Tableau formula</th></tr></thead>
    <tbody>${M_TABLEAU_CALC_FIELDS.map(c => `<tr><td><strong>${esc(c.name)}</strong></td><td>${esc(c.desc)}</td><td><pre style="margin:0;white-space:pre-wrap;font-size:11.5px;">${esc(c.formula)}</pre></td></tr>`).join("")}</tbody>`;
  const jp = document.getElementById("join-paths-table");
  if (jp) jp.innerHTML = `<thead><tr><th>Analysis</th><th>Join condition</th></tr></thead><tbody>${M_JOIN_PATHS.map(([a, b]) => `<tr><td>${esc(a)}</td><td><code>${esc(b)}</code></td></tr>`).join("")}</tbody>`;
  const img = document.getElementById("model-img");
  if (img) img.addEventListener("click", () => openModal(`<img class="zoom-img" src="${img.src}" alt="${esc(img.alt)}">`));
}
let ddKind = "All";
function renderDataDictionary(filterText) {
  const wrap = document.getElementById("datadict-tables"); if (!wrap) return;
  const q = (filterText !== undefined ? filterText : (document.getElementById("dd-search") || {}).value || "").trim().toLowerCase();
  const pills = document.getElementById("dd-pills");
  if (pills && !pills.children.length) {
    ["All", "Fact", "Dimension"].forEach(k => {
      const b = el("button", "pill" + (k === ddKind ? " active" : ""), k);
      b.dataset.k = k;
      b.addEventListener("click", () => { ddKind = k; pills.querySelectorAll(".pill").forEach(p => p.classList.toggle("active", p.dataset.k === k)); renderDataDictionary(); });
      pills.appendChild(b);
    });
  }
  wrap.innerHTML = "";
  M_DATA_DICTIONARY.forEach(t => {
    const kind = String(TABLE_TYPES[t.table.split(" (")[0]] || "").startsWith("Fact") ? "Fact" : "Dimension";
    if (ddKind !== "All" && kind !== ddKind) return;
    const rows = t.cols.filter(c => !q || (t.table + " " + c.join(" ")).toLowerCase().includes(q));
    if (!rows.length) return;
    const card = el("div", "card dd-table-card table-scroll");
    card.innerHTML = `<div class="hd"><h4>${t.table}</h4><span class="tag p2">${esc(t.rows)}</span></div>
      <table class="dtable"><thead><tr><th>Column</th><th>Type</th><th>Description</th><th>Example / blanks</th></tr></thead>
      <tbody>${rows.map(([c, ty, d, n]) => `<tr><td><code>${esc(c)}</code></td><td><span class="col-type">${ty}</span></td><td>${esc(d)}</td><td>${esc(n)}</td></tr>`).join("")}</tbody></table>`;
    wrap.appendChild(card);
  });
  if (!wrap.children.length) wrap.appendChild(el("div", "empty-state", "No columns match that search."));
}
function renderQuality() {
  document.getElementById("null-notes").innerHTML = NULL_NOTES.map(x => `<div style="padding:6px 0;border-top:1px solid var(--line-soft);">• ${esc(x)}</div>`).join("");
  document.getElementById("dq-table").innerHTML = `<thead><tr><th>Check</th><th>Rule</th><th>Tables</th><th>Severity</th></tr></thead>
    <tbody>${DQ_RULES.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
}

/* ============================================================
   KPI Library
   ============================================================ */
let kpiActiveCat = "All", kpiSearch = "", kpiStarredOnly = false, kpiTier = "All";
function renderKpiTiers() {
  ["P1", "P2", "P3"].forEach(p => { const e = document.getElementById("kr-" + p.toLowerCase()); if (e) e.textContent = KPIS.filter(k => k.prio === p).length + " KPIs"; });
  const w = document.getElementById("kpi-tier-pills"); if (!w) return; w.innerHTML = "";
  [["All", "All tiers"], ["P1", "P1 · Must know"], ["P2", "P2 · Important"], ["P3", "P3 · Advanced"]].forEach(([v, l]) => {
    const b = el("button", "pill" + (v === kpiTier ? " active" : ""), l); b.addEventListener("click", () => { kpiTier = v; renderKpiTiers(); renderKpiGrid(); }); w.appendChild(b);
  });
}
function renderKpiPills() {
  const wrap = document.getElementById("kpi-pills"); wrap.innerHTML = "";
  KPI_CATS.forEach(c => {
    const n = c === "All" ? KPIS.length : KPIS.filter(k => k.cat === c).length;
    const b = el("button", "pill" + (c === kpiActiveCat ? " active" : ""), `${c} (${n})`);
    b.addEventListener("click", () => { kpiActiveCat = c; renderKpiPills(); renderKpiGrid(); });
    wrap.appendChild(b);
  });
}
function renderKpiGrid() {
  const wrap = document.getElementById("kpi-grid"); wrap.innerHTML = "";
  const q = kpiSearch.trim().toLowerCase(); const bm = getBookmarks();
  const list = KPIS.filter(k => (kpiTier === "All" || k.prio === kpiTier) && (kpiActiveCat === "All" || k.cat === kpiActiveCat) && (!q || (k.name + k.q + k.desc + k.formula + k.table + k.dax).toLowerCase().includes(q)) && (!kpiStarredOnly || bm.kpi[k.name]));
  if (!list.length) { wrap.appendChild(el("div", "empty-state", kpiStarredOnly ? "No starred KPIs yet. Tap the ★ on any card to save it here." : "No KPIs match that search.")); return; }
  list.forEach(k => {
    const starred = !!bm.kpi[k.name];
    const c = el("div", "card kpi-card"); c.id = "kpi-" + slugify(k.name);
    c.innerHTML = `
      <div class="top"><h4>${esc(k.name)}</h4>
        <div class="card-top-actions"><span class="tag ${k.prio === "P1" ? "p1" : "p2"} tier-${k.prio}">${k.prio}</span>
          <button class="link-btn" title="Copy link to this KPI" data-link-kpi="${esc(k.name)}">🔗</button>
          <button class="star-btn ${starred ? "starred" : ""}" title="Star this KPI" data-star-kpi="${esc(k.name)}">${starred ? "★" : "☆"}</button></div></div>
      <p class="kpi-q">${esc(k.q)}</p>
      <p class="kpi-logic">${esc(k.desc)}</p>
      <div class="kpi-plain">${esc(k.plain)}</div>
      <div class="formula">${esc(k.formula)}</div>
      ${k.dax ? `<div class="formula dax">${esc(k.dax)}</div>` : ""}
      <div class="kpi-ans"><span>Answer key: ${esc(k.v25)}</span>${k.wrong ? `<span class="bm">⚠ Wrong: ${esc(k.wrong)}</span>` : ""}</div>
      <div class="meta"><span>${esc(k.table)}</span><span>${esc(k.cat)} · ${esc(k.dir)}</span></div>`;
    wrap.appendChild(c);
  });
  wrap.querySelectorAll("[data-star-kpi]").forEach(b => b.addEventListener("click", () => { toggleBookmark("kpi", b.dataset.starKpi); renderKpiGrid(); }));
  wrap.querySelectorAll("[data-link-kpi]").forEach(b => b.addEventListener("click", () => copyDeepLink("kpi", b.dataset.linkKpi)));
}

/* ============================================================
   SQL, Excel, Analysis
   ============================================================ */
let sqlCat = "All", sqlPractice = false;
function sqlHint(sql) {
  const kw = (sql.match(/\b(SELECT|JOIN|LEFT JOIN|WHERE|GROUP BY|HAVING|ORDER BY|WITH|CASE|SUM|COUNT|AVG|DATEDIFF|ROW_NUMBER|RANK|COALESCE|CREATE TABLE|CREATE OR REPLACE VIEW|UNION ALL)\b/gi) || []).map(x => x.toUpperCase());
  const tables = sql.match(/\b(orders|delivery|payments|ratings|customers|customer_address|restaurant|menu|operating_hours|delivery_agent|login_audit|coupons)\b/gi) || [];
  return `Tables: ${[...new Set(tables)].join(", ") || "—"} · Key SQL: ${[...new Set(kw)].slice(0, 8).join(", ")}`;
}
function sqlBlockHtml(b, idx, prefix) {
  const exp = (b.sql.match(/--\s*[^\n]*\d[^\n]*/g) || []).slice(0, 3).map(x => x.replace(/^--\s*/, "")).join(" · ");
  if (prefix === "s" && sqlPractice) {
    return `<div class="card sql-block practice"><div class="hd"><div><h4>${esc(b.title)}</h4><p><strong>Your task:</strong> ${esc(b.desc)}</p></div></div>
      ${exp ? `<div class="sql-expect">🎯 Expected result: ${esc(exp)}</div>` : ""}
      <div class="sql-steps"><button class="btn-outline" data-hint="${idx}">💡 Show hint</button><button class="btn-blue" data-reveal="${idx}">🔓 Reveal solution</button></div>
      <div class="hint-text" id="sqlh-${idx}" style="display:none;">${esc(sqlHint(b.sql))}</div>
      <pre id="sqls-${idx}" style="display:none;">${esc(b.sql)}</pre></div>`;
  }
  const lv = b.level || ({ Setup: "Easy", Exploration: "Medium", KPI: "Medium", Breakdown: "Medium" }[b.cat] || "Medium");
  return `<div class="card sql-block"><div class="hd"><div><h4><span class="lvl lvl-${lv.toLowerCase()}">${lv}</span> ${esc(b.title)}</h4><p>${esc(b.desc)}</p></div><button class="copy-btn" data-copy="${prefix}${idx}">Copy</button></div><pre>${esc(b.sql)}</pre></div>`;
}
function renderSql() {
  const pills = document.getElementById("sql-pills");
  const cats = ["All", ...new Set(SQL_BLOCKS.map(b => b.cat))];
  pills.innerHTML = "";
  cats.forEach(c => { const b = el("button", "pill" + (c === sqlCat ? " active" : ""), c); b.addEventListener("click", () => { sqlCat = c; renderSql(); }); pills.appendChild(b); });
  const wrap = document.getElementById("sql-list");
  wrap.innerHTML = SQL_BLOCKS.map((b, i) => (sqlCat === "All" || b.cat === sqlCat) ? sqlBlockHtml(b, i, "s") : "").join("");
  wrap.querySelectorAll("[data-copy]").forEach(btn => btn.addEventListener("click", () => copyText(SQL_BLOCKS[+btn.dataset.copy.slice(1)].sql, btn, "Copy")));
  wrap.querySelectorAll("[data-hint]").forEach(b => b.addEventListener("click", () => { const x = document.getElementById("sqlh-" + b.dataset.hint); x.style.display = x.style.display === "none" ? "block" : "none"; }));
  wrap.querySelectorAll("[data-reveal]").forEach(b => b.addEventListener("click", () => { document.getElementById("sqls-" + b.dataset.reveal).style.display = "block"; b.remove(); }));
  const t = document.getElementById("sql-practice-toggle");
  if (t && !t._bound) { t._bound = true; t.addEventListener("click", () => { sqlPractice = !sqlPractice; t.textContent = sqlPractice ? "Turn practice mode OFF" : "Turn practice mode ON"; renderSql(); }); }
}
function renderExcel() {
  document.getElementById("excel-table").innerHTML = `<thead><tr><th>Calculation</th><th>Excel formula pattern</th><th>Expected result</th><th>Status</th></tr></thead>
    <tbody>${EXCEL_TASKS.map(r => `<tr><td>${esc(r[0])}</td><td><code>${esc(r[1])}</code></td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("")}</tbody>`;
  document.getElementById("pivot-grid").innerHTML = PIVOTS.map(t => `<div class="card tip-card"><div class="n">${t.n}</div><h4>${esc(t.h)}</h4><p>${esc(t.p)}</p></div>`).join("");
}
function renderAnalysis() {
  const base = A.cancel || 20.78;
  document.getElementById("vol-base").textContent = f2(base) + "%";
  const rng = (d) => { const v = (d || []).map(x => x[1]); return v.length ? `${f2(Math.min(...v))}%–${f2(Math.max(...v))}%` : ""; };
  const charts = [
    ["city", `Flat: ${rng(SWG.cancel_city)} across the 5 cities`, SWG.cancel_city],
    ["cuisine", `Flat: ${rng(SWG.cancel_cuisine)}; no cuisine stands out`, SWG.cancel_cuisine],
    ["order source", `App and Web are almost identical (${rng(SWG.cancel_source)})`, SWG.cancel_source],
    ["month", `${rng((SWG.cancel_month || []).slice(1))} across full months, highest in Dec 2024, Feb and Mar 2025. Mar 2024 has only 4 days of data`, SWG.cancel_month],
  ];
  document.getElementById("driver-grid").innerHTML = charts.map(([t, s, data]) => `<div class="card chart-card"><h4>Cancellation % by ${esc(t)}</h4><div class="cs">${esc(s)}</div>${renderBarBlock({ title: "", data: data || [], suffix: "%" }, { base })}</div>`).join("")
    + `<div class="card chart-card"><h4>Revenue by city (₹ lakh)</h4><div class="cs">Gross Total Amount via Restaurant.Location · ${esc((A.top_city || ["Noida"])[0])} leads, but the spread is small</div>${renderBarBlock({ title: "", data: SWG.rev_city_l || [], prefix: "₹", suffix: "L" })}</div>`
    + `<div class="card chart-card"><h4>Top 10 restaurants by revenue (₹ thousand)</h4><div class="cs">Grouped by RestaurantID with the real city and cuisine; name suffixes are unreliable and 15 names repeat across 500 restaurants</div>${renderBarBlock({ title: "", data: (SWG.top_rest_rev || []).map(r => [r[0], Math.round(r[1] / 100) / 10]), prefix: "₹", suffix: "K" })}</div>`
    + `<div class="card chart-card"><h4>On-time delivery % by vehicle type</h4><div class="cs">Overall: ${f2(A.ontime || 33.88)}% of all deliveries · the vehicle makes little difference</div>${renderBarBlock({ title: "", data: SWG.vehicle_ontime || [], suffix: "%" })}</div>`
    + `<div class="card chart-card"><h4>Orders.Status vs Order Status</h4><div class="cs">Two status columns disagree: they match on only ${f2(A.status_agree_pct || 16.64)}% of orders. The KPI uses Status</div>${renderBarBlock({ title: "", data: SWG.status_vs || [] })}</div>`;
  document.getElementById("insights-grid").innerHTML = bq().slice(0, 6).map((k, i) => `
    <div class="card insight-card tint-${i % 6}"><div class="insight-label">Insight</div><p class="insight-text">${esc(k.insight)}</p>
    <div class="insight-label rec">Recommendation</div><p class="insight-text">${esc(k.rec)}</p></div>`).join("");
}

/* ============================================================
   Dashboard gallery + modal
   ============================================================ */
function openModal(html) {
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("modal-overlay").classList.add("open");
}
function closeModal() { document.getElementById("modal-overlay").classList.remove("open"); }
function initModal() {
  const ov = document.getElementById("modal-overlay");
  document.getElementById("modal-close").addEventListener("click", closeModal);
  ov.addEventListener("click", (e) => { if (e.target === ov) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}
function renderGallery() {
  const pages = galleryPages();
  document.getElementById("gallery-grid").innerHTML = pages.map((p, i) => `
    <div class="card gallery-card">
      <div class="gtop"><div class="gnum">${p.n}</div><h4>${esc(p.t)}</h4><div class="gk">${p.keys.map(k => `<span>${esc(k)}</span>`).join("")}</div></div>
      <div class="gbody"><div class="gq">❓ ${esc(p.q)}</div><p>${esc(p.desc)}</p><div class="gins">💡 ${esc(p.ins)}</div><div class="gaud">Audience: ${esc(p.aud)}</div><button class="btn-blue" data-dash="${i}">View Dashboard →</button></div>
    </div>`).join("");
  document.querySelectorAll("[data-dash]").forEach(b => b.addEventListener("click", () => {
    const p = pages[+b.dataset.dash];
    openModal(`<div class="flow-strip"><div><span>Business question</span>${esc(p.q)}</div><div><span>KPIs</span>${esc(p.keys.join(" · "))}</div><div><span>Key insight</span>${esc(p.ins)}</div><div><span>Interview question</span>${esc(p.iq)}</div></div>` + renderDashMock(p.mock) + `<div class="build-notes">
      <div class="card"><h5>📈 Build it in Tableau</h5><ul>${p.build.tableau.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="card"><h5>⚡ Build it in Power BI</h5><ul>${p.build.powerbi.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>`);
  }));
}

/* ============================================================
   QA page
   ============================================================ */
const RECON_KPIS = ["Total Orders", "Total Revenue", "Net Revenue", "Average Order Value (AOV)", "Total Customers", "Repeat Customers %",
  "Revenue per Customer", "Customer Lifetime Value (CLV)", "Delivery Efficiency (On-Time %)", "Late Delivery %", "Order Cancellation Rate",
  "Customer Satisfaction Score", "Average Delivery Time", "Active Delivery Agents", "Payment Success %", "Discount %"];
function renderQA() {
  const wrap = document.getElementById("qa-sql-list");
  wrap.innerHTML = QA_SQL.map((b, i) => sqlBlockHtml(b, i, "q")).join("");
  wrap.querySelectorAll("[data-copy]").forEach(btn => btn.addEventListener("click", () => copyText(QA_SQL[+btn.dataset.copy.slice(1)].sql, btn, "Copy")));
  const s = loadState();
  const rows = RECON_KPIS.map(n => KPIS.find(k => k.name === n)).filter(Boolean);
  const t = document.getElementById("recon-table");
  t.innerHTML = `<thead><tr><th>KPI (all 10,000 orders)</th><th>SQL / answer key</th><th>Your Tableau value</th><th>Your Power BI value</th><th>Status</th></tr></thead>
    <tbody>${rows.map(k => {
      const r = s.recon[k.id] || {};
      return `<tr data-id="${k.id}" data-ans="${esc(k.v25)}"><td>${esc(k.name)}</td><td class="num">${esc(k.v25)}</td>
        <td><input class="search-input" style="max-width:130px;padding:6px 10px;" data-f="tab" value="${esc(r.tab || "")}"></td>
        <td><input class="search-input" style="max-width:130px;padding:6px 10px;" data-f="pbi" value="${esc(r.pbi || "")}"></td>
        <td class="st"></td></tr>`;
    }).join("")}</tbody>`;
  const firstNum = (x) => parseFloat((String(x).replace(/,/g, "").match(/-?\d+(\.\d+)?/) || ["NaN"])[0]);
  const evalRow = (tr) => {
    const ans = firstNum(tr.dataset.ans);
    const vals = [...tr.querySelectorAll("input")].map(i => i.value.trim());
    const ok = vals.map(v => v !== "" && Math.abs(firstNum(v) - ans) <= Math.max(0.011, Math.abs(ans) * 0.001));
    const st = tr.querySelector(".st");
    if (vals.every(v => v === "")) st.textContent = "";
    else if (ok.every(Boolean)) st.innerHTML = `<span class="recon-ok">✓ Ties out</span>`;
    else st.innerHTML = `<span style="color:var(--red);font-weight:700;">✗ Investigate</span>`;
  };
  t.querySelectorAll("tbody tr").forEach(tr => {
    evalRow(tr);
    tr.querySelectorAll("input").forEach(inp => inp.addEventListener("input", () => {
      const st = loadState(); st.recon[tr.dataset.id] = st.recon[tr.dataset.id] || {}; st.recon[tr.dataset.id][inp.dataset.f] = inp.value; saveState(st); evalRow(tr);
    }));
  });
  renderChecklist("qa-checklist", QA_CHECKLIST, "qachk");
}

/* ============================================================
   Assignments
   ============================================================ */
function renderAssignments() {
  const list = assignments(); const s = loadState();
  const done = list.filter(a => s.assign[a.id] && s.assign[a.id].ok).length;
  document.getElementById("assign-score").textContent = `${done} / ${list.length} assignments solved`;
  const wrap = document.getElementById("assign-list");
  wrap.innerHTML = list.map((a, i) => {
    const st = s.assign[a.id] || {};
    const input = a.type === "select"
      ? `<select data-in="${a.id}"><option value="">Choose…</option>${a.options.map(o => `<option ${st.last === o ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`
      : `<input type="text" inputmode="decimal" data-in="${a.id}" placeholder="Your answer${a.unit ? " (" + a.unit + ")" : ""}" value="${esc(st.last || "")}">`;
    return `<div class="card assign-card" id="as-${a.id}">
      <div class="assign-head"><span class="an">Assignment ${String(i + 1).padStart(2, "0")}</span><div><h4>${esc(a.t)}</h4><div class="tool">${esc(a.tool)}</div></div>
        <span class="status ${st.ok ? "ok" : ""}">${st.ok ? "✓ Solved" : st.tries ? `${st.tries} attempt${st.tries > 1 ? "s" : ""}` : "Not started"}</span></div>
      <div class="assign-steps"><button data-tab="task" class="active">1 · View Task</button><button data-tab="check">2 · Check Answer</button><button data-tab="sol">3 · Solution</button></div>
      <div class="assign-panel show" data-p="task"><strong>What to do</strong><ul>${a.task.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="assign-panel" data-p="check"><div class="answer-row">${input}<button class="btn-blue" data-check="${a.id}">Check</button><button class="btn-outline" data-hint="${a.id}">Hint</button></div>
        <div class="answer-feedback ${st.ok ? "good" : ""}">${st.ok ? "✓ Correct, and it matches the dataset." : ""}</div><div class="hint-text" style="display:none;">💡 ${esc(a.hint)}</div></div>
      <div class="assign-panel" data-p="sol">${st.tries ? `<pre>${esc(a.sol)}</pre>` : `<div class="hint-text">🔒 Make at least one attempt in <strong>Check Answer</strong> to unlock the solution.</div>`}</div>
    </div>`;
  }).join("");
  wrap.querySelectorAll(".assign-card").forEach(card => {
    card.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => {
      card.querySelectorAll("[data-tab]").forEach(x => x.classList.toggle("active", x === b));
      card.querySelectorAll("[data-p]").forEach(p => p.classList.toggle("show", p.dataset.p === b.dataset.tab));
    }));
  });
  wrap.querySelectorAll("[data-hint]").forEach(b => b.addEventListener("click", () => { const h = b.closest(".assign-panel").querySelector(".hint-text"); h.style.display = h.style.display === "none" ? "block" : "none"; }));
  wrap.querySelectorAll("[data-check]").forEach(b => b.addEventListener("click", () => {
    const a = list.find(x => x.id === b.dataset.check);
    const inp = wrap.querySelector(`[data-in="${a.id}"]`); const raw = inp.value.trim();
    if (!raw) return;
    let ok;
    if (a.type === "select") ok = raw === a.ans;
    else { const v = parseFloat(raw.replace(/[₹,%\s]/g, "")); ok = !isNaN(v) && Math.abs(v - a.ans) <= (a.tol || 0) + 1e-9; }
    const st = loadState(); const cur = st.assign[a.id] || { tries: 0 };
    cur.tries = (cur.tries || 0) + 1; cur.last = raw; if (ok) cur.ok = true; st.assign[a.id] = cur; saveState(st);
    renderAssignments(); refreshProgress();
    const card = document.getElementById("as-" + a.id);
    card.querySelectorAll("[data-tab]").forEach(x => x.classList.toggle("active", x.dataset.tab === "check"));
    card.querySelectorAll("[data-p]").forEach(p => p.classList.toggle("show", p.dataset.p === "check"));
    const fb = card.querySelector(".answer-feedback");
    fb.className = "answer-feedback " + (ok ? "good" : "bad");
    fb.textContent = ok ? "✓ Correct, and it matches the dataset." : "✗ Not quite. Re-check your filters (dates, status, denominator), use the hint, or open the solution.";
  }));
}

/* ============================================================
   Analyst Thinking Lab
   ============================================================ */
function renderLab() {
  const s = loadState();
  const answered = Object.keys(s.lab).length;
  const best = Object.entries(s.lab).filter(([i, c]) => LAB[+i] && LAB[+i].opts[c] && LAB[+i].opts[c][1] === "best").length;
  document.getElementById("lab-score").textContent = `${answered} / ${LAB.length} scenarios answered · ${best} best-first-move picks`;
  const wrap = document.getElementById("lab-list");
  wrap.innerHTML = LAB.map((l, i) => {
    const pick = s.lab[i];
    return `<div class="card lab-card"><div class="lab-n">Scenario ${String(i + 1).padStart(2, "0")}</div><h4>${esc(l.t)}</h4><p class="scn">${esc(l.scn)}</p>
      <div class="lab-opts">${l.opts.map((o, j) => `<button class="lab-opt ${pick !== undefined ? o[1] : ""}" data-l="${i}" data-o="${j}">${"ABCD"[j]}. ${esc(o[0])}${pick !== undefined ? (o[1] === "best" ? " ✓ best first move" : o[1] === "ok" ? " · reasonable, not first" : "") : ""}${pick === j ? " ← your pick" : ""}</button>`).join("")}</div>
      <div class="lab-explain ${pick !== undefined ? "show" : ""}"><strong>What an analyst checks first:</strong><ol>${l.exp.map(x => `<li>${esc(x)}</li>`).join("")}</ol></div></div>`;
  }).join("");
  wrap.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => {
    const st = loadState(); st.lab[b.dataset.l] = +b.dataset.o; saveState(st); renderLab(); refreshProgress();
  }));
}

/* ============================================================
   Interview Q&A
   ============================================================ */
let qaActiveCat = "Explain This Project", qaSearch = "", qaStarredOnly = false;
function renderQaTabs() {
  const wrap = document.getElementById("qa-tabs"); wrap.innerHTML = "";
  QA_CATS.forEach(c => {
    const b = el("button", c === qaActiveCat ? "active" : "", `${c} (${QA.filter(q => q.cat === c).length})`);
    b.addEventListener("click", () => { qaActiveCat = c; renderQaTabs(); renderQaList(); });
    wrap.appendChild(b);
  });
}
function renderQaList() {
  const wrap = document.getElementById("qa-list"); wrap.innerHTML = "";
  const st = loadState(); const bm = getBookmarks(); const q = qaSearch.trim().toLowerCase();
  const list = QA.filter(it => (q ? true : it.cat === qaActiveCat) && (!q || (it.q + it.a).toLowerCase().includes(q)) && (!qaStarredOnly || bm.qa[it.q]));
  updateQaProgressBar();
  if (!list.length) { wrap.appendChild(el("div", "empty-state", qaStarredOnly ? "No starred questions yet. Tap the ★ on any question to save it here." : "No questions match that search.")); return; }
  list.forEach(item => {
    const id = item.cat + "::" + item.q; const done = !!st.qa[id]; const starred = !!bm.qa[item.q]; const isLong = item.a.length > 480;
    const card = el("div", "qa-item" + (done ? " reviewed" : "")); card.id = "qa-" + slugify(item.q);
    card.innerHTML = `
      <div class="qa-q"><span class="num">${esc(item.cat)}</span><span class="qtext">${esc(item.q)}</span>
        <button class="link-btn" title="Copy link to this question">🔗</button>
        <button class="star-btn ${starred ? "starred" : ""}" title="Star this question">${starred ? "★" : "☆"}</button><span class="chev">⌄</span></div>
      <div class="qa-a"><div class="qa-a-inner">
        <div class="answer-text ${isLong ? "clamped" : ""}"><p>${item.a}</p></div>
        ${isLong ? '<button type="button" class="show-full-btn">Show full answer ▾</button>' : ""}
        <div class="signal">Interviewer signal: ${esc(item.signal)}</div>
        ${item.src ? `<div class="q-src">📚 Source: <a href="${item.src[1]}" target="_blank" rel="noopener">${esc(item.src[0])} ↗</a></div>` : ""}
        <button class="mark-btn ${done ? "done" : ""}">${done ? "✓ Reviewed" : "Mark as reviewed"}</button></div></div>`;
    const aDiv = card.querySelector(".qa-a");
    card.querySelector(".qa-q").addEventListener("click", (ev) => {
      if (ev.target.closest(".star-btn") || ev.target.closest(".link-btn")) return;
      const open = card.classList.toggle("open"); aDiv.style.maxHeight = open ? aDiv.scrollHeight + "px" : "0px";
    });
    const sf = card.querySelector(".show-full-btn");
    if (sf) sf.addEventListener("click", (ev) => { ev.stopPropagation(); const t = card.querySelector(".answer-text"); const c = t.classList.toggle("clamped"); sf.textContent = c ? "Show full answer ▾" : "Show less ▴"; if (card.classList.contains("open")) aDiv.style.maxHeight = aDiv.scrollHeight + "px"; });
    const mb = card.querySelector(".mark-btn");
    mb.addEventListener("click", (ev) => { ev.stopPropagation(); const s2 = loadState(); s2.qa[id] = !s2.qa[id]; saveState(s2); mb.classList.toggle("done", s2.qa[id]); mb.textContent = s2.qa[id] ? "✓ Reviewed" : "Mark as reviewed"; card.classList.toggle("reviewed", !!s2.qa[id]); updateQaProgressBar(); refreshProgress(); });
    card.querySelector(".star-btn").addEventListener("click", (ev) => { ev.stopPropagation(); toggleBookmark("qa", item.q); renderQaList(); });
    card.querySelector(".link-btn").addEventListener("click", (ev) => { ev.stopPropagation(); copyDeepLink("qa", item.q); });
    wrap.appendChild(card);
  });
}
function updateQaProgressBar() {
  const st = loadState(); const done = QA.filter(it => st.qa[it.cat + "::" + it.q]).length; const pct = QA.length ? Math.round(done / QA.length * 100) : 0;
  const t = document.getElementById("progress-text"), b = document.getElementById("progress-bar");
  if (t) t.textContent = `${done} / ${QA.length} reviewed`; if (b) b.style.width = pct + "%";
}

/* ============================================================
   Pitch, career, glossary, tips, learn
   ============================================================ */
let pitchTimer = null, pitchLeft = 90;
function renderPitch() {
  document.getElementById("pitch-flow").innerHTML = PITCH_FLOW.map((p, i) => `<div class="pitch-step"><div class="ps-n">${String(i + 1).padStart(2, "0")} ${i < PITCH_FLOW.length - 1 ? "→" : ""}</div><h4>${esc(p.t)}</h4><p>${esc(p.d)}</p><div class="sec">${p.s}</div></div>`).join("");
  document.getElementById("elevator-pitch").textContent = ELEVATOR_PITCH;
  document.getElementById("copy-pitch-btn").addEventListener("click", (e) => copyText(ELEVATOR_PITCH, e.currentTarget, "📋 Copy pitch"));
  document.getElementById("project-faq").innerHTML = PROJECT_FAQ.map(f => `<div class="faq-item"><h4>${esc(f.q)}</h4><p>${esc(f.a)}</p></div>`).join("");
  const ta = document.getElementById("pitch-text"), timer = document.getElementById("pitch-timer");
  const st = loadState(); if (st.pitch.text) ta.value = st.pitch.text;
  const draw = () => { const m = Math.floor(Math.abs(pitchLeft) / 60), s = Math.abs(pitchLeft) % 60; timer.textContent = (pitchLeft < 0 ? "+" : "") + m + ":" + String(s).padStart(2, "0"); timer.className = "timer" + (pitchLeft < 0 ? " over" : pitchLeft <= 15 ? " warn" : ""); };
  const analyse = () => {
    const txt = ta.value.toLowerCase(); const words = (ta.value.trim().match(/\S+/g) || []).length;
    document.getElementById("pitch-meta").textContent = `${words} words · about ${Math.round(words / 2.5)} seconds spoken (target 200–230 words for 90 s)`;
    document.getElementById("pitch-checks").innerHTML = PITCH_FLOW.map(p => { const hit = p.key.some(k => txt.includes(k)); return `<span class="check-pill ${hit ? "on" : ""}">${hit ? "✓" : "○"} ${esc(p.t)}</span>`; }).join("");
  };
  ta.addEventListener("input", analyse); analyse(); draw();
  document.getElementById("pitch-start").addEventListener("click", (e) => {
    if (pitchTimer) { clearInterval(pitchTimer); pitchTimer = null; e.currentTarget.textContent = "▶ Resume"; return; }
    e.currentTarget.textContent = "⏸ Pause"; ta.focus();
    pitchTimer = setInterval(() => { pitchLeft--; draw(); }, 1000);
  });
  document.getElementById("pitch-reset").addEventListener("click", () => { clearInterval(pitchTimer); pitchTimer = null; pitchLeft = 90; draw(); document.getElementById("pitch-start").textContent = "▶ Start 90-sec timer"; });
  document.getElementById("pitch-save").addEventListener("click", (e) => {
    const s2 = loadState(); s2.pitch.text = ta.value; if (ta.value.trim().length > 40) s2.pitch.practiced = true; saveState(s2); refreshProgress();
    e.currentTarget.textContent = ta.value.trim().length > 40 ? "✓ Saved & marked practiced" : "Write a little more first";
    setTimeout(() => { e.currentTarget.textContent = "✓ Save & mark practiced"; }, 1800);
  });
}
function renderCareer() {
  const rb = document.getElementById("resume-block");
  const text = `${RESUME_PROJECT.title}\n${RESUME_PROJECT.tools}\nKey Contributions\n${RESUME_PROJECT.bullets.map(b => "- " + b).join("\n")}`;
  rb.innerHTML = `<h3>${esc(RESUME_PROJECT.title)}</h3><div class="tools-line">${esc(RESUME_PROJECT.tools)}</div><strong style="font-size:13.5px;">Key Contributions</strong>
    <ul>${RESUME_PROJECT.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul><div class="copy-row"><button class="btn-dark" id="copy-resume">📋 Copy Resume Description</button></div>`;
  document.getElementById("copy-resume").addEventListener("click", (e) => copyText(text, e.currentTarget, "📋 Copy Resume Description"));
  const bw = document.getElementById("resume-bullets");
  bw.innerHTML = RESUME_BULLETS.map((b, i) => `<div class="resume-bullet"><p>${esc(b)}</p><button type="button" class="copy-btn" data-i="${i}">📋 Copy</button></div>`).join("");
  bw.querySelectorAll("[data-i]").forEach(b => b.addEventListener("click", () => copyText(RESUME_BULLETS[+b.dataset.i], b, "📋 Copy")));
  document.getElementById("linkedin-post").textContent = LINKEDIN_POST;
  document.getElementById("copy-linkedin-btn").addEventListener("click", (e) => copyText(LINKEDIN_POST, e.currentTarget, "📋 Copy post"));
  document.getElementById("portfolio-grid").innerHTML = PORTFOLIO.map(t => `<div class="card tip-card"><div class="n">${t.n}</div><h4>${esc(t.h)}</h4><p>${esc(t.p)}</p></div>`).join("");
}
function renderGlossary(filterText) {
  const wrap = document.getElementById("gloss-grid"); const q = (filterText || "").trim().toLowerCase();
  const list = GLOSSARY.filter(g => !q || (g.t + g.d).toLowerCase().includes(q));
  wrap.innerHTML = list.length ? list.map(g => `<div class="card gloss-card" id="gl-${slugify(g.t)}"><h4>${esc(g.t)}</h4><p>${esc(g.d)}</p></div>`).join("") : `<div class="empty-state">No terms match that search.</div>`;
}
function renderTips() {
  document.getElementById("tip-grid").innerHTML = TIPS.map(t => `<div class="card tip-card"><div class="n">${t.n}</div><h4>${esc(t.h)}</h4><p>${esc(t.p)}</p></div>`).join("");
  document.getElementById("tip-callout").textContent = TIP_CALLOUT;
  document.getElementById("weak-strong-list").innerHTML = WEAK_STRONG.map(ws => `<div class="ws-card"><div class="ws-q">${esc(ws.q)}</div><div class="ws-grid">
    <div class="ws-col ws-weak"><div class="ws-label">✗ Weak answer</div><p>${esc(ws.weak)}</p></div>
    <div class="ws-col ws-strong"><div class="ws-label">✓ Strong answer</div><p>${esc(ws.strong)}</p></div></div></div>`).join("");
}
function renderLearningLinks() {
  document.getElementById("learn-grid").innerHTML = LEARNING_LINKS.map((l, i) => `<a class="learn-card tint-${i % 6}" href="${l.url}" target="_blank" rel="noopener"><span class="learn-source">${esc(l.source)}</span><h4>${esc(l.title)}</h4><p>${esc(l.desc)}</p><span class="learn-cta">Open resource ↗</span></a>`).join("");
}
function renderProgressPage() {
  const r = document.getElementById("reset-progress");
  if (r) r.addEventListener("click", () => {
    if (!confirm("Reset all journey steps, deliverables, assignments, lab answers and interview progress on this device?")) return;
    saveState({}); try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    renderJourney(); renderChecklist("deliv-grid", DELIVERABLES, "deliv"); renderAssignments(); renderLab(); renderQaList(); renderQA(); refreshProgress();
  });
}

function renderSamples() {
  const g = document.getElementById("sample-grid");
  if (g) {
    g.innerHTML = SAMPLE_IMAGE_DASHBOARDS.map((d, i) => `
      <div class="card sample-card">
        <img src="${d.img}" alt="${esc(d.t)} by ${esc(d.by)}" data-zoom="${i}" loading="lazy">
        <div class="sample-body"><div class="sample-by">${esc(d.by)}</div><h4>${esc(d.t)}</h4>
          <p><strong>What it does:</strong> ${esc(d.does)}</p><p><strong>KPIs:</strong> ${esc(d.kpis)}</p>
          <p><strong>Visuals:</strong> ${esc(d.visuals)}</p><div class="sample-px">➜ ${esc(d.proxima)}</div></div>
      </div>`).join("");
    g.querySelectorAll("[data-zoom]").forEach(im => im.addEventListener("click", () => openModal(`<img class="zoom-img" src="${im.src}" alt="${esc(im.alt)}"><p style="font-size:12px;color:var(--ink-muted);margin-top:8px;">Sample design: ${esc(im.alt)}. Shown for layout inspiration; values are not from the Swiggy dataset.</p>`)));
  }
  const w = document.getElementById("vidi-cards");
  if (w) {
    const li = (arr) => `<ul>${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    w.innerHTML = VIDI_DASHBOARDS.map((d, i) => `
      <div class="dacc" id="dacc-${i}">
        <button class="dacc-head" aria-expanded="false">
          <span class="dacc-n">${String(i + 1).padStart(2, "0")}</span>
          <span class="dacc-t"><strong>${esc(d.name)}</strong><span>${esc(d.tag)}</span></span>
          <span class="dacc-tool">${esc(d.tool)}</span><span class="dacc-chev">⌄</span>
        </button>
        <div class="dacc-body">
          <p class="dacc-ctx">${esc(d.context)}</p>
          <div class="dacc-grid">
            <div><h5>📋 What it shows</h5><p>${esc(d.what)}</p></div>
            <div><h5>❓ Business question it answers</h5><p>${esc(d.question)}</p></div>
            <div><h5>👥 Who uses it</h5><p>${esc(d.who)}</p></div>
            <div><h5>🎛️ Filters / slicers</h5><p>${esc(d.filters)}</p></div>
            <div><h5>📊 Key KPIs</h5>${li(d.kpis)}</div>
            <div><h5>📈 Visuals</h5>${li(d.visuals)}</div>
          </div>
          <div class="dacc-build"><h5>🛠️ Build it with the Swiggy data</h5>${li(d.build)}</div>
          <div class="dacc-foot"><span class="dacc-insight">💡 Swiggy example: ${esc(d.proxima)}</span><span class="dacc-page">Gallery page: ${esc(d.page)}</span></div>
        </div>
      </div>`).join("");
    const setOpen = (card, open) => { card.classList.toggle("open", open); card.querySelector(".dacc-head").setAttribute("aria-expanded", open); };
    w.querySelectorAll(".dacc").forEach(c => c.querySelector(".dacc-head").addEventListener("click", () => setOpen(c, !c.classList.contains("open"))));
    const oa = document.getElementById("acc-open-all"), ca = document.getElementById("acc-close-all");
    if (oa) oa.addEventListener("click", () => w.querySelectorAll(".dacc").forEach(c => setOpen(c, true)));
    if (ca) ca.addEventListener("click", () => w.querySelectorAll(".dacc").forEach(c => setOpen(c, false)));
  }
}
function renderQaRefs() {
  const w = document.getElementById("qa-refs"); if (!w) return;
  w.innerHTML = QA_REFERENCES.map((s, i) => `<a class="learn-card tint-${i % 6}" href="${s[1]}" target="_blank" rel="noopener"><span class="learn-source">${esc(s[0].split(":")[0])}</span><h4>${esc(s[0].split(": ").slice(1).join(": ") || s[0])}</h4><span class="learn-cta">Open source ↗</span></a>`).join("");
}
function initBrandHome() {
  document.querySelectorAll("#brand-home, .brand-home-link").forEach(a => a.addEventListener("click", (e) => {
    e.preventDefault(); if (location.hash) history.replaceState(null, "", location.pathname); switchView("overview");
  }));
}

function renderTraps() {
  const g = document.getElementById("trap-grid"); if (g) g.innerHTML = INTERVIEW_TRAPS.map(([bad, good]) => `<div class="trap"><div class="tbad">❌ ${esc(bad)}</div><div class="tgood">✅ ${esc(good)}</div></div>`).join("");
  const p = document.getElementById("pres-list"); if (p) p.innerHTML = PRESENTATION.map(([n, t, s, d]) => `<div class="pres-row"><span class="pn">${n}</span><div><h4>${esc(t)} <em>${s}</em></h4><p>${esc(d)}</p></div></div>`).join("");
}
function renderCertificate() {
  const box = document.getElementById("cert-box"); if (!box) return;
  const { tracks, overall } = trackScores();
  const done = overall >= 100;
  box.innerHTML = `<h4>${done ? "🎉 Swiggy Data Analytics Capstone Completed" : "🏅 Completion certificate"}</h4>
    <div class="cert-ticks">${tracks.map(t => `<span class="${t.pct >= 100 ? "on" : ""}">${t.pct >= 100 ? "✓" : "○"} ${esc(t.name)}</span>`).join("")}</div>
    ${done ? `<div class="answer-row"><input type="text" id="cert-name" placeholder="Your full name"><button class="btn-blue" id="cert-print">Download certificate</button></div>`
           : `<p>Unlocks at 100%. You're at <strong>${overall}%</strong>: finish the journey, deliverables, assignments and interview practice.</p>`}`;
  const b = document.getElementById("cert-print");
  if (b) b.addEventListener("click", () => {
    const nm = (document.getElementById("cert-name").value || "").trim(); if (!nm) { chatToastMini("Type your name first."); return; }
    document.getElementById("print-sheet").innerHTML = `<div class="cert-print"><img src="assets/swiggy-logo.png" alt="" style="width:220px;border-radius:8px;"><h1>Certificate of Completion</h1><p>This certifies that</p><h2>${esc(nm)}</h2>
      <p>has completed the <strong>Swiggy Data Analytics Capstone</strong>: data model, SQL, Excel, Tableau, Power BI, KPI implementation, QA reconciliation, business analysis and interview preparation.</p>
      <p style="margin-top:30px;">Mahendra Singh · Data Analyst Trainer, ExcelR &nbsp;|&nbsp; ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
      <p style="font-size:10px;color:#777;margin-top:20px;">Self-tracked completion on the Swiggy Data Analytics Capstone learning hub.</p></div>`;
    setTimeout(() => window.print(), 80);
  });
}

/* ============================================================
   Navigation
   ============================================================ */
const LAST_VIEW_KEY = "swiggy_da_last_view_v1";
const VIEW_LABELS = {
  schedule: "Project Schedule & Status", progress: "My Progress", problem: "Problem & Business Questions", rules: "Rules & Regulations", dataset: "Dataset", model: "Data Model",
  datadict: "Data Dictionary", quality: "Data Quality", kpis: "KPI Library", sql: "SQL Lab", editor: "SQL Practice Editor", excel: "Excel Analysis", analysis: "Business Analysis",
  dashboards: "Dashboard Gallery", qa: "QA & Reconciliation", assignments: "Assignments", lab: "Analyst Thinking Lab", interview: "Interview Questions",
  pitch: "90-sec Project Pitch", career: "Resume, LinkedIn & Portfolio", glossary: "Glossary", tips: "Student Tips", learnmore: "Learn More",
};
function switchView(viewName) {
  if (viewName === "journey-anchor") {
    switchView("overview");
    setTimeout(() => { const j = document.getElementById("journey-anchor"); if (j) j.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
    return;
  }
  document.querySelectorAll("#nav button").forEach(x => x.classList.toggle("active", x.dataset.view === viewName));
  document.querySelectorAll("section.view").forEach(v => v.classList.remove("active"));
  const section = document.getElementById("view-" + viewName);
  if (section) section.classList.add("active");
  window.scrollTo({ top: 0, behavior: "auto" });
  closeMobileSidebar();
  if (viewName !== "overview" && VIEW_LABELS[viewName]) lsSet(LAST_VIEW_KEY, JSON.stringify({ view: viewName, ts: Date.now() }));
  if (viewName === "overview") renderContinueBanner();
  if (viewName === "progress") refreshProgress();
  if (viewName === "editor" && typeof initEditor === "function") initEditor();
}
function renderContinueBanner() {
  const wrap = document.getElementById("continue-banner"); if (!wrap) return;
  let saved = null; try { saved = JSON.parse(lsGet(LAST_VIEW_KEY)); } catch (e) {}
  if (!saved || !saved.view || !VIEW_LABELS[saved.view]) { wrap.style.display = "none"; return; }
  wrap.style.display = "flex";
  wrap.innerHTML = `<span class="continue-text">↩️ Continue where you left off: <strong>${VIEW_LABELS[saved.view]}</strong></span>
    <div class="continue-actions"><button type="button" class="continue-go">Continue →</button><button type="button" class="continue-dismiss" title="Dismiss">✕</button></div>`;
  wrap.querySelector(".continue-go").addEventListener("click", () => switchView(saved.view));
  wrap.querySelector(".continue-dismiss").addEventListener("click", () => { wrap.style.display = "none"; });
}
function initNav() {
  document.querySelectorAll("#nav button").forEach(b => b.addEventListener("click", () => switchView(b.dataset.view)));
  document.querySelectorAll("[data-goto]").forEach(b => b.addEventListener("click", () => switchView(b.dataset.goto)));
}
function closeMobileSidebar() {
  const sb = document.getElementById("sidebar"), sc = document.getElementById("scrim");
  if (sb) sb.classList.remove("open"); if (sc) sc.classList.remove("show");
}
function initMobileToggle() {
  const t = document.getElementById("mobile-toggle"), sb = document.getElementById("sidebar"), sc = document.getElementById("scrim");
  if (!t || !sb || !sc) return;
  t.addEventListener("click", () => { sb.classList.toggle("open"); sc.classList.toggle("show"); });
  sc.addEventListener("click", closeMobileSidebar);
}
function initSocial() {
  [["side-youtube", SOCIAL.youtube], ["side-medium", SOCIAL.medium], ["side-linkedin", SOCIAL.linkedin], ["social-youtube", SOCIAL.youtube],
   ["social-medium", SOCIAL.medium], ["social-linkedin", SOCIAL.linkedin], ["youtube-link", SOCIAL.youtube]].forEach(([id, url]) => { const e = document.getElementById(id); if (e && url) e.href = url; });
  const fl = document.querySelectorAll(".footer-links a"); if (fl[0]) fl[0].href = SOCIAL.linkedin; if (fl[1]) fl[1].href = SOCIAL.medium;
}

/* ---- Visitor counter (no external service) ---- */
let __visitorMemory = null;
function initVisitorCounter() {
  const e = document.getElementById("visitor-count"); if (!e) return;
  const SEED = "swiggy_da_visits_seed_v1", CNT = "swiggy_da_visits_count_v1";
  function tryStore(store) {
    let seed = parseInt(store.getItem(SEED) || "0", 10);
    if (!seed) { seed = 180 + Math.floor(Math.random() * 220); store.setItem(SEED, String(seed)); }
    let c = parseInt(store.getItem(CNT) || "0", 10) + 1; store.setItem(CNT, String(c)); return seed + c;
  }
  let total = null;
  try { total = tryStore(window.localStorage); } catch (er) {}
  if (total === null) { try { total = tryStore(window.sessionStorage); } catch (er) {} }
  if (total === null) { if (__visitorMemory === null) __visitorMemory = 180 + Math.floor(Math.random() * 220); total = ++__visitorMemory; }
  e.textContent = total.toLocaleString("en-IN");
}

function initSearch() {
  document.getElementById("kpi-search").addEventListener("input", (e) => { kpiSearch = e.target.value; renderKpiGrid(); });
  document.getElementById("qa-search").addEventListener("input", (e) => { qaSearch = e.target.value; renderQaList(); });
  document.getElementById("gl-search").addEventListener("input", (e) => renderGlossary(e.target.value));
  document.getElementById("dd-search").addEventListener("input", (e) => renderDataDictionary(e.target.value));
}

/* ============================================================
   Ask Mahendra — client-side search over the site's own content
   ============================================================ */
function buildChatIndex() {
  const idx = [];
  KPIS.forEach(k => idx.push({ type: "KPI", tab: "kpis", title: k.name, text: `${k.name} ${k.q} ${k.desc} ${k.plain} ${k.cat}`,
    answer: `<strong>${esc(k.name)}</strong> (${esc(k.cat)}): ${esc(k.q)}<br>${esc(k.desc)}<br><span class="src-tag">${esc(k.formula)}</span><br><em>Answer key: ${esc(k.v25)}</em>`,
    followups: ["Show the related SQL", "What's a common mistake here?"] }));
  QA.forEach(it => idx.push({ type: "Interview Q&A", tab: "interview", title: it.q, text: `${it.q} ${it.a} ${it.cat}`,
    answer: `<strong>${esc(it.q)}</strong><br>${it.a}<div class="chat-signal">Interviewer signal: ${esc(it.signal)}</div>`,
    followups: it.cat === "Scenario-Based" ? ["Give me another scenario question", "What's a common gotcha here?"] : ["Give me a scenario question", "What's a common mistake here?"] }));
  GLOSSARY.forEach(g => idx.push({ type: "Glossary", tab: "glossary", title: g.t, text: `${g.t} ${g.d}`, answer: `<strong>${esc(g.t)}</strong>: ${esc(g.d)}`, followups: ["Show the related KPI", "Any gotchas here?"] }));
  NULL_NOTES.forEach((n, i) => idx.push({ type: "Data Quality", tab: "quality", title: `Data quality note ${i + 1}`, text: `null blank quality quirk ${n}`, answer: `<strong>Data quality, expected blank / quirk</strong><br>${esc(n)}`, followups: ["What are the data model gotchas?"] }));
  GOTCHAS.forEach(g => idx.push({ type: "Gotcha", tab: "model", title: g.t, text: `gotcha trap mistake ${g.t} ${g.d}`, answer: `<strong>⚠️ Gotcha: ${esc(g.t)}</strong><br>${esc(g.d)}`, followups: ["What's another gotcha?", "Give me an interview question on this"] }));
  TIPS.forEach(t => idx.push({ type: "Student Tip", tab: "tips", title: t.h, text: `tip advice ${t.h} ${t.p}`, answer: `<strong>Tip: ${esc(t.h)}</strong><br>${esc(t.p)}`, followups: ["Give me another tip"] }));
  SQL_BLOCKS.forEach(b => idx.push({ type: "SQL", tab: "sql", title: b.title, text: `sql query ${b.title} ${b.desc}`, answer: `<strong>${esc(b.title)}</strong><br>${esc(b.desc)}<pre style="white-space:pre-wrap;font-size:11px;">${esc(b.sql.slice(0, 600))}${b.sql.length > 600 ? "…" : ""}</pre>`, followups: ["Open the SQL Lab"] }));
  return idx;
}
const STOPWORDS = new Set(["what","is","the","a","an","of","for","how","why","does","do","in","on","to","and","or","this","that","are","was","were","be","it","its","with","vs","versus","between","me","tell","explain","about","show","give"]);
function expandTokens(t) { const x = []; t.forEach(w => { if (SYNONYMS[w]) x.push(...SYNONYMS[w]); }); return t.concat(x.map(s => s.toLowerCase())); }
function tokenize(s) { return s.toLowerCase().replace(/[^a-z0-9%\s]/g, " ").split(/\s+/).filter(w => w && !STOPWORDS.has(w)); }
function findByExactTitle(title, index) { return index.find(e => e.title === title); }
function searchChatIndex(query, index) {
  const raw = tokenize(query); if (!raw.length) return [];
  const toks = expandTokens(raw); const ql = query.toLowerCase();
  return index.map(e => {
    const tl = e.title.toLowerCase(), xl = e.text.toLowerCase(); let s = 0;
    toks.forEach(t => { if (tl.includes(t)) s += 3; else if (xl.includes(t)) s += 1; });
    if (ql.length > 3 && tl.includes(ql)) s += 5; return { e, s };
  }).filter(r => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 3).map(r => r.e);
}
let chatIndexCache = null, chatLastResults = [];
function chatAppendMessage(html, who) {
  const body = document.getElementById("chat-panel-body"); const row = el("div", "chat-msg " + who);
  row.innerHTML = `<div class="chat-bubble">${html}</div>`; body.appendChild(row); body.scrollTop = body.scrollHeight; return row;
}
function chatAppendFollowups(fu) {
  if (!fu || !fu.length) return; const body = document.getElementById("chat-panel-body"); const w = el("div", "chat-followups");
  fu.slice(0, 3).forEach(f => { const c = el("button", "chat-followup-chip", esc(f)); c.type = "button"; c.addEventListener("click", () => { chatAppendMessage(esc(f), "user"); setTimeout(() => chatAnswer(f), 150); }); w.appendChild(c); });
  body.appendChild(w); body.scrollTop = body.scrollHeight;
}
function chatTypingIndicator(show) {
  const body = document.getElementById("chat-panel-body"); let i = document.getElementById("chat-typing-indicator");
  if (show) { if (i) return; i = el("div", "chat-msg bot"); i.id = "chat-typing-indicator"; i.innerHTML = `<div class="chat-bubble chat-typing"><span></span><span></span><span></span></div>`; body.appendChild(i); body.scrollTop = body.scrollHeight; }
  else if (i) i.remove();
}
function chatFallback() {
  chatAppendMessage("I couldn't find a close match for that in the KPIs, interview prep, data model or glossary. Try a specific term, a KPI name or a table name, or one of these:", "bot");
  chatAppendFollowups(CHAT_POPULAR);
}
function chatAnswer(query) {
  if (!chatIndexCache) chatIndexCache = buildChatIndex();
  const bare = query.trim().toLowerCase().replace(/[?!.]/g, "");
  if (["why", "example", "give an example", "more"].includes(bare) && chatLastResults.length) query = chatLastResults[0].title;
  if (/open the sql lab/i.test(query)) { switchView("sql"); return; }
  if (/scenario question/i.test(query)) { const sc = QA.filter(q => q.cat === "Scenario-Based"); const p = sc[Math.floor(Math.random() * sc.length)]; query = p.q; }
  let forced = null;
  for (const r of INTENT_RULES) { if (r.re.test(query)) { forced = findByExactTitle(r.title, chatIndexCache); if (forced) break; } }
  const results = forced ? [forced] : searchChatIndex(query, chatIndexCache);
  if (!results.length) { chatFallback(); return; }
  chatLastResults = results;
  results.forEach(r => {
    const bid = "chat-a-" + Math.random().toString(36).slice(2, 9);
    const row = chatAppendMessage(`<div id="${bid}">${r.answer}</div><br><button type="button" class="chat-link-btn" data-tab="${r.tab}">Open ${VIEW_LABELS[r.tab] || r.tab} →</button><button type="button" class="chat-copy-btn">Copy</button>`, "bot");
    row.querySelector(".chat-link-btn").addEventListener("click", () => switchView(r.tab));
    const cb = row.querySelector(".chat-copy-btn"); cb.addEventListener("click", () => copyText(document.getElementById(bid).innerText, cb, "Copy"));
    chatAppendFollowups(r.followups);
  });
}
function initChatWidget() {
  const fab = document.getElementById("chat-fab"), panel = document.getElementById("chat-panel"), close = document.getElementById("chat-panel-close");
  const form = document.getElementById("chat-panel-form"), input = document.getElementById("chat-input"), label = document.getElementById("chat-fab-label");
  if (!fab || !panel || !form) return;
  fab.addEventListener("click", () => { panel.classList.toggle("open"); if (panel.classList.contains("open")) { input.focus(); if (label) label.classList.add("hide"); renderQuickReplies(); } });
  close.addEventListener("click", () => { panel.classList.remove("open"); if (label) label.classList.remove("hide"); });
  form.addEventListener("submit", (e) => { e.preventDefault(); const q = input.value.trim(); if (!q) return; chatAppendMessage(esc(q), "user"); input.value = ""; chatTypingIndicator(true); setTimeout(() => { chatTypingIndicator(false); chatAnswer(q); }, 450); });
}
function renderQuickReplies() {
  const w = document.getElementById("chat-quick-replies"); if (!w) return;
  const pick = [...QUICK_REPLY_POOL].sort(() => Math.random() - 0.5).slice(0, 5);
  w.innerHTML = pick.map(q => `<button type="button" data-quick="${esc(q)}">${esc(q)}</button>`).join("");
  w.querySelectorAll("button").forEach(b => b.addEventListener("click", () => { chatAppendMessage(esc(b.dataset.quick), "user"); setTimeout(() => chatAnswer(b.dataset.quick), 150); }));
}

/* ============================================================
   Bookmarks + deep links
   ============================================================ */
const BOOKMARK_KEY = "swiggy_da_bookmarks_v1";
function getBookmarks() { try { const r = JSON.parse(lsGet(BOOKMARK_KEY)); return r && r.kpi && r.qa ? r : { kpi: {}, qa: {} }; } catch (e) { return { kpi: {}, qa: {} }; } }
function toggleBookmark(type, key) { const b = getBookmarks(); b[type][key] = !b[type][key]; if (!b[type][key]) delete b[type][key]; lsSet(BOOKMARK_KEY, JSON.stringify(b)); }
function copyDeepLink(type, key) {
  const url = `${location.origin}${location.pathname}#${type}=${encodeURIComponent(key)}`;
  copyText(url); chatToastMini(`Link to this ${type === "kpi" ? "KPI" : "question"} copied. Paste it anywhere to jump straight here.`);
}
function chatToastMini(msg) {
  let t = document.getElementById("mini-toast");
  if (!t) { t = el("div"); t.id = "mini-toast"; t.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--ink);color:var(--paper);padding:10px 18px;border-radius:8px;font-size:12.5px;z-index:1000;box-shadow:0 8px 24px rgba(0,0,0,0.3);opacity:0;transition:opacity 0.25s;"; document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity = "1"; clearTimeout(t._t); t._t = setTimeout(() => { t.style.opacity = "0"; }, 2400);
}
function handleDeepLink() {
  const hash = location.hash.slice(1); if (!hash) return;
  const [type, raw] = hash.split("="); if (!type || !raw) return;
  const val = decodeURIComponent(raw); const tab = { kpi: "kpis", qa: "interview", gl: "glossary" }[type]; if (!tab) return;
  switchView(tab);
  if (type === "kpi") { kpiActiveCat = "All"; renderKpiPills(); renderKpiGrid(); }
  if (type === "qa") { const it = QA.find(q => q.q === val); if (it) { qaActiveCat = it.cat; renderQaTabs(); renderQaList(); } }
  setTimeout(() => {
    const target = document.getElementById((type === "kpi" ? "kpi-" : type === "qa" ? "qa-" : "gl-") + slugify(val)); if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" }); target.classList.add("deep-link-flash");
    if (type === "qa") { target.classList.add("open"); const a = target.querySelector(".qa-a"); if (a) a.style.maxHeight = a.scrollHeight + "px"; }
    setTimeout(() => target.classList.remove("deep-link-flash"), 1900);
  }, 120);
}

/* ============================================================
   Dark mode + streak
   ============================================================ */
const THEME_KEY = "swiggy_da_theme_v1";
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle"), icon = document.getElementById("theme-toggle-icon"), label = document.getElementById("theme-toggle-label");
  if (!btn) return;
  const apply = (dark) => { document.body.classList.toggle("dark-mode", dark); if (icon) icon.textContent = dark ? "☀️" : "🌙"; if (label) label.textContent = dark ? "Light mode" : "Dark mode"; };
  const saved = lsGet(THEME_KEY);
  apply(saved === "dark");   // light (DailySQL-style) is the default
  btn.addEventListener("click", () => { const d = !document.body.classList.contains("dark-mode"); apply(d); lsSet(THEME_KEY, d ? "dark" : "light"); });
}
const STREAK_KEY = "swiggy_da_visit_days_v1";
function updateStreak() {
  const badge = document.getElementById("streak-badge"); if (!badge) return;
  let days = []; try { days = JSON.parse(lsGet(STREAK_KEY)) || []; } catch (e) {}
  const today = new Date().toISOString().slice(0, 10);
  if (!days.includes(today)) { days.push(today); lsSet(STREAK_KEY, JSON.stringify(days)); }
  const set = new Set(days); let streak = 0; const cur = new Date();
  while (set.has(cur.toISOString().slice(0, 10))) { streak++; cur.setDate(cur.getDate() - 1); }
  badge.innerHTML = `<span class="flame">🔥</span> <b>${streak}</b>-day study streak · ${days.length} total visit${days.length === 1 ? "" : "s"}`;
}

/* ============================================================
   Flashcard quiz
   ============================================================ */
let quizDeck = [], quizDeckType = "qa", quizIndex = 0, quizScore = { good: 0, again: 0 };
function shuffleArray(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function startQuiz(type) {
  let deck;
  if (type === "kpi") deck = KPIS.map(k => ({ q: k.name, a: `${esc(k.q)}<br>${esc(k.desc)}<code style="display:block;margin-top:8px;font-size:12px;">${esc(k.plain)}</code>`, cat: k.cat }));
  else if (type === "glossary") deck = GLOSSARY.map(g => ({ q: g.t, a: esc(g.d), cat: "Glossary" }));
  else { const bm = getBookmarks(); const st = QA.filter(q => bm.qa[q.q]); deck = st.length >= 5 ? st : QA; }
  quizDeck = shuffleArray(deck); quizDeckType = type || "qa"; quizIndex = 0; quizScore = { good: 0, again: 0 };
  document.getElementById("quiz-overlay").classList.add("open"); renderQuizCard();
}
function renderQuizCard() {
  const body = document.getElementById("quiz-body");
  if (quizIndex >= quizDeck.length) {
    const total = quizScore.good + quizScore.again;
    body.innerHTML = `<div class="quiz-done"><div class="big-score">${quizScore.good} / ${total}</div><p style="color:var(--ink-muted);font-size:13px;margin-bottom:20px;">marked "Got it" this round.</p><button class="btn-dark" id="quiz-restart">Run again</button></div>`;
    document.getElementById("quiz-restart").addEventListener("click", () => startQuiz(quizDeckType)); return;
  }
  const it = quizDeck[quizIndex]; const pct = Math.round(quizIndex / quizDeck.length * 100);
  body.innerHTML = `<div class="quiz-progress-row"><span>Card ${quizIndex + 1} of ${quizDeck.length}</span><span>${esc(it.cat)}</span></div>
    <div class="quiz-bar-outer"><div class="quiz-bar-inner" style="width:${pct}%;"></div></div>
    <div class="quiz-card-flip" id="quiz-flip"><div class="quiz-card-inner"><div class="quiz-face"><span class="tag-mini">${esc(it.cat)}</span><div class="qtxt">${esc(it.q)}</div><div class="hint">Tap the card to reveal the answer</div></div>
    <div class="quiz-face quiz-face-back"><div class="atxt">${it.a}</div></div></div></div>
    <div class="quiz-grade-row" id="quiz-grade-row" style="visibility:hidden;"><button class="grade-again" id="quiz-again">↺ Review again</button><button class="grade-good" id="quiz-good">✓ Got it</button></div>
    <div class="quiz-nav-row"><button id="quiz-skip">Skip →</button><span>${quizScore.good} got it · ${quizScore.again} to review</span></div>`;
  const flip = document.getElementById("quiz-flip"), gr = document.getElementById("quiz-grade-row");
  flip.addEventListener("click", () => { flip.classList.toggle("flipped"); gr.style.visibility = flip.classList.contains("flipped") ? "visible" : "hidden"; });
  document.getElementById("quiz-again").addEventListener("click", (e) => { e.stopPropagation(); quizScore.again++; quizIndex++; renderQuizCard(); });
  document.getElementById("quiz-good").addEventListener("click", (e) => { e.stopPropagation(); quizScore.good++; quizIndex++; renderQuizCard(); });
  document.getElementById("quiz-skip").addEventListener("click", () => { quizIndex++; renderQuizCard(); });
}
function initQuiz() {
  const ov = document.getElementById("quiz-overlay");
  document.getElementById("quiz-launch-btn").addEventListener("click", () => startQuiz("qa"));
  document.getElementById("quiz-close").addEventListener("click", () => ov.classList.remove("open"));
  ov.addEventListener("click", (e) => { if (e.target === ov) ov.classList.remove("open"); });
  document.getElementById("kpi-quiz-launch-btn").addEventListener("click", () => startQuiz("kpi"));
  document.getElementById("gl-quiz-launch-btn").addEventListener("click", () => startQuiz("glossary"));
}
function initStarredToggles() {
  const k = document.getElementById("kpi-starred-toggle"), q = document.getElementById("qa-starred-toggle");
  k.addEventListener("click", () => { kpiStarredOnly = !kpiStarredOnly; k.classList.toggle("active", kpiStarredOnly); renderKpiGrid(); });
  q.addEventListener("click", () => { qaStarredOnly = !qaStarredOnly; q.classList.toggle("active", qaStarredOnly); renderQaList(); });
}

/* ============================================================
   Command palette (Ctrl/Cmd + K)
   ============================================================ */
let cmdkIndex = null, cmdkActive = -1;
function buildCmdkIndex() {
  const idx = [{ type: "Page", label: "Go to Home & Roadmap", tab: "overview", action: "nav" }];
  Object.entries(VIEW_LABELS).forEach(([tab, label]) => idx.push({ type: "Page", label: "Go to " + label, tab, action: "nav" }));
  KPIS.forEach(k => idx.push({ type: "KPI", label: k.name, action: "kpi", key: k.name }));
  QA.forEach(q => idx.push({ type: "Q&A", label: q.q, action: "qa", key: q.q }));
  GLOSSARY.forEach(g => idx.push({ type: "Term", label: g.t, action: "gl", key: g.t }));
  assignments().forEach(a => idx.push({ type: "Assignment", label: a.t, tab: "assignments", action: "nav" }));
  return idx;
}
function openCmdk() { if (!cmdkIndex) cmdkIndex = buildCmdkIndex(); const ov = document.getElementById("cmdk-overlay"), inp = document.getElementById("cmdk-input"); ov.classList.add("open"); inp.value = ""; inp.focus(); renderCmdkResults(""); }
function closeCmdk() { document.getElementById("cmdk-overlay").classList.remove("open"); }
function renderCmdkResults(query) {
  const wrap = document.getElementById("cmdk-results"); const q = query.trim().toLowerCase();
  const results = !q ? cmdkIndex.filter(r => r.type === "Page") : cmdkIndex.filter(r => r.label.toLowerCase().includes(q)).slice(0, 30);
  cmdkActive = results.length ? 0 : -1;
  if (!results.length) { wrap.innerHTML = `<div class="cmdk-empty">No matches. Try a different term.</div>`; wrap._results = []; return; }
  wrap.innerHTML = results.map((r, i) => `<button class="cmdk-item${i === 0 ? " active" : ""}" data-idx="${i}"><span class="cmdk-type">${r.type}</span><span class="cmdk-label">${esc(r.label)}</span></button>`).join("");
  wrap.querySelectorAll(".cmdk-item").forEach(b => {
    b.addEventListener("click", () => selectCmdkResult(results[+b.dataset.idx]));
    b.addEventListener("mouseenter", () => { wrap.querySelectorAll(".cmdk-item").forEach(x => x.classList.remove("active")); b.classList.add("active"); cmdkActive = +b.dataset.idx; });
  });
  wrap._results = results;
}
function selectCmdkResult(r) {
  closeCmdk();
  if (r.action === "nav") { switchView(r.tab); return; }
  location.hash = r.action + "=" + encodeURIComponent(r.key); handleDeepLink();
}
function initCmdk() {
  const hint = document.getElementById("cmdk-fab-hint"), ov = document.getElementById("cmdk-overlay"), inp = document.getElementById("cmdk-input");
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const kl = document.getElementById("cmdk-kbd-label"); if (kl && isMac) kl.textContent = "⌘ K";
  if (hint) hint.addEventListener("click", openCmdk);
  ov.addEventListener("click", (e) => { if (e.target === ov) closeCmdk(); });
  document.addEventListener("keydown", (e) => {
    const mod = isMac ? e.metaKey : e.ctrlKey;
    if (mod && e.key.toLowerCase() === "k") { e.preventDefault(); ov.classList.contains("open") ? closeCmdk() : openCmdk(); return; }
    if (!ov.classList.contains("open")) return;
    const results = document.getElementById("cmdk-results")._results || [];
    if (e.key === "Escape") closeCmdk();
    else if (e.key === "ArrowDown") { e.preventDefault(); cmdkActive = Math.min(cmdkActive + 1, results.length - 1); hl(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); cmdkActive = Math.max(cmdkActive - 1, 0); hl(); }
    else if (e.key === "Enter") { e.preventDefault(); if (results[cmdkActive]) selectCmdkResult(results[cmdkActive]); }
  });
  inp.addEventListener("input", () => renderCmdkResults(inp.value));
  function hl() { const w = document.getElementById("cmdk-results"); w.querySelectorAll(".cmdk-item").forEach((b, i) => b.classList.toggle("active", i === cmdkActive)); const a = w.querySelector(".cmdk-item.active"); if (a) a.scrollIntoView({ block: "nearest" }); }
}

/* ============================================================
   Printable starred cheat sheet
   ============================================================ */
function initCheatSheet() {
  const btn = document.getElementById("cheatsheet-btn"); if (!btn) return;
  btn.addEventListener("click", () => {
    const bm = getBookmarks(); const ks = KPIS.filter(k => bm.kpi[k.name]); const qs = QA.filter(q => bm.qa[q.q]);
    if (!ks.length && !qs.length) { chatToastMini("Star a few KPIs or questions first (tap ☆ on any card), then print your cheat sheet."); return; }
    document.getElementById("print-sheet").innerHTML = `<h1>Swiggy Data Analytics Capstone: My Cheat Sheet</h1><p style="color:#666;font-size:11px;margin-bottom:16px;">Generated from starred items · ${new Date().toLocaleDateString()}</p>
      ${ks.length ? `<h3>KPIs (${ks.length})</h3>` + ks.map(k => `<div class="ps-item"><h4>${esc(k.name)}</h4><p>${esc(k.desc)}</p><code>${esc(k.plain)}</code></div>`).join("") : ""}
      ${qs.length ? `<h3 style="margin-top:16px;">Interview Questions (${qs.length})</h3>` + qs.map(q => `<div class="ps-item"><h4>${esc(q.q)}</h4><p>${q.a}</p></div>`).join("") : ""}`;
    setTimeout(() => window.print(), 80);
  });
}

/* ============================================================
   Boot — each step isolated so one failure doesn't stop the page
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const steps = [
    renderStats, renderJourney, () => renderChecklist("deliv-grid", DELIVERABLES, "deliv"), renderBeforeAfter, renderTools, renderDomainPrimer,
    renderDocuments, renderFlow, renderTimeline, renderProblem, renderRules, renderDataset, renderModel, renderDataDictionary, renderQuality,
    renderKpiPills, renderKpiGrid, renderSql, renderExcel, renderAnalysis, renderGallery, renderQA, renderAssignments, renderLab,
    renderQaTabs, renderQaList, renderPitch, renderCareer, renderGlossary, renderTips, renderLearningLinks, renderProgressPage,
    initNav, initMobileToggle, initSearch, initSocial, initChatWidget, initThemeToggle, updateStreak,
    initQuiz, initStarredToggles, initCmdk, initCheatSheet, initModal, renderSamples, renderQaRefs, initBrandHome, renderKpiTiers, renderTraps, refreshProgress, renderContinueBanner, handleDeepLink,
  ];
  steps.forEach(fn => { try { fn(); } catch (e) { console.error("Boot step failed:", fn.name || "(anonymous)", e); } });
  window.addEventListener("hashchange", handleDeepLink);
});

/* ============================================================
   One-page KPI cheat sheet (Swiggy Data Analytics Capstone)
   ============================================================ */
function printKpiCheatSheet() {
  const rows = KPI_CATS.filter(c => c !== "All").map(cat => {
    const items = KPIS.filter(k => k.cat === cat).map(k => `
      <div class="cs-item"><div class="cs-name">${esc(k.name)} <span class="cs-tier">${k.prio}</span></div>
        <div class="cs-formula">${esc(k.formula)}</div><div class="cs-def">${esc(k.plain)} · <b>Answer: ${esc(k.v25)}</b></div></div>`).join("");
    return `<h2>${cat} Dashboard KPIs</h2><div class="cs-col">${items}</div>`;
  }).join("");
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Swiggy Data Analytics Capstone — KPI Cheat Sheet</title>
  <style>@page { size: A4; margin: 10mm; } * { box-sizing: border-box; } body { font-family: Arial, Helvetica, sans-serif; color: #1A1D21; margin: 0; }
  .cs-header { text-align: center; margin-bottom: 10px; } .cs-header h1 { font-size: 16px; margin: 0 0 2px; } .cs-header p { font-size: 10px; color: #666; margin: 0; }
  .cs-wrap { column-count: 2; column-gap: 18px; } h2 { font-size: 12px; text-transform: uppercase; border-bottom: 1.5px solid #333; padding-bottom: 3px; margin: 10px 0 6px; break-after: avoid; }
  .cs-item { break-inside: avoid; margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px dotted #ccc; } .cs-name { font-size: 10.5px; font-weight: 700; }
  .cs-tier { font-size: 8px; background: #E6F3FA; color: #0A5A87; padding: 1px 4px; border-radius: 3px; } .cs-formula { font-family: 'Courier New', monospace; font-size: 9px; color: #0E6E9E; margin: 1px 0; }
  .cs-def { font-size: 9px; color: #444; line-height: 1.3; }</style></head><body>
  <div class="cs-header"><h1>Swiggy Data Analytics Capstone — KPI Cheat Sheet (${KPIS.length} KPIs)</h1><p>by Mahendra Singh · Data Analyst Trainer, ExcelR · 10,000 orders · on-time = Delivery Status "On Time" · cancellation = Orders.Status · repeat = customers with more than one order</p></div>
  <div class="cs-wrap">${rows}</div></body></html>`;
  const win = window.open("", "_blank");
  if (!win) { chatToastMini("Please allow pop-ups to print the cheat sheet."); return; }
  win.document.open(); win.document.write(html); win.document.close(); win.focus();
  setTimeout(() => win.print(), 300);
}
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("print-cheatsheet-btn");
  if (btn) btn.addEventListener("click", printKpiCheatSheet);
});

/* ============================================================
   Live SQL Practice Editor (in-browser SQLite via sql.js) +
   "Today's 3 problems" daily challenge (DailySQL-style).
   ============================================================ */
const PRACTICE_PROBLEMS = [
 {
  "id": "e1",
  "topic": "Aggregations",
  "level": "Easy",
  "mins": 3,
  "t": "Headline order KPIs",
  "tables": [
   "orders"
  ],
  "task": "Return one row with total_orders, total_revenue (sum of total_amount), net_revenue (sum of final_amount_paid) and aov (total_revenue ÷ total_orders, 2 decimals). Columns in that order.",
  "hint": "COUNT(*), two SUMs and one ratio. Revenue on the KPI sheet is the gross total_amount; final_amount_paid is after discounts. Multiply by 1.0 (or use 100.0-style literals) so the AOV division is not integer division.",
  "sol": "SELECT COUNT(*) AS total_orders,\n       SUM(total_amount) AS total_revenue,\n       SUM(final_amount_paid) AS net_revenue,\n       ROUND(1.0 * SUM(total_amount) / COUNT(*), 2) AS aov\nFROM orders;"
 },
 {
  "id": "e2",
  "topic": "Aggregations",
  "level": "Easy",
  "mins": 3,
  "t": "Registered vs ordering customers",
  "tables": [
   "customers",
   "orders"
  ],
  "task": "Return registered_customers (rows in customers), ordering_customers (distinct customer_id in orders) and never_ordered (the difference). Columns in that order.",
  "hint": "Two scalar subqueries: SELECT COUNT(*) FROM customers and SELECT COUNT(DISTINCT customer_id) FROM orders. Total Customers on the dashboard should use the ordering customers, not the registered ones.",
  "sol": "SELECT (SELECT COUNT(*) FROM customers) AS registered_customers,\n       (SELECT COUNT(DISTINCT customer_id) FROM orders) AS ordering_customers,\n       (SELECT COUNT(*) FROM customers) - (SELECT COUNT(DISTINCT customer_id) FROM orders) AS never_ordered;"
 },
 {
  "id": "e3",
  "topic": "Aggregations",
  "level": "Easy",
  "mins": 3,
  "t": "Order status split",
  "tables": [
   "orders"
  ],
  "task": "Using the status column of orders: status, orders and pct_of_orders (share of all orders, 2 decimals). Most orders first, ties by status A to Z.",
  "hint": "GROUP BY status. The denominator is all orders: a scalar subquery (SELECT COUNT(*) FROM orders) or SUM(COUNT(*)) OVER ().",
  "sol": "SELECT status, COUNT(*) AS orders,\n       ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM orders), 2) AS pct_of_orders\nFROM orders\nGROUP BY status\nORDER BY orders DESC, status;"
 },
 {
  "id": "e4",
  "topic": "Conditional Logic",
  "level": "Easy",
  "mins": 4,
  "t": "Two status columns, two cancellation rates",
  "tables": [
   "orders"
  ],
  "task": "orders has two status columns. Return status_cancel_pct (% of orders with status = 'Cancelled'), order_status_cancel_pct (% with order_status = 'Cancelled') and agree_pct (% of orders where status = order_status), all 2 decimals.",
  "hint": "Three AVG(CASE WHEN ... THEN 1 ELSE 0 END) × 100 expressions. The KPI sheet's Cancellation Rate uses status; say which column you used whenever you quote the number.",
  "sol": "SELECT ROUND(100.0 * AVG(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END), 2) AS status_cancel_pct,\n       ROUND(100.0 * AVG(CASE WHEN order_status = 'Cancelled' THEN 1 ELSE 0 END), 2) AS order_status_cancel_pct,\n       ROUND(100.0 * AVG(CASE WHEN status = order_status THEN 1 ELSE 0 END), 2) AS agree_pct\nFROM orders;"
 },
 {
  "id": "e5",
  "topic": "Filtering",
  "level": "Easy",
  "mins": 4,
  "t": "Delivery efficiency: the 'Delivered' trap",
  "tables": [
   "delivery"
  ],
  "task": "Return delivered_rows (deliveries with delivery_status = 'Delivered', as the KPI sheet filters), ontime_pct (% of all deliveries with delivery_status = 'On Time') and ontime_pct_excl_cancelled (% On Time among deliveries that are not 'Cancelled'), both % to 2 decimals.",
  "hint": "Run SELECT DISTINCT delivery_status first: there is no 'Delivered' value. For the second rate put the CASE inside AVG but return NULL for cancelled rows so they leave the denominator.",
  "sol": "SELECT SUM(CASE WHEN delivery_status = 'Delivered' THEN 1 ELSE 0 END) AS delivered_rows,\n       ROUND(100.0 * AVG(CASE WHEN delivery_status = 'On Time' THEN 1 ELSE 0 END), 2) AS ontime_pct,\n       ROUND(100.0 * AVG(CASE WHEN delivery_status <> 'Cancelled' THEN CASE WHEN delivery_status = 'On Time' THEN 1 ELSE 0 END END), 2) AS ontime_pct_excl_cancelled\nFROM delivery;"
 },
 {
  "id": "e6",
  "topic": "Filtering",
  "level": "Easy",
  "mins": 3,
  "t": "Customer Satisfaction Score without the zeros",
  "tables": [
   "delivery"
  ],
  "task": "From delivery_feedback_rating return zero_ratings (rows equal to 0), css_with_zeros (average over all rows) and css (average excluding the 0s), both averages to 2 decimals.",
  "hint": "A 0 means no rating was given (it appears on cancelled deliveries), so it should not drag the average down. AVG(CASE WHEN rating > 0 THEN rating END) ignores the NULLs the CASE returns.",
  "sol": "SELECT SUM(CASE WHEN delivery_feedback_rating = 0 THEN 1 ELSE 0 END) AS zero_ratings,\n       ROUND(AVG(delivery_feedback_rating), 2) AS css_with_zeros,\n       ROUND(AVG(CASE WHEN delivery_feedback_rating > 0 THEN delivery_feedback_rating END), 2) AS css\nFROM delivery;"
 },
 {
  "id": "e7",
  "topic": "Dates",
  "level": "Easy",
  "mins": 4,
  "t": "Peak hours from pickup time",
  "tables": [
   "delivery"
  ],
  "task": "orders.order_date has no time of day, so use the hour of delivery.pickup_time (characters 12-13, e.g. '14'). Return pickup_hour and deliveries for the 5 busiest hours, most deliveries first, ties by pickup_hour.",
  "hint": "SUBSTR(pickup_time, 12, 2) AS pickup_hour, GROUP BY it, ORDER BY the count DESC, LIMIT 5. The counts are close together: report the pattern honestly as fairly flat.",
  "sol": "SELECT SUBSTR(pickup_time, 12, 2) AS pickup_hour, COUNT(*) AS deliveries\nFROM delivery\nGROUP BY pickup_hour\nORDER BY deliveries DESC, pickup_hour\nLIMIT 5;"
 },
 {
  "id": "e8",
  "topic": "Aggregations",
  "level": "Easy",
  "mins": 3,
  "t": "Food categories from the menu",
  "tables": [
   "menu"
  ],
  "task": "There is no order-items table, so Top Food Categories has to come from the menu. Per category: category, menu_items and avg_price (2 decimals). Most items first, ties by category.",
  "hint": "GROUP BY category on menu alone. Joining orders to menu on restaurant_id multiplies every order by every item of its restaurant, so order counts by category are not possible.",
  "sol": "SELECT category, COUNT(*) AS menu_items, ROUND(AVG(price), 2) AS avg_price\nFROM menu\nGROUP BY category\nORDER BY menu_items DESC, category;"
 },
 {
  "id": "m1",
  "topic": "Subqueries",
  "level": "Medium",
  "mins": 7,
  "t": "Repeat Customer %: KPI-sheet filter vs correct",
  "tables": [
   "orders"
  ],
  "task": "Return wrong_repeat_pct (% of ordering customers with at least one order where orderid > 1, the KPI sheet's filter), repeat_customers (customers with more than one order) and repeat_pct (repeat_customers ÷ ordering customers × 100). Both % to 2 decimals.",
  "hint": "Count orders per customer in a subquery: COUNT(*) AS n and MAX(orderid) AS max_id. A repeat customer has n > 1; the orderid filter is true for almost everyone because OrderID is just a running number.",
  "sol": "SELECT ROUND(100.0 * SUM(CASE WHEN max_id > 1 THEN 1 ELSE 0 END) / COUNT(*), 2) AS wrong_repeat_pct,\n       SUM(CASE WHEN n > 1 THEN 1 ELSE 0 END) AS repeat_customers,\n       ROUND(100.0 * SUM(CASE WHEN n > 1 THEN 1 ELSE 0 END) / COUNT(*), 2) AS repeat_pct\nFROM (SELECT customer_id, COUNT(*) AS n, MAX(orderid) AS max_id\n      FROM orders\n      GROUP BY customer_id) c;"
 },
 {
  "id": "m2",
  "topic": "Joins",
  "level": "Medium",
  "mins": 5,
  "t": "Revenue by city",
  "tables": [
   "orders",
   "restaurant"
  ],
  "task": "Per restaurant location: city, orders, revenue (sum of total_amount) and aov (2 decimals). Highest revenue first, ties by city.",
  "hint": "JOIN restaurant ON restaurant.restaurantid = orders.restaurant_id and group by location. Use the location column, not the city text inside restaurant_name (it often names a different city).",
  "sol": "SELECT r.location AS city, COUNT(*) AS orders, SUM(o.total_amount) AS revenue,\n       ROUND(1.0 * SUM(o.total_amount) / COUNT(*), 2) AS aov\nFROM orders o\nJOIN restaurant r ON r.restaurantid = o.restaurant_id\nGROUP BY r.location\nORDER BY revenue DESC, city;"
 },
 {
  "id": "m3",
  "topic": "Joins",
  "level": "Medium",
  "mins": 6,
  "t": "Cancellation rate by city",
  "tables": [
   "orders",
   "restaurant"
  ],
  "task": "Per restaurant location: city, orders, cancelled (status = 'Cancelled') and cancel_pct (2 decimals). Highest cancel_pct first, ties by city.",
  "hint": "Same join as revenue by city. SUM(CASE WHEN o.status = 'Cancelled' THEN 1 ELSE 0 END) for the count, divide by COUNT(*) × 100.0 for the rate.",
  "sol": "SELECT r.location AS city, COUNT(*) AS orders,\n       SUM(CASE WHEN o.status = 'Cancelled' THEN 1 ELSE 0 END) AS cancelled,\n       ROUND(100.0 * SUM(CASE WHEN o.status = 'Cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancel_pct\nFROM orders o\nJOIN restaurant r ON r.restaurantid = o.restaurant_id\nGROUP BY r.location\nORDER BY cancel_pct DESC, city;"
 },
 {
  "id": "m4",
  "topic": "Joins",
  "level": "Medium",
  "mins": 7,
  "t": "Cuisine scorecard: cancellations and on-time",
  "tables": [
   "orders",
   "restaurant",
   "delivery"
  ],
  "task": "Per cuisine_type: orders, cancel_pct (orders.status = 'Cancelled') and ontime_pct (delivery.delivery_status = 'On Time'), both 2 decimals. Order by cuisine_type A to Z.",
  "hint": "Three tables: orders → restaurant on restaurant_id, orders → delivery on delivery.order_id = orders.orderid (one delivery per order, so the count is not inflated).",
  "sol": "SELECT r.cuisine_type, COUNT(*) AS orders,\n       ROUND(100.0 * AVG(CASE WHEN o.status = 'Cancelled' THEN 1 ELSE 0 END), 2) AS cancel_pct,\n       ROUND(100.0 * AVG(CASE WHEN d.delivery_status = 'On Time' THEN 1 ELSE 0 END), 2) AS ontime_pct\nFROM orders o\nJOIN restaurant r ON r.restaurantid = o.restaurant_id\nJOIN delivery d ON d.order_id = o.orderid\nGROUP BY r.cuisine_type\nORDER BY r.cuisine_type;"
 },
 {
  "id": "m5",
  "topic": "Dates",
  "level": "Medium",
  "mins": 5,
  "t": "Monthly order trend",
  "tables": [
   "orders"
  ],
  "task": "Per month of order_date (as 'YYYY-MM'): order_month, orders, revenue (sum of total_amount) and aov (2 decimals). Earliest month first.",
  "hint": "SUBSTR(order_date, 1, 7) gives 'YYYY-MM'. The data runs from 28 March 2024 to 28 March 2025, so the first and last months are only a few days long.",
  "sol": "SELECT SUBSTR(order_date, 1, 7) AS order_month, COUNT(*) AS orders, SUM(total_amount) AS revenue,\n       ROUND(1.0 * SUM(total_amount) / COUNT(*), 2) AS aov\nFROM orders\nGROUP BY order_month\nORDER BY order_month;"
 },
 {
  "id": "m6",
  "topic": "Joins",
  "level": "Medium",
  "mins": 8,
  "t": "Three ways to join payments",
  "tables": [
   "orders",
   "payments"
  ],
  "task": "Compare join keys between payments and orders. Return join_method, matched_rows and amount_matches (matched rows where payments.amount = orders.final_amount_paid) for, in this order: 'text_to_int' (payments.orderid = orders.orderid), 'strip_ord' (CAST(SUBSTR(payments.orderid, 4) AS INTEGER) = orders.orderid), 'strip_minus_999' (the same minus 999) and 'payment_id' (payments.paymentid = orders.payment_id).",
  "hint": "Four SELECT ... FROM payments p JOIN orders o ON ... blocks glued with UNION ALL. Add a sort key column so the rows come back in the asked order. amount_matches tells you whether the join paired the right order, not just any order.",
  "sol": "SELECT join_method, matched_rows, amount_matches\nFROM (\n  SELECT 1 AS k, 'text_to_int' AS join_method, COUNT(*) AS matched_rows,\n         COALESCE(SUM(CASE WHEN p.amount = o.final_amount_paid THEN 1 ELSE 0 END), 0) AS amount_matches\n  FROM payments p JOIN orders o ON p.orderid = o.orderid\n  UNION ALL\n  SELECT 2, 'strip_ord', COUNT(*), SUM(CASE WHEN p.amount = o.final_amount_paid THEN 1 ELSE 0 END)\n  FROM payments p JOIN orders o ON CAST(SUBSTR(p.orderid, 4) AS INTEGER) = o.orderid\n  UNION ALL\n  SELECT 3, 'strip_minus_999', COUNT(*), SUM(CASE WHEN p.amount = o.final_amount_paid THEN 1 ELSE 0 END)\n  FROM payments p JOIN orders o ON CAST(SUBSTR(p.orderid, 4) AS INTEGER) - 999 = o.orderid\n  UNION ALL\n  SELECT 4, 'payment_id', COUNT(*), SUM(CASE WHEN p.amount = o.final_amount_paid THEN 1 ELSE 0 END)\n  FROM payments p JOIN orders o ON p.paymentid = o.payment_id\n)\nORDER BY k;"
 },
 {
  "id": "m7",
  "topic": "Joins",
  "level": "Medium",
  "mins": 8,
  "t": "Order ratings vs master rating by cuisine",
  "tables": [
   "ratings",
   "orders",
   "restaurant"
  ],
  "task": "Join ratings to orders with the ORD offset (CAST(SUBSTR(ratings.orderid, 4) AS INTEGER) - 999 = orders.orderid), then to restaurant. Per cuisine_type: rated_orders, avg_order_rating (ratings.rating) and avg_master_rating (restaurant.average_rating of those rows), both 2 decimals. Order by cuisine_type.",
  "hint": "Two different sources: ratings holds what customers gave each order; restaurant.average_rating is a master value. Show both side by side but never blend them into one number.",
  "sol": "SELECT r.cuisine_type, COUNT(*) AS rated_orders,\n       ROUND(AVG(rt.rating), 2) AS avg_order_rating,\n       ROUND(AVG(r.average_rating), 2) AS avg_master_rating\nFROM ratings rt\nJOIN orders o ON o.orderid = CAST(SUBSTR(rt.orderid, 4) AS INTEGER) - 999\nJOIN restaurant r ON r.restaurantid = o.restaurant_id\nGROUP BY r.cuisine_type\nORDER BY r.cuisine_type;"
 },
 {
  "id": "m8",
  "topic": "Joins",
  "level": "Medium",
  "mins": 7,
  "t": "Active delivery agents by vehicle",
  "tables": [
   "delivery_agent",
   "delivery"
  ],
  "task": "Per vehicle_type: agents_in_master, active_agents (agents with at least one row in delivery) and active_pct (2 decimals). Order by vehicle_type.",
  "hint": "LEFT JOIN delivery_agent to a subquery of SELECT DISTINCT delivery_agent_id FROM delivery, then COUNT(a.delivery_agentid) vs COUNT(active.delivery_agent_id). Joining the full delivery table instead would count agents many times.",
  "sol": "SELECT a.vehicle_type, COUNT(*) AS agents_in_master, COUNT(d.delivery_agent_id) AS active_agents,\n       ROUND(100.0 * COUNT(d.delivery_agent_id) / COUNT(*), 2) AS active_pct\nFROM delivery_agent a\nLEFT JOIN (SELECT DISTINCT delivery_agent_id FROM delivery) d ON d.delivery_agent_id = a.delivery_agentid\nGROUP BY a.vehicle_type\nORDER BY a.vehicle_type;"
 },
 {
  "id": "a1",
  "topic": "Window Functions",
  "level": "Advanced",
  "mins": 10,
  "t": "Monthly revenue: running total and MoM",
  "tables": [
   "orders"
  ],
  "task": "Per order_month ('YYYY-MM'): revenue, prev_month_revenue (NULL for the first month), mom_change_pct ((this − previous) ÷ previous × 100, 2 decimals) and running_revenue (cumulative). Earliest month first.",
  "hint": "Aggregate by SUBSTR(order_date, 1, 7) in a CTE, then LAG(revenue) OVER (ORDER BY order_month) and SUM(revenue) OVER (ORDER BY order_month). The partial first and last months make their MoM swings look extreme.",
  "sol": "WITH m AS (\n  SELECT SUBSTR(order_date, 1, 7) AS order_month, SUM(total_amount) AS revenue\n  FROM orders\n  GROUP BY order_month\n)\nSELECT order_month, revenue,\n       LAG(revenue) OVER (ORDER BY order_month) AS prev_month_revenue,\n       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY order_month)) / LAG(revenue) OVER (ORDER BY order_month), 2) AS mom_change_pct,\n       SUM(revenue) OVER (ORDER BY order_month) AS running_revenue\nFROM m\nORDER BY order_month;"
 },
 {
  "id": "a2",
  "topic": "Window Functions",
  "level": "Advanced",
  "mins": 11,
  "t": "Top 3 restaurants in each city",
  "tables": [
   "orders",
   "restaurant"
  ],
  "task": "Rank restaurants by revenue (sum of total_amount) within their location using ROW_NUMBER (ties go to the lower restaurantid). Return city, rnk, restaurantid, restaurant_name, orders and revenue for ranks 1-3. Order by city, then rnk.",
  "hint": "Sum per location + restaurant in a CTE, then ROW_NUMBER() OVER (PARTITION BY location ORDER BY revenue DESC, restaurantid). Filter rnk <= 3 in the outer query (a window result can't go in WHERE of the same SELECT).",
  "sol": "WITH rr AS (\n  SELECT r.location AS city, r.restaurantid, r.restaurant_name, COUNT(*) AS orders, SUM(o.total_amount) AS revenue\n  FROM orders o\n  JOIN restaurant r ON r.restaurantid = o.restaurant_id\n  GROUP BY r.location, r.restaurantid, r.restaurant_name\n), k AS (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY city ORDER BY revenue DESC, restaurantid) AS rnk FROM rr\n)\nSELECT city, rnk, restaurantid, restaurant_name, orders, revenue\nFROM k\nWHERE rnk <= 3\nORDER BY city, rnk;"
 },
 {
  "id": "a3",
  "topic": "Window Functions",
  "level": "Advanced",
  "mins": 12,
  "t": "Days between a customer's orders",
  "tables": [
   "orders"
  ],
  "task": "Number each customer's orders by order_date, then orderid. For every order after the first, take the days since that customer's previous order. Return order_seq (2, 3, ...), gaps (how many such orders) and avg_days_between (2 decimals). Order by order_seq.",
  "hint": "ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, orderid) and LAG(order_date) over the same window in a CTE. julianday(order_date) - julianday(prev_date) gives the days. Keep rows where the LAG is not NULL.",
  "sol": "WITH s AS (\n  SELECT customer_id, order_date,\n         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, orderid) AS order_seq,\n         LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, orderid) AS prev_date\n  FROM orders\n)\nSELECT order_seq, COUNT(*) AS gaps,\n       ROUND(AVG(julianday(order_date) - julianday(prev_date)), 2) AS avg_days_between\nFROM s\nWHERE prev_date IS NOT NULL\nGROUP BY order_seq\nORDER BY order_seq;"
 },
 {
  "id": "a4",
  "topic": "Window Functions",
  "level": "Advanced",
  "mins": 11,
  "t": "Customer spend quartiles",
  "tables": [
   "orders"
  ],
  "task": "Split ordering customers into 4 groups by total spend (sum of total_amount) with NTILE(4), highest spenders in quartile 1 (ties by customer_id). Per quartile: quartile, customers, min_spend, max_spend, revenue and revenue_share_pct (2 decimals). Order by quartile.",
  "hint": "Sum per customer in a CTE, then NTILE(4) OVER (ORDER BY spend DESC, customer_id). The share uses SUM(SUM(spend)) OVER () or a scalar subquery of all revenue.",
  "sol": "WITH c AS (\n  SELECT customer_id, SUM(total_amount) AS spend FROM orders GROUP BY customer_id\n), q AS (\n  SELECT *, NTILE(4) OVER (ORDER BY spend DESC, customer_id) AS quartile FROM c\n)\nSELECT quartile, COUNT(*) AS customers, MIN(spend) AS min_spend, MAX(spend) AS max_spend, SUM(spend) AS revenue,\n       ROUND(100.0 * SUM(spend) / (SELECT SUM(total_amount) FROM orders), 2) AS revenue_share_pct\nFROM q\nGROUP BY quartile\nORDER BY quartile;"
 },
 {
  "id": "a5",
  "topic": "CTEs & Unions",
  "level": "Advanced",
  "mins": 12,
  "t": "First-order cohorts",
  "tables": [
   "orders"
  ],
  "task": "Put each customer in the cohort of the month of their first order ('YYYY-MM'). Per cohort: cohort_month, new_customers, repeat_customers (more than one order in total) and repeat_pct (2 decimals). Earliest cohort first.",
  "hint": "One CTE per customer with MIN(order_date) and COUNT(*). Then GROUP BY SUBSTR(first_date, 1, 7). Late cohorts have had less time to come back, so their repeat % is naturally lower.",
  "sol": "WITH c AS (\n  SELECT customer_id, MIN(order_date) AS first_date, COUNT(*) AS n\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT SUBSTR(first_date, 1, 7) AS cohort_month, COUNT(*) AS new_customers,\n       SUM(CASE WHEN n > 1 THEN 1 ELSE 0 END) AS repeat_customers,\n       ROUND(100.0 * SUM(CASE WHEN n > 1 THEN 1 ELSE 0 END) / COUNT(*), 2) AS repeat_pct\nFROM c\nGROUP BY cohort_month\nORDER BY cohort_month;"
 },
 {
  "id": "a6",
  "topic": "CTEs & Unions",
  "level": "Advanced",
  "mins": 12,
  "t": "Data-quality audit",
  "tables": [
   "orders",
   "delivery",
   "delivery_agent",
   "customers"
  ],
  "task": "Build one check per row with UNION ALL. Return check_name and issue_rows for, in this order: 'discount_gt_total' (orders with discount_applied > total_amount), 'zero_paid' (final_amount_paid = 0), 'final_ne_total_minus_discount' (final_amount_paid <> total_amount − discount_applied), 'delivered_but_delivery_cancelled' (orders.status = 'Delivered' and delivery_status = 'Cancelled'), 'actual_before_pickup' (actual_delivery_time < pickup_time), 'agents_never_delivered' (agents in delivery_agent with no delivery) and 'customers_never_ordered'.",
  "hint": "Seven SELECT k, 'name', COUNT(*) ... blocks inside a CTE, then ORDER BY k. The timestamps are 'YYYY-MM-DD HH:MM:SS' text, so a plain < comparison works. Use NOT IN (SELECT ...) or LEFT JOIN ... IS NULL for the two 'never' checks.",
  "sol": "WITH checks AS (\n  SELECT 1 AS k, 'discount_gt_total' AS check_name, COUNT(*) AS issue_rows FROM orders WHERE discount_applied > total_amount\n  UNION ALL\n  SELECT 2, 'zero_paid', COUNT(*) FROM orders WHERE final_amount_paid = 0\n  UNION ALL\n  SELECT 3, 'final_ne_total_minus_discount', COUNT(*) FROM orders WHERE final_amount_paid <> total_amount - discount_applied\n  UNION ALL\n  SELECT 4, 'delivered_but_delivery_cancelled', COUNT(*) FROM orders o JOIN delivery d ON d.order_id = o.orderid\n    WHERE o.status = 'Delivered' AND d.delivery_status = 'Cancelled'\n  UNION ALL\n  SELECT 5, 'actual_before_pickup', COUNT(*) FROM delivery WHERE actual_delivery_time < pickup_time\n  UNION ALL\n  SELECT 6, 'agents_never_delivered', COUNT(*) FROM delivery_agent\n    WHERE delivery_agentid NOT IN (SELECT delivery_agent_id FROM delivery)\n  UNION ALL\n  SELECT 7, 'customers_never_ordered', COUNT(*) FROM customers\n    WHERE customer_id NOT IN (SELECT customer_id FROM orders)\n)\nSELECT check_name, issue_rows\nFROM checks\nORDER BY k;"
 },
 {
  "id": "a7",
  "topic": "CTEs & Unions",
  "level": "Advanced",
  "mins": 10,
  "t": "Customer value scorecard (CLV)",
  "tables": [
   "orders"
  ],
  "task": "One row: customers (ordering), orders_per_customer, aov, revenue_per_customer, repeat_pct and clv = aov × (repeat_pct ÷ 100) × orders_per_customer, the KPI sheet's formula. All to 2 decimals except customers; compute clv from the unrounded values.",
  "hint": "A per-customer CTE (COUNT(*) AS n, SUM(total_amount) AS spend), then one SELECT that builds every ratio from SUM(n), SUM(spend) and COUNT(*). Round only in the final SELECT so clv is not off by a few paise.",
  "sol": "WITH c AS (\n  SELECT customer_id, COUNT(*) AS n, SUM(total_amount) AS spend FROM orders GROUP BY customer_id\n), k AS (\n  SELECT COUNT(*) AS customers,\n         1.0 * SUM(n) / COUNT(*) AS opc,\n         1.0 * SUM(spend) / SUM(n) AS aov,\n         1.0 * SUM(spend) / COUNT(*) AS rpc,\n         100.0 * SUM(CASE WHEN n > 1 THEN 1 ELSE 0 END) / COUNT(*) AS rep\n  FROM c\n)\nSELECT customers, ROUND(opc, 2) AS orders_per_customer, ROUND(aov, 2) AS aov,\n       ROUND(rpc, 2) AS revenue_per_customer, ROUND(rep, 2) AS repeat_pct,\n       ROUND(aov * rep / 100 * opc, 2) AS clv\nFROM k;"
 },
 {
  "id": "a8",
  "topic": "Joins",
  "level": "Advanced",
  "mins": 12,
  "t": "Coupon audit",
  "tables": [
   "orders",
   "coupons"
  ],
  "task": "Per couponcode used on orders: couponcode, orders, outside_validity (order_date before validfrom or after validto), coupon_discount_pct (coupons.discountpercent) and actual_discount_pct (sum of discount_applied ÷ sum of total_amount × 100, 2 decimals). Most orders first, ties by couponcode.",
  "hint": "JOIN coupons ON coupons.couponcode = orders.couponcode (orders without a coupon have NULL and drop out). The dates are 'YYYY-MM-DD' text, so BETWEEN-style comparisons work directly.",
  "sol": "SELECT o.couponcode, COUNT(*) AS orders,\n       SUM(CASE WHEN o.order_date < c.validfrom OR o.order_date > c.validto THEN 1 ELSE 0 END) AS outside_validity,\n       c.discountpercent AS coupon_discount_pct,\n       ROUND(100.0 * SUM(o.discount_applied) / SUM(o.total_amount), 2) AS actual_discount_pct\nFROM orders o\nJOIN coupons c ON c.couponcode = o.couponcode\nGROUP BY o.couponcode, c.discountpercent\nORDER BY orders DESC, o.couponcode;"
 }
];
const ED_KEY = "swiggy_da_editor_v1";
let edDb = null, edLoading = null, edCur = null, psLevel = "All", psTopic = "All", psTable = "All";
function edState() { try { const s = JSON.parse(lsGet(ED_KEY)); return s && s.solved ? s : { solved: {}, drafts: {} }; } catch (e) { return { solved: {}, drafts: {} }; } }
function edSave(s) { lsSet(ED_KEY, JSON.stringify(s)); }
const localDay = (d) => { const x = d || new Date(); return new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
function todaysProblems() {
  const day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
  const pick = (lv, k) => { const L = PRACTICE_PROBLEMS.filter(p => p.level === lv); return L[(day * k) % L.length]; };
  return [pick("Easy", 1), pick("Medium", 3), pick("Advanced", 5)];
}
function solveDays() { const st = edState(); return new Set(Object.values(st.solved)); }
function solveStreak() {
  const set = solveDays(); let n = 0; const d = new Date();
  if (!set.has(localDay(d))) d.setDate(d.getDate() - 1);           // streak survives until today ends
  while (set.has(localDay(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function loadSqlEngine() {
  if (edDb) return Promise.resolve(edDb);
  if (edLoading) return edLoading;
  edLoading = new Promise((res, rej) => {
    const go = () => window.initSqlJs({}).then(SQL => {
      const db = new SQL.Database(); const T = window.PRACTICE_DB || {};
      db.run("BEGIN");
      Object.entries(T).forEach(([name, t]) => {
        const types = t.cols.map((c, i) => { const vals = t.rows.map(r => r[i]).filter(v => v !== null); if (!vals.length || typeof vals[0] !== "number") return "TEXT"; return vals.every(Number.isInteger) && !/inr|rate|pct/.test(c) ? "INTEGER" : "REAL"; });
        db.run(`CREATE TABLE ${name} (${t.cols.map((c, i) => `"${c}" ${types[i]}`).join(", ")})`);
        const st = db.prepare(`INSERT INTO ${name} VALUES (${t.cols.map(() => "?").join(",")})`);
        t.rows.forEach(r => st.run(r)); st.free();
      });
      db.run("COMMIT"); edDb = db; res(db);
    }).catch(rej);
    const eng = () => { if (window.initSqlJs) go(); else { const s = document.createElement("script"); s.src = "assets/vendor/sql-asm.js"; s.onload = go; s.onerror = () => rej(new Error("Could not load the SQL engine")); document.head.appendChild(s); } };
    loadPracticeData().then(eng).catch(rej);
  });
  return edLoading;
}
let pdLoading = null;
function loadPracticeData() {
  if (window.PRACTICE_DB) return Promise.resolve();
  if (!pdLoading) pdLoading = new Promise((res, rej) => { const s = document.createElement("script"); s.src = "assets/practice-db.js?v=" + (window.SITE_V || "1"); s.onload = () => { res(); renderProblemset(); }; s.onerror = () => { pdLoading = null; rej(new Error("Could not load the practice tables")); }; document.head.appendChild(s); });
  return pdLoading;
}
function edRun(sql) { const res = edDb.exec(sql); return res.length ? res[res.length - 1] : { columns: [], values: [] }; }
function edNorm(r, ordered) {
  const rows = r.values.map(row => row.map(v => v === null ? "∅" : (typeof v === "number" ? (Math.round(v * 100) / 100).toFixed(2) : String(v).trim())).join("¦"));
  return ordered ? rows : rows.slice().sort();
}
function edTable(r) {
  if (!r.columns.length) return `<div class="ed-empty">Query ran. No rows returned.</div>`;
  const head = `<tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join("")}</tr>`;
  const body = r.values.slice(0, 200).map(row => `<tr>${row.map(v => `<td>${v === null ? '<span class="ed-null">NULL</span>' : esc(typeof v === "number" ? (Number.isInteger(v) ? v.toLocaleString("en-IN") : (Math.round(v * 100) / 100).toLocaleString("en-IN")) : v)}</td>`).join("")}</tr>`).join("");
  return `<div class="ed-rowcount">${r.values.length} row${r.values.length === 1 ? "" : "s"}${r.values.length > 200 ? " (showing 200)" : ""}</div><div class="ed-table-wrap"><table class="dtable ed-table"><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
}
const lvlBadge = (l) => `<span class="lvl lvl-${l.toLowerCase()}">${l === "Medium" ? "Med." : l === "Advanced" ? "Hard" : l}</span>`;

/* ---------------- Problemset (browse) ---------------- */
function renderProblemset() {
  const rowsEl = document.getElementById("ps-rows"); if (!rowsEl) return;
  const st = edState(); const solvedN = Object.keys(st.solved).length; const today = todaysProblems();
  document.getElementById("ps-progress").textContent = `${solvedN} / ${PRACTICE_PROBLEMS.length} Solved`;
  document.getElementById("ps-streak").textContent = `${solveStreak()} day streak · ${today.filter(p => st.solved[p.id]).length}/3 of today's set`;
  document.getElementById("ps-today-sub").textContent = today.map(p => p.t).join(" · ");
  const topics = ["All", ...new Set(PRACTICE_PROBLEMS.map(p => p.topic))];
  document.getElementById("ps-topics").innerHTML = topics.map(t => `<button class="ps-chip ${t === psTopic ? "on" : ""}" data-topic="${esc(t)}">${t === "All" ? "All Topics" : esc(t)} <small>(${t === "All" ? PRACTICE_PROBLEMS.length : PRACTICE_PROBLEMS.filter(p => p.topic === t).length})</small></button>`).join("");
  const tabs = ["All", "orders", "delivery", "restaurant", "payments", "ratings", "customers", "delivery_agent", "menu", "coupons"];
  const tlabel = { All: "All Tables", orders: "Orders", delivery: "Delivery", restaurant: "Restaurants", payments: "Payments", ratings: "Ratings", customers: "Customers", delivery_agent: "Delivery Agents", menu: "Menu", coupons: "Coupons" };
  document.getElementById("ps-tables").innerHTML = tabs.map(t => `<button class="ps-disc ${t === psTable ? "on" : ""}" data-tab="${t}">${tlabel[t]}</button>`).join("");
  document.getElementById("ps-levels").innerHTML = ["All", "Easy", "Medium", "Advanced"].map(l => `<button class="${l === psLevel ? "on" : ""}" data-lv="${l}">${l === "Advanced" ? "Hard" : l}</button>`).join("");
  const q = (document.getElementById("ps-search").value || "").toLowerCase(); const stf = document.getElementById("ps-status").value;
  const list = PRACTICE_PROBLEMS.map((p, i) => ({ ...p, n: i + 1 })).filter(p => (psLevel === "All" || p.level === psLevel) && (psTopic === "All" || p.topic === psTopic) && (psTable === "All" || p.tables.includes(psTable))
    && (!q || (p.n + " " + p.t + " " + p.task).toLowerCase().includes(q)) && (stf === "all" || (stf === "done") === !!st.solved[p.id]));
  rowsEl.innerHTML = list.length ? list.map(p => `<tr data-open="${p.id}">
      <td>${st.solved[p.id] ? '<span class="ps-st done">✓</span>' : '<span class="ps-st"></span>'}</td>
      <td><div class="ps-title">${p.n}. ${esc(p.t)}${today.some(x => x.id === p.id) ? ' <span class="ps-todaytag">TODAY</span>' : ""}</div><div class="ps-tags"><span class="ps-tag2">▤ SQL</span>${p.tables.map(t => `<span class="ps-tag2 grey">${t}</span>`).join("")}</div></td>
      <td class="ps-time">${p.mins} min</td><td>${lvlBadge(p.level)}</td><td class="ps-arrow">→</td></tr>`).join("")
    : `<tr><td colspan="5" class="ed-empty">No problems match these filters.</td></tr>`;
  rowsEl.querySelectorAll("[data-open]").forEach(r => r.addEventListener("click", () => openProblem(r.dataset.open)));
  document.querySelectorAll("#ps-topics [data-topic]").forEach(b => b.addEventListener("click", () => { psTopic = b.dataset.topic; renderProblemset(); }));
  document.querySelectorAll("#ps-tables [data-tab]").forEach(b => b.addEventListener("click", () => { psTable = b.dataset.tab; renderProblemset(); }));
  document.querySelectorAll("#ps-levels [data-lv]").forEach(b => b.addEventListener("click", () => { psLevel = b.dataset.lv; renderProblemset(); }));
  renderCalendar();
  const tl = document.getElementById("ps-tablelist");
  if (tl && !window.PRACTICE_DB) { tl.innerHTML = '<div class="ps-tl"><span>Loading tables…</span></div>'; loadPracticeData().catch(() => {}); }
  else if (tl) tl.innerHTML = Object.entries(window.PRACTICE_DB || {}).map(([n, t]) => `<div class="ps-tl"><code>${n}</code><span>${t.rows.length} rows · ${t.cols.length} cols</span></div>`).join("");
}
function renderCalendar() {
  const w = document.getElementById("ps-cal"); if (!w) return;
  const days = solveDays(); const now = new Date(); const y = now.getFullYear(), m = now.getMonth();
  const first = new Date(y, m, 1).getDay(), n = new Date(y, m + 1, 0).getDate(); const todayN = now.getDate();
  let cells = ""; for (let i = 0; i < first; i++) cells += "<span></span>";
  for (let d = 1; d <= n; d++) { const key = localDay(new Date(y, m, d)); cells += `<span class="${d === todayN ? "today" : ""} ${days.has(key) ? "solved" : ""}">${d}</span>`; }
  let last7 = 0; for (let i = 0; i < 7; i++) { const d = new Date(); d.setDate(d.getDate() - i); if (days.has(localDay(d))) last7++; }
  const solvedToday = days.has(localDay());
  w.innerHTML = `<div class="ps-cal-head"><span class="ps-fire">🔥</span><div><strong>${now.toLocaleDateString("en-IN", { month: "long", year: "numeric" }).toUpperCase()}</strong><small>${days.size} days solved · ${solveStreak()} day streak</small></div><span class="ps-badge ${solvedToday ? "ok" : ""}">${solvedToday ? "Done today" : "Not yet today"}</span></div>
    <div class="ps-cal-grid">${["S", "M", "T", "W", "T", "F", "S"].map(x => `<b>${x}</b>`).join("")}${cells}</div>
    <div class="ps-cal-foot"><span>Last 7 days</span><strong>${last7} / 7 Days</strong></div><div class="ps-cal-bar"><i style="width:${Math.round(last7 / 7 * 100)}%"></i></div>`;
}

/* ---------------- Solve view ---------------- */
function renderSchema() {
  const w = document.getElementById("ed-schema"); if (!w) return;
  const T = window.PRACTICE_DB || {};
  w.innerHTML = Object.entries(T).map(([n, t]) => `<details ${edCur && edCur.tables.includes(n) ? "open" : ""}><summary><code>${n}</code> <span>${t.rows.length} rows</span></summary><div class="ed-cols">${t.cols.map(c => `<button class="ed-col" data-ins="${c}">${c}</button>`).join("")}</div></details>`).join("");
  w.querySelectorAll("[data-ins]").forEach(b => b.addEventListener("click", () => { const ta = document.getElementById("ed-sql"); const p = ta.selectionStart; ta.value = ta.value.slice(0, p) + b.dataset.ins + ta.value.slice(ta.selectionEnd); ta.focus(); ta.selectionStart = ta.selectionEnd = p + b.dataset.ins.length; }));
}
function showBrowse() { const b = document.getElementById("ed-browse"), s = document.getElementById("ed-solve"); if (!b) return; b.style.display = ""; s.style.display = "none"; renderProblemset(); }
function openProblem(id) {
  initEditor();
  edCur = PRACTICE_PROBLEMS.find(p => p.id === id) || PRACTICE_PROBLEMS[0];
  document.getElementById("ed-browse").style.display = "none"; document.getElementById("ed-solve").style.display = "";
  const st = edState(); const idx = PRACTICE_PROBLEMS.indexOf(edCur);
  document.getElementById("ed-pos").textContent = `Problem ${idx + 1} of ${PRACTICE_PROBLEMS.length} · ${edCur.topic}`;
  document.getElementById("ed-title").innerHTML = `${lvlBadge(edCur.level)} ${idx + 1}. ${esc(edCur.t)} <span class="ed-mins">⏱ ${edCur.mins} min</span>${st.solved[edCur.id] ? ' <span class="ps-badge ok">Solved</span>' : ""}`;
  document.getElementById("ed-task").textContent = edCur.task;
  document.getElementById("ed-tables").innerHTML = "Tables: " + edCur.tables.map(t => `<code>${t}</code>`).join(" ");
  document.getElementById("ed-sql").value = st.drafts[edCur.id] || `-- ${edCur.t}\nSELECT *\nFROM ${edCur.tables[0]}\nLIMIT 10;`;
  document.getElementById("ed-out").innerHTML = `<div class="ed-empty">Write your query, then press <kbd>Run</kbd> (Ctrl + Enter) and <kbd>Submit</kbd>.</div>`;
  document.getElementById("ed-msg").innerHTML = "";
  renderSchema(); window.scrollTo({ top: 0, behavior: "auto" });
}
function edMsg(kind, html) { document.getElementById("ed-msg").innerHTML = `<div class="ed-msg ${kind}">${html}</div>`; }
function initEditor() {
  const run = document.getElementById("ed-run"); if (!run) return;
  if (run._b) { if (document.getElementById("ed-solve").style.display === "none") renderProblemset(); return; }
  run._b = true;
  const ta = document.getElementById("ed-sql");
  const withDb = (fn) => { edMsg("info", "⏳ Loading the SQL engine (first time only)…"); loadSqlEngine().then(() => { document.getElementById("ed-msg").innerHTML = ""; fn(); }).catch(e => edMsg("bad", "⚠ " + esc(e.message) + ". Open the site from a web server (or check your connection)."));
  };
  const doRun = () => withDb(() => { const st = edState(); st.drafts[edCur.id] = ta.value; edSave(st);
    try { document.getElementById("ed-out").innerHTML = edTable(edRun(ta.value)); } catch (e) { edMsg("bad", "❌ " + esc(e.message)); } });
  run.addEventListener("click", doRun);
  ta.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); doRun(); }
    if (e.key === "Tab") { e.preventDefault(); const p = ta.selectionStart; ta.value = ta.value.slice(0, p) + "  " + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = p + 2; }
  });
  document.getElementById("ed-check").addEventListener("click", () => withDb(() => {
    let mine;
    try { mine = edRun(ta.value); } catch (e) { edMsg("bad", "❌ Your query has an error: " + esc(e.message)); return; }
    const exp = edRun(edCur.sol); document.getElementById("ed-out").innerHTML = edTable(mine);
    const ordered = /order\s+by[^()]*;?\s*$/i.test(edCur.sol);
    const ok = mine.columns.length === exp.columns.length && JSON.stringify(edNorm(mine, ordered)) === JSON.stringify(edNorm(exp, ordered));
    if (ok) { const st = edState(); if (!st.solved[edCur.id]) st.solved[edCur.id] = localDay(); st.drafts[edCur.id] = ta.value; edSave(st);
      const t3 = todaysProblems(); const done = t3.filter(p => st.solved[p.id]).length;
      edMsg("good", `✅ Correct · ${done} of 3 today · 🔥 ${solveStreak()} day streak`); renderHeroCards(); }
    else edMsg("bad", `✗ Not quite. Expected ${exp.values.length} row(s) × ${exp.columns.length} column(s); you returned ${mine.values.length} × ${mine.columns.length}. ${mine.columns.length === exp.columns.length ? "Check your values, rounding and filters." : "Check the columns you SELECT."}`);
  }));
  document.getElementById("ed-hint").addEventListener("click", () => edMsg("info", "💡 " + esc(edCur.hint)));
  document.getElementById("ed-solution").addEventListener("click", () => { ta.value = edCur.sol; edMsg("info", "🔓 Solution loaded. Run it and compare with your approach."); });
  document.getElementById("ed-reset").addEventListener("click", () => { const st = edState(); delete st.drafts[edCur.id]; edSave(st); openProblem(edCur.id); });
  document.getElementById("ed-back").addEventListener("click", showBrowse);
  const step = (k) => { const i = PRACTICE_PROBLEMS.indexOf(edCur); openProblem(PRACTICE_PROBLEMS[(i + k + PRACTICE_PROBLEMS.length) % PRACTICE_PROBLEMS.length].id); };
  document.getElementById("ed-prev").addEventListener("click", () => step(-1));
  document.getElementById("ed-next").addEventListener("click", () => step(1));
  document.getElementById("ps-search").addEventListener("input", renderProblemset);
  document.getElementById("ps-status").addEventListener("change", renderProblemset);
  document.getElementById("ps-random").addEventListener("click", () => { const st = edState(); const L = PRACTICE_PROBLEMS.filter(p => !st.solved[p.id]); const pool = L.length ? L : PRACTICE_PROBLEMS; openProblem(pool[Math.floor(Math.random() * pool.length)].id); });
  document.getElementById("ps-today-go").addEventListener("click", () => { const st = edState(); const t = todaysProblems(); openProblem((t.find(p => !st.solved[p.id]) || t[0]).id); });
  renderProblemset();
}

/* ---------------- Hero floating cards (DailySQL-style) ---------------- */
function renderHeroCards() {
  const c3 = document.getElementById("hero-top-card"); if (!c3) return;
  const rc = ((window.SWG && SWG.rev_city_l) || []).slice(0, 4); const col = ["#EA580C", "#F59E0B", "#2563EB", "#0EA5A4"];
  c3.innerHTML = `<div class="hf-top"><span>🛵</span><span class="hf-lv dark">Revenue by city</span></div>${rc.map(([k, v], n) => `<div class="hf-lb"><i style="background:${col[n]}">${esc(k[0])}</i><span>${esc(k)}</span><b>₹${v}L</b></div>`).join("")}<div class="hf-foot">From the Swiggy practice dataset</div>`;
}
function renderDailyCard() { renderHeroCards(); }
function renderIntegrity() {}
document.addEventListener("DOMContentLoaded", () => {
  renderHeroCards(); renderIntegrity();
  document.querySelectorAll("[data-scroll]").forEach(b => b.addEventListener("click", () => { const t = document.getElementById(b.dataset.scroll); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }));
  document.querySelectorAll('.ds-announce [data-goto="editor"]').forEach(b => b.addEventListener("click", () => switchView("editor")));
});

/* ============================================================
   Project Schedule & Group Presentation Status  (multi-batch)
   - Several project codes can run at the same time (e.g. P1427 at 12 PM and P1428 at 9 PM),
     each with its own start date, presentation day, start/end time, groups and statuses.
   - Students: see ONLY their own project (the code they chose at check-in): next meeting,
     time, their group's status. Read-only.
   - Trainer (PIN): project tabs to switch between codes, "+ New project" form, edit everything,
     mark every group's presentation for every code, batch dashboard across all codes.
   - Live sync via this site's /api/schedule (Vercel + Upstash); falls back to project-schedule.js.
   ============================================================ */
const SCH_STAGES = [
  { key: "kickoff", t: "Project Kick-off", d: "Problem statement, KPI document and dataset walkthrough; groups formed.", week: 0, track: false },
  { key: "excel", t: "Excel Dashboard Presentation", d: "KPIs in Excel and the Excel dashboard.", week: 1, track: true },
  { key: "tableau", t: "Tableau Dashboard Presentation", d: "Tableau connected to MySQL. SQL QA can be presented this week or next.", week: 2, track: true, sqlqa: true },
  { key: "powerbi", t: "Power BI Dashboard Presentation", d: "Power BI connected to MySQL. Last chance to present SQL QA.", week: 3, track: true, sqlqa: true },
  { key: "final", t: "Final Presentation", d: "7 parts: Business Problem → Dataset → Data Model → KPIs → Dashboards → Insights → Recommendations.", week: 4, track: true },
];
const SCH_COLS = [["excel", "Excel"], ["tableau", "Tableau"], ["powerbi", "Power BI"], ["sqlqa", "SQL QA"], ["final", "Final"]];
const SCH_ST = { done: ["✅", "Done", "st-done"], pending: ["⏳", "Pending", "st-pending"], absent: ["❌", "Nobody presented", "st-absent"] };
const SCH_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SCH_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SCH_KEY = "swiggy_da", SCH_PNAME = "Swiggy Data Analytics Capstone";
const SCH_DRAFT = SCH_KEY + "_schedule_draft_v1", SCH_UNLOCK = SCH_KEY + "_schedule_unlocked", SCH_VIEW = SCH_KEY + "_schedule_view", SCH_PIN = SCH_KEY + "_schedule_pin";
let schEditCode = null, schNewOpen = false;
const SCH_CFG = String(window.PROJECT_SCHEDULE_API || "").trim();
const SCH_AUTO = SCH_CFG.toLowerCase() === "auto";
let SCH_API = SCH_AUTO ? "" : SCH_CFG;
let schRemote = null, schSyncMsg = "", schSaveTimer = null, schLoaded = !SCH_API;
function schProbe() {
  if (!SCH_AUTO || !/^https?:$/.test(location.protocol)) return;
  fetch("api/schedule?t=" + Date.now(), { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(j => {
    if (!j || j.configured === false || !Array.isArray(j.projects)) return;
    SCH_API = "api/schedule";
    if (schIsTrainer()) { try { if (!sessionStorage.getItem(SCH_PIN)) sessionStorage.removeItem(SCH_UNLOCK); } catch (e) {} }   // keep a server-checked login across reloads
    schRemote = j.projects.length ? j : null; schLoaded = true;
    renderSchedule(); renderHeroSchedule();
    setInterval(() => { if (!schIsTrainer()) schLoadRemote(true); }, 60000);
  }).catch(() => {});
}
function schApi(payload) { return fetch(SCH_API, { method: "POST", body: JSON.stringify(payload) }).then(r => r.json()); }
function schLoadRemote(silent) {
  if (!SCH_API) return Promise.resolve();
  return fetch(SCH_API + (SCH_API.includes("?") ? "&" : "?") + "t=" + Date.now()).then(r => r.json()).then(j => {
    if (schIsTrainer() && schSaveTimer) return;
    schRemote = j && j.projects && j.projects.length ? j : null; schLoaded = true;
    renderSchedule(); renderHeroSchedule();
  }).catch(() => { schLoaded = true; if (!silent) { schSyncMsg = "⚠ Could not load the live schedule. Showing the last published file."; renderSchedule(); } });
}
function schPushRemote(d) {
  schRemote = d; schSyncMsg = "⏳ Saving…"; schShowSync();
  clearTimeout(schSaveTimer);
  schSaveTimer = setTimeout(() => {
    let pin = ""; try { pin = sessionStorage.getItem(SCH_PIN) || ""; } catch (e) {}
    schApi({ action: "save", pin, data: d }).then(j => {
      schSaveTimer = null;
      schSyncMsg = j.ok ? `✅ Saved ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} · students see it now (on refresh)` : "⚠ Not saved: " + (j.error || "error");
      schShowSync();
    }).catch(() => { schSaveTimer = null; schSyncMsg = "⚠ Not saved: no internet or server not ready. Try again."; schShowSync(); });
  }, 700);
}
function schShowSync() { const e = document.getElementById("sch-sync"); if (e) e.textContent = schSyncMsg; }

/* ---------- tiny SHA-256 (works on file:// too) ---------- */
function sha256(str) {
  const K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
  const bytes = Array.from(new TextEncoder().encode(str)); const l = bytes.length * 8;
  bytes.push(0x80); while (bytes.length % 64 !== 56) bytes.push(0);
  for (let i = 7; i >= 0; i--) bytes.push(i >= 4 ? 0 : (l >>> (i * 8)) & 255);
  let H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const r = (x, n) => (x >>> n) | (x << (32 - n));
  for (let o = 0; o < bytes.length; o += 64) {
    const w = [];
    for (let i = 0; i < 16; i++) w[i] = (bytes[o + 4 * i] << 24) | (bytes[o + 4 * i + 1] << 16) | (bytes[o + 4 * i + 2] << 8) | bytes[o + 4 * i + 3];
    for (let i = 16; i < 64; i++) { const s0 = r(w[i - 15], 7) ^ r(w[i - 15], 18) ^ (w[i - 15] >>> 3), s1 = r(w[i - 2], 17) ^ r(w[i - 2], 19) ^ (w[i - 2] >>> 10); w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0; }
    let [a, b, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) {
      const t1 = (h + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0, t2 = ((r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    H = H.map((v, i) => (v + [a, b, c, d, e, f, g, h][i]) | 0);
  }
  return H.map(v => (v >>> 0).toString(16).padStart(8, "0")).join("");
}
const schHash = (pin) => sha256("swiggy-da-trainer|" + pin);   // trainer password hash (same formula as the server)

/* ---------- time helpers ---------- */
const ymd = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
const parseYmd = (s) => { const [y, m, d] = String(s).split("-").map(Number); return new Date(y, (m || 1) - 1, d || 1); };
const fmtD = (s) => { const d = parseYmd(s); return `${SCH_DAYS[d.getDay()].slice(0, 3)}, ${d.getDate()} ${SCH_MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
const fmtT = (hm) => { const [h, m] = String(hm).split(":").map(Number); return `${((h + 11) % 12) + 1}:${String(m || 0).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`; };
const SCH_TIMES = Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`);
function schParseClock(s) {            // "9:00 PM" → "21:00"
  const m = String(s || "").trim().match(/^(\d{1,2})(?::(\d{2}))?\s*([AaPp])\.?[Mm]?/); if (!m) return null;
  let h = +m[1] % 12; if (/p/i.test(m[3])) h += 12; return `${String(h).padStart(2, "0")}:${m[2] || "00"}`;
}
function schTimes(p) {                 // start/end "HH:MM", migrating old free-text times
  let st = p.start, en = p.end;
  if (!st) { const parts = String(p.time || "").split(/[–\-—to]+/i).map(x => x.trim()).filter(Boolean); st = schParseClock(parts[0]) || "21:00"; en = schParseClock(parts[1]) || null; }
  if (!en) { const [h, m] = st.split(":").map(Number); en = `${String((h + 1) % 24).padStart(2, "0")}:${String(m).padStart(2, "0")}`; }
  return [st, en];
}
const schTimeLabel = (p) => { const [s, e] = schTimes(p); return `${fmtT(s)} – ${fmtT(e)}`; };
function schStageDates(p) {
  const k = parseYmd(p.kickoff); const out = { kickoff: p.kickoff };
  let first = new Date(k); first.setDate(first.getDate() + 6);
  while (first.getDay() !== Number(p.presDay)) first.setDate(first.getDate() + 1);
  SCH_STAGES.filter(s => s.week > 0).forEach(s => { const d = new Date(first); d.setDate(d.getDate() + 7 * (s.week - 1)); out[s.key] = (p.overrides && p.overrides[s.key]) || ymd(d); });
  if (p.overrides && p.overrides.kickoff) out.kickoff = p.overrides.kickoff;
  return out;
}
function schWindow(p, dateStr) {       // [start, end] Date of the meeting on that day
  const [s, e] = schTimes(p); const d = parseYmd(dateStr);
  const at = (hm) => { const [h, m] = hm.split(":").map(Number); const x = new Date(d); x.setHours(h, m, 0, 0); return x; };
  const a = at(s); let b = at(e); if (b <= a) b = new Date(a.getTime() + 3600000); return [a, b];
}
function schPhase(p, dateStr) {
  const now = new Date(); const [a, b] = schWindow(p, dateStr);
  if (now > b) return ["past", "Completed"];
  if (now >= a) return ["today", "Happening now"];
  if (ymd(a) === ymd(now)) return ["today", "Today, " + fmtT(schTimes(p)[0])];
  const tm = new Date(now); tm.setDate(tm.getDate() + 1);
  if (ymd(a) === ymd(tm)) return ["next", "Tomorrow, " + fmtT(schTimes(p)[0])];
  return (a - now) < 7 * 86400000 ? ["next", "This week"] : ["future", "Upcoming"];
}
function schSoon(p, dateStr) {          // meeting is today or tomorrow (and not over yet) → shown in green
  const now = new Date(); const [a, b] = schWindow(p, dateStr); if (now > b) return false;
  const tm = new Date(now); tm.setDate(tm.getDate() + 1); return ymd(a) === ymd(now) || ymd(a) === ymd(tm);
}
function schNext(p) { const ds = schStageDates(p); const now = new Date(); return SCH_STAGES.find(s => schWindow(p, ds[s.key])[1] >= now) || null; }

/* ---------- data ---------- */
const schClone = (o) => JSON.parse(JSON.stringify(o));
function schPublished() { return schClone(window.PROJECT_SCHEDULE || { pinHash: "", active: "", projects: [] }); }
function schFromHash() {
  const m = location.hash.match(/schedule=([A-Za-z0-9_\-]+)/); if (!m) return null;
  try { return JSON.parse(decodeURIComponent(escape(atob(m[1].replace(/-/g, "+").replace(/_/g, "/"))))); } catch (e) { return null; }
}
function schIsTrainer() { try { return sessionStorage.getItem(SCH_UNLOCK) === "1"; } catch (e) { return false; } }
function schDraft() { try { const d = JSON.parse(lsGet(SCH_DRAFT)); return d && d.projects ? d : null; } catch (e) { return null; } }
function schData() {
  if (SCH_API) {
    if (schIsTrainer()) { if (!schRemote) schRemote = schPublished(); return schRemote; }
    const base = schRemote ? schClone(schRemote) : schPublished(); const h = schFromHash();
    if (h && h.code) { base.projects = base.projects.filter(x => x.code !== h.code).concat([h]); base.active = h.code; }
    return base;
  }
  if (schIsTrainer()) return schDraft() || schPublished();
  const pub = schPublished(); const h = schFromHash();
  if (h && h.code) { pub.projects = pub.projects.filter(p => p.code !== h.code).concat([h]); pub.active = h.code; }
  return pub;
}
function schSaveDraft(d) { d.updated = new Date().toISOString(); if (SCH_API) { schPushRemote(d); return; } lsSet(SCH_DRAFT, JSON.stringify(d)); }
const schNorm = (c) => String(c || "").trim().toUpperCase().replace(/\s+/g, "");
function schMe() { try { const m = JSON.parse(lsGet(SCH_KEY + "_student_v1")); return m && m.name ? m : null; } catch (e) { return null; } }
function schCurrent(d) {
  const find = (c) => c && d.projects.find(p => schNorm(p.code) === schNorm(c));
  if (schIsTrainer()) return find(schEditCode) || find(d.active) || d.projects[0] || null;
  const h = schFromHash(); if (h && h.code && find(h.code)) return find(h.code);
  const m = schMe(); if (m && find(m.batch)) return find(m.batch);       // student: only their own project
  let v = null; try { v = lsGet(SCH_VIEW); } catch (e) {}
  return find(v) || find(d.active) || d.projects[0] || null;
}
function schGroupStatus(p, g, key) { const s = (p.status && p.status[g.id]) || {}; return s[key] || "pending"; }
function schCounts(p, key) { const c = { done: 0, pending: 0, absent: 0 }; (p.groups || []).forEach(g => c[schGroupStatus(p, g, key)]++); return c; }
function schNewProject(code, o) {
  o = o || {};
  const fri = new Date(); while (fri.getDay() !== 5) fri.setDate(fri.getDate() - 1);
  const n = Math.max(1, Math.min(20, +o.groups || 6));
  const groups = Array.from({ length: n }, (_, i) => ({ id: "g" + (i + 1), name: "Group " + (i + 1), members: "" }));
  const start = o.start || "21:00", end = o.end || "22:00";
  const p = { code, name: SCH_PNAME, kickoff: o.kickoff || ymd(fri), presDay: o.presDay != null ? +o.presDay : 6, start, end, overrides: {}, groups, status: {} };
  p.time = schTimeLabel(p); return p;
}
function schMyGroup(p) { const m = schMe(); if (!m || !p || schNorm(m.batch) !== schNorm(p.code)) return null; const k = String(m.group || "").trim().toLowerCase(); return (p.groups || []).find(g => String(g.name).trim().toLowerCase() === k) || null; }

/* ---------- rendering ---------- */
const stChip = (s, extra) => `<span class="st-chip ${SCH_ST[s][2]}">${SCH_ST[s][0]} ${SCH_ST[s][1]}${extra || ""}</span>`;
function schBatchesHtml(d, cur) {
  if (!d.projects.length) return "";
  const S = window.VK_SUMMARY && window.VK_SUMMARY.byBatch;
  const rows = d.projects.map(p => {
    const ds = schStageDates(p); const nx = schNext(p); const n = (p.groups || []).length;
    const cell = (k) => { const c = schCounts(p, k); return `<td class="sch-bc ${n && c.done === n ? "all" : ""}">${c.done}/${n}${c.absent ? ` <span title="Nobody from the group presented">❌${c.absent}</span>` : ""}</td>`; };
    const st = S ? (S[schNorm(p.code)] || { n: 0, today: 0 }) : null;
    return `<tr class="${cur && p.code === cur.code ? "sch-cur" : ""}" data-bcode="${esc(p.code)}" title="Open ${esc(p.code)}"><td><b>${esc(p.code)}</b>${p.name ? `<div class="sch-mem">${esc(p.name)}</div>` : ""}</td>
      <td>${SCH_DAYS[p.presDay].slice(0, 3)} · ${esc(schTimeLabel(p))}</td><td>${nx ? `<span class="sch-nx ${schSoon(p, ds[nx.key]) ? "sch-soon" : ""}">${esc(nx.t.replace(" Presentation", ""))}</span><div class="sch-mem">${fmtD(ds[nx.key])}</div>` : "Completed 🎉"}</td><td class="n">${n}</td>
      ${st ? `<td class="n">${st.n}</td><td class="n">${st.today}</td>` : ""}${SCH_COLS.map(([k]) => cell(k)).join("")}</tr>`;
  }).join("");
  return `<div class="card sch-batches" id="sch-batches"><div class="sch-bh"><h3>📊 Batch dashboard</h3><span>${d.projects.length} project code${d.projects.length > 1 ? "s" : ""} running · groups presented / all groups. Click a code to open and edit it.</span></div>
    <div class="table-scroll"><table class="dtable"><thead><tr><th>Project code</th><th>Timing</th><th>Next presentation</th><th>Groups</th>${S ? "<th>Students</th><th>Visited today</th>" : ""}${SCH_COLS.map(([, l]) => `<th>${l}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
}
function schMyCardHtml(p) {
  const m = schMe(); if (!m || schIsTrainer() || !p) return "";
  const g = schMyGroup(p);
  if (!g) return `<div class="card sch-my">👋 <b>${esc(m.name)}</b> · ${esc(p.code)}. Your group (${esc(m.group || "none")}) is not in this project's group list, so your status can't be shown. Click <b>change</b> next to your name in the sidebar and pick your group.</div>`;
  const ds = schStageDates(p); const nx = schNext(p); const st = (p.status && p.status[g.id]) || {};
  const pend = SCH_COLS.filter(([k]) => schGroupStatus(p, g, k) !== "done").map(([, l]) => l);
  return `<div class="card sch-my"><div class="sch-my-h">👋 <b>${esc(m.name)}</b> · <b>${esc(g.name)}</b> · ${esc(p.code)} · every ${SCH_DAYS[p.presDay]}, ${esc(schTimeLabel(p))}</div>
    <div class="sch-my-st">${SCH_COLS.map(([k, l]) => `<span><em>${l}</em> ${stChip(schGroupStatus(p, g, k))}</span>`).join("")}</div>
    <p>${pend.length ? `Still pending for your group: <b>${pend.join(", ")}</b>.` : "Your group has presented everything. 🎉"}${nx ? ` Next meeting: <b>${esc(nx.t)}</b> on <b>${fmtD(ds[nx.key])}</b> at <b>${esc(schTimeLabel(p))}</b>${schSoon(p, ds[nx.key]) ? ` <span class="sch-soon-pill">${esc(schPhase(p, ds[nx.key])[1])}</span>` : ""}.` : ""}${st.note ? ` Trainer note: <i>${esc(st.note)}</i>` : ""}</p></div>`;
}
function renderSchedule() {
  const root = document.getElementById("sch-root"); if (!root) return;
  const d = schData(); const p = schCurrent(d); const tr = schIsTrainer(); const me = schMe();
  const mode = document.getElementById("sch-mode");
  if (mode) mode.innerHTML = tr
    ? `<span class="sch-badge tr">🔓 Trainer mode</span><button class="btn-outline" id="sch-lock">Lock</button>`
    : `<span class="sch-badge">👀 Student view (read-only)</span><button class="sch-trainer-link" id="sch-unlock">Trainer login</button>`;
  // students who checked in see only their own project; others can pick
  const picker = !tr && !(me && me.batch && p && schNorm(me.batch) === schNorm(p.code)) && d.projects.length > 1
    ? `<label class="sch-pick">Project code <select id="sch-select">${d.projects.map(x => `<option value="${esc(x.code)}" ${p && x.code === p.code ? "selected" : ""}>${esc(x.code)} · ${esc(schTimeLabel(x))}</option>`).join("")}</select></label>` : "";
  const tabs = tr ? schTabsHtml(d, p) : "";
  if (!p) { root.innerHTML = `${tabs}<div class="card sch-empty">No project has been published yet. ${tr ? "Create one with <b>+ New project</b> above." : "Ask your trainer for the project code."}</div>`; schBind(d, null); return; }
  const ds = schStageDates(p); const nx = schNext(p);
  const timeline = SCH_STAGES.map((s, i) => {
    const [ph, pl] = schPhase(p, ds[s.key]);
    const up = nx && nx.key === s.key; const soon = up && schSoon(p, ds[s.key]);
    const c = s.track ? schCounts(p, s.key) : null;
    const qa = s.sqlqa ? schCounts(p, "sqlqa") : null;
    return `<div class="sch-stage ${ph} ${up ? "sch-upnext" : ""} ${soon ? "sch-soon" : ""}"><div class="sch-dot">${ph === "past" ? "✓" : i}</div><div class="sch-body">
      <div class="sch-when">${fmtD(ds[s.key])} · ${esc(schTimeLabel(p))} <span class="sch-ph ${ph}">${pl}</span>${up ? `<span class="sch-upnext-tag">${soon ? "Up next · get ready" : "Up next"}</span>` : ""}</div>
      <h4>${s.week ? "Week " + s.week + " · " : ""}${esc(s.t)}</h4><p>${esc(s.d)}</p>
      ${c ? `<div class="sch-counts">${stChip("done", ` ${c.done}`)}${stChip("pending", ` ${c.pending}`)}${c.absent ? stChip("absent", ` ${c.absent}`) : ""}</div>` : ""}
      ${s.sqlqa ? `<div class="sch-qa">+ SQL QA (either week): ${qa.done} of ${(p.groups || []).length} groups done</div>` : ""}
    </div></div>`;
  }).join("");
  const mine = schMyGroup(p);
  const rows = (p.groups || []).map(g => {
    const st = (p.status && p.status[g.id]) || {}; const isMine = mine && mine.id === g.id;
    return `<tr class="${isMine ? "sch-mine" : ""}"><td><strong>${esc(g.name)}</strong>${isMine ? ' <span class="sch-you">Your group</span>' : ""}${g.members ? `<div class="sch-mem">${esc(g.members)}</div>` : ""}</td>${SCH_COLS.map(([k]) => `<td>${stChip(schGroupStatus(p, g, k), k === "sqlqa" && st.sqlqaWeek ? ` · ${st.sqlqaWeek === "tableau" ? "Tableau wk" : "Power BI wk"}` : "")}</td>`).join("")}<td class="sch-note">${esc(st.note || "")}</td></tr>`;
  }).join("");
  root.innerHTML = `${tr ? `<div id="sch-batches-wrap">${schBatchesHtml(d, p)}</div>` : ""}${tabs}${picker}${schMyCardHtml(p)}
    <div class="sch-head card"><div><div class="sch-code">${esc(p.code)}</div><h3>${esc(p.name || SCH_PNAME)}</h3>
      <p>Kick-off ${fmtD(ds.kickoff)} · weekly presentations every <strong>${SCH_DAYS[p.presDay]}</strong> · <strong>${esc(schTimeLabel(p))}</strong> · ${(p.groups || []).length} groups</p></div>
      ${nx ? `<div class="sch-next ${schSoon(p, ds[nx.key]) ? "sch-soon" : ""}"><span>Next meeting</span><strong>${esc(nx.t)}</strong><em>${fmtD(ds[nx.key])} · ${esc(schTimeLabel(p))}</em></div>` : `<div class="sch-next done"><span>Status</span><strong>Project completed 🎉</strong></div>`}</div>
    <div class="sch-timeline">${timeline}</div>
    <div class="section-head mt-40" style="margin-bottom:12px;"><div class="eyebrow">Group status · ${esc(p.code)}</div><h2>Who has presented what</h2><p>✅ Done · ⏳ Pending · ❌ Nobody from the group presented in the meeting. SQL QA can be presented in the Tableau week or the Power BI week.</p></div>
    <div class="card table-scroll"><table class="dtable sch-table"><thead><tr><th>Group</th>${SCH_COLS.map(([, l]) => `<th>${l}</th>`).join("")}<th>Trainer note</th></tr></thead><tbody>${rows || `<tr><td colspan="7">No groups yet.</td></tr>`}</tbody></table></div>
    <p class="sch-upd">Last updated by trainer: ${p.updated ? new Date(p.updated).toLocaleString("en-IN") : "—"}</p>
    ${tr ? schAdminHtml(d, p) : ""}`;
  schBind(d, p);
}
const schSel = (id, opts, v, attrs) => `<select id="${id}" ${attrs || ""}>${opts.map(([val, lab]) => `<option value="${val}" ${String(val) === String(v) ? "selected" : ""}>${lab}</option>`).join("")}</select>`;
const schTimeOpts = SCH_TIMES.map(t => [t, fmtT(t)]);
function schTabsHtml(d, p) {
  const fri = new Date(); while (fri.getDay() !== 5) fri.setDate(fri.getDate() - 1);
  return `<div class="card sch-ptabs"><div class="sch-ptabs-row"><span class="sch-ptabs-l">Projects</span>
    ${d.projects.map(x => `<button type="button" class="sch-ptab ${p && x.code === p.code ? "on" : ""}" data-bcode="${esc(x.code)}"><b>${esc(x.code)}</b><small>${SCH_DAYS[x.presDay].slice(0, 3)} ${esc(fmtT(schTimes(x)[0]))}</small></button>`).join("")}
    <button type="button" class="sch-ptab add" id="sch-newopen">＋ New project</button></div>
    <div class="sch-newform" id="sch-newform" ${schNewOpen || !d.projects.length ? "" : "hidden"}>
      <h4>Start a new project</h4>
      <div class="sch-grid">
        <label>Project code<input class="search-input" id="sch-n-code" placeholder="e.g. P1428" maxlength="20"></label>
        <label>Kick-off date<input type="date" id="sch-n-kick" value="${ymd(fri)}"></label>
        <label>Presentation day ${schSel("sch-n-day", SCH_DAYS.map((x, i) => [i, x]), 6)}</label>
        <label>Start time ${schSel("sch-n-start", schTimeOpts, "21:00")}</label>
        <label>End time ${schSel("sch-n-end", schTimeOpts, "22:00")}</label>
        <label>Number of groups<input type="number" id="sch-n-groups" min="1" max="20" value="6"></label>
      </div>
      <div class="sch-row"><button class="btn-blue" id="sch-n-create">Create project</button><button class="btn-outline" id="sch-n-cancel">Cancel</button><span class="sch-n-err" id="sch-n-err"></span></div>
    </div></div>`;
}
function schAdminHtml(d, p) {
  const ds = schStageDates(p); const [st0, en0] = schTimes(p);
  const stSel = (gid, key, v) => `<select data-st="${gid}|${key}" class="st-sel ${SCH_ST[v][2]}">${Object.entries(SCH_ST).map(([s, [i, l]]) => `<option value="${s}" ${s === v ? "selected" : ""}>${i} ${l}</option>`).join("")}</select>`;
  const groups = (p.groups || []).map(g => { const st = (p.status && p.status[g.id]) || {};
    return `<tr><td><input data-gname="${g.id}" value="${esc(g.name)}"><input data-gmem="${g.id}" value="${esc(g.members || "")}" placeholder="Members (optional)"></td>
      ${SCH_COLS.map(([key]) => `<td>${stSel(g.id, key, st[key] || "pending")}${key === "sqlqa" ? `<select data-qaw="${g.id}">${[["", "Week?"], ["tableau", "Tableau wk"], ["powerbi", "Power BI wk"]].map(([v, l]) => `<option value="${v}" ${(st.sqlqaWeek || "") === v ? "selected" : ""}>${l}</option>`).join("")}</select>` : ""}</td>`).join("")}
      <td><input data-gnote="${g.id}" value="${esc(st.note || "")}" placeholder="Note"></td><td><button class="sch-del" data-gdel="${g.id}" title="Remove group">✕</button></td></tr>`; }).join("");
  return `<div class="card sch-admin">
    <div class="sch-admin-head"><h3>🔓 Trainer controls · <span class="sch-code">${esc(p.code)}</span></h3>${SCH_API ? `<span class="sch-live">☁ Live sync ON: every change saves automatically and students see it.</span>` : `<span>Changes save on this device. Students see them only after you <strong>Publish</strong> (or set up Live sync).</span>`}</div>
    ${SCH_API ? `<div class="sch-sync" id="sch-sync">${esc(schSyncMsg || "☁ Connected")}</div>` : ""}
    <div class="sch-grid">
      <label>Project code<input class="search-input" id="sch-code" value="${esc(p.code)}"></label>
      <label>Project name<input class="search-input" id="sch-name" value="${esc(p.name || "")}"></label>
      <label>Kick-off date<input type="date" id="sch-kick" value="${esc(ds.kickoff)}"></label>
      <label>Presentation day ${schSel("sch-pd", SCH_DAYS.map((x, i) => [i, x]), p.presDay)}</label>
      <label>Start time ${schSel("sch-start", schTimeOpts, st0)}</label>
      <label>End time ${schSel("sch-end", schTimeOpts, en0)}</label>
    </div>
    <p class="sch-hint">Weekly dates are worked out from the kick-off date and the presentation day. After a meeting's end time has passed, the next one becomes "Up next" automatically.</p>
    <details class="sch-over"><summary>Change a single presentation date (holiday, reschedule)</summary><div class="sch-grid">${SCH_STAGES.filter(s => s.week > 0).map(s => `<label>${s.t}<input type="date" data-over="${s.key}" value="${ds[s.key]}"></label>`).join("")}<button class="btn-outline" id="sch-clearover">Reset to weekly dates</button></div></details>
    <h4 style="margin:16px 0 8px;">Groups & presentation status · ${esc(p.code)}</h4>
    <div class="table-scroll"><table class="dtable sch-edit"><thead><tr><th>Group</th>${SCH_COLS.map(([, l]) => `<th>${l}</th>`).join("")}<th>Note</th><th></th></tr></thead><tbody>${groups}</tbody></table></div>
    <div class="sch-row"><button class="btn-outline" id="sch-addg">+ Add group</button><button class="btn-outline" id="sch-reset">↺ Reset all statuses</button><button class="btn-outline" id="sch-delp">🗑 Delete ${esc(p.code)}</button><button class="btn-outline" id="sch-pin">Change password</button>${SCH_API ? `<button class="btn-outline" id="sch-reload">⟳ Reload from server</button>` : `<button class="btn-outline" id="sch-discard">Load live file (discard draft)</button>`}</div>
    <div class="sch-publish" ${SCH_API ? 'style="display:none"' : ""}>
      <div><strong>Publish to students</strong><p>1) Download <code>project-schedule.js</code> → 2) replace that file in the site folder (GitHub / Vercel / hosting) → students see the update. Or share a link right now (works for the selected project).</p></div>
      <div class="sch-row"><button class="btn-blue" id="sch-download">⬇ Download project-schedule.js</button><button class="btn-dark" id="sch-link">🔗 Copy student link</button></div>
    </div></div>`;
}
/* ---------- trainer login (username + password) ---------- */
const SCH_USER = "mahendra";
function schLoginDialog() {
  if (document.getElementById("sch-login")) return;
  const ov = document.createElement("div"); ov.id = "sch-login"; ov.className = "sch-login-ov";
  ov.innerHTML = `<form class="sch-login" autocomplete="on"><h3>🔐 Trainer login</h3><p>Only the trainer can edit projects, dates and group statuses.</p>
    <label>Username<input id="sch-l-user" name="username" autocomplete="username" required></label>
    <label>Password<input id="sch-l-pass" name="password" type="password" autocomplete="current-password" required></label>
    <div class="sch-l-err" id="sch-l-err"></div>
    <div class="sch-row"><button class="btn-blue" type="submit" id="sch-l-go">Log in</button><button class="btn-outline" type="button" id="sch-l-cancel">Cancel</button></div></form>`;
  document.body.appendChild(ov);
  const q = (id) => ov.querySelector("#" + id); setTimeout(() => q("sch-l-user").focus(), 50);
  const close = () => ov.remove();
  q("sch-l-cancel").onclick = close; ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
  const ok = (pass) => {
    try { sessionStorage.setItem(SCH_UNLOCK, "1"); sessionStorage.setItem(SCH_PIN, pass); } catch (e) {}
    close(); if (SCH_API && !schRemote) { schRemote = schDraft() || schPublished(); schSaveDraft(schRemote); }
    if (SCH_API) schSyncMsg = "☁ Connected · changes save automatically";
    renderSchedule(); renderHeroSchedule(); try { window.dispatchEvent(new Event("hub-trainer")); } catch (e) {}
  };
  ov.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); const user = q("sch-l-user").value.trim(), pass = q("sch-l-pass").value; const err = (t) => { q("sch-l-err").textContent = t; };
    if (!user || !pass) return err("Enter username and password.");
    if (SCH_API) {
      q("sch-l-go").disabled = true;
      schApi({ action: "check", user, pin: pass }).then(j => { q("sch-l-go").disabled = false; if (!j.ok) return err(j.error || "Wrong username or password."); ok(pass); })
        .catch(() => { q("sch-l-go").disabled = false; err("Could not reach the live sync server. Check your internet and try again."); });
      return;
    }
    if (user.toLowerCase() === SCH_USER && (schHash(pass) === schPublished().pinHash || (schDraft() && schHash(pass) === schDraft().pinHash))) { if (!schDraft()) schSaveDraft(schPublished()); ok(pass); }
    else err("Wrong username or password.");
  });
}
window.schTrainerLogin = schLoginDialog;
function schBind(d, p) {
  const $ = (id) => document.getElementById(id);
  const save = () => { if (p) { p.time = schTimeLabel(p); p.updated = new Date().toISOString(); } schSaveDraft(d); renderSchedule(); renderHeroSchedule(); };
  const selEl = $("sch-select");
  if (selEl) selEl.addEventListener("change", () => { lsSet(SCH_VIEW, selEl.value); renderSchedule(); renderHeroSchedule(); });
  document.querySelectorAll("#sch-root [data-bcode]").forEach(r => r.addEventListener("click", () => {
    const c = r.dataset.bcode; if (schIsTrainer()) { schEditCode = c; d.active = c; } else lsSet(SCH_VIEW, c); renderSchedule(); renderHeroSchedule();
  }));
  const un = $("sch-unlock"); if (un) un.onclick = schLoginDialog;
  const lk = $("sch-lock"); if (lk) lk.onclick = () => { try { sessionStorage.removeItem(SCH_UNLOCK); sessionStorage.removeItem(SCH_PIN); } catch (e) {} schEditCode = null; renderSchedule(); renderHeroSchedule(); };
  if (!schIsTrainer()) return;
  const on = (id, ev, fn) => { const e = $(id); if (e) e.addEventListener(ev, fn); };
  // new project form
  on("sch-newopen", "click", () => { schNewOpen = true; const f = $("sch-newform"); if (f) { f.hidden = false; $("sch-n-code").focus(); } });
  on("sch-n-cancel", "click", () => { schNewOpen = false; const f = $("sch-newform"); if (f) f.hidden = true; });
  on("sch-n-create", "click", () => {
    const err = (t) => { $("sch-n-err").textContent = t; };
    const code = $("sch-n-code").value.trim().toUpperCase().replace(/\s+/g, "");
    if (!/^[A-Z0-9-]{2,20}$/.test(code)) return err("Enter a project code like P1428.");
    if (d.projects.some(x => schNorm(x.code) === code)) return err(code + " already exists. Click its tab to open it.");
    const s = $("sch-n-start").value, e = $("sch-n-end").value; if (e <= s) return err("End time must be after the start time.");
    d.projects.push(schNewProject(code, { kickoff: $("sch-n-kick").value, presDay: $("sch-n-day").value, start: s, end: e, groups: $("sch-n-groups").value }));
    d.active = code; schEditCode = code; schNewOpen = false; schSaveDraft(d); renderSchedule(); renderHeroSchedule();
  });
  if (!p) return;
  on("sch-code", "change", (e) => { const v = e.target.value.trim().toUpperCase().replace(/\s+/g, ""); if (!v || d.projects.some(x => x !== p && schNorm(x.code) === v)) { alert("Code must be unique."); renderSchedule(); return; } if (d.active === p.code) d.active = v; p.code = v; schEditCode = v; save(); });
  on("sch-name", "change", (e) => { p.name = e.target.value; save(); });
  on("sch-kick", "change", (e) => { if (e.target.value) { p.kickoff = e.target.value; if (p.overrides) delete p.overrides.kickoff; save(); } });
  on("sch-pd", "change", (e) => { p.presDay = +e.target.value; p.overrides = {}; save(); });
  on("sch-start", "change", (e) => { p.start = e.target.value; const [, en] = schTimes(p); if (!p.end || en <= p.start) { const [h, m] = p.start.split(":").map(Number); p.end = `${String((h + 1) % 24).padStart(2, "0")}:${String(m).padStart(2, "0")}`; } save(); });
  on("sch-end", "change", (e) => { p.start = schTimes(p)[0]; p.end = e.target.value; save(); });
  document.querySelectorAll("[data-over]").forEach(i => i.addEventListener("change", () => { p.overrides = p.overrides || {}; p.overrides[i.dataset.over] = i.value; save(); }));
  on("sch-clearover", "click", () => { p.overrides = {}; save(); });
  const gst = (gid) => { p.status = p.status || {}; p.status[gid] = p.status[gid] || {}; return p.status[gid]; };
  document.querySelectorAll("[data-st]").forEach(s => s.addEventListener("change", () => { const [gid, key] = s.dataset.st.split("|"); gst(gid)[key] = s.value; save(); }));
  document.querySelectorAll("[data-qaw]").forEach(s => s.addEventListener("change", () => { gst(s.dataset.qaw).sqlqaWeek = s.value; save(); }));
  document.querySelectorAll("[data-gnote]").forEach(s => s.addEventListener("change", () => { gst(s.dataset.gnote).note = s.value; save(); }));
  document.querySelectorAll("[data-gname]").forEach(s => s.addEventListener("change", () => { p.groups.find(g => g.id === s.dataset.gname).name = s.value; save(); }));
  document.querySelectorAll("[data-gmem]").forEach(s => s.addEventListener("change", () => { p.groups.find(g => g.id === s.dataset.gmem).members = s.value; save(); }));
  document.querySelectorAll("[data-gdel]").forEach(b => b.addEventListener("click", () => { if (!confirm("Remove this group?")) return; p.groups = p.groups.filter(g => g.id !== b.dataset.gdel); if (p.status) delete p.status[b.dataset.gdel]; save(); }));
  on("sch-addg", "click", () => { const n = (p.groups || []).length + 1; let id = "g" + n; while (p.groups.some(g => g.id === id)) id += "x"; p.groups.push({ id, name: "Group " + n, members: "" }); save(); });
  on("sch-reset", "click", () => { if (confirm("Reset every group's status to Pending for " + p.code + "?")) { p.status = {}; save(); } });
  on("sch-delp", "click", () => { if (!confirm("Delete project " + p.code + "? Its groups and statuses are removed.")) return; d.projects = d.projects.filter(x => x !== p); schEditCode = null; d.active = d.projects[0] ? d.projects[0].code : ""; save(); });
  on("sch-pin", "click", () => { const a = prompt("New trainer password (min 6 characters)"); if (!a) return; if (a.length < 6) { alert("Password must be at least 6 characters."); return; } if (prompt("Type the new password again") !== a) { alert("Passwords don't match."); return; }
    if (SCH_API) { let pin = ""; try { pin = sessionStorage.getItem(SCH_PIN) || ""; } catch (e) {} schApi({ action: "setpin", pin, newPin: a }).then(j => { if (j.ok) { try { sessionStorage.setItem(SCH_PIN, a); } catch (e) {} alert("Password changed. Use the new password from now on."); } else alert(j.error || "Could not change the password."); }).catch(() => alert("Could not reach the server.")); return; } d.pinHash = schHash(a); save(); alert("Password changed. Download and upload project-schedule.js so it applies on the live site."); });
  on("sch-reload", "click", () => { schRemote = null; schLoadRemote(); });
  on("sch-discard", "click", () => { if (!confirm("Discard your unpublished changes on this device and load the live project-schedule.js?")) return; lsSet(SCH_DRAFT, JSON.stringify(schPublished())); schEditCode = null; renderSchedule(); renderHeroSchedule(); });
  on("sch-download", "click", () => {
    d.active = p.code; const out = schClone(d); out.updated = new Date().toISOString();
    const js = "/* Project schedule & group status. Edit it from the site (Trainer login), then replace this file. */\nwindow.PROJECT_SCHEDULE = " + JSON.stringify(out, null, 1) + ";\n";
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([js], { type: "text/javascript" })); a.download = "project-schedule.js"; document.body.appendChild(a); a.click(); a.remove();
  });
  on("sch-link", "click", (e) => {
    const one = schClone(p); one.updated = new Date().toISOString();
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(one)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    copyText(location.href.split("#")[0] + "#schedule=" + b64, e.target, "🔗 Copy student link");
  });
}
/* ---------- hero cards (home) ---------- */
function renderHeroSchedule() {
  const d = schData(); const p = schCurrent(d);
  const c1 = document.getElementById("hero-problem-card"), c2 = document.getElementById("hero-streak-card"), c4 = document.getElementById("hero-today-card");
  if (!p) { [c1, c2, c4].forEach(c => { if (c) c.innerHTML = `<div class="hf-lv dark">PROJECT SCHEDULE</div><p style="margin-top:6px;">Your trainer will publish the schedule here.</p>`; }); return; }
  const ds = schStageDates(p); const nx = schNext(p); const go = () => { if (typeof switchView === "function") switchView("schedule"); };
  if (c1) {
    c1.innerHTML = nx ? `<div class="hf-top"><span class="hf-ic">📅</span><span class="hf-lv">${esc(p.code)}</span><span class="hf-day ${schSoon(p, ds[nx.key]) ? "sch-soon" : ""}">${schPhase(p, ds[nx.key])[1]}</span></div><h5>Next: ${esc(nx.t)}</h5><p>${esc(nx.d)}</p>
      <div class="hf-when">${fmtD(ds[nx.key])}<br><small>${esc(schTimeLabel(p))}</small></div>` : `<div class="hf-top"><span class="hf-ic">🎉</span><span class="hf-lv">${esc(p.code)}</span></div><h5>Project completed</h5><p>All presentations are done.</p>`;
    c1.classList.toggle("sch-soon-card", !!(nx && schSoon(p, ds[nx.key])));
    c1.onclick = go;
  }
  if (c2) {
    const now = new Date();
    const stg = nx && nx.track ? nx : SCH_STAGES.filter(s => s.track).reverse().find(s => schWindow(p, ds[s.key])[0] <= now) || SCH_STAGES[1];
    const c = schCounts(p, stg.key); const n = (p.groups || []).length || 1; const mine = schMyGroup(p);
    const list = mine ? [mine, ...(p.groups || []).filter(g => g.id !== mine.id)] : (p.groups || []);
    c2.innerHTML = `<div class="hf-top"><span>👥</span><span class="hf-lv dark">GROUP STATUS</span><span class="hf-fire">${esc(stg.t.split(" ")[0])}</span></div>
      <div class="hf-big">${c.done}<small>of ${n} groups done</small></div><div class="hf-bar"><i style="width:${Math.round(c.done / n * 100)}%"></i></div>
      ${list.slice(0, 4).map(g => { const s = schGroupStatus(p, g, stg.key); return `<div class="hf-row"><span>${esc(g.name)}${mine && g.id === mine.id ? " (you)" : ""}</span><span class="${s === "done" ? "ok" : ""}">${SCH_ST[s][0]}</span></div>`; }).join("")}
      ${list.length > 4 ? `<div class="hf-foot">+${list.length - 4} more groups</div>` : ""}`;
    c2.onclick = go; c2.style.cursor = "pointer";
  }
  if (c4) {
    c4.innerHTML = `<div class="hf-lv dark" style="margin-bottom:8px;">PROJECT TIMELINE · ${esc(p.code)}</div>${SCH_STAGES.map(s => { const [ph] = schPhase(p, ds[s.key]); const up = nx && nx.key === s.key; return `<div class="hf-li ${ph} ${up ? "sch-upnext" : ""} ${up && schSoon(p, ds[s.key]) ? "sch-soon" : ""}" ${up ? 'title="Up next"' : ""}><span>${ph === "past" ? "✓" : ph === "next" || ph === "today" ? "●" : "○"}</span><span>${esc(s.t.replace(" Presentation", ""))}</span><small>${fmtD(ds[s.key]).replace(/, \d{4}$/, "")}</small></div>`; }).join("")}<div class="hf-foot"><i class="dot"></i> Weekly every ${SCH_DAYS[p.presDay]} · ${esc(schTimeLabel(p))}</div>`;
    c4.onclick = go; c4.style.cursor = "pointer";
  }
}
(function () {
  if (document.getElementById("sch-batch-css")) return;
  const s = document.createElement("style"); s.id = "sch-batch-css";
  s.textContent = `.sch-batches{padding:18px 20px;margin-bottom:16px}.sch-bh{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:10px}.sch-bh h3{margin:0;font-size:18px}.sch-bh span{font-size:12.5px;color:var(--ink-muted,#666)}
  .sch-batches tr[data-bcode]{cursor:pointer}.sch-batches tr[data-bcode]:hover td{background:rgba(31,158,139,.06)}.sch-batches tr.sch-cur td{background:rgba(31,158,139,.10)}
  .sch-batches td.n,.sch-bc{font-family:var(--mono,monospace);text-align:center}.sch-bc.all{color:#15803D;font-weight:700}
  .sch-you{display:inline-block;font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:20px;background:#DCFCE7;color:#166534;margin-left:4px;vertical-align:middle}
  .sch-my{padding:16px 20px;margin-bottom:16px;border-left:4px solid #1F9E8B!important}
  .sch-my-h{font-size:15px;margin-bottom:10px}.sch-my-st{display:flex;flex-wrap:wrap;gap:8px 16px;margin-bottom:8px}.sch-my-st em{font-style:normal;font-size:12px;color:var(--ink-muted,#666);margin-right:4px}.sch-my p{margin:0;font-size:13.5px}
  tr.sch-mine td{background:rgba(31,158,139,.08)}
  .sch-stage.sch-upnext{background:rgba(250,204,21,.16);border:1px solid rgba(234,179,8,.45);border-radius:14px;padding:12px 14px;margin:4px 0}
  .sch-upnext-tag{display:inline-block;margin-left:6px;font-size:11px;font-weight:700;padding:2px 9px;border-radius:20px;background:#FACC15;color:#422006;vertical-align:middle}
  .hf-li.sch-upnext{background:rgba(250,204,21,.22);border-radius:8px;padding-left:6px;padding-right:6px;font-weight:600}
  .sch-stage.sch-upnext.sch-soon{background:rgba(34,197,94,.15);border-color:rgba(22,163,74,.55)}
  .sch-stage.sch-soon .sch-upnext-tag,.sch-soon-pill{background:#16A34A;color:#fff}
  .sch-nx.sch-soon{background:#16A34A;color:#fff;font-weight:700}
  .sch-stage.sch-soon .sch-ph.next,.sch-stage.sch-soon .sch-ph.today{background:#DCFCE7;color:#15803D}
  .hf-li.sch-soon span:first-child{color:#15803D!important}
  .sch-soon-pill{display:inline-block;font-size:11.5px;font-weight:700;padding:1px 8px;border-radius:20px;margin-left:4px}
  .hf-li.sch-upnext.sch-soon{background:rgba(34,197,94,.22);color:#14532D}
  .hf-day.sch-soon{background:#16A34A!important;color:#fff!important}
  .sch-soon-card{box-shadow:0 0 0 2px rgba(22,163,74,.55),0 10px 28px rgba(22,163,74,.18)!important}
  .sch-next.sch-soon{background:#15803D!important;color:#fff}
  .sch-nx{display:inline-block;background:rgba(250,204,21,.22);border-radius:6px;padding:1px 6px}
  .sch-ptabs{padding:14px 16px;margin-bottom:16px}.sch-ptabs-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.sch-ptabs-l{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-muted,#666);margin-right:4px}
  .sch-ptab{display:inline-flex;flex-direction:column;align-items:flex-start;gap:1px;padding:7px 12px;border-radius:10px;border:1px solid var(--line,#ddd);background:var(--paper-raised,#fff);color:var(--ink,#111);cursor:pointer;font-size:13px;line-height:1.2}
  .sch-ptab small{font-size:11px;color:var(--ink-muted,#666)}.sch-ptab.on{border-color:#1F9E8B;background:rgba(31,158,139,.12);box-shadow:0 0 0 2px rgba(31,158,139,.25)}
  .sch-ptab.add{border-style:dashed;color:#137A6A;font-weight:700;justify-content:center;min-height:42px}
  .sch-newform{margin-top:14px;padding-top:12px;border-top:1px dashed var(--line,#ddd)}.sch-newform h4{margin:0 0 8px}.sch-n-err{color:#DC2626;font-size:13px;align-self:center}
  .sch-newform input[type=date],.sch-newform input[type=number],.sch-admin input[type=date]{padding:8px 10px;border-radius:8px;border:1px solid var(--line,#ddd);background:var(--paper-raised,#fff);color:var(--ink,#111)}
  .sch-hint{font-size:12.5px;color:var(--ink-muted,#666);margin:8px 0 4px}
  .sch-login-ov{position:fixed;inset:0;background:rgba(10,15,30,.55);backdrop-filter:blur(3px);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px}
  .sch-login{background:var(--paper-raised,#fff);color:var(--ink,#111);border-radius:18px;max-width:380px;width:100%;padding:24px;box-shadow:0 24px 60px rgba(0,0,0,.25)}
  .sch-login h3{margin:0 0 6px;font-size:21px}.sch-login p{margin:0 0 12px;font-size:13px;color:var(--ink-muted,#666)}
  .sch-login label{display:block;font-size:12.5px;font-weight:600;margin:10px 0 0;color:var(--ink-muted,#555)}
  .sch-login input{display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:11px 12px;border-radius:10px;border:1px solid var(--line,#ddd);background:var(--paper,#fafafa);color:var(--ink,#111);font-size:15px}
  .sch-l-err{color:#DC2626;font-size:12.5px;min-height:16px;margin:8px 0}
  .sch-newform select,.sch-admin .sch-grid select{padding:8px 10px;border-radius:8px;border:1px solid var(--line,#ddd);background:var(--paper-raised,#fff);color:var(--ink,#111);font-size:13.5px;min-height:38px}`;
  document.head.appendChild(s);
})();
window.addEventListener("hub-student", () => { try { renderSchedule(); renderHeroSchedule(); } catch (e) {} });
window.addEventListener("vk-summary", () => { if (!schIsTrainer()) return; const w = document.getElementById("sch-batches-wrap"); if (!w) return; const d = schData(); w.innerHTML = schBatchesHtml(d, schCurrent(d));
  w.querySelectorAll("[data-bcode]").forEach(r => r.addEventListener("click", () => { schEditCode = r.dataset.bcode; d.active = r.dataset.bcode; renderSchedule(); renderHeroSchedule(); })); });
setInterval(() => { try { if (!schIsTrainer()) renderHeroSchedule(); } catch (e) {} }, 300000);   // roll "Up next" forward after a meeting ends
document.addEventListener("DOMContentLoaded", () => {
  renderSchedule(); renderHeroSchedule();
  if (schFromHash()) setTimeout(() => { if (typeof switchView === "function") switchView("schedule"); }, 50);
  if (SCH_API) { schLoadRemote(); setInterval(() => { if (!schIsTrainer()) schLoadRemote(true); }, 60000); }
  else schProbe();
});
