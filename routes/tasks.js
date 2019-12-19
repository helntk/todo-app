const express = require('express');
const router = express.Router()
const Task = require('../models/Task')
const auth = require('../middleware/auth')

//all task routes are privates



//create task 
router.post('/tasks',auth,async (req,res)=>{
    const task = new Task({
        ...req.body,
        author: req.user._id
    })

    try{
      await task.save()
      res.status(201).send(task)
    }
    catch(e){
     res.send(e);
    }
})

//get all tasks
router.get('/tasks',auth,async (req,res)=>{

  try{
    await req.user.populate('tasks').execPopulate()
    res.send(req.user.tasks)
  }
  catch(e){
   res.send(e);
  }
})

//get a task by id
router.get('/tasks/:id',auth,async (req,res)=>{
  const _id = req.params.id;

  try{
   const task = await Task.findOne({_id, author: req.user._id})
   if(!task){
    return res.send(404).send('there is no such task')
   }
    res.status(200).send(task)
  }
  catch(e){
   res.send(e);
  }
})

//update a task by id
router.patch('/tasks/:id',auth,async (req,res)=>{
  const _id = req.params.id;
  const updates = Object.keys(req.body);

 
  try{
   const task = await Task.findOne({_id, author:req.user._id})
   if(!task){
    return res.send(404).send('there is no such task')
   }
    updates.forEach(update =>{
      task[update] = req.body[update];
    })

    await task.save()
    res.send(task)
  }
  catch(e){
   res.send(e);
  }
})

//delete a task by id
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, author: req.user._id })

      if (!task) {
          res.status(404).send()
      }

      res.send(task)
  } catch (e) {
      res.status(500).send()
  }
})
// delete all tasks
router.delete('/tasks', auth, async (req, res) => {
  try {
      const task = await Task.deleteMany({ author: req.user._id })

      if (!task) {
          res.status(404).send()
      }

      res.send(task)
  } catch (e) {
      res.status(500).send()
  }
})






module.exports = router;