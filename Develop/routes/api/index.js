const router = require('express').Router();
const courseRoutes = require('./courseRoutes');
const studentRoutes = require('./studentRoutes');
const assignmentRoutes = require('./assignmentRoutes')

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);
router.use('/assignments', assignmentRoutes)


module.exports = router;
