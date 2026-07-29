import heapq


def dijkstra(graph, start, destination, blocked=None):
    """
    Find the shortest path between two airports using Dijkstra's algorithm.

    Parameters:
        graph (dict): Airway graph.
        start (str): Departure ICAO code.
        destination (str): Destination ICAO code.
        blocked (list): Airports to avoid.

    Returns:
        tuple:
            (path, total_distance)
    """

    if blocked is None:
        blocked = []

    if start not in graph or destination not in graph:
        return None, float("inf")

    priority_queue = [(0, start, [start])]
    visited = set()

    while priority_queue:
        current_distance, current_airport, path = heapq.heappop(priority_queue)

        if current_airport in visited:
            continue

        visited.add(current_airport)

        if current_airport == destination:
            return path, round(current_distance, 2)

        for neighbour, distance in graph[current_airport].items():

            if neighbour in visited:
                continue

            if neighbour in blocked:
                continue

            heapq.heappush(
                priority_queue,
                (
                    current_distance + distance,
                    neighbour,
                    path + [neighbour],
                ),
            )

    return None, float("inf")