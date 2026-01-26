export class LinearSearch {
    generateSteps(array) {
        const steps = [];
        const arr = [...array];
        
        const target = arr[Math.floor(Math.random() * arr.length)];
        
        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 0
        });

        for (let i = 0; i < arr.length; i++) {
            steps.push({
                type: 'current',
                index: i,
                array: [...arr],
                pseudocodeLine: 1
            });

            if (arr[i] === target) {
                steps.push({
                    type: 'render',
                    array: [...arr],
                    highlights: { current: i, sorted: [i] },
                    pseudocodeLine: 2
                });
                steps.push({
                    type: 'render',
                    array: [...arr],
                    highlights: { current: i, sorted: [i] },
                    pseudocodeLine: 3
                });
                return steps;
            } else {
                steps.push({
                    type: 'render',
                    array: [...arr],
                    highlights: { current: i },
                    pseudocodeLine: 1
                });
            }
        }

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 4
        });

        return steps;
    }
}