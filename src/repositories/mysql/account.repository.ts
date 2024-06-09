
import { OkPacket, RowDataPacket } from 'mysql2';
import { db } from '../../config/dbconfig';
import { Account } from '../../model/entities/account.entity';

// Define a function to retrieve all categories 
export const getAccount = (callback: Function) => {

    db.query('SELECT * FROM Account', (err, result) => {

        if (err) {
            console.log(err);
            return callback(err, null);
        }

        callback(null, result);
    });
};

export const updateAccount= (accountData: Account, callback: Function) => {
    // const { name, type, age } = petData;
    const query = `
        UPDATE Account 
        SET jobRole = '${accountData.jobRole}', userName = '${accountData.userName}', password ='${accountData.password}'
        WHERE accNo = '${accountData.accNo}'
    `;
    
    // const values = [name, type, age, petId];

    // const a = db.query(query);

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }

        callback(null, result);
    });
};

export const createAccount = (accountData: Account, callback: Function) => {

    const query = `
        INSERT INTO Account (jobRole, userName, password) 
        VALUES ('${accountData.jobRole}', '${accountData.userName}', '${accountData.password}')
    `;

    // VALUES ('${adminData.name}', '${adminData.email}', '${adminData.payment}', '${adminData.address}', '${adminData.contactNo}')
    // `;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        callback(null, result);
    });
};
