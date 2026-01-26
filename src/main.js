import { Visualizer } from './visualization/Visualizer.js';
import { AlgorithmRunner } from './algorithms/AlgorithmRunner.js';
import { BubbleSort } from './algorithms/sorting/BubbleSort.js';
import { SelectionSort } from './algorithms/sorting/SelectionSort.js';
import { InsertionSort } from './algorithms/sorting/InsertionSort.js';
import { MergeSort } from './algorithms/sorting/MergeSort.js';
import { QuickSort } from './algorithms/sorting/QuickSort.js';
import { HeapSort } from './algorithms/sorting/HeapSort.js';
import { LinearSearch } from './algorithms/searching/LinearSearch.js';
import { BinarySearch } from './algorithms/searching/BinarySearch.js';
import { algorithmInfo } from './utils/algorithmInfo.js';
import { pseudocode } from './utils/pseudocode.js';

class App {
    constructor() {
        this.visualizer = null;
        this.runner = null;
        this.currentAlgorithm = null;
        this.originalArray = [];
        this.currentArray = [];
        
        this.initializeElements();
        // Generate initial random array
        const size = parseInt(this.arraySizeInput.value) || 10;
        this.originalArray = Array.from({ length: size }, () => 
            Math.floor(Math.random() * 100) + 1
        );
        this.attachEventListeners();
        this.initializeAlgorithm();
    }

    initializeElements() {
        this.algorithmSelect = document.getElementById('algorithm-select');
        this.visualizationArea = document.getElementById('visualization-area');
        this.playBtn = document.getElementById('play-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.stepBtn = document.getElementById('step-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.speedSlider = document.getElementById('speed-slider');
        this.speedValue = document.getElementById('speed-value');
        this.arraySizeInput = document.getElementById('array-size');
        this.generateRandomBtn = document.getElementById('generate-random');
        this.manualInputBtn = document.getElementById('manual-input-btn');
        this.manualInputContainer = document.getElementById('manual-input-container');
        this.manualArrayInput = document.getElementById('manual-array');
        this.applyManualBtn = document.getElementById('apply-manual');
        this.algorithmName = document.getElementById('algorithm-name');
        this.algorithmDescription = document.getElementById('algorithm-description');
        this.timeComplexity = document.getElementById('time-complexity');
        this.spaceComplexity = document.getElementById('space-complexity');
        this.pseudocodeContainer = document.getElementById('pseudocode-container');
    }

    attachEventListeners() {
        this.algorithmSelect.addEventListener('change', () => this.initializeAlgorithm());
        this.playBtn.addEventListener('click', () => this.play());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.stepBtn.addEventListener('click', () => this.step());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.speedSlider.addEventListener('input', (e) => this.updateSpeed(e.target.value));
        this.generateRandomBtn.addEventListener('click', () => this.generateRandomArray());
        this.manualInputBtn.addEventListener('click', () => this.toggleManualInput());
        this.applyManualBtn.addEventListener('click', () => this.applyManualArray());
    }

    initializeAlgorithm() {
        const algorithmType = this.algorithmSelect.value;
        
        // Get algorithm class
        let AlgorithmClass;
        switch (algorithmType) {
            case 'bubble-sort':
                AlgorithmClass = BubbleSort;
                break;
            case 'selection-sort':
                AlgorithmClass = SelectionSort;
                break;
            case 'insertion-sort':
                AlgorithmClass = InsertionSort;
                break;
            case 'merge-sort':
                AlgorithmClass = MergeSort;
                break;
            case 'quick-sort':
                AlgorithmClass = QuickSort;
                break;
            case 'heap-sort':
                AlgorithmClass = HeapSort;
                break;
            case 'linear-search':
                AlgorithmClass = LinearSearch;
                break;
            case 'binary-search':
                AlgorithmClass = BinarySearch;
                break;
            default:
                AlgorithmClass = BubbleSort;
        }

        // Update algorithm info
        const info = algorithmInfo[algorithmType];
        if (info) {
            this.algorithmName.textContent = info.name;
            this.algorithmDescription.textContent = info.description;
            this.timeComplexity.textContent = info.timeComplexity;
            this.spaceComplexity.textContent = info.spaceComplexity;
        }

        // Update pseudocode
        this.updatePseudocode(algorithmType);

        // Create algorithm instance
        this.currentAlgorithm = new AlgorithmClass();
        
        // Initialize visualizer
        this.visualizer = new Visualizer(this.visualizationArea);
        
        // Reset and render - use requestAnimationFrame to ensure layout is ready
        requestAnimationFrame(() => {
            this.reset();
        });
    }

    generateRandomArray() {
        const size = parseInt(this.arraySizeInput.value) || 10;
        this.originalArray = Array.from({ length: size }, () => 
            Math.floor(Math.random() * 100) + 1
        );
        this.reset();
    }

    toggleManualInput() {
        const isVisible = this.manualInputContainer.style.display !== 'none';
        this.manualInputContainer.style.display = isVisible ? 'none' : 'flex';
    }

    applyManualArray() {
        const input = this.manualArrayInput.value.trim();
        if (!input) return;

        try {
            const values = input.split(',').map(v => {
                const num = parseInt(v.trim());
                if (isNaN(num)) throw new Error('Invalid number');
                return num;
            });

            if (values.length < 5 || values.length > 50) {
                alert('Array size must be between 5 and 50');
                return;
            }

            this.originalArray = values;
            this.arraySizeInput.value = values.length;
            this.reset();
            this.toggleManualInput();
        } catch (error) {
            alert('Invalid input. Please enter comma-separated numbers.');
        }
    }

    reset() {
        if (this.runner) {
            this.runner.stop();
        }

        // Ensure we have an array
        if (this.originalArray.length === 0) {
            const size = parseInt(this.arraySizeInput.value) || 10;
            this.originalArray = Array.from({ length: size }, () => 
                Math.floor(Math.random() * 100) + 1
            );
        }

        this.currentArray = [...this.originalArray];
        
        // Only render if visualizer exists and array is not empty
        if (this.visualizer && this.currentArray.length > 0) {
            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
                this.visualizer.render(this.currentArray);
            });
        }
        
