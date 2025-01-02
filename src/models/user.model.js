import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { generateOtp } from "../utils/genrateOTP.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        minLength: [8, "Password must have at least 8 character."]
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phoneNo: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        require: true,
        enum: {
            values: ["admin", "user", "partter"],
            message: `This type of user is not Allowed`
        }
    },
    wellet: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        default: null
    },
    permission: {
        type: String,
        default: null
    },
    profileImg: {
        type: String,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetTokenExpire: {
        type: Date,
        default: null
    },
    verificationCode: Number,
    verificationExpire: Date,
}, {
    timestamps: true,
    methods: {
        generateVarificationCode() {
            const code = generateOtp();
            this.verificationCode = code;
            this.verificationExpire = Date.now() + 5 * 60 * 1000;
            return code;
        },
        comparePassword(enteredPass) {
            return bcrypt.compareSync(enteredPass, this.password)
        },
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);  // Generate a salt
        this.password = bcrypt.hashSync(this.password, salt);  // Hash the password
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("Users", userSchema);
export default User;