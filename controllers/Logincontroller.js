 const login = async(req,res)=>{

try{

const {email,password} = req.body;

const user = await user.findOne({email});

if(!user){
return res.status(400).json({message:"User not found"});
}

const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
return res.status(400).json({message:"Invalid password"});
}

res.json(user);

}catch(error){

res.status(500).json({error:error.message});

}

};
module.exports = login;