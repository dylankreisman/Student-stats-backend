const {Assignment, Student} = require('../models')

async function getAssignments(req,res) {
    try {
        const assignment  = await Assignment.find()
        res.status(200).json(assignment)
    } catch (err) {
        res.status(500).json(err)
    }
}

async function getSingleAssignments(req,res) {
    try {
        const assignment  = await Assignment.findOne({_id: req.params.assignId}).select('-__v')
        !assignment ? res.status(404).json({message: 'No assignment with that ID'})
        : res.status(200).json(assignment)
    } catch (err) {
        res.status(500).json(err)
    }
}

async function createAssignment(req,res) {
    try {
        const assignmentData = await Assignment.create(req.body)
        const student = await Student.findOneAndUpdate(
            {_id: req.body.userId},
            {$addToSet: {assignments: assignmentData._id}},
            {new: true}
        )
        if(!student) {
            res.status(400).json({message: `Assignment created, but found no student with that ID`})
        } else {
            res.json(`Created the assignment`)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

async function updateAssignment(req,res) {
    try {
        const assignmentData = await Assignment.findOneAndUpdate(
            {_id: req.params.assignId},
            { $set: req.body},
            {runValidators: true, new: true}
        )
        if(!assignmentData){
            res.status(404).json({message: `No assignment with that id`})
        } else {
            res.status(200).json(assignmentData)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

async function deleteAssignment(req,res) {
    try {
        const assignmentData = await Assignment.findOneAndRemove({_id: req.params.assignId})
        if(!assignmentData){
            res.status(404).json({message: `Assignment with that id not found`})
            return
        }
        const studentData = await Student.findOneAndUpdate(
            {assignments: req.params.assignId},
            {$pull: {assignments: req.params.assignId}},
            {new: true}
        )
        if(!studentData){
            res.status(404).json({message: `Assignment deleted but no student found with assignment`})
        } else {
            res.status(200).json({message: `Assignment deleted everywhere`})
        }
    } catch (err) {
        res.status(500).json(err)
    }
}



module.export = {getAssignments, getSingleAssignments, createAssignment, updateAssignment, deleteAssignment}