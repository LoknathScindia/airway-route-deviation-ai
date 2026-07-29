import json
from pathlib import Path

from fastapi import APIRouter

router = APIRouter(tags=["Airports"])


@router.get("/airports")
def get_airports():
    data_path = (
        Path(__file__).resolve().parents[2]
        / "data"
        / "airports.json"
    )

    with open(data_path, "r", encoding="utf-8") as f:
        airports = json.load(f)

    airport_list = []

    for icao, details in airports.items():
        airport_list.append(
            {
                "icao": icao,
                "name": details["name"],
                "latitude": details["latitude"],
                "longitude": details["longitude"],
            }
        )

    airport_list.sort(key=lambda airport: airport["name"])

    return airport_list