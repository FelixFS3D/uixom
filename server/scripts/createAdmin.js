/**
 * Script to create the initial super_admin user
 *
 * Usage: node scripts/createAdmin.js
 *
 * You can customize via environment variables:
 *   ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const ADMIN_NAME = process.env.ADMIN_NAME || 'Felix Admin';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'felix.fs3d@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';

async function createAdmin() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/uixom';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Check if super_admin already exists
    const existingAdmin = await User.findOne({ role: 'super_admin' });
    if (existingAdmin) {
      console.log(`\nSuper admin already exists: ${existingAdmin.email}`);
      console.log('If you need to create another one, remove the existing one first.');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Check if email is taken
    const existingUser = await User.findOne({ email: ADMIN_EMAIL });
    if (existingUser) {
      console.log(`\nUser with email ${ADMIN_EMAIL} already exists with role: ${existingUser.role}`);
      console.log('Upgrading to super_admin...');
      existingUser.role = 'super_admin';
      await existingUser.save();
      console.log('Done! User upgraded to super_admin.');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create new super_admin
    const admin = new User({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'super_admin',
      isActive: true,
    });

    await admin.save();

    console.log('\n========================================');
    console.log('  SUPER ADMIN CREATED SUCCESSFULLY');
    console.log('========================================');
    console.log(`  Name:     ${ADMIN_NAME}`);
    console.log(`  Email:    ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log(`  Role:     super_admin`);
    console.log('========================================');
    console.log('\n⚠️  IMPORTANT: Change the default password after first login!\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

createAdmin();
