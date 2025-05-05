const authService = require('../service/authService');
const multer=require('multer');
const upload=multer();

const register = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }
        const result = await authService.registerUser({name, email, password});
        
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        res.status(201).json({
            success: true,
            data: result.user,
            token: result.token
        });
    }
    catch(error) {
        console.error('Registration error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Registration failed'
        });
    }
};


const login=async(req,res)=>{
    console.log('Login started...')
    try{
        const { email , password }=req.body;
        console.log('Login data:',req.body);

        if(!email || !password){
           return res.status(400).json({
                success:false,
                message:'Please enter all fields'
            });
        }
        console.log('attempting login');
        const result=await authService.loginUser({email,password});
        res.status(200).json({
            success:true,
            data:result.user,
            token:result.token
        });
    }
    catch(error){
        console.log('Login error:',error.stack);
        res.status(401).json({
            success:false,
            message:error.message
        });
    }
}
const adminLogin = async (req, res) => {
    console.log('Admin login started...');
    try {
        const { email, password } = req.body;
        console.log('Admin login attempt:', { email });

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        const result = await authService.adminLogin({ email, password });
        res.status(200).json({
            success: true,
            data: result.user,
            token: result.token
        });
    } catch (error) {
        console.log('Admin login error:', error.stack);
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};




module.exports={
    register,
    login,
    adminLogin // multer middleware to handle file
    
};