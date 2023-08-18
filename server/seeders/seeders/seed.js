const db = require('../config/connection');
const { User, Jobs } = require('../models'); 
const seedData = require('./userSeeds.json'); 

db.once('open', async () => {
  try {

    await User.deleteMany({});
    await Jobs.deleteMany({});

    for (const userData of seedData) {
      const { jobsApplied, ...userWithoutJobs } = userData; 
      const user = await User.create(userWithoutJobs); 
      for (const jobData of jobsApplied) {
        const jobApplication = new Jobs({
          ...jobData,
          userID: user._id, 
        });
        await jobApplication.save();
        user.jobsApplied.push(jobApplication); 
      }
      await user.save();
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});
