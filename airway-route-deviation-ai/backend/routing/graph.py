import json


AIRPORTS_PATH = "backend/data/airports.json"
GRAPH_PATH = "backend/data/airway_graph.json"


def load_airports():
    with open(AIRPORTS_PATH, "r") as file:
        return json.load(file)


def load_graph():
    with open(GRAPH_PATH, "r") as file:
        return json.load(file)