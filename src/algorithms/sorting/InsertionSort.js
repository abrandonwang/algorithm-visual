export class InsertionSort {
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

        steps.push({
            type: 'mark-sorted',
            index: 0,
            array: [...arr],
            pseudocodeLine: 1
        });

        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;

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

            steps.push({
                type: 'render',
                array: [...arr],
                highlights: { current: i },
                pseudocodeLine: 4
            });

            while (j >= 0 && arr[j] > key) {
                steps.push({
                    type: 'compare',
                    indices: [j, i],
                    array: [...arr],
                    pseudocodeLine: 5
                });

                arr[j + 1] = arr[j];
                
                steps.push({
                    type: 'render',
                    array: [...arr],
                    highlights: { current: j, comparing: [i] },
                    pseudocodeLine: 6
                });

                steps.push({
                    type: 'render',
                    array: [...arr],
                    highlights: { current: j },
                    pseudocodeLine: 7
                });

                j--;
            }

            arr[j + 1] = key;
            
            steps.push({
                type: 'render',
                array: [...arr],
                highlights: { current: j + 1 },
                pseudocodeLine: 8
            });

            steps.push({
                type: 'mark-sorted',
                index: j + 1,
                array: [...arr],
                pseudocodeLine: 2
            });
        }

        steps.push({
            type: 'render',
            array: [...arr],
            highlights: { sorted: arr.map((_, i) => i) },
            pseudocodeLine: 9
        });

        return steps;
    }
}