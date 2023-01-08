import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  // connect to db, version 1
  const jateDb = await openDB('jate', 1);
  // new transaction to above db -> 'readwrite' privilege
  const trans = jateDb.transaction('jate', 'readwrite');
  // open to the object store
  const objStore = trans.objectStore('jate');
  // pass in the content
  const req = objSore.put({ id: id, value: value })
  // confirm the process
  const res = await req;
  console.log(res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (value) => {
  const jateDb = await openDB('jate', 1);
  const trans = jateDb.transaction('jate', 'readwrite');
  const objStore = trans.objectStore('jate');
  const req = objStore.getAll()
  const res = await req;
  console.log(res);
};

initdb();
