const { db } = require("./../config/firebase");
const { doc, collection, getDocs, getDoc } = require("firebase/firestore");

const getAllArticle = async () => {
  try {
    const querySnap = await getDocs(collection(db, "articles"));
    const articles = [];
    querySnap.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      const merge = {
        id,
        ...data,
      };

      articles.push(merge);
    });

    return articles;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getArticleById = async (id) => {
  try {
    const artDoc = doc(db, "articles", id);
    const docSnap = await getDoc(artDoc);

    if (docSnap.exists()) {
      const id = docSnap.id;
      const data = docSnap.data();

      const merge = {
        id,
        ...data,
      };

      return merge;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = { getAllArticle, getArticleById };
