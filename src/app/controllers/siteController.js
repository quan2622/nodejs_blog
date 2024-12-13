const course = require('../models/Course');
const { mutipleMogooseToObject } = require('../../ulti/mongoose');

class siteController {
  // [GET] /
    // Cách 2 để lấy DB từ course
  index(req, res, next) {
    // thêm lean để courses là một mảng các đối tượng JavaScript thuần túy, không chứa các phương thức hoặc thuộc tính bổ sung của Mongoose Document.
    // [
      //   { "_id": "123", "name": "Course A", "duration": "2 months" },
      //   { "_id": "124", "name": "Course B", "duration": "3 months" }
      // ]
      
      // .then(courses => res.render('home', {
        //   courses
        // }))
    course.find({})
      .then(courses => {
        res.render('home', {
          courses: mutipleMogooseToObject(courses)
        });
      })
      .catch(next);
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new siteController;