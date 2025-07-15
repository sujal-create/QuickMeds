export const getJobs = (req, res) => {
  // Sample logic
  res.json([
    { id: 1, title: "Frontend Developer", company: "TechX" },
    { id: 2, title: "Backend Developer", company: "CodeSoft" },
  ]);
};

export const createJob = (req, res) => {
  const jobData = req.body;
  // Save jobData to DB here (or local array for now)
  console.log("New Job Posted:", jobData);
  res.status(201).json({ message: "Job created successfully", job: jobData });
};
