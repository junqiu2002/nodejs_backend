import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 5000;

// In-memory cache variables to eliminate 429 errors
let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 30000; // 30 seconds

app.get('/api/transit/route545', async (req, res) => {
  const currentTime = Date.now();

  // Serve from memory if requested within 30 seconds
  if (cachedData && (currentTime - lastFetchTime < CACHE_DURATION_MS)) {
    console.log('[Cache Hit] Serving transit data from local memory to avoid 429.');
    return res.json({ success: true, data: cachedData });
  }

  try {
    console.log('[API Fetch] Cache expired or empty. Executing network fetch...');

    const domainParts = ['https:', '', 'api.pugetsound.onebusaway.org', 'api', 'where', 'trips-for-route', '40_100236.json'];
    const secureUrl = domainParts.join('/');

    const response = await axios.get(secureUrl, {
      params: { 
        key: 'TEST',
        includeStatus: 'true'
      }
    });

    if (response.data?.data?.list) {
      const activeTrips = response.data.data.list;

      // Create a map from references.trips to look up directionId by tripId
      const referenceTrips = response.data.data.references?.trips || [];
      const directionLookup = new Map(referenceTrips.map(t => [t.id, t.directionId]));

      const formattedVehicles = activeTrips
        .filter(trip => trip.status && trip.status.lastKnownLocation)
        .map(trip => {
          const targetTripId = trip.tripId || trip.status.activeTripId;
          const dirId = directionLookup.get(targetTripId) || "0"; // Defaults to "0" if missing

          return {
            vehicleId: trip.status.vehicleId || `BUS-${targetTripId}`,
            location: {
              lat: trip.status.lastKnownLocation.lat,
              lon: trip.status.lastKnownLocation.lon
            },
            status: trip.status.phase || 'In Transit',
            tripId: targetTripId,
            direction: dirId // Safely returns "0" or "1" from references
          };
        });

      // Save into cache
      cachedData = formattedVehicles;
      lastFetchTime = currentTime;

      console.log(`[Success] Processed and cached ${formattedVehicles.length} live buses.`);
      return res.json({ success: true, data: formattedVehicles });
    }

    res.json({ success: true, data: [] });
  } catch (error) {
    // If the API throws a 429, gracefully serve the stale cache data instead of crashing
    if (error.response?.status === 429 && cachedData) {
      console.warn('[Warning] Rate limited (429)! Falling back to cached data.');
      return res.json({ success: true, data: cachedData, warning: 'Stale cache fallback' });
    }

    console.error('Error fetching transit data:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend transit server running safely on port ${PORT}`);
});
