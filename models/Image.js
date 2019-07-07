// const baseModel = require("./baseModel");

// class Image extends baseModel {
//   constructor() {
//     super();
//   }

//   async insertImage(id, recipes_id, image) {
//     return new Promise((resolve, reject) => {
//       this.sql.query(
//         "INSERT INTO images set ?",
//         { id, recipes_id, image },
//         (err, data) => {
//           if (err) reject(err);
//           else {
//             resolve(id);
//           }
//         }
//       );
//     });
//   }
// }

// module.exports = Image;
