# Registration Validation System - Question 2

## Overview
A Node.js registration validation system for the Gauteng Department of Justice that processes user input from an HTML form with strict security validation rules.

## Features
- **HTML Form**: Professional registration interface with CSS styling
- **Input Validation**: Uses regular expressions for pattern matching and validation
- **Password Security**: Enforces strong password requirements
- **ID Validation**: Supports multiple ID number formats
- **Secure Display**: Masks passwords with asterisks in output
- **Logging**: Records all registration attempts to `accessresults.txt`

## Files
- `server.js` - Main Node.js application
- `protectaccess.html` - Registration form UI
- `accessresults.txt` - Log file for registration attempts
- `package.json` - Project configuration

## Installation & Running

### Prerequisites
- Node.js installed on your system

### Steps
1. Open terminal/command prompt
2. Navigate to the project directory
3. Run the server:
   ```
   node server.js
   ```
   Or if you prefer:
   ```
   npm start
   ```
4. Open your browser and go to: `http://localhost:3000/`

## Validation Rules

### Valid Name
- Must not be empty
- Must not contain numbers only
- Example: ✓ "John Smith", ✓ "Mary Jane123", ✗ "12345", ✗ ""

### Valid Password
- Minimum 10 characters long
- Must contain a mixture of letters AND numbers
- Example: ✓ "Password123", ✓ "Secure2024!", ✗ "ShortPass1", ✗ "OnlyLetters"

### Valid ID Number
- Must contain exactly 12 digits
- May contain dashes (-) between groups of three digits
- Must NOT contain dots (.)
- Must NOT contain any other special characters
- Valid Formats:
  - ✓ "123456789012" (12 digits, no dashes)
  - ✓ "123456-789-012" (dashes between groups of 3)
  - ✓ "123456-789012" (dashes in any position)
- Invalid Formats:
  - ✗ "123456.789.012" (contains dots)
  - ✗ "12345678901" (only 11 digits)
  - ✗ "12345678901234" (14 digits)
  - ✗ "123456#789#012" (invalid characters)

## Output
### Successful Registration
- Heading: "Successful" (displayed in green)
- Details line: Name, Masked Password, Cleaned ID Number
- Example: `John Smith, ************, 123456789012`

### Failed Registration
- Heading: "Access Denied Invalid Data" (displayed in red)
- Details line: Name, Masked Password, Cleaned ID Number
- Example: `Invalid, ****, 123456789012`

## Regular Expressions Used
- **Name validation**: `^\d+$` (checks if only numbers)
- **Password letters**: `[a-zA-Z]` (checks for letters)
- **Password numbers**: `\d` (checks for digits)
- **ID digits**: `^\d+$` (checks if only digits after dash removal)
- **ID dashes only**: `^[\d-]+$` (checks if only digits and dashes)
- **ID dots check**: `\.` (checks for dots to reject)

## Logging
Every registration attempt is logged to `accessresults.txt` with:
- Timestamp
- Status (Successful or Access Denied Invalid Data)
- Submitted details (name, masked password, cleaned ID)

## Example Test Cases

### Test Case 1: Valid Registration
- Name: John Smith
- Password: MyPassword123
- ID: 123456-789-012
- Result: ✓ Successful

### Test Case 2: Invalid Password
- Name: Jane Doe
- Password: Short12
- ID: 987654321098
- Result: ✗ Access Denied Invalid Data (password too short)

### Test Case 3: Invalid ID (contains dots)
- Name: Bob Johnson
- Password: SecurePass456
- ID: 123456.789.012
- Result: ✗ Access Denied Invalid Data (ID contains dots)

### Test Case 4: Invalid Name (numbers only)
- Name: 12345
- Password: TestPassword789
- ID: 555666777888
- Result: ✗ Access Denied Invalid Data (name is numbers only)

## Security Notes
- Passwords are masked with asterisks in all outputs
- All validation uses regular expressions for robust pattern matching
- ID numbers are cleaned (dashes removed) before storage
- No sensitive data is displayed in the browser
- All input is validated server-side

## Troubleshooting
- **Port already in use**: Change port number in `server.js` line 13
- **Cannot find files**: Ensure HTML and txt files are in the same directory as `server.js`
- **Form not appearing**: Check browser console for errors

## Author
Developed for DSW02A - Development Software (Graded Lab 6, Question 2)
