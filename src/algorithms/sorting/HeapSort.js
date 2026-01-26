export class HeapSort {
    generateSteps(array) {
        const steps = [];
        const arr = [...array];
        const sortedIndices = new Set();

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 0
        });

        const n = arr.length;

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 1
        });

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 2
        });

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 3
        });

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(arr, n, i, steps);
        }

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 4
        });

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 5
        });

        for (let i = n - 1; i > 0; i--) {
            steps.push({
                type: 'render',
                array: [...arr],
                highlights: { current: 0, comparing: [i] },
                pseudocodeLine: 6
            });

            [arr[0], arr[i]] = [arr[i], arr[0]];
            steps.push({
                type: 'swap',
                indices: [0, i],
                array: [...arr],
                pseudocodeLine: 7
            });

            sortedIndices.add(i);
            steps.push({
                type: 'mark-sorted',
                index: i,
                array: [...arr],
                highlights: { sorted: Array.from(sortedIndices) },
                pseudocodeLine: 8
            });

            this.heapify(arr, i, 0, steps);
        }

        sortedIndices.add(0);
        steps.push({
            type: 'mark-sorted',
            index: 0,
            array: [...arr],
            highlights: { sorted: Array.from(sortedIndices) },
            pseudocodeLine: 5
        });

        return steps;
    }

    heapify(arr, n, i, steps) {
        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 10
        });

        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 11
        });

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 12
        });

        if (left < n) {
            steps.push({
                type: 'compare',
                indices: [left, largest],
                array: [...arr],
                pseudocodeLine: 13
            });

            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }

        if (right < n) {
            steps.push({
                type: 'compare',
                indices: [right, largest],
                array: [...arr],
                pseudocodeLine: 14
            });

            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];

            steps.push({
                type: 'swap',
                indices: [i, largest],
                array: [...arr],
                pseudocodeLine: 15
            });

            steps.push({
                type: 'render',
                array: [...arr],
                pseudocodeLine: 16
            });

            this.heapify(arr, n, largest, steps);
        } else {
            steps.push({
                type: 'render',
                array: [...arr],
                highlights: { current: i },
                pseudocodeLine: 13
            });
        }
    }
}