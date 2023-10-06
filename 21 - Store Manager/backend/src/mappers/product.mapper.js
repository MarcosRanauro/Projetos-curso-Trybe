const mapFromDB = (productFromDB) => (productFromDB ? {
  id: productFromDB.id,
  name: productFromDB.name,
} : productFromDB);

module.exports = {
mapFromDB,
};