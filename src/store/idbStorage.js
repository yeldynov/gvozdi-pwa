const DB_NAME = 'gvozdi-db'
const STORE_NAME = 'state'

let dbPromise = null

function getDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1)
      req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME)
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => {
        dbPromise = null
        reject(req.error)
      }
    })
  }
  return dbPromise
}

export const idbStorage = {
  async getItem(name) {
    const db = await getDB()
    return new Promise((resolve, reject) => {
      const req = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(name)
      req.onsuccess = () => resolve(req.result ?? null)
      req.onerror = () => reject(req.error)
    })
  },
  async setItem(name, value) {
    const db = await getDB()
    return new Promise((resolve, reject) => {
      const req = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).put(value, name)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  },
  async removeItem(name) {
    const db = await getDB()
    return new Promise((resolve, reject) => {
      const req = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).delete(name)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  },
}
