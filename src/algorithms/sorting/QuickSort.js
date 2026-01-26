export class QuickSort {
    generateSteps(array) {
        const steps = [];
        const arr = [...array];
        const sortedIndices = new Set();

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 0
        });

        this.quickSort(arr, 0, arr.length - 1, steps, sortedIndices);

        steps.push({
            type: 'render',
            array: [...arr],
            highlights: { sorted: arr.map((_, i) => i) },
            pseudocodeLine: 5
        });

        return steps;
    }

    quickSort(arr, low, high, steps, sortedIndices) {
        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 1
        });

        if (low < high) {
            steps.push({
                type: 'render',
                array: [...arr],
                highlights: { current: low, comparing: [high] },
                pseudocodeLine: 2
            });

            const pivotIndex = this.partition(arr, low, high, steps, sortedIndices);

            sortedIndices.add(pivotIndex);
            steps.push({
                type: 'mark-sorted',
                index: pivotIndex,
                array: [...arr],
                highlights: { sorted: Array.from(sortedIndices) },
                pseudocodeLine: 3
            });

            this.quickSort(arr, low, pivotIndex - 1, steps, sortedIndices);
            steps.push({
                type: 'render',
                array: [...arr],
                pseudocodeLine: 4
            });

            this.quickSort(arr, pivotIndex + 1, high, steps, sortedIndices);
        } else if (low === high) {
            sortedIndices.add(low);
            steps.push({
                type: 'mark-sorted',
                index: low,
                array: [...arr],
                highlights: { sorted: Array.from(sortedIndices) },
                pseudocodeLine: 1
            });
        }
    }

    partition(arr, low, high, steps, sortedIndices) {
        const pivot = arr[high];
        let i = low - 1;

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 6
        });

        steps.push({
            type: 'render',
            array: [...arr],
            highlights: { current: high, comparing: [low] },
            pseudocodeLine: 7
        });

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 8
        });

        for (let j = low; j < high; j++) {
            steps.push({
                type: 'compare',
                indices: [j, high],
                array: [...arr],
                pseudocodeLine: 9
            });

            if (arr[j] < pivot) {
                i++;
                if (i !== j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    steps.push({
                        type: 'swap',
                        indices: [i, j],
                        array: [...arr],
                        pseudocodeLine: 10
                    });
                } else {
                    steps.push({
                        type: 'render',
                        array: [...arr],
                        highlights: { current: j },
                        pseudocodeLine: 9
                    });
                }
            } else {
                steps.push({
                    type: 'render',
                    array: [...arr],
                    highlights: { current: j },
                    pseudocodeLine: 9
                });
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push({
            type: 'swap',
            indices: [i + 1, high],
            array: [...arr],
            pseudocodeLine: 11
        });

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 12
        });

        return i + 1;
    }
}