function create(resources, newResource) {
  return [...resources, newResource];
}

function readById(resources, id) {
  return resources.find((r) => r.id === id) || null;
}

function update(resources, id, updates) {
  const index = resources.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const updated = { ...resources[index], ...updates };
  const newArray = [...resources];
  newArray[index] = updated;

  return { updated, newArray };
}

function remove(resources, id) {
  const resource = resources.find((r) => r.id === id);
  if (!resource) return null;

  return {
    deleted: resource,
    newArray: resources.filter((r) => r.id !== id),
  };
}

function search(resources, query) {
  const q = query.toLowerCase();
  return resources.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.region.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
  );
}

module.exports = { create, readById, update, remove, search };