        // Only create runner if algorithm exists
        if (this.currentAlgorithm && this.visualizer && this.currentArray.length > 0) {
        this.runner = new AlgorithmRunner(
            this.currentAlgorithm,
            this.visualizer,
            this.currentArray,
            (lineIndex) => this.highlightPseudocodeLine(lineIndex)
        );
        }

        this.playBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.stepBtn.disabled = false;
        this.highlightPseudocodeLine(-1);
    }

    updatePseudocode(algorithmType) {
        const code = pseudocode[algorithmType] || [];
        this.pseudocodeContainer.innerHTML = '';
        
        code.forEach((line, index) => {
            const lineElement = document.createElement('div');
            lineElement.className = 'pseudocode-line';
            lineElement.textContent = line;
            if (line.trim() === '') {
                lineElement.classList.add('empty');
            }
            lineElement.dataset.lineIndex = index;
            this.pseudocodeContainer.appendChild(lineElement);
        });
    }

    highlightPseudocodeLine(lineIndex) {
        // Remove active class from all lines
        const lines = this.pseudocodeContainer.querySelectorAll('.pseudocode-line');
        lines.forEach(line => line.classList.remove('active'));
        
        // Add active class to current line
        if (lineIndex >= 0 && lineIndex < lines.length) {
            lines[lineIndex].classList.add('active');
            // Scroll into view
            lines[lineIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    play() {
        if (this.runner) {
            this.runner.play();
            this.playBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.stepBtn.disabled = true;
        }
    }

    pause() {
        if (this.runner) {
            this.runner.pause();
            this.playBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.stepBtn.disabled = false;
        }
    }

    step() {
        if (this.runner) {
            this.runner.step();
        }
    }

    updateSpeed(value) {
        const speed = parseFloat(value);
        this.speedValue.textContent = `${speed}x`;
        if (this.runner) {
            this.runner.setSpeed(speed);
        }
    }

}

// Initialize app when DOM is loaded
let appInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    appInstance = new App();
    
    // Also ensure rendering happens after window load
    window.addEventListener('load', () => {
        if (appInstance && appInstance.visualizer && appInstance.currentArray.length > 0) {
            appInstance.visualizer.render(appInstance.currentArray);
        }
    });
});