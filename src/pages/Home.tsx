import { Link } from 'react-router-dom';
import { useAirplane } from '../context/airplaneStore';

const Home = () => {
  const { state } = useAirplane();
  const featured = state.airplanes.slice(0, 3);

  return (
    <div className="home-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Commercial Fleet Explorer</p>
          <h1>Explore Real Commercial Aircraft Data With Real Images</h1>
          <p>
            Discover modern passenger aircraft, compare real-world performance, and browse
            detailed specifications in a clean aviation-focused interface.
          </p>
          <div className="hero-actions">
            <Link to="/catalog" className="button-primary">
              Browse Fleet
            </Link>
            <Link to="/compare" className="button-secondary">
              Compare Aircraft
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
            alt=""
          />
        </div>
      </section>

      <section className="featured-section">
        <div className="section-title-row">
          <h2>Featured Aircraft</h2>
          <Link to="/catalog" className="text-link">
            View all models
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((airplane) => (
            <article className="featured-card" key={airplane.id}>
              <img src={airplane.images[0]} alt={airplane.name} />
              <div className="featured-body">
                <h3>{airplane.name}</h3>
                <p>
                  {airplane.manufacturer} · {airplane.type}
                </p>
                <Link to={`/airplane/${airplane.id}`} className="text-link">
                  Open profile
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;