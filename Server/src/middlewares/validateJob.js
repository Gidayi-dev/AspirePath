function validateJob(req, res, next) {
  const { title, location, company, type, description } = req.body;
  if (!title) return res.status(400).json({ message: "Job title is required" });
  if (!location)
    return res.status(400).json({ message: "Job location is required" });
  if (!company) {
    return res.status(400).json({ message: "Company is required" });
  }
  if (!type) return res.status(400).json({ message: "Job type is required" });
  if (!description)
    return res.status(400).json({ message: "Job description is required" });

  next();
}

export default validateJob;
