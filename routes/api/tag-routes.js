const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    // find all tags
    // be sure to include its associated Product data
    const tagdata = await Tag.findAll().catch((err) => res.json(err));
    const tags = tagdata.map((tag) => tag.get({plain: true}))
    
    res.send(tags);
    res.status(200) 
  }catch (err) {
    res.status(500).json(err);
  }
});
 
router.get('/:id', async (req, res) => { // find why it doesn't return corecct thing
  try{
  // find a single tag by its `id`
  // be sure to include its associated Product data
    const tagdata = await Tag.findByPk(req.params.id);
    if(!tagdata){
      res.status(404).json({message: 'No tag with this id!'})
      return;
    }
    const tag = tagdata.get({plain: true})
    res.send(tag)
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => { 
  // create a new tag
  try{
    const tag = await Tag.create(req.body);
    // console.log(tag)
    res.send("Added data!"); 
    // res.send(tag);
    res.status(200); 
  } catch (err) {
    res.send(err)
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body, {where: {id: req.params.id}});

    res.send("Updated data!");
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    await Tag.destroy({where: {id: req.params.id}});
    res.send("Data deleted!");
    res.status(200);
  } catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
