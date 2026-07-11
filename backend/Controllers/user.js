const UserModel = require('../Models/user');

exports.register = async (req, res) => {
  try {
    const { name, email, photoUrl } = req.body;

    // Validate input
    if (!email || !name) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email and name are required'
      });
    }

    // Check if user exists
    const userExist = await UserModel.findOne({ email: email });

    if (!userExist) {
      // Create new user
      let newUser = new UserModel({ name, email, photoUrl });
      await newUser.save();
      return res.status(201).json({
        message: "User Registered Successfully",
        user: newUser
      });
    }

    // Return existing user
    return res.status(200).json({
      message: "Welcome Back",
      user: userExist,
    });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({
      error: 'Server error',
      message: err.message
    });
  }
};
