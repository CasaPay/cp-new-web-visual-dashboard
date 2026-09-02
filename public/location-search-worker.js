let catalogue = null;
let records = [];

const normalize = value => String(value || '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('en')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

const distanceWithin = (left, right, limit) => {
  if (Math.abs(left.length - right.length) > limit) return false;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];
    let rowMinimum = row;
    for (let column = 1; column <= right.length; column += 1) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + (left[row - 1] === right[column - 1] ? 0 : 1),
      );
      rowMinimum = Math.min(rowMinimum, current[column]);
    }
    if (rowMinimum > limit) return false;
    previous = current;
  }
  return previous[right.length] <= limit;
};

const searchable = item => {
  const label = item.type === 'university'
    ? `${item.name} ${item.city} ${item.country}`
    : `${item.name} ${item.country}`;
  const aliases = (item.aliases || []).map(normalize).filter(Boolean);
  return { ...item, _name: normalize(item.name), _label: normalize(label), _aliases: aliases };
};

const score = (item, query) => {
  if (item._name === query || item._aliases.includes(query)) return 0;
  if (item._name.startsWith(query)) return 10;
  if (item._aliases.some(alias => alias.startsWith(query))) return 20;
  if (item._label.split(' ').some(token => token.startsWith(query))) return 30;
  if (item._label.includes(query) || item._aliases.some(alias => alias.includes(query))) return 40;
  if (query.length >= 4) {
    const limit = query.length >= 8 ? 2 : 1;
    if (distanceWithin(item._name, query, limit) || item._aliases.some(alias => distanceWithin(alias, query, limit))) return 50;
  }
  return Infinity;
};

const publicItem = item => {
  const { _name, _label, _aliases, population, ...result } = item;
  return result;
};

const popular = type => (catalogue.popular[type === 'city' ? 'cities' : 'universities'] || [])
  .map(id => records.find(item => item.id === id))
  .filter(Boolean)
  .map(publicItem);

const search = (query, type) => records
  .filter(item => item.type === type)
  .map(item => ({ item, rank: score(item, query) }))
  .filter(result => Number.isFinite(result.rank))
  .sort((left, right) => left.rank - right.rank
    || (right.item.popularRank ? 1 : 0) - (left.item.popularRank ? 1 : 0)
    || (right.item.population || 0) - (left.item.population || 0)
    || left.item.name.localeCompare(right.item.name))
  .slice(0, 5)
  .map(result => publicItem(result.item));

const initialize = async () => {
  const response = await fetch('/data/location-search.json', { credentials: 'same-origin' });
  if (!response.ok) throw new Error(`Location catalogue failed with ${response.status}`);
  catalogue = await response.json();
  records = catalogue.locations.map(searchable);
  postMessage({ type: 'ready', version: catalogue.version, result: { city: popular('city'), university: popular('university') } });
};

self.addEventListener('message', event => {
  if (!catalogue || event.data?.type !== 'search') return;
  const query = normalize(event.data.query);
  const result = query
    ? { city: search(query, 'city'), university: search(query, 'university') }
    : { city: popular('city'), university: popular('university') };
  postMessage({ type: 'results', requestId: event.data.requestId, query, result });
});

initialize().catch(error => postMessage({ type: 'error', message: error.message }));
