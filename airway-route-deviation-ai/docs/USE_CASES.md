# Use Cases

## UC-1: Analyze Flight Risk

### Actor
Airline Operations Manager

### Description
The user selects an active flight to evaluate its current operational risk.

### Preconditions
- Flight data is available.
- Weather data is available.

### Main Flow

1. User selects a flight.
2. System loads flight information.
3. System retrieves weather information.
4. System generates engineered features.
5. AI model predicts deviation probability.
6. System displays prediction.
7. System explains the prediction.

### Output

- Risk Score
- Deviation Probability
- Explanation

---

## UC-2: Recommend Alternate Route

### Actor
Flight Dispatcher

### Description
The system recommends an alternate flight route.

### Preconditions

- High deviation probability detected.

### Main Flow

1. System analyzes current route.
2. Detects weather and airspace constraints.
3. Searches alternate routes.
4. Calculates route cost.
5. Displays recommended route.

### Output

- Optimized Route
- Fuel Estimate
- Delay Estimate

---

## UC-3: View Historical Analytics

### Actor

Aviation Analyst

### Main Flow

1. Select historical flights.
2. Generate reports.
3. View trends.
4. Export results.

### Output

Charts and Reports.
