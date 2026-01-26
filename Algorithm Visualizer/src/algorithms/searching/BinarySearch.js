export class BinarySearch {
    generateSteps(array) {
        const steps = [];
        const sortedArray = [...array].sort((a, b) => a - b);
        const target = sortedArray[Math.floor(Math.random() * sortedArray.length)];
        
        steps.push({
            type: 'render',
            array: [...sortedArray],
            highlights: { sorted: sortedArray.map((_, i) => i) },
            pseudocodeLine: 0
        });

        let left = 0;
        let right = sortedArray.length - 1;

        steps.push({
            type: 'render',
            array: [...sortedArray],
            highlights: { sorted: sortedArray.map((_, i) => i) },
            pseudocodeLine: 1
        });

        steps.push({
            type: 'render',
            array: [...sortedArray],
            highlights: { sorted: sortedArray.map((_, i) => i) },
            pseudocodeLine: 2
        });

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            steps.push({
                type: 'current',
                index: mid,
                array: [...sortedArray],
                highlights: { 
                    current: mid, 
                    comparing: [left, right],
                    sorted: sortedArray.map((_, i) => i)
                },
                pseudocodeLine: 3
            });

            steps.push({
                type: 'compare',
                indices: [mid],
                array: [...sortedArray],
                highlights: { 
                    comparing: [mid],
                    current: mid,
                    sorted: sortedArray.map((_, i) => i)
                },
                pseudocodeLine: 4
            });

            if (sortedArray[mid] === target) {
                steps.push({
                    type: 'render',
                    array: [...sortedArray],
                    highlights: { 
                        current: mid, 
                        sorted: [mid],
                        comparing: sortedArray.map((_, i) => i)
                    },
                    pseudocodeLine: 5
                });
                steps.push({
                    type: 'render',
                    array: [...sortedArray],
                    highlights: { 
                        current: mid, 
                        sorted: [mid],
                        comparing: sortedArray.map((_, i) => i)
                    },
                    pseudocodeLine: 6
                });
                return steps;
            } else if (sortedArray[mid] < target) {
                left = mid + 1;
                steps.push({
                    type: 'render',
                    array: [...sortedArray],
                    highlights: { 
                        current: mid,
                        comparing: [left, right],
                        sorted: sortedArray.map((_, i) => i)
                    },
                    pseudocodeLine: 7
                });
            } else {
                right = mid - 1;
                steps.push({
                    type: 'render',
                    array: [...sortedArray],
                    highlights: { 
                        current: mid,
                        comparing: [left, right],
                        sorted: sortedArray.map((_, i) => i)
                    },
                    pseudocodeLine: 8
                });
            }
        }

        steps.push({
            type: 'render',
            array: [...sortedArray],
            highlights: { sorted: sortedArray.map((_, i) => i) },
            pseudocodeLine: 9
        });

        return steps;
    }
}