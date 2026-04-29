const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const port = 3000;
const hostname = 'localhost';

// Validation functions using regular expressions
function validateName(name) {
    // Must not be empty
    if (!name || name.trim() === '') {
        return false;
    }
    
    // Must not contain numbers only
    // Check if it's only digits
    if (/^\d+$/.test(name)) {
        return false;
    }
    
    return true;
}

function validatePassword(password) {
    // Must be at least 10 characters long
    if (!password || password.length < 10) {
        return false;
    }
    
    // Must contain a mixture of letters and numbers
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return hasLetters && hasNumbers;
}

function validateIDNumber(idNumber) {
    // Remove dashes for validation
    const cleanedID = idNumber.replace(/-/g, '');
    
    // Must contain exactly 12 digits
    if (cleanedID.length !== 12) {
        return false;
    }
    
    // Must be all digits (no dots or other characters)
    if (!/^\d+$/.test(cleanedID)) {
        return false;
    }
    
    // Check if original format is valid
    // Valid formats: 123456-789-012 or 123456789012 or 123456-789012, etc.
    // Must not contain dots
    if (/\./.test(idNumber)) {
        return false;
    }
    
    // Should only contain digits and dashes
    if (!/^[\d-]+$/.test(idNumber)) {
        return false;
    }
    
    return true;
}

// Mask password with asterisks
function maskPassword(password) {
    return '*'.repeat(password.length);
}

// Clean ID number (remove dashes)
function cleanIDNumber(idNumber) {
    return idNumber.replace(/-/g, '');
}

// Create server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    if (pathname === '/' && req.method === 'GET') {
        // Serve the HTML form
        fs.readFile(path.join(__dirname, 'protectaccess.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>Error</h1><p>Could not read HTML form.</p>');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (pathname === '/styles.css' && req.method === 'GET') {
        // Serve the CSS file
        fs.readFile(path.join(__dirname, 'styles.css'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/css' });
                res.end('/* Error loading styles */');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else if (pathname === '/protectaccess' && req.method === 'POST') {
        // Handle form submission
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            const formData = querystring.parse(body);
            const name = formData.name || '';
            const password = formData.pw || '';
            const idNumber = formData.IDnumber || '';
            
            // Validate all inputs
            const nameValid = validateName(name);
            const passwordValid = validatePassword(password);
            const idValid = validateIDNumber(idNumber);
            
            const allValid = nameValid && passwordValid && idValid;
            
            // Prepare output
            const statusHeading = allValid ? 'Successful' : 'Access Denied Invalid Data';
            const statusColor = allValid ? 'green' : 'red';
            
            const maskedPassword = maskPassword(password);
            const cleanedID = cleanIDNumber(idNumber);
            const detailsLine = `${name}, ${maskedPassword}, ${cleanedID}`;
            
            // Generate HTML response
            const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Result</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container ${allValid ? 'success' : 'failure'}">
        <h1>${statusHeading}</h1>
        <p>${detailsLine}</p>
        <div class="back-link">
            <a href="/">← Back to Registration</a>
        </div>
    </div>
</body>
</html>
            `;
            
            // Write to accessresults.txt
            const timestamp = new Date().toLocaleString();
            const resultEntry = `[${timestamp}] ${statusHeading}\n${detailsLine}\n---\n`;
            
            fs.appendFile(path.join(__dirname, 'accessresults.txt'), resultEntry, (err) => {
                if (err) {
                    console.error('Error writing to accessresults.txt:', err);
                }
            });
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(htmlContent);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Registration Validation System running at http://${hostname}:${port}/`);
    console.log('Press Ctrl+C to stop the server');
});
