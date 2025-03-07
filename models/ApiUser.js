const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const apiUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: true, 
    minlength: 12,
    validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?~`()-_+=])[A-Za-z\d!@#$%^&*?~`()-_+=]{12,}$/.test(value);
        },
        message: "Password must be at least 12 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      }
    },
    apiKey: { type: String, required: true, unique: true },
    role: { 
      type: String, 
      enum: ["admin", "superadmin"],  
      default: "admin"
    },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving the user
apiUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password
apiUserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to check if new password is the same as the old password
apiUserSchema.methods.isSamePassword = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.password);
};

const ApiUser = mongoose.model("ApiUser", apiUserSchema);
module.exports = ApiUser;
