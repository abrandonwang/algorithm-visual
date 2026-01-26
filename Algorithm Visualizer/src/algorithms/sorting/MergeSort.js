export class MergeSort {
    generateSteps(array) {
        const steps = [];
        const arr = [...array];
        const sortedIndices = new Set();

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 0
        });

        this.mergeSort(arr, 0, arr.length - 1, steps, sortedIndices);

        steps.push({
            type: 'render',
            array: [...arr],
            highlights: { sorted: arr.map((_, i) => i) },
            pseudocodeLine: 5
        });

        return steps;
    }

    mergeSort(arr, left, right, steps, sortedIndices) {
        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 1
        });

        if (left < right) {
            const mid = Math.floor((left + right) / 2);

            steps.push({
                type: 'render',
                array: [...arr],
                highlights: { current: mid },
                pseudocodeLine: 2
            });

            this.mergeSort(arr, left, mid, steps, sortedIndices);
            steps.push({
                type: 'render',
                array: [...arr],
                pseudocodeLine: 3
            });

            this.mergeSort(arr, mid + 1, right, steps, sortedIndices);
            steps.push({
                type: 'render',
                array: [...arr],
                pseudocodeLine: 4
            });

            this.merge(arr, left, mid, right, steps, sortedIndices);
        } else if (left === right) {
            sortedIndices.add(left);
            steps.push({
                type: 'mark-sorted',
                index: left,
                array: [...arr],
                highlights: { sorted: Array.from(sortedIndices) },
                pseudocodeLine: 1
            });
        }
    }

    merge(arr, left, mid, right, steps, sortedIndices) {
        const n1 = mid - left + 1;
        const n2 = right - mid;
        const leftArr = [];
        const rightArr = [];

        for (let i = 0; i < n1; i++) {
            leftArr[i] = arr[left + i];
        }
        for (let j = 0; j < n2; j++) {
            rightArr[j] = arr[mid + 1 + j];
        }

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 7
        });

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 8
        });

        steps.push({
            type: 'render',
            array: [...arr],
            highlights: { comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i) },
            pseudocodeLine: 9
        });

        let i = 0, j = 0, k = left;

        steps.push({
            type: 'render',
            array: [...arr],
            pseudocodeLine: 10
        });

        while (i < n1 && j < n2) {
            steps.push({
                type: 'render',
                array: [...arr],
                pseudocodeLine: 11
            });

            steps.push({
                type: 'compare',
                indices: [left + i, mid + 1 + j],
                array: [...arr],
                pseudocodeLine: 12
            });

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                steps.push({
                    type: 'render',
                    array: [...arr],
                    highlights: { current: k },
                    pseudocodeLine: 13
                });
                i++;
            } else {
                arr[k] = rightArr[j];
                steps.push({
                    type: 'render',
                    array: [...arr],
                    highlights: { current: k },
                    pseudocodeLine: 14
                });
                j++;
            }
            k++;
            steps.push({
                type: 'render',
                array: [...arr],
                pseudocodeLine: 15
            });
        }

        while (i < n1) {
            arr[k] = leftArr[i];
            steps.push({
                type: 'render',
                array: [...arr],
                highlights: { current: k },
                pseudocodeLine: 16
            });
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = rightArr[j];
            steps.push({
                type: 'render',
                array: [...arr],
                highlights: { current: k },
                pseudocodeLine: 16
            });
            j++;
            k++;
        }
    }
}