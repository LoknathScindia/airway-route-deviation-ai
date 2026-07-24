# Data Understanding

## Purpose

This document describes the datasets required for the Airway Route Deviation Prediction System.

---

# Dataset Sources

## Flight Data

Contains:

- Flight ID
- Aircraft ID
- Latitude
- Longitude
- Altitude
- Speed
- Heading
- Timestamp

Purpose:

Track aircraft movement.

---

## Weather Data

Contains:

- Wind Speed
- Wind Direction
- Temperature
- Visibility
- Storm Information

Purpose:

Understand environmental conditions.

---

## Airport Data

Contains:

- Airport Code
- Airport Name
- Latitude
- Longitude

Purpose:

Identify departure and destination airports.

---

## Airspace Data

Contains:

- Airways
- Waypoints
- Restricted Areas
- NOTAMs (future)

Purpose:

Provide route constraints.

---

# Target Variable

The AI model predicts:

Route Deviation

Possible values:

- Yes
- No

---

# Expected Features

- Speed
- Altitude
- Heading
- Wind Speed
- Wind Direction
- Visibility
- Distance to Destination
- Weather Severity