import json
import pandas as pd
from geopy.distance import geodesic

# File paths
AIRPORTS_CSV = "backend/data/airports.csv"
AIRPORTS_JSON = "backend/data/airports.json"
GRAPH_JSON = "backend/data/airway_graph.json"

# Load dataset
print("Loading airport dataset...")
df = pd.read_csv(AIRPORTS_CSV)
print(f"Loaded {len(df)} airports from CSV.")

# Keep only large airports with scheduled service
df = df[
    (df["type"] == "large_airport") &
    (df["scheduled_service"] == "yes") &
    (df["icao_code"].notna())
]

print(f"Filtered to {len(df)} large airports with scheduled service.")

# Keep only required columns
df = df[
    [
        "icao_code",
        "name",
        "latitude_deg",
        "longitude_deg",
    ]
]

# Build airport dictionary
airports = {}

for _, row in df.iterrows():
    airports[row["icao_code"]] = {
        "name": row["name"],
        "latitude": float(row["latitude_deg"]),
        "longitude": float(row["longitude_deg"]),
    }

print(f"Airports dictionary contains {len(airports)} airports.")

# Build graph
graph = {}

airport_codes = list(airports.keys())

print("Building airway graph...")

MAX_DISTANCE = 3000  # km

for airport in airport_codes:
    graph[airport] = {}

    coord1 = (
        airports[airport]["latitude"],
        airports[airport]["longitude"],
    )

    for other in airport_codes:

        if airport == other:
            continue

        coord2 = (
            airports[other]["latitude"],
            airports[other]["longitude"],
        )

        distance = geodesic(coord1, coord2).km

        if distance <= MAX_DISTANCE:
            graph[airport][other] = round(distance, 2)

import os

print("Writing airports to:", os.path.abspath(AIRPORTS_JSON))
with open(AIRPORTS_JSON, "w") as file:
    json.dump(airports, file, indent=4)

print("Writing graph to:", os.path.abspath(GRAPH_JSON))
with open(GRAPH_JSON, "w") as file:
    json.dump(graph, file, indent=4)

print(f"Generated {len(airports)} airports.")
print(f"Graph contains {len(graph)} nodes.")
print("Finished successfully!")