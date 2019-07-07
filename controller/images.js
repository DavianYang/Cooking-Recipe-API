// const RecipesModel = require("../models/Recipes");
// const UserModel = require("../models/User");
// const imageModel = require("../models/Image");
// const recipesModel = new RecipesModel();
// const userModel = new UserModel();
// const model = new imageModel();

// // Firebase
// const admin = require("../utilites/firebase");
// const firestore = admin.firestore();

// // Error Handling
// const {
//   serverError,
//   badRequest,
//   notAuthorized,
//   notFound
// } = require("../utilites/httpError");

// class imageController {
//   async insertImage(req, res) {
//     var storageRef = admin.database().ref();

//     const recipe = await recipesModel.getRecipeByID(req.params.recipe_id);

//     if (!recipe) {
//       return notFound(res, "Recipe does not exist");
//     }

//     const filePath = `images/${req.body.file}`;
//     const imageTask = storageRef.child(filePath).put(req.body.file);

//     imageTask.on(
//       "state_changed",
//       snapshot => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         console.log(progress);
//       },
//       err => {
//         console.log(err);
//       },
//       () => {
//         storageRef
//           .child(filePath)
//           .getDownloadURL()
//           .then(url => {
//             console.log(url);
//             model.insertImage(req.params.recipe_id, url);
//           })
//           .then(image_id => res.status(200).json(image_id));
//       }
//     );
//   }
// }

// module.exports = imageController;
