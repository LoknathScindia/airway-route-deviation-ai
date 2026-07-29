"""
Flight analysis utilities.
"""


def analyze_flight(
    prediction: int,
    confidence: float,
    velocity: float,
    vertical_rate: float,
):
    """
    Generate additional AI insights for the prediction.
    """

    confidence_percent = confidence * 100

    # Risk level
    if confidence_percent >= 90:
        risk_level = "High"
    elif confidence_percent >= 70:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    # Reason
    if prediction == 1:
        if abs(vertical_rate) > 15 and velocity > 350:
            reason = (
                "High speed combined with a significant vertical rate "
                "indicates a likely route deviation."
            )
        elif abs(vertical_rate) > 15:
            reason = (
                "Rapid altitude changes increase the likelihood of "
                "route deviation."
            )
        elif velocity > 350:
            reason = (
                "High aircraft speed increases the likelihood of "
                "route deviation."
            )
        else:
            reason = (
                "Flight parameters indicate a possible route deviation."
            )

        recommendation = (
            "Follow the recommended alternate route and continue "
            "monitoring flight conditions."
        )

        fuel_saving = round(confidence * 25)
        co2_reduction = fuel_saving * 3

    else:
        reason = (
            "Current flight parameters are within the expected "
            "operational range."
        )

        recommendation = (
            "Continue on the planned route."
        )

        fuel_saving = round(confidence * 8)
        co2_reduction = fuel_saving * 3

    return {
        "risk_level": risk_level,
        "reason": reason,
        "recommendation": recommendation,
        "fuel_saving": fuel_saving,
        "co2_reduction": co2_reduction,
    }