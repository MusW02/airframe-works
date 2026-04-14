import { Link, useParams } from 'react-router-dom';
import { useAirplane } from '../context/airplaneStore';

function formatNumber(value: number): string {
  return value.toLocaleString();
}

const AirplaneDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useAirplane();
  const airplane = state.airplanes.find((a) => a.id === id);

  if (!airplane) {
    return (
      <div className="detail-missing">
        <h1>Aircraft not found</h1>
        <Link to="/catalog" className="button-primary">
          Back to catalog
        </Link>
      </div>
    );
  }

  const { specifications, description, features, images } = airplane;

  return (
    <div className="airplane-detail">
      <section className="detail-hero">
        <img src={images[0]} alt={airplane.name} className="detail-hero-image" />
        <div className="detail-hero-copy">
          <p className="eyebrow">{airplane.manufacturer}</p>
          <h1>{airplane.name}</h1>
          <p>{description}</p>
          <div className="chip-row">
            <span className="chip">{airplane.type}</span>
            <span className="chip">{airplane.status}</span>
            <span className="chip">First flight: {airplane.firstFlight}</span>
          </div>
        </div>
      </section>

      <section className="spec-grid">
        <article>
          <h2>Capacity</h2>
          <p>Passengers: {formatNumber(specifications.capacity.passengers)}</p>
          <p>Crew: {formatNumber(specifications.capacity.crew)}</p>
        </article>

        <article>
          <h2>Dimensions</h2>
          <p>Length: {formatNumber(specifications.dimensions.length)} m</p>
          <p>Wingspan: {formatNumber(specifications.dimensions.wingspan)} m</p>
          <p>Height: {formatNumber(specifications.dimensions.height)} m</p>
        </article>

        <article>
          <h2>Performance</h2>
          <p>Range: {formatNumber(specifications.performance.range)} km</p>
          <p>Cruise: {formatNumber(specifications.performance.cruiseSpeed)} km/h</p>
          <p>Max: {formatNumber(specifications.performance.maxSpeed)} km/h</p>
        </article>

        <article>
          <h2>Weight</h2>
          <p>Empty: {formatNumber(specifications.weights.empty)} kg</p>
          <p>MTOW: {formatNumber(specifications.weights.maxTakeoff)} kg</p>
        </article>
      </section>

      <section className="detail-columns">
        <article>
          <h2>Highlights</h2>
          <ul>
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>

        <article>
          <h2>Variants</h2>
          <ul>
            {airplane.variants.map((variant) => (
              <li key={variant}>{variant}</li>
            ))}
          </ul>
          <h2>Major Operators</h2>
          <ul>
            {airplane.operators.map((operator) => (
              <li key={operator}>{operator}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="gallery">
        <h2>Gallery</h2>
        <div className="image-grid">
          {images.map((src, index) => (
            <img key={src} src={src} alt={`${airplane.name} photo ${index + 1}`} loading="lazy" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AirplaneDetail;