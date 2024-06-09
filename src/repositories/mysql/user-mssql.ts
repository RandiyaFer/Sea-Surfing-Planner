
import { OkPacket, RowDataPacket } from 'mysql2';
import { db } from '../../config/dbconfig';
import { User } from '../../model/entities/user-entity';

// Define a function to retrieve all categories 
export const getUser = (callback: Function) => {

    db.query('SELECT * FROM User', (err, result) => {

        if (err) {
            console.log(err);
            return callback(err, null);
        }

        callback(null, result);
    });
};

export const updateUser= (userData: User, callback: Function) => {
    // const { name, type, age } = petData;
    const query = `
        UPDATE User 
        SET name = '${userData.name}', email = '${userData.email}', phoneNumber ='${userData.phoneNumber}', password ='${userData.password}',
            emailVerified = '${userData.emailVerified}', phoneVerified = '${userData.phoneVerified}'
        WHERE id = '${userData.id}'
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

export const createUser = (userData: User, callback: Function) => {

    const query = `
        INSERT INTO User (name,email,phoneNumber,password,emailVerified,phoneVerified) 
        VALUES ('${userData.name}', '${userData.email}', '${userData.phoneNumber}', '${userData.password}', '${userData.emailVerified}', '${userData.phoneVerified}')
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
