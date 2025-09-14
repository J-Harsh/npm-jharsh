#!/usr/bin/env node
// this above command is used to run the file as a script on the terminal with node of user env or current en
const fs = require('fs');
const ac = require('ansi-colors');
function printLabelValueWithIndent(label, value, indent = 0) {
    // increase indent based on recursion level
    const indentStr = '  '.repeat(indent);
    // Check if the value is a non-null object (could be an object or array).
    if (typeof value === 'object' && value !== null) {
        // Print the label in bold magenta for objects/arrays to make section headers stand out.
        // Magenta is chosen for its vibrancy to denote structure.
        console.log(ac.bold.magenta(`${indentStr}${label}:`));

        // If it's an array, iterate over each item.
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                // If the item is an object, recursively call the function with increased indent.
                if (typeof item === 'object') {
                    // Use a cyan label for array items to differentiate from object keys.
                    printLabelValueWithIndent(ac.cyan(`- Item ${index + 1}`), item, indent + 1);
                } else {
                    // For primitive array items.
                    console.log(ac.green(`${indentStr}  - ${item}`));
                }
            });
        } else {
            // If it's an object (not array), loop through each key-value pair.
            for (const key in value) {
                // Recursively print each key-value pair with increased indent.
                printLabelValueWithIndent(key, value[key], indent + 1);
            }
        }
    } else {
        // For print the label in yellow and value in white for non array/objects.
        console.log(ac.yellow(`${indentStr}${label}: `) + ac.white(value));
    }
}

// Read the resume JSON file synchronously.
const resume = JSON.parse(fs.readFileSync(__dirname + '/harsh_resume.json', 'utf8'));

// Call the pretty-print function starting with the root 'Resume' label and the parsed JSON.
printLabelValueWithIndent('Resume', resume);