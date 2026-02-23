const mongoose = require('mongoose');
const Request = require('./models/Request');
const User = require('./models/User');

// Clean up test data and close connection after all tests
afterAll(async () => {
  try {
    // Clean test data
    await Request.deleteMany({ email: { $in: ['juan@example.com', 'testclient@test.com'] } });
    await User.deleteMany({ email: { $in: ['testadmin@test.com'] } });
  } catch {
    // ignore cleanup errors
  }
  await mongoose.connection.close();
});
