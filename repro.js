const { URL } = require('url');

const ROUTE_MAP = {
    astronomy: 'astronomy.html',
    astrophysics: 'astrophysics.html',
    signup: 'signup.html',
    login: 'login.html',
    username: 'username.html',
    home: 'index.html'
};

function safeNavigate(target) {
    const path = ROUTE_MAP[target];
    if (path) {
        console.log(`Setting window.location.href to: ${path}`);
        return true;
    }
    console.log('Blocked unsafe navigation to:', target);
    console.log('Redirecting to index.html');
    return false;
}

// Test Case 1: Standard navigation
console.log('--- Test Case 1: Navigate to astronomy ---');
const result1 = safeNavigate('astronomy');
if (result1) console.log('SUCCESS'); else console.log('FAILURE');

// Test Case 2: Invalid target
console.log('\n--- Test Case 2: Invalid target ---');
const result2 = safeNavigate('hacker');
if (!result2) console.log('SUCCESS (Blocked)'); else console.log('FAILURE (Should have blocked)');
