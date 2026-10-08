/* Job Simulator content: every number comes from this project's own answer keys and gotchas. */
window.SIM_CONTENT = {
 "site": "Swiggy Data Analytics",
 "intro": {
  "incident": "Real alerts from Swiggy growth, operations, customer-experience and finance leaders, each built on a trap this project teaches. Check the evidence, pick the root cause and the fix, then write the reply you would send.",
  "broken": "A junior analyst built this Delivery & Growth Overview from the Orders, Delivery and Payments sheets. Find every tile that uses a wrong formula, column, denominator or grouping before it reaches leadership.",
  "stakeholder": "Swiggy stakeholders rarely ask precise questions. Pick the clarifying questions that turn a vague request into a clear KPI spec, and skip the ones that waste their time."
 },
 "incidents": [
  {
   "id": "i1",
   "lvl": "Easy",
   "title": "“100% of our customers come back”",
   "from": "Priya Menon · Growth & Marketing Lead",
   "time": "Mon 9:10 AM",
   "msg": "The new Power BI retention page shows Repeat Customer % at 100%. Every customer who ordered came back. I want to stop the win-back campaign and move that budget to new-user offers from next month. Can you confirm the number before I present it on Friday?",
   "metric": [
    [
     "Repeat Customer %",
     "100.00%"
    ],
    [
     "Customers who ordered",
     "6,329"
    ]
   ],
   "evidence": [
    {
     "id": "e1",
     "rel": true,
     "t": "The KPI-sheet filter (OrderID > 1), in SQL",
     "sql": "SELECT COUNT(DISTINCT customer_id) AS customers,\n       COUNT(DISTINCT CASE WHEN orderid > 1 THEN customer_id END) AS passes_filter,\n       ROUND(100.0 * COUNT(DISTINCT CASE WHEN orderid > 1 THEN customer_id END)\n             / COUNT(DISTINCT customer_id), 2) AS repeat_pct\nFROM orders;",
     "res": [
      [
       "customers",
       "6,329"
      ],
      [
       "customers with an OrderID > 1",
       "6,329"
      ],
      [
       "repeat_pct",
       "100.00%"
      ]
     ],
     "note": "OrderID > 1 only removes the very first order in the table, so every customer passes. The filter tests the order number, not how many orders a customer placed."
    },
    {
     "id": "e2",
     "rel": true,
     "t": "How many orders each customer placed",
     "sql": "SELECT n AS orders_placed, COUNT(*) AS customers\nFROM (SELECT customer_id, COUNT(*) AS n FROM orders GROUP BY customer_id)\nGROUP BY n ORDER BY n;",
     "res": [
      [
       "1 order",
       "3,688 customers"
      ],
      [
       "2 orders",
       "1,825 customers"
      ],
      [
       "3 orders",
       "638 customers"
      ],
      [
       "4 to 7 orders",
       "178 customers"
      ]
     ],
     "note": "3,688 customers ordered only once. Retention is far from 100%."
    },
    {
     "id": "e3",
     "rel": true,
     "t": "Repeat customers counted per customer",
     "sql": "SELECT SUM(n > 1) AS repeat_customers, COUNT(*) AS customers,\n       ROUND(100.0 * SUM(n > 1) / COUNT(*), 2) AS repeat_pct,\n       ROUND(1.0 * SUM(n) / COUNT(*), 2) AS orders_per_customer\nFROM (SELECT customer_id, COUNT(*) AS n FROM orders GROUP BY customer_id);",
     "res": [
      [
       "repeat_customers",
       "2,641"
      ],
      [
       "customers",
       "6,329"
      ],
      [
       "repeat_pct",
       "41.73%"
      ],
      [
       "orders_per_customer",
       "1.58"
      ]
     ],
     "note": "A repeat customer is one with more than one order: 2,641 of 6,329."
    },
    {
     "id": "e4",
     "rel": false,
     "t": "Orders by coupon code",
     "sql": "SELECT couponcode, COUNT(*) AS orders\nFROM orders WHERE couponcode IS NOT NULL\nGROUP BY couponcode ORDER BY orders DESC;",
     "res": [
      [
       "SAVE20",
       "254"
      ],
      [
       "BIRYANI10",
       "248"
      ],
      [
       "FREESHIP",
       "236"
      ],
      [
       "NEW50",
       "235"
      ],
      [
       "MOMO5",
       "227"
      ]
     ],
     "note": "Useful for the campaign page, but coupon use says nothing about whether customers come back."
    }
   ],
   "causes": [
    [
     "c1",
     "Retention really is perfect this year"
    ],
    [
     "c2",
     "The measure copies the KPI sheet's filter OrderID > 1, which tests the order number instead of counting orders per customer, so every customer passes",
     true
    ],
    [
     "c3",
     "The report divides by the 10,000 registered customers instead of 6,329"
    ],
    [
     "c4",
     "Duplicate orders were loaded twice"
    ],
    [
     "c5",
     "Cancelled orders were counted as repeat orders"
    ]
   ],
   "fixes": [
    [
     "f1",
     "Count orders per customer and keep customers with COUNT(orders) > 1: 2,641 ÷ 6,329 = 41.73%. Log the KPI-sheet formula as a known error and add a QA check that the KPI is below 100%",
     true
    ],
    [
     "f2",
     "Keep the KPI-sheet formula because it is the official document"
    ],
    [
     "f3",
     "Change the filter to OrderID > 2"
    ],
    [
     "f4",
     "Divide the 100% by the 1.58 orders per customer"
    ]
   ],
   "answer": "Root cause: the KPI sheet's Repeat Customers formula filters <b>OrderID > 1</b>. That removes one order, not one-time customers, so all 6,329 customers pass and the KPI shows 100%. Correct: <b>2,641 of 6,329 customers (41.73%)</b> placed more than one order. 3,688 customers ordered only once.",
   "tell": "“Please keep the win-back campaign. The 100% comes from a wrong filter in the KPI formula. The real repeat rate is 41.73%: 2,641 of our 6,329 customers ordered more than once, and 3,688 ordered only once, so there is a lot to win back.”"
  },
  {
   "id": "i2",
   "lvl": "Medium",
   "title": "“Cancellations fell from 20.78% to 1.05%”",
   "from": "Arjun Malhotra · City Operations Head",
   "time": "Tue 10:25 AM",
   "msg": "The new Power BI ops report shows Order Cancellation Rate at 1.05%. The KPI pack we used all year said 20.78%. Looks like the new dispatch rules worked. I want to tell the CEO that cancellations are solved and move part of the cancellations support team to restaurant onboarding. Can you confirm?",
   "metric": [
    [
     "Order Cancellation Rate (new report)",
     "1.05%"
    ],
    [
     "Order Cancellation Rate (KPI pack)",
     "20.78%"
    ]
   ],
   "evidence": [
    {
     "id": "e1",
     "rel": true,
     "t": "Cancellations in each status column",
     "sql": "SELECT SUM(status = 'Cancelled') AS by_status,\n       ROUND(100.0 * SUM(status = 'Cancelled') / COUNT(*), 2) AS status_pct,\n       SUM(order_status = 'Cancelled') AS by_order_status,\n       ROUND(100.0 * SUM(order_status = 'Cancelled') / COUNT(*), 2) AS order_status_pct\nFROM orders;",
     "res": [
      [
       "Status = 'Cancelled'",
       "2,078 ÷ 10,000 = 20.78%"
      ],
      [
       "Order Status = 'Cancelled'",
       "105 ÷ 10,000 = 1.05%"
      ]
     ],
     "note": "Same 10,000 orders, same date range. The two numbers come from two different columns."
    },
    {
     "id": "e2",
     "rel": true,
     "t": "Do the two status columns agree?",
     "sql": "SELECT SUM(status = order_status) AS same_value,\n       ROUND(100.0 * SUM(status = order_status) / COUNT(*), 2) AS agree_pct,\n       SUM(status = 'Cancelled' AND order_status = 'Cancelled') AS cancelled_in_both\nFROM orders;",
     "res": [
      [
       "rows with the same value",
       "1,664"
      ],
      [
       "agree_pct",
       "16.64%"
      ],
      [
       "cancelled in both columns",
       "18"
      ]
     ],
     "note": "Status and Order Status agree on only 16.64% of orders, so switching columns changes the KPI completely."
    },
    {
     "id": "e3",
     "rel": true,
     "t": "Order Status of the orders that Status calls Cancelled",
     "sql": "SELECT order_status, COUNT(*) AS orders\nFROM orders WHERE status = 'Cancelled'\nGROUP BY order_status ORDER BY orders DESC LIMIT 4;",
     "res": [
      [
       "Delivered",
       "664"
      ],
      [
       "Preparing",
       "516"
      ],
      [
       "Out for Delivery",
       "428"
      ],
      [
       "Confirmed",
       "234"
      ]
     ],
     "note": "The columns contradict each other row by row. The KPI sheet defines cancellation on Status, so that is the official column."
    },
    {
     "id": "e4",
     "rel": false,
     "t": "Average delivery time by city",
     "sql": "SELECT r.location, ROUND(AVG(o.delivery_time_mins), 2) AS avg_mins\nFROM orders o JOIN restaurant r ON r.restaurantid = o.restaurant_id\nGROUP BY r.location ORDER BY avg_mins DESC;",
     "res": [
      [
       "Faridabad",
       "37.40"
      ],
      [
       "Noida",
       "37.36"
      ],
      [
       "Delhi",
       "37.23"
      ],
      [
       "Gurgaon",
       "37.07"
      ],
      [
       "Ghaziabad",
       "36.80"
      ]
     ],
     "note": "Good for the delivery page, but delivery speed does not explain a change in the cancellation KPI."
    }
   ],
   "causes": [
    [
     "c1",
     "The new dispatch rules really cut cancellations"
    ],
    [
     "c2",
     "The new report counts 'Cancelled' in the Order Status column, while the KPI sheet uses the Status column. The two columns agree on only 16.64% of orders",
     true
    ],
    [
     "c3",
     "Cancelled orders were deleted from the new extract"
    ],
    [
     "c4",
     "The new report divides by all registered customers instead of orders"
    ],
    [
     "c5",
     "Returned orders were not counted as cancellations"
    ]
   ],
   "fixes": [
    [
     "f1",
     "Use Status as the KPI sheet defines it (2,078 ÷ 10,000 = 20.78%), document the chosen column in the data dictionary, and log the 16.64% agreement between the two status columns as a data-quality issue",
     true
    ],
    [
     "f2",
     "Report 1.05% because it is the newer number"
    ],
    [
     "f3",
     "Add cancelled and returned orders from Order Status together"
    ],
    [
     "f4",
     "Average the two rates"
    ]
   ],
   "answer": "Root cause: the new measure reads the <b>Order Status</b> column (105 cancelled) instead of <b>Status</b> (2,078 cancelled), which is the column the KPI sheet uses. Both come from the same 10,000 orders, and the two columns agree on only 16.64% of rows, so nothing changed in operations. Correct: <b>Order Cancellation Rate 20.78%</b>.",
   "tell": "“Cancellations have not dropped. The new report read a different status column. Using the KPI definition, the rate is still 20.78% (2,078 of 10,000 orders), so please keep the support team in place. I've logged the column conflict so both reports use the same field.”"
  },
  {
   "id": "i3",
   "lvl": "Medium",
   "title": "“Customer satisfaction is 2.00 out of 5”",
   "from": "Sneha Iyer · Customer Experience Head",
   "time": "Wed 11:40 AM",
   "msg": "The delivery dashboard shows Customer Satisfaction Score at 2.00 out of 5. The Excel pack said 2.97. Our partners are clearly failing customers. I plan to send all 1,000 active delivery partners to retraining next week. Should I go ahead?",
   "metric": [
    [
     "Customer Satisfaction Score",
     "2.00"
    ]
   ],
   "evidence": [
    {
     "id": "e1",
     "rel": true,
     "t": "Delivery feedback rating distribution",
     "sql": "SELECT delivery_feedback_rating AS rating, COUNT(*) AS deliveries\nFROM delivery GROUP BY delivery_feedback_rating ORDER BY rating;",
     "res": [
      [
       "0",
       "3,274"
      ],
      [
       "1",
       "1,414"
      ],
      [
       "2",
       "1,335"
      ],
      [
       "3",
       "1,334"
      ],
      [
       "4",
       "1,295"
      ],
      [
       "5",
       "1,348"
      ]
     ],
     "note": "A 1 to 5 scale has no 0. The 3,274 zeros are deliveries with no rating."
    },
    {
     "id": "e2",
     "rel": true,
     "t": "Where the zeros come from",
     "sql": "SELECT delivery_status, COUNT(*) AS deliveries,\n       SUM(delivery_feedback_rating = 0) AS zero_ratings,\n       ROUND(AVG(NULLIF(delivery_feedback_rating, 0)), 2) AS avg_rated\nFROM delivery GROUP BY delivery_status;",
     "res": [
      [
       "Cancelled",
       "3,274 deliveries · 3,274 zeros"
      ],
      [
       "Late",
       "3,338 deliveries · 0 zeros · avg 2.97"
      ],
      [
       "On Time",
       "3,388 deliveries · 0 zeros · avg 2.98"
      ]
     ],
     "note": "Every zero is a cancelled delivery, and every cancelled delivery is a zero. A cancelled order could not be rated."
    },
    {
     "id": "e3",
     "rel": true,
     "t": "CSS with and without the zeros",
     "sql": "SELECT SUM(delivery_feedback_rating) AS rating_points,\n       ROUND(AVG(delivery_feedback_rating), 2) AS css_with_zeros,\n       COUNT(NULLIF(delivery_feedback_rating, 0)) AS rated,\n       ROUND(AVG(NULLIF(delivery_feedback_rating, 0)), 2) AS css_rated_only\nFROM delivery;",
     "res": [
      [
       "With zeros",
       "20,006 ÷ 10,000 = 2.00"
      ],
      [
       "Rated deliveries only",
       "20,006 ÷ 6,726 = 2.97"
      ]
     ],
     "note": "The rating points are the same. Only the denominator changed: the zeros pull the average down by about a third."
    },
    {
     "id": "e4",
     "rel": false,
     "t": "Orders by order source",
     "sql": "SELECT order_source, COUNT(*) AS orders\nFROM orders GROUP BY order_source;",
     "res": [
      [
       "App",
       "4,973"
      ],
      [
       "Web",
       "5,027"
      ]
     ],
     "note": "An even channel split. It does not explain the rating."
    }
   ],
   "causes": [
    [
     "c1",
     "Delivery partners really are rated 2 out of 5"
    ],
    [
     "c2",
     "The average includes 3,274 ratings of 0, which mean “not rated” and are exactly the cancelled deliveries",
     true
    ],
    [
     "c3",
     "Late deliveries are rated much lower than on-time ones"
    ],
    [
     "c4",
     "The dashboard used restaurant ratings instead of delivery ratings"
    ],
    [
     "c5",
     "Only 1,000 of the 10,000 agents in the master have deliveries"
    ]
   ],
   "fixes": [
    [
     "f1",
     "Treat 0 as blank: AVG(NULLIF(delivery_feedback_rating, 0)) = 2.97 over 6,726 rated deliveries, show the number of rated deliveries next to the score, and note the rule in the data dictionary",
     true
    ],
    [
     "f2",
     "Replace the zeros with 1 so every delivery has a rating"
    ],
    [
     "f3",
     "Report 2.00 because it uses all 10,000 deliveries"
    ],
    [
     "f4",
     "Remove cancelled orders from every KPI on the dashboard"
    ]
   ],
   "answer": "Root cause: <b>Delivery Feedback Rating = 0 means no rating</b>, and the 3,274 zeros are exactly the cancelled deliveries. Averaging them in divides 20,006 rating points by 10,000 instead of 6,726. Correct: <b>CSS 2.97</b>. On-time (2.98) and late (2.97) deliveries are rated almost the same, so the data does not single out partners for retraining.",
   "tell": "“Please hold the retraining. The 2.00 counted 3,274 cancelled deliveries, which have no rating, as zeros. Rated deliveries average 2.97 out of 5, and on-time and late deliveries score almost the same (2.98 vs 2.97). Let's look at what drives the rating before we act.”"
  },
  {
   "id": "i4",
   "lvl": "Advanced",
   "title": "“999 orders were never paid for”",
   "from": "Rohit Khanna · Finance Controller",
   "time": "Thu 3:30 PM",
   "msg": "The payment reconciliation report says 999 orders worth ₹8,37,341 have no payment record, and only 82 of the 9,001 matched payments have the right amount. That looks like leakage at the payment gateway. I want to raise it with the gateway and hold their settlement this month. Can you confirm before I send the email?",
   "metric": [
    [
     "Orders with no payment",
     "999 (₹8,37,341)"
    ],
    [
     "Payments matching the order amount",
     "82 of 9,001 (0.91%)"
    ]
   ],
   "evidence": [
    {
     "id": "e1",
     "rel": true,
     "t": "Rows matched by each join key",
     "sql": "SELECT 'text orderid = int orderid' AS join_key, COUNT(*) AS matched\nFROM orders o JOIN payments p ON p.orderid = o.orderid\nUNION ALL\nSELECT 'SUBSTR(orderid, 4)', COUNT(*)\nFROM orders o JOIN payments p ON CAST(SUBSTR(p.orderid, 4) AS INTEGER) = o.orderid\nUNION ALL\nSELECT 'SUBSTR(orderid, 4) - 999', COUNT(*)\nFROM orders o JOIN payments p ON CAST(SUBSTR(p.orderid, 4) AS INTEGER) - 999 = o.orderid\nUNION ALL\nSELECT 'payment_id = paymentid', COUNT(*)\nFROM orders o JOIN payments p ON p.paymentid = o.payment_id;",
     "res": [
      [
       "'ORD1000' = 1 (text vs number)",
       "0"
      ],
      [
       "Strip 'ORD' only",
       "9,001"
      ],
      [
       "Strip 'ORD', subtract 999",
       "10,000"
      ],
      [
       "Payment ID",
       "10,000"
      ]
     ],
     "note": "Payments.OrderID runs from ORD1000 for order 1, an offset of 999. Stripping 'ORD' without the offset leaves 999 orders unmatched."
    },
    {
     "id": "e2",
     "rel": true,
     "t": "Are the stripped-ID pairs the right orders?",
     "sql": "SELECT COUNT(*) AS pairs,\n       SUM(p.customerid = o.customer_id) AS same_customer,\n       SUM(p.amount = o.final_amount_paid) AS same_amount,\n       ROUND(100.0 * SUM(p.amount = o.final_amount_paid) / COUNT(*), 2) AS amount_match_pct\nFROM orders o\nJOIN payments p ON CAST(SUBSTR(p.orderid, 4) AS INTEGER) = o.orderid;",
     "res": [
      [
       "pairs",
       "9,001"
      ],
      [
       "same customer",
       "0"
      ],
      [
       "same amount",
       "82 (0.91%)"
      ]
     ],
     "note": "Not one pair has the same customer. Each payment is attached to the order 999 places later, so the 82 amount matches are coincidence."
    },
    {
     "id": "e3",
     "rel": true,
     "t": "Reconciliation on Payment ID",
     "sql": "SELECT COUNT(*) AS pairs,\n       SUM(p.customerid = o.customer_id) AS same_customer,\n       SUM(p.amount = o.final_amount_paid) AS same_amount,\n       SUM(p.amount) AS paid, SUM(o.final_amount_paid) AS billed\nFROM orders o JOIN payments p ON p.paymentid = o.payment_id;",
     "res": [
      [
       "pairs",
       "10,000"
      ],
      [
       "same customer",
       "10,000"
      ],
      [
       "same amount",
       "10,000"
      ],
      [
       "paid",
       "₹80,38,789"
      ],
      [
       "billed (Final Amount Paid)",
       "₹80,38,789"
      ]
     ],
     "note": "With the clean key every order has exactly one payment, with the same customer and the same amount, to the rupee."
    },
    {
     "id": "e4",
     "rel": false,
     "t": "Gross revenue by city",
     "sql": "SELECT r.location, SUM(o.total_amount) AS revenue\nFROM orders o JOIN restaurant r ON r.restaurantid = o.restaurant_id\nGROUP BY r.location ORDER BY revenue DESC LIMIT 3;",
     "res": [
      [
       "Noida",
       "₹22,53,210"
      ],
      [
       "Faridabad",
       "₹21,83,029"
      ],
      [
       "Gurgaon",
       "₹20,69,834"
      ]
     ],
     "note": "Useful for the revenue page, but it does not test whether payments match orders."
    }
   ],
   "causes": [
    [
     "c1",
     "The payment gateway lost 999 payments"
    ],
    [
     "c2",
     "Customers paid less than the billed amount on most orders"
    ],
    [
     "c3",
     "The report joined Payments to Orders by stripping 'ORD' from Payments.OrderID without subtracting the 999 offset, so every payment was paired with the wrong order and the last 999 orders found nothing",
     true
    ],
    [
     "c4",
     "Discounts were applied after payment"
    ],
    [
     "c5",
     "Failed and refunded payments were left out of the extract"
    ]
   ],
   "fixes": [
    [
     "f1",
     "Join on Orders.Payment ID = Payments.PaymentID (or SUBSTR minus 999), and add QA checks that matched rows = 10,000 and SUM(amount) = SUM(Final Amount Paid) = ₹80,38,789",
     true
    ],
    [
     "f2",
     "Raise the 999 orders with the gateway as planned"
    ],
    [
     "f3",
     "Use a LEFT JOIN so the 999 orders show up with zero payment"
    ],
    [
     "f4",
     "Match payments to orders by customer and amount instead"
    ]
   ],
   "answer": "Root cause: an <b>ID offset</b>. Payments.OrderID is text ('ORD1000' = order 1). The report stripped 'ORD' but did not subtract 999, so each payment landed on the wrong order (0 of 9,001 pairs share a customer) and orders 1 to 999 found no payment. Correct: joined on Payment ID, <b>all 10,000 orders reconcile</b>, customer and amount, total <b>₹80,38,789</b>. Of that, ₹71,93,763 is from the 8,980 payments with status Success.",
   "tell": "“Please don't send it. There is no leakage. The report used Payments.OrderID without its 999 offset, so it compared each payment with the wrong order. Joined on Payment ID, all 10,000 orders match their payment to the rupee, ₹80,38,789 in total. I've added a row-count and amount check to the reconciliation.”"
  }
 ],
 "broken": {
  "from": "Business Head",
  "brief": "“A junior analyst built this for tomorrow's leadership review. Something feels off. Flag every number you would NOT present, then submit.”",
  "title": "Swiggy · Delivery & Growth Overview · 28 Mar 2024 to 28 Mar 2025",
  "tiles": [
   {
    "id": "t1",
    "label": "Total Orders",
    "val": "10,000",
    "bad": false,
    "why": "Correct: COUNT(OrderID) on Orders, one row per order."
   },
   {
    "id": "t2",
    "label": "Total Revenue",
    "val": "₹1,04,33,244",
    "bad": false,
    "why": "Correct: SUM(Total Amount), the official revenue definition. Net revenue (Final Amount Paid) is ₹80,38,789 and should be labelled separately."
   },
   {
    "id": "t3",
    "label": "Total Customers",
    "val": "10,000",
    "bad": true,
    "why": "Counts every row of the Customers sheet, including 3,671 registered customers who never ordered. Correct: DISTINCTCOUNT(Customer ID) in Orders = 6,329."
   },
   {
    "id": "t4",
    "label": "Average Order Value",
    "val": "₹1,043.32",
    "bad": false,
    "why": "Correct: ₹1,04,33,244 ÷ 10,000 orders."
   },
   {
    "id": "t5",
    "label": "Repeat Customer %",
    "val": "100.00%",
    "bad": true,
    "why": "Uses the KPI sheet's filter OrderID > 1, which every customer passes. Correct: customers with more than one order, 2,641 ÷ 6,329 = 41.73%."
   },
   {
    "id": "t6",
    "label": "Delivery Efficiency (On-Time %)",
    "val": "0.00%",
    "bad": true,
    "why": "Filters Delivery Status = 'Delivered', a value that does not exist (only On Time, Late and Cancelled). Correct: 3,388 On Time ÷ 10,000 deliveries = 33.88% (50.37% if cancelled deliveries are excluded)."
   },
   {
    "id": "t7",
    "label": "Order Cancellation Rate",
    "val": "20.78%",
    "bad": false,
    "why": "Correct: 2,078 orders with Status = 'Cancelled' ÷ 10,000, the column the KPI sheet uses."
   },
   {
    "id": "t8",
    "label": "Customer Satisfaction Score",
    "val": "2.97",
    "bad": false,
    "why": "Correct: average Delivery Feedback Rating with the 3,274 zeros (no rating, all cancelled deliveries) excluded."
   },
   {
    "id": "t9",
    "label": "Active Delivery Agents",
    "val": "10,000",
    "bad": true,
    "why": "Counts the DeliveryAgent master. Only agents who appear in Delivery are active. Correct: DISTINCTCOUNT(Delivery Agent ID) in Delivery = 1,000."
   },
   {
    "id": "t10",
    "label": "Coupon Usage %",
    "val": "99.80%",
    "bad": true,
    "why": "Counts every order with Discount Applied > 0 (9,980), but discounts appear on almost every order with or without a coupon. Correct: orders with a CouponCode, 1,200 ÷ 10,000 = 12.00%."
   }
  ],
  "chart": {
   "title": "Top food categories by orders",
   "bars": [
    [
     "Main Course",
     "51,202",
     100
    ],
    [
     "Dessert",
     "50,965",
     100
    ],
    [
     "Beverage",
     "49,166",
     96
    ],
    [
     "Starter",
     "48,866",
     95
    ]
   ],
   "bad": true,
   "why": "Joined Orders to Menu on Restaurant ID. There is no order-items table, so each order is repeated once per menu item of its restaurant: 10,000 orders became 200,199 rows. Correct: orders by food category can't be measured from this data. Show menu items per category instead (Main Course 2,559, Dessert 2,549, Beverage 2,452, Starter 2,440) and flag the gap."
  }
 },
 "stakeholders": [
  {
   "id": "s1",
   "who": "Arjun Malhotra · City Operations Head",
   "ask": "I need a dashboard that shows how our deliveries are doing.",
   "qs": [
    [
     "What decision will you take from this dashboard each week?",
     "obj",
     18,
     "Where to add delivery partners and which cities need dispatch changes."
    ],
    [
     "Who will use it: only you, or also the city managers?",
     "scope",
     14,
     "Me and the city managers for Delhi, Noida, Gurgaon, Faridabad and Ghaziabad."
    ],
    [
     "Should on-time % be On Time ÷ all deliveries, or exclude cancelled deliveries?",
     "metric",
     18,
     "Headline On Time ÷ all 10,000 deliveries (33.88%). Show 50.37% excluding cancelled next to it, clearly labelled."
    ],
    [
     "Should delivery time come from the Delivery Time (mins) column or from the pickup and delivery timestamps?",
     "metric",
     12,
     "Use Delivery Time (mins), 37.18 minutes on average. The timestamps are unreliable: actual delivery is before pickup on 49.8% of deliveries."
    ],
    [
     "Which period, and at what grain?",
     "time",
     16,
     "28 Mar 2024 to 28 Mar 2025, by month. March 2024 has only 86 orders, so mark it as a partial month."
    ],
    [
     "Should an active agent be one who appears in the Delivery sheet?",
     "rules",
     14,
     "Yes. 1,000 agents deliver, even though the master lists 10,000."
    ],
    [
     "Should the city filter use Restaurant Location rather than the city in the restaurant name?",
     "scope",
     8,
     "Location. The name suffix often names a different city."
    ],
    [
     "How often should it refresh?",
     "time",
     6,
     "Weekly is enough for the ops review."
    ],
    [
     "Can I filter Delivery Status = 'Delivered' for on-time, like the KPI sheet says?",
     "bad",
     -8,
     "No. That value doesn't exist and returns 0%. Use 'On Time'."
    ],
    [
     "Which colour theme do you like?",
     "bad",
     -6,
     "Whatever is readable. (A question for later, not for scoping.)"
    ],
    [
     "Should I put every column of the Delivery sheet on it?",
     "bad",
     -8,
     "No, only what supports the weekly decisions."
    ]
   ]
  },
  {
   "id": "s2",
   "who": "Priya Menon · Growth & Marketing Lead",
   "ask": "Show me how loyal our customers are.",
   "qs": [
    [
     "What will you decide from it?",
     "obj",
     18,
     "How to split next quarter's budget between win-back campaigns and new-user offers."
    ],
    [
     "Is a repeat customer one who placed more than one order?",
     "metric",
     18,
     "Yes. COUNT(orders) > 1 per customer: 2,641 of 6,329, 41.73%. Never the OrderID > 1 filter."
    ],
    [
     "Should the denominator be the 6,329 customers who ordered or all 10,000 registered?",
     "metric",
     12,
     "6,329 for repeat % and revenue per customer. Show the 10,000 registered as a separate tile."
    ],
    [
     "Which period?",
     "time",
     16,
     "The full year of orders, 28 Mar 2024 to 28 Mar 2025, with a monthly trend."
    ],
    [
     "Do you want it split by membership status and food preference?",
     "scope",
     14,
     "Yes, both. Gender is not needed."
    ],
    [
     "Should coupon orders mean orders with a CouponCode, not any discount?",
     "rules",
     12,
     "Yes, 1,200 coupon orders (12%). A discount alone appears on almost every order."
    ],
    [
     "Can I use Customers.LastOrderDate for recency?",
     "rules",
     8,
     "No. It matches the real last order for only 0.16% of customers. Compute it from Orders."
    ],
    [
     "How often do you need it updated?",
     "time",
     6,
     "Monthly, before the campaign planning meeting."
    ],
    [
     "Can I keep the KPI sheet's repeat formula as is to save time?",
     "bad",
     -8,
     "No. It returns 100% for everyone."
    ],
    [
     "Should I add customer phone numbers to the table?",
     "bad",
     -6,
     "No. Personal data stays out of the dashboard."
    ],
    [
     "Do you want the loyalty split as a 3D pie chart?",
     "bad",
     -6,
     "No. A simple bar reads better."
    ]
   ]
  },
  {
   "id": "s3",
   "who": "Rohit Khanna · Finance Controller",
   "ask": "I need a revenue report for the board pack.",
   "qs": [
    [
     "What will the board decide from it?",
     "obj",
     18,
     "Whether discounts are eating revenue, and which cities and cuisines earn the most."
    ],
    [
     "Is revenue gross Total Amount or net Final Amount Paid?",
     "metric",
     18,
     "Both. Gross ₹1,04,33,244 as the headline, net ₹80,38,789 beside it, and the ₹25,12,811 discount shown separately."
    ],
    [
     "Should collected cash count only payments with status Success?",
     "metric",
     12,
     "Yes. ₹71,93,763 from 8,980 successful payments."
    ],
    [
     "How should Payments be joined to Orders?",
     "rules",
     14,
     "On Payment ID. The ORD text OrderID is offset by 999 and pairs the wrong orders."
    ],
    [
     "How should I treat the 898 orders that pay ₹0 because the discount is above the total?",
     "rules",
     10,
     "Keep them, show the count, and log them in the QA notes. Don't drop them silently."
    ],
    [
     "Should I cut it by city, cuisine and month?",
     "scope",
     14,
     "City and cuisine from the Restaurant sheet, with a monthly trend."
    ],
    [
     "Which period, and monthly or quarterly?",
     "time",
     16,
     "28 Mar 2024 to 28 Mar 2025, monthly, with the partial first month flagged."
    ],
    [
     "Should AOV be on the page too?",
     "scope",
     8,
     "Yes. ₹1,043.32 gross and ₹803.88 net."
    ],
    [
     "Can I use the Excel totals instead of reconciling with SQL?",
     "bad",
     -8,
     "No. Every KPI must reconcile to SQL."
    ],
    [
     "Can I mix the payment methods from Orders and Payments in one chart?",
     "bad",
     -6,
     "No. The labels differ (Credit Card vs Card). Pick one source and say which."
    ],
    [
     "Do you want the city split as a 3D pie chart?",
     "bad",
     -6,
     "No. Five close values read better as a simple bar."
    ]
   ]
  }
 ]
};
