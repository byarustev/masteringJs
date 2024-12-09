const jsonFixer = {
    fixJson: function (partialJson: string) {
        // TODO: Fix the JSON before returning
        const stack = []
        let repairedString = ""
        let i = 0;

        // replace all single quotes with double quotes
        // partialJson.replace(/\'/g, '"')

        while (i < partialJson.length) {
            let strChar = partialJson[i]

            if (strChar === "{") {
                stack.push(strChar)
            } else if (strChar === "}") {
                // check if the stack is empty
                if (stack.length === 0) {
                    // ignore this bracket
                    i++
                    continue
                } else {
                    stack.pop()
                }
            } else if (strChar === '"') {
                const nextClosingQuoteIndex = partialJson.indexOf('"', i + 1)

                if (nextClosingQuoteIndex === -1) {
                    repairedString += partialJson.slice(i).trim() + '"'
                    break
                } else {
                    // add everything from the opening quote to the closing 
                    repairedString += partialJson.slice(i, nextClosingQuoteIndex + 1).trim()
                    i = nextClosingQuoteIndex + 1
                    continue
                }
            }

            i++
            repairedString += strChar
        }

        // fix missing value on key 
        const lastCommaIndex = repairedString.lastIndexOf(",");
        const lastBraceIndex = repairedString.lastIndexOf("{")

        // get last segment after last comma or oppening brace
        const lastSegment = repairedString.slice(Math.max(lastCommaIndex, lastBraceIndex) + 1).trim()

        // check if the last item has no value assigned
        // then last item is the key
        if (lastSegment.startsWith('"') && !lastSegment.includes(":")) {
            repairedString += ':"VALUE"'
        }



        // get last segment after last comma or oppening brace
        const lastSemiColonSegment = repairedString.slice(Math.max(lastCommaIndex, lastBraceIndex) + 1).trim()

        // check if the last item has no value assigned
        // then last item is the key
        if (!lastSemiColonSegment.startsWith('"')) {
            repairedString += '"UNKNOWN_KEY":"VALUE"'
        }


        const lastSemiColonIndex = repairedString.lastIndexOf(":");
        // get last segment after last comma or oppening brace
        const segment = repairedString.slice(Math.max(lastSemiColonIndex, lastBraceIndex) + 1).trim()
        if (!segment.startsWith('"')) {
            repairedString += '"VALUE"'
        }

        // handle missing brackets
        while (stack.length > 0) {
            stack.pop()
            repairedString += "}"
        }


        return repairedString;
    }
};


//   Passed all the test cases 

module.exports = jsonFixer;