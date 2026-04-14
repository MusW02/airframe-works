import { useMemo, useState } from 'react';
import { useAirplane } from '../context/airplaneStore';

const Comparison = () => {
  const { state } = useAirplane();
  const [leftId, setLeftId] = useState(state.airplanes[0]?.id ?? '');
  const [rightId, setRightId] = useState(state.airplanes[1]?.id ?? '');

  const left = useMemo(() => state.airplanes.find((plane) => plane.id === leftId), [state.airplanes, leftId]);
  const right = useMemo(() => state.airplanes.find((plane) => plane.id === rightId), [state.airplanes, rightId]);

  return (
    <div className="comparison-page">
      <section className="comparison-header">
        <h1>Compare Aircraft</h1>
        <p>Choose any two models to compare core dimensions, performance, and capacity.</p>
      </section>

      <section className="comparison-selectors">
        <label>
          Aircraft A
          <select value={leftId} onChange={(event) => setLeftId(event.target.value)}>
            {state.airplanes.map((airplane) => (
              <option key={airplane.id} value={airplane.id}>
                {airplane.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Aircraft B
          <select value={rightId} onChange={(event) => setRightId(event.target.value)}>
            {state.airplanes.map((airplane) => (
              <option key={airplane.id} value={airplane.id}>
                {airplane.name}
              </option>
            ))}
          </select>
        </label>
      </section>

      {left && right && (
        <section className="comparison-grid">
          <article className="comparison-card">
            <img src={left.images[0]} alt={left.name} />
            <h2>{left.name}</h2>
            <p>{left.manufacturer}</p>
            <ul>
              <li>Passengers: {left.specifications.capacity.passengers}</li>
              <li>Range: {left.specifications.performance.range.toLocaleString()} km</li>
              <li>Cruise: {left.specifications.performance.cruiseSpeed} km/h</li>
              <li>Length: {left.specifications.dimensions.length} m</li>
              <li>Wingspan: {left.specifications.dimensions.wingspan} m</li>
              <li>MTOW: {left.specifications.weights.maxTakeoff.toLocaleString()} kg</li>
            </ul>
          </article>

          <article className="comparison-card">
            <img src={right.images[0]} alt={right.name} />
            <h2>{right.name}</h2>
            <p>{right.manufacturer}</p>
            <ul>
              <li>Passengers: {right.specifications.capacity.passengers}</li>
              <li>Range: {right.specifications.performance.range.toLocaleString()} km</li>
              <li>Cruise: {right.specifications.performance.cruiseSpeed} km/h</li>
              <li>Length: {right.specifications.dimensions.length} m</li>
              <li>Wingspan: {right.specifications.dimensions.wingspan} m</li>
              <li>MTOW: {right.specifications.weights.maxTakeoff.toLocaleString()} kg</li>
            </ul>
          </article>
        </section>
      )}
    </div>
  );
};

export default Comparison;