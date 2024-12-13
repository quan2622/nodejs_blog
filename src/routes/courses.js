const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/coursesController');

router.use('/create', coursesController.create);
router.post('/store', coursesController.store);
router.post('/handle-form-action', coursesController.handleFormAction);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id', coursesController.delete);
router.delete('/:id/force', coursesController.forceDelete);
router.use('/:slug', coursesController.showCourse);

module.exports = router;