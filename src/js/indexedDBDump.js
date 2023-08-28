//  https://gist.github.com/loilo/ddfdb3c54fa474a89f71ce0660cd38b7

// Copy this whole snippet to your browser console

var dbName = prompt("What's the name of the database to export?");

(async () => {
  try {
    var dbExists = await new Promise((resolve) => {
      var request = window.indexedDB.open(dbName);
      request.onupgradeneeded = (e) => {
        e.target.transaction.abort();
        resolve(false);
      };
      request.onerror = () => resolve(true);
      request.onsuccess = () => resolve(true);
    });

    if (!dbExists) {
      throw new Error("Database does not exist");
    }

    var idbDatabase = await new Promise((resolve, reject) => {
      var request = window.indexedDB.open(dbName);
      request.onerror = () => reject("Could not open the database");
      request.onsuccess = () => resolve(request.result);
    });

    var json = await new Promise((resolve, reject) => {
      const exportObject = {};
      if (idbDatabase.objectStoreNames.length === 0) {
        resolve(JSON.stringify(exportObject));
      } else {
        const transaction = idbDatabase.transaction(
          idbDatabase.objectStoreNames,
          "readonly"
        );

        transaction.addEventListener("error", reject);

        for (const storeName of idbDatabase.objectStoreNames) {
          const allObjects = [];
          transaction
            .objectStore(storeName)
            .openCursor()
            .addEventListener("success", (event) => {
              const cursor = event.target.result;
              if (cursor) {
                // Cursor holds value, put it into store data
                allObjects.push(cursor.value);
                cursor.continue();
              } else {
                // No more values, store is done
                exportObject[storeName] = allObjects;

                // Last store was handled
                if (
                  idbDatabase.objectStoreNames.length ===
                  Object.keys(exportObject).length
                ) {
                  resolve(JSON.stringify(exportObject));
                }
              }
            });
        }
      }
    });

    console.log(" ");
    console.log("Database has been exported:");
    console.log(" ");
    console.log(json);
    console.log(" ");
  } catch (error) {
    console.error(error);
  }
})();
