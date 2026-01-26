export class AlgorithmRunner {
    constructor(algorithm, visualizer, array, pseudocodeCallback) {
        this.algorithm = algorithm;
        this.visualizer = visualizer;
        this.array = [...array];
        this.pseudocodeCallback = pseudocodeCallback;
        this.steps = [];
        this.currentStepIndex = 0;
        this.isPlaying = false;
        this.speed = 1;
        this.intervalId = null;
        this.isComplete = false;
        this.sortedIndices = new Set();

        this.generateSteps();
    }

    generateSteps() {
        // Generate all visualization steps
        this.steps = this.algorithm.generateSteps([...this.array]);
        this.currentStepIndex = 0;
        this.isComplete = false;
        this.sortedIndices.clear();
    }

    play() {
        if (this.isComplete) {
            this.reset();
        }
        
        this.isPlaying = true;
        this.executeNext();
    }

    pause() {
        this.isPlaying = false;
        if (this.intervalId) {
            clearTimeout(this.intervalId);
            this.intervalId = null;
        }
    }

    stop() {
        this.pause();
        this.currentStepIndex = 0;
        this.isComplete = false;
    }

    step() {
        if (this.isComplete) {
            return;
        }

        this.executeStep();
    }

    executeNext() {
        if (!this.isPlaying) return;

        if (this.currentStepIndex >= this.steps.length) {
            this.complete();
            return;
        }

        this.executeStep();

        if (this.isPlaying && this.currentStepIndex < this.steps.length) {
            const delay = (1000 / this.speed) * 0.5; // Base delay adjusted by speed
            this.intervalId = setTimeout(() => {
                this.executeNext();
            }, delay);
        }
    }

    executeStep() {
        if (this.currentStepIndex >= this.steps.length) {
            this.complete();
            return;
        }

        const step = this.steps[this.currentStepIndex];
        
        // Update array if step provides it
        if (step.array) {
            this.array = [...step.array];
        }

        // Highlight pseudocode line if specified
        if (step.pseudocodeLine !== undefined && this.pseudocodeCallback) {
            this.pseudocodeCallback(step.pseudocodeLine);
        }

        // Apply visualizations
        if (step.type === 'compare') {
            this.visualizer.render(this.array, {
                comparing: step.indices,
                sorted: Array.from(this.sortedIndices)
            });
        } else if (step.type === 'swap') {
            this.visualizer.render(this.array, {
                swapping: step.indices,
                sorted: Array.from(this.sortedIndices)
            });
        } else if (step.type === 'mark-sorted') {
            this.sortedIndices.add(step.index);
            const highlights = {
                ...(step.highlights || {}),
                sorted: Array.from(this.sortedIndices)
            };
            this.visualizer.render(this.array, highlights);
        } else if (step.type === 'current') {
            const highlights = {
                ...(step.highlights || {}),
                current: step.index,
                sorted: Array.from(this.sortedIndices)
            };
            this.visualizer.render(this.array, highlights);
        } else if (step.type === 'render') {
            const highlights = {
                ...(step.highlights || {}),
                sorted: step.highlights?.sorted ? step.highlights.sorted : Array.from(this.sortedIndices)
            };
            this.visualizer.render(this.array, highlights);
        }

        this.currentStepIndex++;
    }

    complete() {
        this.isPlaying = false;
        this.isComplete = true;
        
        // Mark all as sorted
        const highlights = {
            sorted: this.array.map((_, i) => i)
        };
        this.visualizer.render(this.array, highlights);
        
        // Clear pseudocode highlight
        if (this.pseudocodeCallback) {
            this.pseudocodeCallback(-1);
        }
    }

    reset() {
        this.stop();
        this.generateSteps();
        this.visualizer.render(this.array, { sorted: [] });
    }

    setSpeed(speed) {
        this.speed = speed;
    }
}