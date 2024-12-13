const Course = require('../models/Course');

class meController {
    // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({}).lean();

    Promise.all([courseQuery.sortAble(req), Course.countDocumentsDeleted().lean()])
      .then(([courses, deletedCount]) => res.render('me/stored-courses',{courses, deletedCount})
      )
      .catch(next);

    // Course.countDocumentsDeleted()
    //   .then(deletedCount => {

    //   })
    //   .catch(() => {})

    // Course.find({}).lean()
    //   .then(courses => res.render('me/stored-courses',{courses}))
    //   .catch(next);
  }

    // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({}).lean()
    .then(courses => res.render('me/trash-courses',{courses}))
    .catch(next);
  }

}

module.exports = new meController;