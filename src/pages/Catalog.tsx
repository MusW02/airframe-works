import { useMemo, useState } from 'react';
import { useAirplane } from '../context/airplaneStore';
import { Link } from 'react-router-dom';
import { filterAirplanes, getAircraftTypes, getUniqueManufacturers, getPassengerRanges, getRangeCategories } from '../utils/searchUtils';
import type { FilterOptions } from '../types/airplane';

interface CatalogFilters {
  manufacturer: string;
  type: string;
  passengerRange: string;
  rangeCategory: string;
}

const Catalog = () => {
  const { state } = useAirplane();
  const [query, setQuery] = useState('');

  const [filters, setFilters] = useState<CatalogFilters>({
    manufacturer: '',
    type: '',
    passengerRange: '',
    rangeCategory: '',
  });

  const displayed = useMemo(() => {
    const searched = state.airplanes.filter((airplane) => {
      if (!query.trim()) {
        return true;
      }

      const text = `${airplane.name} ${airplane.manufacturer} ${airplane.model} ${airplane.description}`.toLowerCase();
      return text.includes(query.trim().toLowerCase());
    });

    return filterAirplanes(searched, filters as FilterOptions);
  }, [state.airplanes, query, filters]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="catalog-page">
      <section className="catalog-toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Search by model, manufacturer, or description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search aircraft"
        />

        <div className="filter-bar">
          <label>
            Manufacturer
            <select name="manufacturer" value={filters.manufacturer} onChange={handleChange}>
              <option value="">All</option>
              {getUniqueManufacturers(state.airplanes).map((manufacturer) => (
                <option key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </option>
              ))}
            </select>
          </label>

          <label>
            Aircraft Type
            <select name="type" value={filters.type} onChange={handleChange}>
              <option value="">All</option>
              {getAircraftTypes().map((aircraftType) => (
                <option key={aircraftType.value} value={aircraftType.value}>
                  {aircraftType.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Passenger Capacity
            <select name="passengerRange" value={filters.passengerRange} onChange={handleChange}>
              <option value="">All</option>
              {getPassengerRanges().map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Range Category
            <select name="rangeCategory" value={filters.rangeCategory} onChange={handleChange}>
              <option value="">All</option>
              {getRangeCategories().map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="catalog-results-header">
        <h1>Fleet Catalog</h1>
        <p>
          Showing {displayed.length} of {state.airplanes.length} aircraft
        </p>
      </section>

      <section className="catalog-grid">
        {displayed.map((airplane) => (
          <article key={airplane.id} className="airplane-card">
            <img src={airplane.thumbnails[0] ?? airplane.images[0]} alt={airplane.name} loading="lazy" />
            <div className="card-content">
              <h2>{airplane.name}</h2>
              <p className="meta-line">
                {airplane.manufacturer} · {airplane.type}
              </p>
              <p className="meta-line">Range: {airplane.specifications.performance.range.toLocaleString()} km</p>
              <Link to={`/airplane/${airplane.id}`} className="details-link">
                View Details
              </Link>
            </div>
          </article>
        ))}

        {displayed.length === 0 && (
          <p className="empty-state">No aircraft match your current filters.</p>
        )}
      </section>
    </div>
  );
};

export default Catalog;