const express = require("express");
const Merchs = express.Router();
const {
    getAllMerch,
    getOneMerch,
    createMerch,
    updateMerch,
     deleteMerch
} = require("../queries/Merch.js");


Merchs.get("/", async (req, res) => {
    const allMerch = await getAllMerch();
    res.status(200).json(allMerch);
});


Merchs.get("/:id", async (req, res) => {
    const { id } = req.params;
    const Merch = await getOneMerch(id);
    if(!Merch.error) {
        res.status(200).json(Merch);
    }else if (Merch.error.code === 0) {
        res.status(404).json("Item not found")
    }else {
        res.status(500).json({error: "server error"})
    }
});
       

Merchs.post("/", async (req, res) => {
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

Merchs.put("/:id", async (req, res) => {
    const { id } = req.params;
    const Merch = req.body;
    const updatedMerch = await updateMerch(id, Merch);
    if (!updatedMerch.error) {
        res.status(201).json(updatedMerch);
    }else {
        res.status(500).json({error: "server error"})
    }
  });

  Merchs.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedMerch = await deleteMerch(id);
    console.log(deletedMerch);
    if (deletedMerch.id) {
      res.status(201).json(deletedMerch);
    } else {
      res.status(404).json("Item not found");
    }
  });



module.exports = Merchs;

