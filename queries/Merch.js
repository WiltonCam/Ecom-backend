const db = require("../Module/db/dbConfig.js");

const getAllMerch = async () => {
    try {
        const allMerch = await db.any("SELECT * FROM merchs");
        return allMerch;
    } catch(error) {
        return {error: error}
    }
};

const getOneMerch = async (id) => {
    try{
        const merch = await db.one(`SELECT * FROM merchs WHERE id=${id}`);
        return merch;

    }catch (error) {
        return {error: error};
    }
};


const createMerch = async (merch) => {
    try {
        const newMerch = await db.one(
            `INSERT INTO
            merchs(name, cost, category, image)
            VALUES
            ($1, $2, $3, $4)
            RETURNING *;`,
            [merch.name, merch.cost, merch.category, merch.image]
        );
        return newMerch;
    } catch (error) {
        return { error: error};
    }
};

const updateMerch = async (id, Merch) => {
    try {
      const updatedMerch = await db.one(
        `UPDATE merchs SET name=$1, cost=$2, category=$3, image=$4, WHERE id=$5 RETURNING *`,
        [Merch.name, Merch.cost, Merch.category, Merch.image, id]
      );
      return updatedMerch;
    } catch (error) {
      return { error: error };
    }
  };

  const deleteMerch = async (id) => {
    try {
      const deletedMerch = await db.one(
        "DELETE FROM merchs WHERE id=$1 RETURNING *",
        id
      );
      return deletedMerch;
    } catch (e) {
      return e;
    }
  };

module.exports = { getAllMerch,
                    getOneMerch,
                    createMerch,
                    deleteMerch,
                    updateMerch
};
