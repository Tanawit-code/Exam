import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// สมัครสมาชิก
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ตรวจข้อมูล
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "กรุณากรอกข้อมูลให้ครบ",
      });
    }

    // เช็คอีเมลซ้ำ
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "อีเมลนี้ถูกใช้งานแล้ว",
      });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้าง user ใหม่
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "สมัครสมาชิกสำเร็จ",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ล็อกอิน
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ตรวจข้อมูล
    if (!email || !password) {
      return res.status(400).json({
        message: "กรุณากรอกอีเมลและรหัสผ่าน",
      });
    }

    // หา user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "ไม่พบบัญชีผู้ใช้",
      });
    }

    // ตรวจรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "รหัสผ่านไม่ถูกต้อง",
      });
    }

    // สร้าง token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "mysecretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "ล็อกอินสำเร็จ",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ดูโปรไฟล์
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};