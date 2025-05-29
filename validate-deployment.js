/**
 * Deployment Validation Script
 * Validates that all key files and fixes are properly deployed
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Dicoding Story PWA Deployment...\n');

// Check critical files
const criticalFiles = [
    'index.html',
    'manifest.json',
    'sw.js',
    'services/push-notification-service.js',
    'views/add-story-page.js',
    'notification-test.html',
    'PUSH-NOTIFICATION-TROUBLESHOOTING.md',
    'PUSH-NOTIFICATION-RESOLUTION.md'
];

console.log('📁 Checking critical files:');
criticalFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} - EXISTS`);
    } else {
        console.log(`❌ ${file} - MISSING`);
    }
});

// Validate push notification service fixes
console.log('\n🔔 Validating push notification fixes:');
const pushServicePath = path.join(__dirname, 'services/push-notification-service.js');
if (fs.existsSync(pushServicePath)) {
    const content = fs.readFileSync(pushServicePath, 'utf8');
    
    const fixes = [
        { check: 'Browser support check', pattern: /This browser does not support notifications/ },
        { check: 'Permission denied handling', pattern: /permission was denied/ },
        { check: 'Default permission handling', pattern: /permission === "default"/ },
        { check: 'Enhanced error messages', pattern: /Please enable notifications in your browser/ }
    ];
    
    fixes.forEach(fix => {
        if (fix.pattern.test(content)) {
            console.log(`✅ ${fix.check} - IMPLEMENTED`);
        } else {
            console.log(`❌ ${fix.check} - MISSING`);
        }
    });
}

// Validate CSS fixes
console.log('\n🎨 Validating CSS fixes:');
const cssPath = path.join(__dirname, 'styles.css');
if (fs.existsSync(cssPath)) {
    const content = fs.readFileSync(cssPath, 'utf8');
    if (content.includes('.alert-error')) {
        console.log('✅ Error alert styling - IMPLEMENTED');
    } else {
        console.log('❌ Error alert styling - MISSING');
    }
}

console.log('\n✨ Validation complete!');
console.log('🌐 Production URL: https://dicoding-story-sandy.vercel.app/');
console.log('🧪 Test Page: https://dicoding-story-sandy.vercel.app/notification-test.html');
