const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const catData = await Category.findAll().catch((err) => res.json(err));
    const cats = catData.map((cat) => cat.get({plain: true}))
    res.send(cats);
    res.status(200);
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const catData = await Category.findByPk(req.params.id);
    if(!catData){
      res.status(404).json({message: 'No category with this id!'});
      return;
    }
    const cat = catData.get({plain: true});
    res.send(cat);
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    await Category.create(req.body);
    res.send("Added data!");
    res.status(200);
  } catch(err){
    res.send(err);
    res.status(500).json(err);
  }
}); 

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    await Category.update(req.body, {where: {id: req.params.id}});
    res.send("Updated data!");
    res.status(200);
  } catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    await Category.destroy({where: {id: req.params.id}});
    res.send("Data deleted!");
    res.status(200);
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
