const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { update } = require('../../models/Category');

// The `/api/tags` endpoint

// ******* THIS ROUTE WORKS *******
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(err)
  }
});

// ******* THIS ROUTE WORKS *******
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// ******* THIS ROUTE WORKS *******
router.post('/', async (req, res) => {
  // create a new tag
  try {
  const tagData = await Tag.create(req.body)
  res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// ******* THIS ROUTE WORKS *******
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update({ tag_name: req.body.tag_name }, {
      where: {
        id: req.params.id
      }
    })
    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id.' });
      return;
    }
    const updatedTag = await Tag.findByPk(req.params.id)
    res.status(200).json(updatedTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

// ******* THIS ROUTE WORKS *******
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id.' });
      return;
    }
    res.status(200).json({ message: `Tag with id ${req.params.id} successfully deleted.`})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
