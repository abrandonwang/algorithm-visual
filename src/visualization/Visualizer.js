export class Visualizer {
    constructor(container) {
        this.container = container;
        this.elements = [];
    }

    render(array, highlights = {}) {
        if (!array || array.length === 0) {
            console.warn('Visualizer.render called with empty array');
            return;
        }

        if (!this.container) {
            console.error('Visualizer container is not set');
            return;
        }

        // Clear container
        this.container.innerHTML = '';
        this.elements = [];

        // Find max value for scaling
        const maxValue = Math.max(...array, 1);
        
        // Get container height, with fallback if not yet rendered
        // Force a reflow to ensure accurate measurements
        this.container.offsetHeight;
        let containerHeight = this.container.clientHeight;
        if (containerHeight === 0 || containerHeight < 100) {
            // Fallback: use a reasonable default height
            containerHeight = 360; // 400px min-height - 40px padding
        } else {
            containerHeight = containerHeight - 40; // Padding
        }

        // Ensure minimum height
        containerHeight = Math.max(containerHeight, 200);

        // Calculate element width to fit on one line
        // Account for gap between elements (0.5rem = 8px per gap) and padding (2rem = 32px on each side)
        const gapSize = 8;
        const totalGaps = (array.length - 1) * gapSize;
        const containerWidth = this.container.clientWidth || this.container.offsetWidth || 800;
        const padding = 64; // 2rem padding on each side (32px * 2)
        const availableWidth = containerWidth - padding;
        const calculatedWidth = (availableWidth - totalGaps) / array.length;
        // Clamp between 30px minimum and 50px maximum for readability
        const elementWidth = Math.max(30, Math.min(50, calculatedWidth));
        
        // Create elements
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = value;
            
            // Calculate height based on value (as percentage of max)
            const heightPercentage = (value / maxValue);
            const height = heightPercentage * containerHeight;
            element.style.height = `${Math.max(height, 30)}px`;
            element.style.minHeight = '30px';
            element.style.width = `${elementWidth}px`;
            element.style.minWidth = `${Math.min(elementWidth, 30)}px`;
            element.style.flexShrink = '0';
            
            // Apply highlight classes
            if (highlights.comparing && highlights.comparing.includes(index)) {
                element.classList.add('comparing');
            }
            if (highlights.swapping && highlights.swapping.includes(index)) {
                element.classList.add('swapping');
            }
            if (highlights.sorted && highlights.sorted.includes(index)) {
                element.classList.add('sorted');
            }
            if (highlights.current === index) {
                element.classList.add('current');
            }

            this.container.appendChild(element);
            this.elements.push(element);
        });

        // Force a reflow to ensure elements are rendered
        this.container.offsetHeight;
    }

    highlightComparison(indices) {
        // Remove previous highlights
        this.elements.forEach(el => {
            el.classList.remove('comparing', 'swapping', 'current');
        });

        // Add comparison highlight
        if (Array.isArray(indices)) {
            indices.forEach(idx => {
                if (this.elements[idx]) {
                    this.elements[idx].classList.add('comparing');
                }
            });
        } else if (indices !== undefined) {
            if (this.elements[indices]) {
                this.elements[indices].classList.add('comparing');
            }
        }
    }

    highlightSwap(indices) {
        if (Array.isArray(indices) && indices.length === 2) {
            indices.forEach(idx => {
                if (this.elements[idx]) {
                    this.elements[idx].classList.remove('comparing');
                    this.elements[idx].classList.add('swapping');
                }
            });
        }
    }

    markSorted(index) {
        if (this.elements[index]) {
            this.elements[index].classList.remove('comparing', 'swapping', 'current');
            this.elements[index].classList.add('sorted');
        }
    }

    markCurrent(index) {
        // Remove previous current
        this.elements.forEach(el => el.classList.remove('current'));
        
        if (this.elements[index]) {
            this.elements[index].classList.add('current');
        }
    }

    clearHighlights() {
        this.elements.forEach(el => {
            el.classList.remove('comparing', 'swapping', 'current');
        });
    }

    updateArray(array) {
        const maxValue = Math.max(...array, 1);
        const containerHeight = this.container.clientHeight - 40;

        array.forEach((value, index) => {
            if (this.elements[index]) {
                this.elements[index].textContent = value;
                const height = (value / maxValue) * containerHeight;
                this.elements[index].style.height = `${Math.max(height, 30)}px`;
            }
        });
    }
}