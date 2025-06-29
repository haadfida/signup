import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { makeSignupRow } from './fakerHelper.js';

// deterministic randomness for debugging
const seed = Date.now();
faker.seed(seed);
console.log(`🔢 Faker seed: ${seed}`);

const ROW_COUNT = parseInt(process.env.ROW_COUNT ?? '1', 10);
const rows = Array.from({ length: ROW_COUNT }, () => makeSignupRow());

const filePath = path.resolve('./data/signupTestData.json');
fs.writeFileSync(filePath, JSON.stringify(rows, null, 2));
console.log(`✅ Test data overwritten in ${filePath}`);
