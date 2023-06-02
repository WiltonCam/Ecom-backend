const express = require("express");
const merchs = express.Router();
const {
    getAllMerch,
    getOneMerch,
    createMerch,
    deleteMerch,
    updateMerch
} = require("../queries/Merch");


merchs.get("/", async (req, res) => {
    const allMerch = await getAllMerch();
    console.log(allMerch)
    if (allMerch.error) {
        return res.status(500).json({ error: "server error!!!" });
      } else {
        return res.status(200).json(allMerch);
      }
    }
)

merchs.get("/:id", async (req, res) => {
    const { id } = req.params;
    const merch = await getOneMerch(id);
    if(merch.error) {
        res.status(200).json(merch);
    }else if (merch.error.code === 0) {
        res.status(404).json("Item not found")
    }else {
        res.status(500).json({error: "server error"})
    }
});
       

merchs.post("/", async (req, res) => {
    const {name, cost, category, image} = req.body;
    const newMerch = await createMerch({
        name, 
        cost,
        category, 
        image 
    });
    if (!newMerch.error) {
        res.status(201).json(newMerch);
    }else {
        res.status(500).json({error: "server error"})
    }
})  

merchs.put("/:id", async (req, res) => {
    const { id } = req.params;
    const merch = req.body;
    const updatedMerch = await updateMerch(id, merch);
    if (!updatedMerch.error) {
        res.status(201).json(updatedMerch);
    }else {
        res.status(500).json({error: "server error"})
    }
  });

  merchs.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedMerch = await deleteMerch(id);
    console.log(deletedMerch);
    if (deletedMerch.id) {
      res.status(201).json(deletedMerch);
    } else {
      res.status(404).json("Item not found");
    }
  });



module.exports = merchs;

