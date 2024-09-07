import jwt from 'jsonwebtoken'

const authorization = async (request, response, next) => {
  const { token } = request.headers;
  if (!token) {
    return response.json({ success: false, message: "Not Authorized. Please Login Again." })
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    request.body.userId = decode.id;
    next();
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
}

export default authorization;