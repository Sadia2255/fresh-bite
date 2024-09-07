import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import validator from 'validator'

// Login

const login = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return response.json({ success: false, message: "User Does Not Exist" })
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return response.json({ success: false, message: "Incorrect Password" })
    }

    const token = makeToken(user._id);
    response.json({ success: true, token })

  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" })
  }
}

const makeToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Register
const register = async (request, response) => {
  const { name, password, email } = request.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return response.json({ success: false, message: 'User Already Exists' })
    }
    if (!validator.isEmail(email)) {
      return response.json({ success: false, message: 'Please Enter a Valid Email' })
    }
    if (password.length < 8) {
      return response.json({ success: false, message: 'Please Enter a Password With 8 or More Characters' })
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashed
    })
    const user = await newUser.save()
    const token = makeToken(user._id)
    response.json({ success: true, token })
  } catch (error) {
    console.log(error)
    response.json({ success: false, message: "Error" })
  }
}

export { login, register }