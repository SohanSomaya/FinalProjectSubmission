import { openDatabase } from 'expo-sqlite';
const db = openDatabase('shop.db');

export const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY NOT NULL,
        password TEXT NOT NULL,
        isAdmin INTEGER NOT NULL
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        tags TEXT,
        quantity INTEGER NOT NULL
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS orders (
        orderId TEXT PRIMARY KEY NOT NULL,
        username TEXT NOT NULL,
        date TEXT NOT NULL,
        items TEXT NOT NULL,
        total REAL NOT NULL
      );`
    );
  });
};

export const seedUsers = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT OR IGNORE INTO users (username, password, isAdmin) VALUES 
      ('admin', 'admin123', 1),
      ('user1', 'password1', 0);`
    );
  });
};

export const seedItems = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT OR IGNORE INTO items (id, name, price, tags, quantity) VALUES 
      ('1', 'Wireless Headphones', 99.99, 'Electronics', 10),
      ('2', 'T-Shirt', 19.99, 'Clothing', 5),
      ('3', 'Coffee Mug', 9.99, 'Home,Kitchen', 8);`
    );
  });
};

export const getUser = (username, password, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM users WHERE username = ? AND password = ?;`,
      [username, password],
      (_, { rows }) => {
        callback(rows.length > 0 ? rows.item(0) : null);
      }
    );
  });
};

export const insertUser = (username, password, onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO users (username, password, isAdmin) VALUES (?, ?, 0);`,
      [username, password],
      (_, result) => {
        if (onSuccess) onSuccess(result);
      },
      (_, error) => {
        if (onError) onError(error);
        return true;
      }
    );
  });
};

export const insertItem = (item) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT OR REPLACE INTO items (id, name, price, tags, quantity) VALUES (?, ?, ?, ?, ?);`,
      [item.id, item.name, item.price, item.tags.join(','), item.quantity]
    );
  });
};

export const getItems = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM items WHERE quantity > 0;`,
      [],
      (_, { rows }) => {
        const items = [];
        for (let i = 0; i < rows.length; i++) {
          const row = rows.item(i);
          items.push({
            id: row.id,
            name: row.name,
            price: row.price,
            tags: row.tags ? row.tags.split(',') : [],
            quantity: row.quantity,
          });
        }
        callback(items);
      }
    );
  });
};

export const decreaseItemQuantity = (itemId, amount, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE items SET quantity = quantity - ? WHERE id = ? AND quantity >= ?;`,
      [amount, itemId, amount],
      (_, result) => {
        if (callback) callback(result);
      },
      (_, error) => {
        console.error('Error decreasing item quantity:', error);
        return true;
      }
    );
  });
};

export const insertOrder = (order, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO orders (orderId, username, date, items, total) VALUES (?, ?, ?, ?, ?);`,
      [
        order.orderId,
        order.username,
        order.date,
        JSON.stringify(order.items),
        order.total
      ],
      () => {
        if (callback) callback();
      }
    );
  });
};

export const getOrdersForUser = (username, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM orders WHERE username = ? ORDER BY date DESC;`,
      [username],
      (_, { rows }) => {
        const orders = [];
        for (let i = 0; i < rows.length; i++) {
          const row = rows.item(i);
          orders.push({
            orderId: row.orderId,
            username: row.username,
            date: row.date,
            items: JSON.parse(row.items),
            total: row.total,
          });
        }
        callback(orders);
      }
    );
  });
};

export const updateUserPassword = (username, newPassword, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE users SET password = ? WHERE username = ?;`,
      [newPassword, username],
      (_, result) => {
        if (callback) callback(result);
      },
      (_, error) => {
        console.error('Error updating password:', error);
        return true;
      }
    );
  });
};

export const deleteUser = (username, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM users WHERE username = ?;`,
      [username],
      (_, result) => {
        if (callback) callback(result);
      },
      (_, error) => {
        console.error('Error deleting user:', error);
        return true;
      }
    );
  });
};
