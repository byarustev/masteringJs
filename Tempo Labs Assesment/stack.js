// practising stacks

// NB. check if a given stack is balanced

const isBalancedParentheses = (strParas) => {
    const stack = []
    for (let i = 0; i < strParas.length; i++) {
        const char = strParas[i];
        if (char === "(") {
            stack.push(char)
        } else if (char === ")") {
            // check if we have matching opening
            if (stack.length === 0) {
                return false
            } else {
                stack.pop() /// remove matching opening
            }
        }
    }

    // If the stack is empty, all parentheses matched.
    return stack.length === 0;
}

// Examples
console.log(isBalancedParentheses("(())")); // true
console.log(isBalancedParentheses("(()"));  // false
console.log(isBalancedParentheses(")("));


// use stacks to repair json { or ]

function repairJsonBrackets(input) {
    const stack = [];
    let repaired = "";

    for (let char of input) {
        if (char === '{' || char === '[') {
            // Push opening brackets onto the stack
            stack.push(char);
        } else if (char === '}' || char === ']') {
            // Check if the top of the stack matches
            const expectedOpen = char === '}' ? '{' : '[';
            if (stack.length > 0 && stack[stack.length - 1] === expectedOpen) {
                stack.pop(); // Pop the matching opening bracket
            } else {
                // Skip this closing bracket as it doesn't match
                continue;
            }
        }

        repaired += char; // Append the character to the repaired JSON
    }

    // Add missing closing brackets for any unbalanced opening brackets
    while (stack.length > 0) {
        const open = stack.pop();
        repaired += open === '{' ? '}' : ']';
    }

    return repaired;
}


function repairJsonBrackets1(input) {
    const stack = [];
    let repaired = "";

    for (let char of input) {
        // debugger
        if (char === '{') {
            // Push opening brackets onto the stack
            stack.push(char);
        } else if (char === '}') {
            // Check if the top of the stack matches
            if (stack.length > 0) {
                stack.pop(); // Pop the matching opening bracket
            } else {
                // Skip this closing bracket as it doesn't match
                continue;
            }
        }

        repaired += char; // Append the character to the repaired JSON
    }

    // Add missing closing brackets for any unbalanced opening brackets
    while (stack.length > 0) {
        // debugger
        const open = stack.pop();
        repaired += '}';
    }

    return repaired;
}

// const input1 = '{"key1":{"key2":"value"}}';
// console.log(repairJsonBrackets1(input1)); // Output: '{"key1":{"key2":"value"}}'

// const input2 = '{"key1":{"key2":"value"';
// console.log(repairJsonBrackets1(input2)); // Output: '{"key1":{"key2":"value"}}'

// Function to repair a partial JSON string.
function repairJson(input) {
    let stack = [];
    let repaired = "";
    let i = 0;
    while (i < input.length) {
        const char = input[i];

        if (char === '{' || char === '[') {
            // Open brackets: push to stack.
            stack.push(char);
        } else if (char === '}' || char === ']') {
            // Close brackets: pop from stack if matching.
            if (
                (char === '}' && stack[stack.length - 1] === '{') ||
                (char === ']' && stack[stack.length - 1] === '[')
            ) {
                stack.pop();
            } else {
                // Mismatched closing bracket, skip adding it.
                i++;
                continue;
            }
        } else if (char === '"') {
            // Handle strings.
            const closingQuotePosition = input.indexOf('"', i + 1);
            if (closingQuotePosition === -1) {
                // If no closing quote is found, complete the string.
                repaired += input.slice(i).trim() + '"';
                break;
            } else {
                // Add the full string.
                // NB: add entire string from opening quote to closing quote
                // i.e from i to closingQuotePositionPos+1
                repaired += input.slice(i, closingQuotePosition + 1).trim();
                // jump and start from closing quote
                i = closingQuotePosition + 1;
                continue; // NB. since the required value has already been updated
            }
        }
        i++
        repaired += char;
    }

    // fix missing value on key 
    const lastCommaIndex = repaired.lastIndexOf(',');
    const lastBraceIndex = repaired.lastIndexOf('{');

    // Extract the last segment (after the last comma or opening brace)
    const lastSegment = repaired.slice(
        Math.max(lastCommaIndex, lastBraceIndex) + 1
    ).trim();
    if (lastSegment.startsWith('"') && !lastSegment.includes(':')) {
        // Last segment is a key with no colon or value
        repaired += ':"VALUE"'; // Add missing colon, value
    }

    // Close any remaining open brackets.
    while (stack.length) {
        const open = stack.pop();
        repaired += open === '{' ? '}' : ']';
    }

    return JSON.parse(repaired);
}

// const input1 = '{"key1":{"key2":"value"}}';
// console.log(repairJsonBrackets1(input1)); // Output: '{"key1":{"key2":"value"}}'


// // Helper function to complete an object by assigning "VALUE" to missing keys/values.
// function completeObject(obj) {
//     debugger
//     for (const key in obj) {
//         if (typeof obj[key] === 'object') {
//             completeObject(obj[key]); // Recursively complete nested objects.
//         } else if (obj[key] === null || typeof obj[key] !== 'string') {
//             obj[key] = 'VALUE'; // Assign "VALUE" to incomplete or invalid keys.
//         }
//     }
// }


// solution only considering brackets
function repairJson2(input) {
    let stack = [];
    let repaired = "";
    let i = 0;
    while (i < input.length) {
        const char = input[i];

        if (char === '{') {
            // Open brackets: push to stack.
            stack.push(char);
        } else if (char === '}') {
            // Close brackets: pop from stack if matching.
            if (stack.length > 0) {
                stack.pop();
            } else {
                // Mismatched closing bracket, skip adding it.
                i++;
                continue;
            }
        } else if (char === '"') {
            // Handle strings.
            const closingQuotePosition = input.indexOf('"', i + 1);
            if (closingQuotePosition === -1) {
                // If no closing quote is found, complete the string.
                repaired += input.slice(i).trim() + '"';
                break;
            } else {
                // Add the full string.
                // NB: add entire string from opening quote to closing quote
                // i.e from i to closingQuotePositionPos+1
                repaired += input.slice(i, closingQuotePosition + 1).trim();
                // jump and start from closing quote
                i = closingQuotePosition + 1;
                continue; // NB. since the required value has already been updated
            }
        }
        i++
        repaired += char;
    }

    // fix missing value on key 
    const lastCommaIndex = repaired.lastIndexOf(',');
    const lastBraceIndex = repaired.lastIndexOf('{');

    // Extract the last segment (after the last comma or opening brace)
    const lastSegment = repaired.slice(
        Math.max(lastCommaIndex, lastBraceIndex) + 1
    ).trim();
    if (lastSegment.startsWith('"') && !lastSegment.includes(':')) {
        // Last segment is a key with no colon or value
        repaired += ':"VALUE"'; // Add missing colon, value
    }

    // Close any remaining open brackets.
    while (stack.length) {
        stack.pop();
        repaired += "}"
    }

    return JSON.parse(repaired);
}

const inp1 = `{"a":"b","e `;
const inp = `{"key1":{"key2":"value1","key3":"value2"},"anoth `;

console.log(repairJson(inp)); // Output: '{"key1":{"key2":"value"}}'