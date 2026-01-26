export const algorithmInfo = {
    'bubble-sort': {
        name: 'Bubble Sort',
        description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(n)',
        averageCase: 'O(n²)',
        worstCase: 'O(n²)'
    },
    'selection-sort': {
        name: 'Selection Sort',
        description: 'Selection Sort divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly finds the minimum element from the unsorted part and places it at the beginning of the sorted part.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(n²)',
        averageCase: 'O(n²)',
        worstCase: 'O(n²)'
    },
    'insertion-sort': {
        name: 'Insertion Sort',
        description: 'Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms, but it has advantages such as adaptive, stable, in-place, and online sorting.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(n)',
        averageCase: 'O(n²)',
        worstCase: 'O(n²)'
    },
    'merge-sort': {
        name: 'Merge Sort',
        description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into two halves, sorts them separately, and then merges them back together. It is stable and has consistent performance.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        bestCase: 'O(n log n)',
        averageCase: 'O(n log n)',
        worstCase: 'O(n log n)'
    },
    'quick-sort': {
        name: 'Quick Sort',
        description: 'Quick Sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around it. Elements smaller than the pivot go to the left, larger to the right. It then recursively sorts the sub-arrays.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        bestCase: 'O(n log n)',
        averageCase: 'O(n log n)',
        worstCase: 'O(n²)'
    },
    'heap-sort': {
        name: 'Heap Sort',
        description: 'Heap Sort builds a max heap from the array, then repeatedly extracts the maximum element and places it at the end. It uses a binary heap data structure to maintain the heap property.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(n log n)',
        averageCase: 'O(n log n)',
        worstCase: 'O(n log n)'
    },
    'linear-search': {
        name: 'Linear Search',
        description: 'Linear Search sequentially checks each element in the array until the target value is found or the end of the array is reached. It works on both sorted and unsorted arrays.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(1)',
        averageCase: 'O(n)',
        worstCase: 'O(n)'
    },
    'binary-search': {
        name: 'Binary Search',
        description: 'Binary Search is an efficient search algorithm that works on sorted arrays. It repeatedly divides the search interval in half, comparing the target with the middle element until found or the interval is empty.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(1)',
        averageCase: 'O(log n)',
        worstCase: 'O(log n)'
    }
};