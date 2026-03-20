import Todo from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({
        success: false,
        message: "All field required",
      });
    }
    const todo = await new Todo({ title, description });
    todo.save();
    res.status(201).json({
      success: true,
      message: "Todo created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      success: true,
      message: "todo list",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const updatetodo = async (req, res) => {
  try {
    const todoId=req.params.todoId;
    const {title}=req.body;
    // const todo=await Todo.findById(todoId);
    const todo=await Todo.findByIdAndUpdate(todoId,{title},{new:true});
    await todo.save();
    res.status(200).json({
                success:true,
                todo,
                message:'todo updated'
            })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const deletetodo=async(req,res)=>{
    try{
        const todoId=req.param.todoId;
        const del=await Todo.findByIdAndDelete(todoId);
        res.status(200).json({
                success:true,
                todo,
                message:'todo delete'
            })
    }catch(error){

    }
}