const db = require('../../data/db-config');

async function getAll(){
  // DO YOUR MAGIC
  return db.select('*').from('accounts');
}

async function getById(id) {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first();
}

async function create(account) {
  // DO YOUR MAGIC
  await db('accounts').insert(account);
  return db('accounts').where('name', account.name).first();
}

async function updateById(id, account) {
  // DO YOUR MAGIC
  await db('accounts')
    .update(account)
    .where('id', id);
  return getById(id);
}

async function deleteById(id) {
  // DO YOUR MAGIC
  let result = await getById(id);
  await db('accounts')
    .where('id', id)
    .del();
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
