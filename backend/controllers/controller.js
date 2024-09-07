import model from "../models/food.js"
import fs from 'fs'

// Add food

const add = async (request, response) => {
  let image_file = `${request.file.filename}`;
  const food = new model({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    category: request.body.category,
    image: image_file
  })
  try {
    await food.save();
    response.json({ success: true, message: "Food Item Successfully Added" })
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" })
  }
}

// Remove food 

const remove = async (request, response) => {
  try {
    const food = await model.findById(request.body.id);
    fs.unlink(`uploads/${food.image}`, () => { })
    await model.findByIdAndDelete(request.body.id);
    response.json({ success: true, message: "Food Item Successfully Removed" })
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" })
  }
}

// List of every food item

const foodList = async (request, response) => {
  try {
    const foods = await model.find({});
    response.json({ success: true, data: foods })
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" })
  }
}

export { add, remove, foodList }