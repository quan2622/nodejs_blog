const Course = require('../models/Course');

class coursesController {
    // [GET] /course/:slug
  showCourse(req, res, next) {
    Course.findOne({slug: req.params.slug}).lean()
      .then(course => {
        res.render('courses/showCourse', {course});
      })
      .catch(next);
  }

    // [GET] /course/create
  create(req, res, next) {
    res.render('courses/create');
  }
  
    // [POST] /course/store
  store(req, res, next) {
    // res.json(req.body);
    req.body.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // [GET] /course/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id).lean()
      .then(course => res.render('courses/edit', {course}))
      .catch(next)
  }

  // [PUT] /course/:id
  update(req, res, next) {
    // res.json(req.body);
    Course.updateOne({_id: req.params.id}, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // [DELETE] /course/:id
  delete(req, res, next) {
    // res.json(req.body);
    Course.delete({_id: req.params.id})
      .then(() => res.redirect(req.get("Referrer") || "/"))
      .catch(next);
  }

  // [DELETE] /course/:id/force -> this is soft delete
  forceDelete(req, res, next) {
    // res.json(req.body);
    Course.deleteOne({_id: req.params.id})
      .then(() => res.redirect(req.get("Referrer") || "/"))
      .catch(next);
  }

  // [PATCH] /course/:id/restore
  restore(req, res, next) {
    Course.restore({_id: req.params.id})
      .then(() => res.redirect(req.get("Referrer") || "/"))
      .catch(next);
  }

  //[POST] /courses/handle-form-action
  handleFormAction(req, res, next) {
    switch(req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIDs } })
          .then(() => res.redirect(req.get("Referrer") || "/"))
          .catch(next);
        break;
      case 'restore':
        Course.restore({ _id: { $in: req.body.courseIDs } })
          .then(() => res.redirect(req.get("Referrer") || "/"))
          .catch(next);
        break;
      case 'force-delete':
        Course.deleteOne({ _id: { $in: req.body.courseIDs } })
          .then(() => res.redirect(req.get("Referrer") || "/"))
          .catch(next);
        break;
      default:
        req.json({message: 'Action Invalid'});
    }
  }
}

// GET, POST, PUT (replace), PATCH (edit field), DELETE, OPTIONS, HEAD

module.exports = new coursesController;