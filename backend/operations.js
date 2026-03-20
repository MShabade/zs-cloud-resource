function create(resources, newResource) {
  return [...resources, newResource];
}

function readById(resources, id) {
  return resources.find((r) => r.id === id) || null;
}
