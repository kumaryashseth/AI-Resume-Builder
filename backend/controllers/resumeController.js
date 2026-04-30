import Resume from "../models/resumeModel.js";

export const createResume = async (req, res) => {
  console.log(req.body);
  
  try {
    const resume = await Resume.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(resume);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyResumes = async (req, res) => {
  try {
    const data = await Resume.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResume=async (req,res) => {
    try {
        await Resume.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "Resume deleted successfully"});  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getSingleResume=async (req,res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if(!resume){
      return res.status(404).json({success: false, message: "Resume not found"});
    }
    
    if(resume.userId.toString() !== req.user._id){
      return res.status(401).json({success: false, message: "Unauthorized"});
    }
    res.status(200).json({success: true, data: resume});

  } catch (error) {
    res.status(500).json({ message: error.message });    
  }
}


export const updateResume=async (req,res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if(!resume){
      return res.status(404).json({success: false, message: "Resume not found"});
    }
    
    if(resume.userId.toString() !== req.user._id){
      return res.status(401).json({success: false, message: "Unauthorized"});
    }
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    res.status(200).json({success: true, data: updatedResume});
  } catch (error) {
    res.status(500).json({ message: error.message });    
  }
}   