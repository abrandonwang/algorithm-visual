export class BubbleSort {
    generateSteps(array) {
        const steps = [];
        const n = array.length;
        const arr = [...array];

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 0
        });

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 1
        });

        for (let i = 0; i < n - 1; i++) {
            steps.push({
                type: 'current',
                index: i,
                pseudocodeLine: 2
            });

            for (let j = 0; j < n - i - 1; j++) {
                steps.push({
                    type: 'current',
                    index: j,
                    pseudocodeLine: 3
                });

                steps.push({
                    type: 'compare',
                    indices: [j, j + 1],
                    array: [...arr],
                    pseudocodeLine: 4
                });

                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    
                    steps.push({
                        type: 'swap',
                        indices: [j, j + 1],
                        array: [...arr],
                        pseudocodeLine: 5
                    });
                } else {
                    steps.push({
                        type: 'render',
                        array: [...arr],
                        highlights: { current: j + 1 },
                        pseudocodeLine: 4
                    });
                }
            }

            steps.push({
                type: 'mark-sorted',
                index: n - i - 1,
                array: [...arr],
                pseudocodeLine: 2
            });
        }

        steps.push({
            type: 'mark-sorted',
            index: 0,
            array: [...arr],
            pseudocodeLine: 6
        });

        return steps;
    }
}