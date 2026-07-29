from backend.routing.graph import load_graph, load_airports
from backend.routing.pathfinder import dijkstra


def get_alternate_route(
    departure: str,
    destination: str,
    blocked: list[str] | None = None,
):
    """
    Returns an alternate route with airport details.

    Parameters
    ----------
    departure : str
        ICAO code of departure airport.

    destination : str
        ICAO code of destination airport.

    blocked : list[str] | None
        Airports to avoid.

    Returns
    -------
    dict
    """

    graph = load_graph()
    airports = load_airports()

    if departure not in airports:
        return {
            "success": False,
            "message": f"Unknown departure airport: {departure}",
        }

    if destination not in airports:
        return {
            "success": False,
            "message": f"Unknown destination airport: {destination}",
        }

    path, distance = dijkstra(
        graph,
        departure,
        destination,
        blocked,
    )

    if path is None:
        return {
            "success": False,
            "message": "No alternate route found.",
        }

    route = []

    for airport_code in path:
        airport = airports.get(airport_code)

        if airport is None:
            continue

        route.append(
            {
                "icao": airport_code,
                "name": airport.get("name"),
                "latitude": airport.get("latitude"),
                "longitude": airport.get("longitude"),
            }
        )

    return {
        "success": True,
        "distance_km": round(distance, 2),
        "route": route,
    }