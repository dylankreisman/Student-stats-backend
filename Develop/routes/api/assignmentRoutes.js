const router = require('express').Router()

const {getAssignments, getSingleAssignments, createAssignment, updateAssignment, deleteAssignment} = require('../../controllers/assignmentController.js')

router.route('/').get(getAssignments).post(createAssignment)

router.route('/:assignId')
    .get(getSingleAssignments)
    .put(updateAssignment)
    .delete(deleteAssignment)

module.exports = router