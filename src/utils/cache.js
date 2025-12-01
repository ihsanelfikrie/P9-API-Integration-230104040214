const NodeCache = require('node-cache');

// Inisialisasi cache dengan TTL default 5 menit (300 detik)
const cache = new NodeCache({
  stdTTL: process.env.CACHE_TTL || 300,
  checkperiod: 60
});

/**
 * Mendapatkan data dari cache
 * @param {string} key - Cache key
 * @returns {any} - Data dari cache atau undefined
 */
const get = (key) => {
  return cache.get(key);
};

/**
 * Menyimpan data ke cache
 * @param {string} key - Cache key
 * @param {any} value - Data yang akan disimpan
 * @param {number} ttl - Time to live (opsional)
 * @returns {boolean} - Status berhasil/gagal
 */
const set = (key, value, ttl = null) => {
  if (ttl) {
    return cache.set(key, value, ttl);
  }
  return cache.set(key, value);
};

/**
 * Menghapus data dari cache
 * @param {string} key - Cache key
 * @returns {number} - Jumlah item yang dihapus
 */
const del = (key) => {
  return cache.del(key);
};

/**
 * Menghapus semua data dari cache
 */
const flush = () => {
  cache.flushAll();
};

module.exports = {
  get,
  set,
  del,
  flush
};