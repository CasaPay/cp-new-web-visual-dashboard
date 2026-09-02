(function initialiseCityRentalClustering(globalScope, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (globalScope) globalScope.CasaPayCityRentalClustering = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  'use strict';

  const CLUSTER_COUNT_TIERS = Object.freeze([25, 50, 100, 250, 500, 1000]);
  const INDIVIDUAL_PIN_LIMIT = 24;

  const getClusterCountTier = count => {
    if (!Number.isFinite(count) || count < CLUSTER_COUNT_TIERS[0]) return null;
    return CLUSTER_COUNT_TIERS.reduce((tier, threshold) => count >= threshold ? threshold : tier, null);
  };

  const getMinimumClusterSize = zoom => {
    if (zoom <= 8) return 1000;
    if (zoom === 9) return 500;
    if (zoom === 10) return 250;
    if (zoom === 11) return 100;
    if (zoom === 12) return 50;
    return 25;
  };

  const centroidFor = (buildings, pointFor) => {
    const totals = buildings.reduce((result, building) => {
      const point = pointFor(building);
      result.x += Number(point.x) || 0;
      result.y += Number(point.y) || 0;
      result.latitude += Number(building.latitude) || 0;
      result.longitude += Number(building.longitude) || 0;
      return result;
    }, { x: 0, y: 0, latitude: 0, longitude: 0 });
    const divisor = Math.max(1, buildings.length);
    return {
      x: totals.x / divisor,
      y: totals.y / divisor,
      latitude: totals.latitude / divisor,
      longitude: totals.longitude / divisor,
    };
  };

  const distanceSquared = (left, right) => ((left.x - right.x) ** 2) + ((left.y - right.y) ** 2);

  const mergeUndersizedGroups = (groups, minimumSize, pointFor) => {
    const merged = groups.map(group => [...group]);
    while (merged.length > 1) {
      let sourceIndex = -1;
      let sourceSize = Infinity;
      merged.forEach((group, index) => {
        if (group.length < minimumSize && group.length < sourceSize) {
          sourceIndex = index;
          sourceSize = group.length;
        }
      });
      if (sourceIndex < 0) break;
      const source = merged[sourceIndex];
      const sourceCenter = centroidFor(source, pointFor);
      let targetIndex = -1;
      let targetDistance = Infinity;
      merged.forEach((candidate, index) => {
        if (index === sourceIndex) return;
        const distance = distanceSquared(sourceCenter, centroidFor(candidate, pointFor));
        if (distance < targetDistance) {
          targetIndex = index;
          targetDistance = distance;
        }
      });
      if (targetIndex < 0) break;
      merged[targetIndex].push(...source);
      merged.splice(sourceIndex, 1);
    }
    return merged;
  };

  const clusterVisibleBuildings = ({ buildings, zoom, viewport, pointFor }) => {
    const activeBuildings = Array.isArray(buildings) ? buildings.filter(Boolean) : [];
    if (activeBuildings.length <= INDIVIDUAL_PIN_LIMIT) {
      return { mode: 'pins', pins: activeBuildings, clusters: [] };
    }
    const width = Math.max(1, Number(viewport?.width) || 1);
    const height = Math.max(1, Number(viewport?.height) || 1);
    const minimumSize = getMinimumClusterSize(Number.isFinite(zoom) ? Math.round(zoom) : 13);
    const targetGroupCount = Math.max(1, Math.ceil(activeBuildings.length / minimumSize));
    const aspectRatio = width / height;
    const columns = Math.max(1, Math.round(Math.sqrt(targetGroupCount * aspectRatio)));
    const rows = Math.max(1, Math.ceil(targetGroupCount / columns));
    const buckets = new Map();

    activeBuildings.forEach(building => {
      const point = pointFor(building);
      const xRatio = Math.min(.999999, Math.max(0, (Number(point.x) || 0) / width));
      const yRatio = Math.min(.999999, Math.max(0, (Number(point.y) || 0) / height));
      const column = Math.min(columns - 1, Math.floor(xRatio * columns));
      const row = Math.min(rows - 1, Math.floor(yRatio * rows));
      const key = `${column}:${row}`;
      buckets.set(key, [...(buckets.get(key) || []), building]);
    });

    const groups = mergeUndersizedGroups([...buckets.values()], minimumSize, pointFor);
    const clusters = groups.map(group => {
      const center = centroidFor(group, pointFor);
      return {
        buildings: group,
        count: group.length,
        tier: getClusterCountTier(group.length),
        latitude: center.latitude,
        longitude: center.longitude,
      };
    }).sort((left, right) => right.count - left.count || left.latitude - right.latitude || left.longitude - right.longitude);

    return { mode: 'clusters', pins: [], clusters };
  };

  return Object.freeze({
    CLUSTER_COUNT_TIERS,
    INDIVIDUAL_PIN_LIMIT,
    clusterVisibleBuildings,
    getClusterCountTier,
    getMinimumClusterSize,
  });
}));
