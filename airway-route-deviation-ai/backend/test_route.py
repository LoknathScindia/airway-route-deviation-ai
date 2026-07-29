from backend.routing.alternate_route import get_alternate_route

result = get_alternate_route(
    "VOBL",   # Bengaluru
    "EGLL"    # London Heathrow
)

print(result)