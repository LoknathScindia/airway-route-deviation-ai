import { useState } from "react";

import PredictionForm from "@/components/prediction/PredictionForm";
import PredictionResult from "@/components/prediction/PredictionResult";
import FlightMap from "@/components/prediction/FlightMap";
import FlightInfo from "@/components/prediction/FlightInfo";
import FlightStatus from "@/components/prediction/FlightStatus";

function Prediction() {
  const [predictionResult, setPredictionResult] = useState(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Flight Prediction
        </h1>

        <p className="mt-2 text-slate-500">
          Enter flight parameters to predict airway route deviations.
        </p>
      </div>

      <PredictionForm onPrediction={setPredictionResult} />

      <PredictionResult result={predictionResult} />

      <FlightMap result={predictionResult} />

      <FlightInfo result={predictionResult} />

      <FlightStatus result={predictionResult} />
    </div>
  );
}

export default Prediction;