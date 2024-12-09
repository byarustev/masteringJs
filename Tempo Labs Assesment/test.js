


// describe('adder function', function () {
//     it('2 + 2 should equal 4', function () {
//         expect(adder(2, 2)).toBe(4);
//     })
// });

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

describe('JSON Fixer', function () {
    describe('Case 1', function () {
        it('should fix', function () {
            const inp = `{"key1":{"key2":"value1","key3":"value2"},"anotherkey":"va`;
            const out = { "key1": { "key2": "value1", "key3": "value2" }, "anotherkey": "va" };
            expect(repairJson2(inp)).toEqual(out);
        })
    })
    describe('Case 2', function () {
        it('should fix', function () {
            const inp = `{"key1":{"key2":"value1","key3":"value2"},"anoth `;
            const out = { "key1": { "key2": "value1", "key3": "value2" }, "anoth": "VALUE" };
            expect(repairJson2(inp)).toEqual(out);
        })
    })
    describe('Case 3', function () {
        it('should fix', function () {
            const inp = `{"a":"b","c":"d","e `;
            const out = { "a": "b", "c": "d", "e": "VALUE" };
            expect(repairJson2(inp)).toEqual(out);
        })
    })
    describe('Case 4', function () {
        it('should fix', function () {
            const inp = `{"a":"b","c":{"a":{"a":{"a":"b `
            const out = { "a": "b", "c": { "a": { "a": { "a": "b" } } } };
            expect(repairJson2(inp)).toEqual(out);
        })
    })
});