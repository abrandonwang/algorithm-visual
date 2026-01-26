export class SelectionSort {
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
            let minIndex = i;

            steps.push({
                type: 'current',
                index: i,
                pseudocodeLine: 2
            });

            steps.push({
                type: 'render',
                array: [...arr],
                highlights: { current: i },
                pseudocodeLine: 3
            });

            for (let j = i + 1; j < n; j++) {
                steps.push({
                    type: 'current',
                    index: j,
                    pseudocodeLine: 4
                });

                steps.push({
                    type: 'compare',
                    indices: [minIndex, j],
                    array: [...arr],
                    pseudocodeLine: 5
                });

                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                    steps.push({
                        type: 'render',
                        array: [...arr],
                        highlights: { current: minIndex, comparing: [i] },
                        pseudocodeLine: 6
                    });
                } else {
                    steps.push({
                        type: 'render',
                        array: [...arr],
                        highlights: { current: j, comparing: [minIndex, i] },
                        pseudocodeLine: 5
                    });
                }
            }

            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                
                steps.push({
                    type: 'swap',
                    indices: [i, minIndex],
                    array: [...arr],
                    pseudocodeLine: 7
                });

                steps.push({
                    type: 'render',
                    array: [...arr],
                    highlights: {},
                    pseudocodeLine: 8
                });
            }

            steps.push({
                type: 'mark-sorted',
                index: i,
                array: [...arr],
                pseudocodeLine: 2
            });
        }

        steps.push({
            type: 'mark-sorted',
            index: n - 1,
            array: [...arr],
            pseudocodeLine: 9
        });

        return steps;
    }
}