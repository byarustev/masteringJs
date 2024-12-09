const fixJson1 = (jsonString) => {
    try {
        const fixedJson = JSON.parse(jsonString)
        // return if everything is good
        return fixedJson
    } catch {
        // replace all the single quotes with double quotes
        let fixedJson = jsonString.replace(/\'/g, '"')

        // fix missing quotes 
        const lines = fixedJson.split("\n")
        const updatedLines = []
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i]
            const colonIndex = line.indexOf(":")
            if (colonIndex > -1) {
                key = line.slice(0, colonIndex).trim()
                if (!key.startsWith('"') || !key.endsWith('"')) {
                    line = `"${key}":${line.slice(colonIndex + 1)}`
                }

                console.log(line)
            }
            updatedLines.push(line.trim())
        }
        fixedJson = updatedLines.join("\n")

        try {
            JSON.parse(fixedJson)
            return fixedJson
        } catch {
            throw Error("failed to fix jsonString")
        }

    }
}


function jsonFixer2(jsonString) {
    const stack = []
    const repaired = ""

    for (let char of jsonString) {
        if (char === "{") {
            stack.push(char)
        } else if (char === "}") {
            if (stack.length > 0) {
                // if there is a matching opening 
                stack.pop()
            } else {
                continue // ignore the closing bracket
            }
        }

        repaired += char
    }

    // add a closing bracket for every openning brace in the stack
    while (stack.length > 0) {
        stack.pop()
        repaired += "}"
    }

}


// --- single quotes
const malformedJSON1 = `{
    'name': 'John',
    'age': 25,
    'city': 'New York'
}`

// Test it - missing quotes
const malformedJSON2 = `
{
  name: "John Doe",
  age: 25,
  "city": "New York"
}
`;

// fix missing {} braces

console.log(fixJson(malformedJSON1))
console.log(fixJson(malformedJSON2))


